---
title: Docker容器无法通过TUN代理
date: 2025-05-09 00:02:20
excerpt: 不重建容器，解决Docker容器无法走宿主的TUN代理
categories: 经验分享
tags:
- Docker
---

Ubuntu Server主机配置了Clash TUN的代理模式，偶然发现Docker中的某个容器不走TUN代理

> Clash置了TUN模式但Docker容器流量不经过 Clash，通常是由于Docker使用独立网络namespace，未共享主机的网络栈

问了一下ChatGPT，提供了一个修改容器内网络路由表的方法

执行del操作的时候，先看一下当前的路由表内容，如果有问题还能恢复，以防恢复不了

{% image /assets/images/DockeIPRoutesDefault.webp 默认的路由表 fancybox:true %}

```bash
docker exec --privileged -it stash /bin/sh
ip route del default
ip route add default via 198.18.0.1
```

执行后发现

```bash
/ # ip route add default via 198.18.0.1
ip: RTNETLINK answers: Network unreachable
```

执行失败，这个时候，你会发现容器连不上了，因为已经删掉了路由表，现在网络走不通，没办法，只能通过当前终端记录找到之前的那条路由表记录，具体我也不知道走Dockers用的哪个网卡，上面的默认路由表里面就是，找到后`ip route add default xx.xx.xx.xx`，回到原来的状态就行，这时候容器就能连上了

分析一下原因：

- Clash的TUN网卡（如198.18.0.1）只存在于宿主机网络命名空间中
- Docker默认使用bridge网络，容器有独立网络栈
- 容器无法直接访问宿主机的TUN网卡地址

想要找到一种不用重建容器的方法
突然想到clash verge的复制环境变量，是不是可以在容器内直接访问外部的端口直接走系统代理就行

通过修改容器内的环境变量配置代理

```bash
# 进入容器
docker exec -it stash /bin/sh
# 7890是混合端口
export http_proxy=http://host.docker.internal:7890
export https_proxy=http://host.docker.internal:7890
```

> ChatGPT说host.docker.internal是宿主机地址（macOS和Windows默认支持Linux可通过添加--add-host或使用容器IP

我尝试了一下Ubuntu Server中直接使用这个地址是可以代理到宿主的7890端口的

export只能当前session使用，退出终端之后就没了

永久设置（适用于非交互式命令）

容器中没有vim所以只能用其他办法，直接echo进去

```bash
# 在容器里编辑/etc/profile 或创建一个 shell 脚本设置代理
echo "export http_proxy=http://host.docker.internal:7890" >> /etc/profile
# 恢复文件/删除代理
sed -i '/http_proxy=http:\/\/host.docker.internal:7890/d' /etc/profile
```

验证代理是否生效

```bash
# 获取公网IP，走的香港，看有没有HK字段了
wget -qO- http://ip-api.com/json
# 或者直接下载google首页试试
wget www.google.com
```

完美，这样子容器就能走外部（宿主）的代理了
