# Docker入门

## 核心概念
+ 镜像
    + 类似于虚拟机镜像，可以将它理解为一个只读的模板（例如，一个镜像可以包含一个基本的操作系统环境，里面仅安装了Apache应用程序，可以把它称为一个Apache镜像）。
    + 镜像是创建Docker容器的基础。
    + 镜像自身是只读的。容器从镜像启动的时候，会在镜像的最上层创建一个可写层。
+ 容器
    + 类似于一个轻量级的沙箱
    + 用于运行和隔离应用
    + 是从镜像创建的应用运行实例
    + 容器彼此相互隔离的
+ 仓库
    + 类似于代码仓库
    + Docker集中存放镜像文件的场所

## 基本操作
```bash
docker pull [name][: tag]  # 下载镜像 name--镜像名，tag--标签/版本号，默认latest版本;示例：docker pull ubuntu: 14.04
docker images # 列出主机上已有镜像信息
docker tag ubuntu:latest myubuntu:latest # 本地镜像添加标签，docker tag命令添加的标签实际上起到了类似链接的作用
docker inspect ubuntu:16.04 # 获取镜像的详细信息
docker history ubuntu:16.04 # 查看镜像创建过程
docker search ubuntu # 搜索镜像
docker rmi myubuntu:latest # 删除镜像；当同一个镜像拥有多个标签的时候，docker rmi命令只是删除该镜像多个标签中的指定标签（只有一个标签则会删除镜像文件），并不影响镜像文件
docker ps # 查看正在运行的container
docker ps -a # 查看所有container
docker start xxx # 启动contaier xxx
docker stop xxx # 停止contaier xxx
docker stop $(docker ps -q) # 停用全部运行中的container
docker rm $(docker ps -aq) # 删除所有container
```

## 存出与载入镜像
+ 使用`docker save`和`docker load`来存出与载入镜像
+ 示例
```bash
# 存出镜像
docker save -o ubuntu16.04.tar ubuntu:16.04
# 以下两种方式均可载入镜像
docker load --input ubuntu16.04.tar
docker load < ubuntu16.04.tar
```

## 镜像的创建
+ 基于已有镜像容器创建
+ 基于模版导入
+ 基于Dockerfile创建
