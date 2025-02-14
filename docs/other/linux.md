本文全部基于Ubuntu系统，其他linux发型板在末尾

# 常用命令

#### 查看端口/ss/lsof

- 查看端口

```
lsof -i :3000
```

- 查看端口被什么占用了,没有就是没占

```
sudo ss -tuln | grep :5002
```

#### 文件传输

非常好用，在原主机（一般为windows）上运行

```
scp -r C:\Users\35687\Downloads\x0dlvl.20240926 lyh:/home/lyh/
```

#### 更新apt

装东西装不上了就更新一下

```
sudo apt update
```

#### 修改默认编辑器

```
sudo EDITOR=vim visudo
```

#### 打印/传参/echo

在终端上显示hello world

```
echo "Hello, World!"
```

#### 后台运行&

在命令后面加&

#### 更新软件包/upgrade

```
sudo apt upgrade
```

`sudo apt upgrade` 是一个用于在 Ubuntu 或者其他基于 Debian 的 Linux 发行版中更新已安装软件包到它们最新可用的版本的命令。

具体来说：

- `sudo` 是一个命令，用于以超级用户权限执行后续的命令。超级用户权限通常是必需的，因为在更新软件包时可能需要对系统进行修改，而这些修改通常需要管理员权限。
- `apt` 是一个包管理器，用于在 Debian 及其衍生发行版中管理软件包。它可以安装、删除、更新软件包，并处理它们的依赖关系。
- `upgrade` 是 `apt` 命令的一个选项，用于将系统中已安装的软件包更新到它们的最新版本。与 `apt update` 命令不同，`upgrade` 不会安装新软件包，而只是更新已安装的软件包。

#### 系统命令systemctl

用于控制 systemd 系统和服务管理器的命令行工具。它被用来启动、停止、重新启动、启用和禁用系统服务，以及检查服务的状态。

#### 帮助/man

man！

```
man 数字 命令
```

**Section 1**: 用户命令 (User Commands)

**Section 2**: 系统调用 (System Calls)

**Section 3**: C 库函数 (C Library Functions)

**Section 4**: 特殊文件 (Devices and Special Files)

#### systemctl 系统运行

系统级进程管理器，可以配置进程运行，开机自动启动

# 网络相关

#### 查看ip/ifconfig/ip

```
ifconfig
ip addr show
```

#### 发http请求/curl

curl是一个用于发送HTTP请求的命令行工具，它支持多种协议，包括HTTP、HTTPS、FTP、SMTP等。curl可以用来下载文件、上传文件、发送POST请求、发送表单数据等。

```
curl [options] [URL]
```

# 文件目录相关

#### 用户权限/ll

有时候不能读或者不能写就是权限问题,通过查看配置权限解决

- 查看权限

```
ls -al   ->  ll
```

- 修改权限

```
sudo chmod 755 xx
```

如过Vim提示只读文件，还可以通过sudo + w! 进行强制保存

#### 显示当前目录/pwd

```
pwd
```

#### 查看文件里的内容/cat

```
cat 文件
```

#### 创建与删除文件目录/mkdir/rmdir

```
mkdir
```

```
rmdir
```

带有文件的使用

```
rm -r 
```

#### 切换目录/cd 

```
cd 目标路径
```

#### 删除文件或目录/rm

- 直接删除文件，只能删除空文件

```
rm file_name
```

- 递归删除目录及其内容

```
rm -r directory_name
```

#### 复制文件或目录/cp

```
cp 源文件 目录
cp 源文件 复制文件名
cp -r source_directory destination  # 递归复制目录及其内容
```

#### 转为可运行文件/chmod

```
chmod +x 
```

#### 创建文件/touch

```
touch 文件夹名
```

#### 文件重命名/文件移动/mv

```
mv file1.txt newfile.txt
```

使用mv同样可以实现文件移动

```
sudo mv mycp.c /home/exp41
```

#### 修改文件所属用户或所属组的系统调chown

```
chown [options] new_owner[:new_group] file(s)
```

#### 比较/diff

可以比较两个文件的不同

```
diff file1.txt file2.txt
```

# 性能相关命令

#### 查看实时的全部性能top

输入top可以实时显示任务面板，非常好用

#### 查看内存信息/free

```
free -h
```

#### 查看硬盘空间信息/df

```
df -h
```

#### 显示磁盘使用情况/df/du

```
df -h  # 显示磁盘空间使用情况
du -h directory_name  # 显示目录的磁盘使用情
```

# 用户相关命令

#### 查看当前的用户

```
whoami
```

#### 创建用户和密码/useradd

先创建用户

```
sudo useradd -m aaa
```

之后设置密码

```
sudo passwd username
```

#### 查看有多少用户/cut -d

