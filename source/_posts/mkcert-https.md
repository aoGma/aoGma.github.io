---
title: mkcert-https
date: 2024-02-18 17:22:28
tags:
---
## mkcert 本地 https 证书

> [Github 地址](https://github.com/FiloSottile/mkcert) </br>
> mkcert is a simple tool for making locally-trusted development certificates. It requires no configuration.

## 安装

### 使用实例

```bash
$ mkcert -install
Created a new local CA 💥
The local CA is now installed in the system trust store! ⚡️
The local CA is now installed in the Firefox trust store (requires browser restart)! 🦊

$ mkcert example.com "*.example.com" example.test localhost 127.0.0.1 ::1

Created a new certificate valid for the following names 📜
 - "example.com"
 - "*.example.com"
 - "example.test"
 - "localhost"
 - "127.0.0.1"
 - "::1"

The certificate is at "./example.com+5.pem" and the key at "./example.com+5-key.pem" ✅
```

### 制作域名 ao.pi 的 SSL 证书

```bash
mkcert -install

mkcert ao.pi "*.ao.pi" localhost 127.0.0.1 ::1
```

### 主机信任证书

```bash
mkcert -CAROOT
# 将 rootCA.pem 下载到主机上，信任即可
```
