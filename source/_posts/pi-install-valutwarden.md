---
title: 树莓派安装 valutwarden
date: 2024-02-02 00:05:45
categories:
- pi
tags:
---
## 创建目录

```bash
mkdir dockers/vaultwarden/data
```

## 安装

```bash
docker pull vaultwarden/server:latest

docker run -d --name bitwarden \
    --restart=always \
    -v /bw-data/:/data/ \
    -p 127.0.0.1:8080:80 \
    -p 127.0.0.1:3012:3012 \
    vaultwarden/server:latest
```

## 配置Nginx

```txt
server {
        listen 80;
        server_name bitwarden.ao.abc;
        location / {
          # proxy_pass http://localhost:5230;
          # proxy_set_header Host $proxy_host; # 修改转发请求头，让8080端口的应用可以受到真实的请求
      # proxy_set_header X-Real-IP $remote_addr;
      # proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      return 301 https://$host$request_uri;
        }
}

server {
        listen 443 ssl;
        listen [::]:443;

        server_name bitwarden.ao.abc;
        ssl_certificate      ao.abc+4.pem;
  ssl_certificate_key  ao.abc+4-key.pem;

        # SSL 会话配置
  ssl_session_cache    shared:SSL:10m;
  ssl_session_timeout  10m;

        # SSL 协议、加密配置
  ssl_protocols  TLSv1.1 TLSv1.2 TLSv1.3;
  ssl_ciphers  HIGH:!aNULL:!MD5;
  ssl_prefer_server_ciphers  on;

  location / {
    proxy_pass http://localhost:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
  
  location /notifications/hub {
    proxy_pass http://localhost:3012;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
  
  location /notifications/hub/negotiate {
    proxy_pass http://localhost:8080;
  }
}
```

## 参考文章

[pimylifeup](https://pimylifeup.com/raspberry-pi-bitwarden/)