```
cut -d: -f1 /etc/passwd
```

#### 查看本机用户

```
cut -d: -f1 /etc/passwd
```

#### su/切换用户

```
su usernmae
```

没有成功就重启一下shell

#### 查看活跃/w

```
w
```

#### 修改密码

root用户可以修改其他用户密码，不需要知道原密码

```
sudo passwd username
```

#### 配置管理员权限/添加管理员

1.以root用户身份登录

2.运行

```
$ sudo visudo
```

3.在打开的文件中找到

```
# User privilege specification
```

4.在下面添加

```
username    ALL=(ALL:ALL) ALL
```

其中，`username`是你想要给予sudo权限的用户名。这行的意思是允许`username`用户在任何主机（ALL）、以任何用户身份（ALL）、运行任何命令（ALL）时使用sudo权限

5.保存并退出编辑器。在`visudo`中，你可以按 `Ctrl + X`，然后输入 `Y` 保存更改，然后按 `Enter` 退出。

# 防火墙设置与防火墙状态

### 防火墙状态/ufw status

```
sudo ufw status
```

开放防火墙

```
sudo ufw enable
```

禁用防火墙

```
sudo ufw disable
```

允许特定端口

```
sudo ufw allow <port_number>
```

拒绝特定端口

```
sudo ufw deny <port_number>
```

允许特定IP

```
sudo ufw allow from <IP_address>
```

拒绝特定IP

```
sudo ufw deny from <IP_address>
```

重启（非常建议）

```
sudo ufw reload
```

# ps相关

### ps aux显示所有进程

`ps -ef`也行

### kill -9 pid杀死进程

应该要添加sudo权限

# sudo相关

### sudo -i

使用 `sudo -i` 后，你会切换到 root 用户并进入 root 用户的环境。你可以运行所有需要 root 权限的命令，而不必每次都在命令前加 `sudo`。

使用exit退出

# ls相关

查看文件夹下的文件

```
ls
```

### ls -l 显示属性

`-l`：以长格式显示文件和目录信息，包括文件权限、所有者、大小、最后修改时间等。

```
-rw-r-----
```

分别为 r读 w写 x运行

`-d`：仅显示目录本身的属性，而不是目录中的内容。使用 `-d` 可以查看目录的信息（如权限和所有者），而不列出该目录中的文件。

1. `-a`：显示所有文件和目录，包括以`.`开头的隐藏文件。
2. `-h`：以人类可读的格式显示文件大小，如KB、MB等。
3. `-S`：按文件大小排序显示结果，从大到小。
4. `-t`：按最后修改时间排序显示结果，最新的文件在前面。
5. `-r`：以相反的顺序排序结果，即逆序。



# 文件颜色

以下是一些常见颜色及其含义：

1. **绿色 (Green)**：
   - 通常表示可执行文件或脚本，如二进制文件、可执行程序（如 `ls`, `bash` 等）以及带有执行权限的脚本文件。
2. **蓝色 (Blue)**：
   - 通常表示目录。
3. **浅蓝色 (Cyan)**：
   - 通常表示符号链接（Symbolic Links）。
4. **深红色 (Dark Red)**：
   - 通常表示压缩文件，如 `.tar`, `.zip`, `.gz` 等。
5. **紫色 (Magenta)**：
   - 通常表示图片或媒体文件（音频、视频文件）。
6. **黄色 (Yellow)**：
   - 通常表示设备文件（如 `/dev/sda`）或 FIFO、套接字文件。
7. **红色 (Red)**：
   - 通常表示归档文件或文件系统错误。
8. **灰色 (Gray)**：
   - 通常表示其他类型的文件，如文本文件、配置文件等。

# gcc编译c语言

转二进制文件

```
gcc xxx.c -o xxx 
```

之后就能直接./运行

### 转变为可编辑文件

```
chmod +w filename
```

# 后台挂起运行/screen

一个古老而又强大的命令

**注：服务器重启会失去所有屏幕！！**

命令为

```
screen -S 屏幕名
```

会新建一个屏幕，这个屏幕独立于ssh，为后台独立运行

使用_恢复上屏幕

```
screen -r  前面的数字编号
```

查看现在有多少屏幕

```
screen -ls
```

不销毁屏幕回到桌面

```
ctrl a d
```

销毁回到桌面

```
ctrl c d
```

# 后台执行nohup 

- 使用`jobs`命令查看后台运行的作业

```
jobs
```

- 获取进程ID，使用`ps`命令或直接在启动`nohup`命令后使用`$!`变量获取最近启动的后台进程ID

```
echo $!
```

- 终止后台进程

```
kill PID
```

### 配置可执行文件

一般来说linux可执行文件按是没有后缀的直接运行会报

```
-bash: ./stuscore: Permission denied
```

