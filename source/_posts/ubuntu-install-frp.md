---
title: Ubuntu 开机启动 frp 内网穿透
date: 2024-02-02 00:16:23
tags:
---
## 创建文件

```shell
sudo vim /etc/systemd/system/frpc.service
```

文件内容

```txt
Description=My Frp Client Service - %i                                                                                                                    
After=network.target syslog.target
Wants=network.target

[Service]
Type=simple
Restart=on-failure
RestartSec=5s
ExecStart=/bin/bash -c '/home/ao/frp-ubuntu/frpc -c /home/ao/frp-ubuntu/frpc.toml'

[Install]
WantedBy=multi-user.target
```

启用服务

```shell
sudo systemctl daemon-reload
sudo systemctl enable frpc
sudo systemctl start frpc
```
