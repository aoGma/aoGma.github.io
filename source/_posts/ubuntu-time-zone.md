---
title: Ubuntu 设置时区
date: 2024-02-02 00:17:18
tags:
---
## 查看时区

timedatectl是一个命令行工具，它允许你查看或者修改系统的时间和日期。它在所有现代的基于System的 Linux系统中都可以使用，包括Ubuntu20.04。

想要打印当前系统时区，不带参数运行timedatectl。

```shell
sudo timedatectl
```

下面的输出显示系统时区被设置为"UTC":
![655dee1461a02](655dee1461a02.png)
系统时区通过链接文件/etc/localtime配置，该链接指向/usr/share/zoneinfo目录下的一个二进制时区标识文件。另外一个检查时区的方法就是显示这个链接文件指向的实际路径，使用ls命令：
![655dee6edb536](655dee6edb536.png)
系统的时区同时也被写入/etc/timezone文件：
![655dee9f3d7df](655dee9f3d7df.png)

## 使用timedatectl命令修改时区

```shell
sudo timedatectl list-timezones

sudo timedatectl set-timezone
```

![655def839b174](655def839b174.png)
