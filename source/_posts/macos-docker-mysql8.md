---
title: macOS Docker安装MySQL8
date: 2024-02-01 23:33:06
categories:
- macos
- docker
tags:
- mysql
---
### 版本号

- macOS version `版本13.5 (22G74)`
- Docker version `Docker version 24.0.6, build ed223bc`
- MySQL version `mysql/mysql-server   latest    423da140c8c0   10 months ago   507MB` `mysql  Ver 8.0.32 for ·Linux on aarch64 (MySQL Community Server - GPL)`

### 持久化安装

新建一个mysql容器

```shell
docker run --name mysql -p 3308:3306 -d mysql
```

从容器中复制一份my.cnf配置文件出来

```shell
docker cp mysql:/etc/my.cnf /Users/ao/Desktop/docker/mysql
```

在复制出来的my.cnf文件中新增一条配置

```txt
default-authentication-plugin=mysql_native_password
```

删除容器

```shell
docker stop 「容器ID」
docker remove 「容器ID」
```

<div class="justified-gallery">

![655633ee86ff7](655633ee86ff7.png)

</div>

### 启动mysql容器

```shell
docker run --name mysql -v /Users/ao/Desktop/docker/mysql/my.cnf:/etc/my.cnf -v /Users/ao/Desktop/docker/mysql/data:/var/lib/mysql -p 3308:3306 -e MYSQL_ROOT_PASSWORD=Ywc1989@@ -d mysql/mysql-server
```

<div class="justified-gallery">

![6556341408363](6556341408363.png)

</div>

### Root用户允许远程登录

my.cnf添加配置行

```shell
bind-address = 0.0.0.0
```

进入容器配置

```shell
docker exec -it mysql /bin/bash
mysql -uroot -p
use mysql
RENAME USER 'root'@'localhost' TO 'root'@'%';
FLUSH PRIVILEGES;
```

<div class="justified-gallery">

![6556405f81268](6556405f81268.png)

</div>

### 参考文章

- [CSDN MySQL Docker8](https://blog.csdn.net/qq_26709459/article/details/128931193)
- [知乎MySQL配置远程访问-评论](https://zhuanlan.zhihu.com/p/60539230)
