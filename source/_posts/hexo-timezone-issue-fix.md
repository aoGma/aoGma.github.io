---
title: Hexo 文章中 assets file 404
date: 2024-02-02 08:59:07
categories:
- hexo
tags:
- assets
- 404
---
## 问题

部署 hexo 博客到 GitHub page 之后发现文章中的图片 404， 而且归档的日期差了一天，猜测是时区的问题，查找一下相关资料，更改了 CICD 的配置即可。

## .github/workflows/main.yml

```yml 增加配置
- name: Set Timezone
  run: |
    sudo timedatectl set-timezone Asia/Shanghai
    timedatectl

- name: Prepare Node env
  uses: actions/setup-node@v3
  with:
    ...
```

## 参考文章

- [wrongpermalinksdate](https://finisky.github.io/wrongpermalinksdate/)
