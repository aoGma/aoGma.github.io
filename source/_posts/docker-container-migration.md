---
title: Docker已创建容器挂载目录迁移
date: 2023-10-21 21:27:30
---
## 停止容器

```bash
docker stop container-id-1 container-id-2
```

### 停止docker服务

```bash
sudo systemctl stop docker
```

### 查看docker目录

```bash
docker info | grep 'Root'
# Docker Root Dir: /var/lib/docker
su root
cd /var/lib/docker/containers
```

### 修改每个container中的config.v2.json文件

```bash
%s/home\/ao/home\/ao\/docker-containers/g
```