需要进行可执行文件配置

```
sudo chmod +x ./stuscore
```

# net-tools

需要装

```
sudo apt install net-tools
```

# ssh连接（非常建议配置，可能有毁灭性影响）

在windows终端中连接命令

```
ssh 用户名@ip地址
```

在linux中需要安装

Ubuntu

```
sudo apt install openssh-server
```

默认开启，查看运行状态

```
sudo systemctl status ssh
```

防火墙运许ssh

```
sudo ufw allow ssh
```

### ssh查看历史内容滑条

ctrl + a + [

# 切换默认shell

正常前面会有用户信息，如果没有就是配置了不同的shell

```
chsh -s /bin/bash
```

之后重启就好了

# vim编辑器

### 要注意中文无法输入

### 强制编辑

```
:w!
```

### vim撤销

```
u
```

### 光标移动

```
h：左移一个字符。
j：下移一行。
k：上移一行。
l：右移一个字符。
0：移到当前行的开头。
$：移到当前行的末尾。
gg：移到文件的第一行。
G：移到文件的最后一行。
```

### 编辑文本

```
x：删除当前光标所在处的字符。
dd：删除当前行。
yy：复制当前行。
p：粘贴剪切或复制的内容。
```

### 搜索和替换

```
/pattern：在文本中向下搜索指定的模式。
?pattern：在文本中向上搜索指定的模式。
:s/target/replacement/g：替换文本中所有匹配的目标字符串为替换字符串。
```

### 删除行

记得回到顶部

dd

3dd删除3行

300dd删除300行

### 回到顶部

```
gg
```

#### 搜索

搜索下面的，建议使用gg回到顶部

```
/
```

搜索上面的

```
?
```

# nano编辑器

### 保存

```
ctrl + 0
```

# 查看系统版本

```
lsb_release -a
```

# 软件相关

提供安装软件出问题的问题解决，不提供标准安装

## 更新软件

**严重警告！！**

**如果下载的不是最新版本，无需使用此命令！！**

**直接使用会更新全部的软件，谨慎使用！！**

```
sudo apt upgrade
```



## 换源

建议先备份

```
cp /etc/apt/sources.list
```

清华源官网，在这选择自己的版本

```
https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/
```

查看ubuntu版本

```
lsb_release -a 
```

修改源（把全部的内容替换）

```
sudo vim /etc/apt/sources.list
```

更新（不行还可以重启试试）

```
sudo apt update
sudo apt-get upgrade
```

## Node.js

### 找node

```
which node
```

```
www ALL=(ALL) NOPASSWD: /usr/local/nodejs/bin/node /home/*
```

## node路径变量写法

在使用node服务器器时使用80端口其实没有什么太特殊的，正常开放端口，使用就行了，主要的变化为在启动80端口的服务器时需要加上管理员权限

```
sudo node index.js
```

如果找不到node就添加

```
sudo $(which node) index.js
```

## git

### 安装git

可以先看看默认有没有，没有在装

```
git
```

安装

```
sudo apt install git
```

先建一个新目录

```
~$ sudo mkdir learngit
~$ cd learngit
```

之后初始化

```
~$ git init
```

然后配置用户信息

```
~$ git config --global user.email "<your email>"
~$ git config --global user.name "<your name>
```

之后正常就能用了 

# azure/pem使用

用户目录下.ssh文件夹（使用过ssh就会有）中建立config文件

config

```
Host linux2
    HostName 20.243.83.241  //端口号
    User linux2             //用户名
    Port 22                 //ssh端口好
    IdentityFile ~/.ssh/linux2.pem  //pem文件地址（linux）
```

之后ssh 别名（Host 后的名字）本文是 linux2



# 进程管理器

使用进程管理器可以更好的管理进程，在后台运行进程，是运行服务所必须的

## node进程管理器

### PM2

官网

```
https://pm2.fenxianglu.cn/docs/general/process-management
```

# code-server

官方文档

```
https://github.com/coder/code-server
```

安装（2024/6/1）

```
curl -fsSL https://code-server.dev/install.sh | sh
```

启动前先修改配置文件，密码和端口

```
vim ~/.config/code-server/config.yaml
```

之后直接 

```
code-server
```

就能运行了

# 宝塔面板

在linux（ssh 客户端可以设置全部的信息）

```
sudo bt
```

## 宝塔404解决方案

宝塔带有路径保护，路劲变了，在linux中使用如下命令查看

```
sudo bt default
```

# glances监控

轻量级监控面板，在github有好多星

- 命令行监控

  ```
  glances
  ```

- webUI监控

  ```
  glances -w
  ```

# wgcloud监控面板

支持免费的消息提醒

# 其他

## debian

一般甲骨文有的用这个
