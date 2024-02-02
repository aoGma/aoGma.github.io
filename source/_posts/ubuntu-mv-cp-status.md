---
title: Ubuntu mv、cp 命令添加进度条
date: 2024-02-02 00:06:47
categories:
- ubuntu
tags:
- terminal
---
cp和mv是GNU coreutils的一部分，首先下载最新的GNU源码。
[地址](https://ftp.gnu.org/gnu/coreutils/)
最新的为9.1
`wget https://ftp.gnu.org/gnu/coreutils/coreutils-9.1.tar.xz`

## 解压

```shell
tar -xf coreutils-9.1.tar.xz

cd coreutils-9.1

wget https://raw.githubusercontent.com/jarun/advcpmv/master/advcpmv-0.9-9.1.patch
```

## 打补丁

```shell
patch -p1 -i advcpmv-0.9-9.1.patch

./configure

make

sudo cp src/mv src/cp /usr/local/bin

vim ~/.zshrc

alias cp='/usr/local/bin/cp -gR'
alias mv='/usr/local/bin/mv -g'
```
