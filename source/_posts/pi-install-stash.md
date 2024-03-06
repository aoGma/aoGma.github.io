---
title: 树莓派安装 Stash
date: 2024-02-02 00:05:16
categories:
- pi
tags:
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

## 配置 Nginx

```conf
server {
    listen 443;
    listen [::]:443;

    server_name stash.ao.pi;
    client_max_body_size 0;

    #ssl证书的pem文件路径
    ssl_certificate  ao.pi.pem;
    #ssl证书的key文件路径
    ssl_certificate_key ao.pi-key.pem;

    location / {
        proxy_pass http://localhost:9999;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

```

## 启动

```bash
sudo systemctl daemon-reload
sudo systemctl start stash
```

## 参考文章

[stash](https://github.com/stashapp/stash/)
