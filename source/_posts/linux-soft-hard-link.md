---
title: Linux 软链接和硬链接（Soft-Hard-Link）
date: 2024-02-02 00:01:43
tags:
---
## 软链接（Soft links）

软链接相当于Windows上面的快捷方式
> Commonly referred to as symbolic links, soft links link together non-regular and regular files. They can also span multiple filesystems. By definition, a soft link is not a standard file, but a special file that points to an existing file. Let's look at how to create a soft link. I use the ln -s command and the following syntax:
>
> All of this sounds great, but there are some drawbacks to using a soft link. The biggest concern is data loss and data confusion. If the original file is deleted, the soft link is broken. This situation is referred to as a dangling soft link. If you were to create a new file with the same name as the original, your dangling soft link is no longer dangling at all. It points to the new file created, whether this was your intention or not, so be sure to keep this in mind.
>
## 硬链接（Hard links）

硬链接相当于文件的一个副本，但是创建硬链接的时候并没有复制一份源文件，而是将文件的node指向源文件，相当于一个空指针指向了文件的地址。
> The concept of a hard link is the most basic we will discuss today. Every file on the Linux filesystem starts with a single hard link. The link is between the filename and the actual data stored on the filesystem. Creating an additional hard link to a file means a few different things. Let's discuss these.
>
> First, you create a new filename pointing to the exact same data as the old filename. This means that the two filenames, though different, point to identical data. For example, if I create file /home/tcarrigan/demo/link_test and write hello world in the file, I have a single hard link between the file name link_test and the file content hello world.
>
> When changes are made to one filename, the other reflects those changes. The permissions, link count, ownership, timestamps, and file content are the exact same. If the original file is deleted, the data still exists under the secondary hard link. The data is only removed from your drive when all links to the data have been removed. If you find two files with identical properties but are unsure if they are hard-linked, use the ls -i command to view the inode number. Files that are hard-linked together share the same inode number.
>
## 硬链接限制
>
> While useful, there are some limitations to what hard links can do. For starters, they can only be created for regular files (not directories or special files). Also, a hard link cannot span multiple filesystems. They only work when the new hard link exists on the same filesystem as the original.
>
## 参考文章

[hard links and soft links explained](https://www.redhat.com/sysadmin/linking-linux-explained)
