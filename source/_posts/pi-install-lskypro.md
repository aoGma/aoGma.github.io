---
title: 树莓派安装 LskyPro
date: 2024-02-02 00:04:01
categories:
- pi
tags:
---
## 安装php8.2

1.Connect to Raspberry Pi via SSH and execute command to download GPG key:

```bash
sudo wget -qO /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
```

2.Add PHP repository:

```bash
echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/php.list
```

3.Update the package lists:

```bash
sudo apt update
```

4.~~Next, install PHP 8.2 with command line interface (CLI):~~

```bash
sudo apt install -y php8.2-fpm php8.2-common php8.2-cli php8.2-curl php8.2-gd php8.2-mbstring php8.2-xml php8.2-zip php8.2-mysql libapache2-mod-php8.2 php8.2-imagick php8.2-intl php8.2-bcmath
```

5.Check PHP version when installation was finished:

```bash
php --version
```

6.php8.2报错500，改为php8.1

```bash
sudo apt install -y php8.1-fpm php8.1-common php8.1-cli php8.1-curl php8.1-gd php8.1-mbstring php8.1-xml php8.1-zip php8.1-mysql libapache2-mod-php8.1 php8.1-imagick php8.1-intl php8.1-bcmath
```

## 修改php.ini配置

1.修改php.ini

```bash
vim /etc/php/8.1/fpm/php.ini
```

- 找到disable_functions，若 “=” 右侧存在exec、shell_exec、readlink、symlink、putenv、getenv函数，将其删除（默认状态下，等号右侧为空白）；
- 找到memory_limit，根据机器配置适当调大 “=” 右侧最大内存大小；
- 找到post_max_size，适当调大 “=” 右侧POST方法所能传输数据的最大大小；
- 找到upload_max_filesize，适当调大 “=” 右侧最大文件上传大小；
- 找到open_basedir，在其前面加上“;"（默认已添加）;
- 搜索Dynamic Extensions，你会在下面发现一堆前面跟着;的extension=xxx，对照兰空官方的依赖把该去掉的分号去掉
2.重启服务

```bash
sudo systemctl restart php8.1-fpm && sudo systemctl status php8.1-fpm
```

## 创建数据库

```bash
# 创建wiki数据库
CREATE DATABASE IF NOT EXISTS lsky DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
# 新建用户
create user 'lskypro'@'localhost' identified by '--password--';
# 赋予权限
GRANT ALL PRIVILEGES ON lsky.* TO 'lskypro'@'localhost';
# 刷新权限
flush privileges;
exit;
```

## 配置 Nginx 反向代理

```bash
server {
 listen 443 ssl;
 listen [::]:443 ssl;

 root /var/www/lsky/public;
 index index.php index.html index.htm index.nginx-debian.html;
 server_name lsky.ao.pi;

 location / {
  try_files $uri $uri/ /index.php?$query_string;
 }
 location ~ \.php$ {
  include snippets/fastcgi-php.conf;
  fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
 }
}

# 将请求转成https
server {
 listen 80;
 server_name lsky.ao.pi;
 rewrite ^(.*)$ https://$host$1 permanent;
}
```

## 下载 code 文件

```bash
cd /var/www
sudo mkdir lsky && cd lsky
sudo wget https://github.com/lsky-org/lsky-pro/releases/download/2.1/lsky-pro-2.1.zip
sudo unzip lsky-pro-2.1.zip && sudo rm -rf lsky-pro-2.1.zip
sudo chown -R www-data:www-data /var/www/lsky
sudo chmod -R 755 /var/www/lsky
```

## 卸载PHP

1.If you want to completely remove PHP anything related to it, execute the following command:

```bash
sudo apt purge --autoremove -y php-common mime-support
```

2.Remove GPG key and repository:

```bash
sudo rm -rf /etc/apt/trusted.gpg.d/php.gpg
sudo rm -rf /etc/apt/sources.list.d/php.list
```

3.Remove PHP related file:

```bash
sudo rm -rf /var/lib/systemd/timers/stamp-phpsessionclean.timer
```
