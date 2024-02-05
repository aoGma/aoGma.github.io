---
title: Ubuntu 启动 CloudFlare 端口模式
date: 2024-02-02 00:09:46
categories:
- ubuntu
tags:
---
<div class="justified-gallery">

![655df1d56c1df](655df1d56c1df.png)

</div>

```shell
warp-cli set-mode proxy
warp-cli set-proxy-port 3200
warp-cli connect
```

```shell
chmod u+x ./warp-yxip.sh
warp-cli set-custom-endpoint 162.159.195.98:3476
```

<div class="justified-gallery">

![655e19260504a](655e19260504a.png)

</div>

## 附件

[warp-yxip.sh](warp-yxip.sh)
