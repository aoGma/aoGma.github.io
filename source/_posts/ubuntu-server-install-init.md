---
title: UbuntuServer 安装初始化设置
date: 2024-02-02 00:07:33
tags:
---
## 安装CloudFlare

```shell
# Add cloudflare gpg key
curl -fsSL https://pkg.cloudflareclient.com/pubkey.gpg | sudo gpg --yes --dearmor --output /usr/share/keyrings/cloudflare-warp-archive-keyring.gpg


# Add this repo to your apt repositories
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/cloudflare-warp-archive-keyring.gpg] https://pkg.cloudflareclient.com/ $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/cloudflare-client.list


# Install
sudo apt-get update && sudo apt-get install cloudflare-warp
```

## 更新

```shell
sudo apt update -y && sudo apt upgrade -y
```

## 去掉碍眼的提示

```shell
No containers need to be restarted.

No user sessions are running outdated binaries.

No VM guests are running outdated hypervisor (qemu) binaries on this host.
```

```shell
sudo apt purge needrestart -y
```

## 使用全部磁盘空间

![磁盘没有全部使用](https://lsky.ao.abc/i/2023/11/21/655c63e9bcb76.png)

```shell
# 查看现有的卷组
sudo vgdisplay
# 扩展现有的逻辑卷
sudo lvextend -l +100%FREE  /dev/mapper/ubuntu--vg-ubuntu--lv
# 重新计算逻辑卷大小
sudo resize2fs /dev/mapper/ubuntu--vg-ubuntu--lv
```

## 安装oh-my-zsh

```shell
# 安装zsh
sudo apt install zsh -y
# 切换zsh
chsh -s /bin/zsh
# 安装oh-my-zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
# 安装插件
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

git clone https://github.com/zdharma-continuum/fast-syntax-highlighting.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/fast-syntax-highlighting

git clone https://github.com/marlonrichert/zsh-autocomplete.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-autocomplete
```

## 安装nvm

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
# 设置淘宝源
vim ~/.zshrc

export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node

vim ~/.npmrc

registry https://registry.npm.taobao.org

# npm 安装全局插件
npm i -g prettier eslint stylelint pnpm yarn
```

## 安装Docker

## 参考文章

- [1.1.1.1 CloudFlare-Ubuntu](https://pkg.cloudflareclient.com/)
