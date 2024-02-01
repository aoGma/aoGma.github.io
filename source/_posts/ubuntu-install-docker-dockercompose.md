---
title: Ubuntu 安装 Docker 和 docker-compose
date: 2024-02-02 00:15:22
tags:
---
## 软件版本

```shell
ubuntu - Ubuntu 22.04.3 LTS x86_64
docker - Docker version 24.0.7, build afdd53b
docker-compose - Docker Compose version v2.23.1
```

## 安装docker

```shell
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

```shell
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## 安装docker-compose

[GitHub](https://github.com/docker/compose/releases/)

```shell
wget https://github.com/docker/compose/releases/download/v2.23.1/docker-compose-linux-x86_64
mv mv docker-compose-linux-x86_64 docker-compose
chmod u+x docker-compose
sudo mv docker-compose /usr/local/bin/docker-compose
ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version
```

## 将用户加入docker组

```shell
sudo usermod -aG docker $USER
```

## 参考文章

[docker](https://docs.docker.com/engine/install/ubuntu/)
