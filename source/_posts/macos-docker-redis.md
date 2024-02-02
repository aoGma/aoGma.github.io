---
title: macOS Docker 持久化安装 Redis
date: 2024-02-01 23:55:13
categories:
- macos
- docker
tags:
- redis
---
## 安装步骤

```shell
docker run -v /Users/ao/Desktop/docker/redis/local-redis-stack.conf:/redis-stack.conf -v /Users/ao/Desktop/docker/redis/data:/data -p 6379:6379 -p 8001:8001 -d redis/redis-stack:latest
```

## 参考文章

[Redis官方文章](https://redis.io/docs/install/install-stack/docker/)
