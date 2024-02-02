---
title: 树莓派安装 Stash
date: 2024-02-02 00:05:16
categories:
- raspberry-pi
tags:
- stash
---
## 安装

```bash
sudo mkdir /etc/stash && cd /etc/stash
sudo wget https://github.com/stashapp/stash/releases/download/v0.24.1/stash-linux-arm32v6
sudo mv stash-linux-arm32v6 stash
sudo chown root:root stash
sudo chmod u+x stash
```

## 安装ffmpeg

```bash
sudo apt install ffmpeg
```

## 配置

```bash
sudo vim /etc/systemd/system/stash.service

[Unit]
Description=Stash
After=network.target

[Service]
Type=simple
ExecStart=/etc/stash/stash
Restart=always
# Consider creating a dedicated user for Wiki.js here:
User=root
WorkingDirectory=/etc/stash

[Install]
WantedBy=multi-user.target
```

## 启动

```bash
sudo systemctl daemon-reload
sudo systemctl start stash
```

## 参考文章

[stash](https://github.com/stashapp/stash/)
