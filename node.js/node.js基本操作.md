# node.js入门

## 基本约定

### 常用命令
```bash
npm root # 查看当前包的安装路径
npm root -g # 查看全局安装包的路径
npm config get prefix # 查看npm默认全局安装目录
npm i <name>  # 安装命令
npm i -g <name> # 全局安装
npm ls # 显示所有的安装包
npm remove <name> # 卸载命令
npm update <name> # 更新
```

### 命名规则
+ 变量命名 adminUser passwrod studentID
+ 方法命名 getStudentId returnUserInfo
+ 类命名 UserDatabase
+ 常量命名 FORM_NAME 下划线命名的方式
+ 包名 不要包含js/node等

## linux下安装node

### 源码编译
+ 测试Ubuntu版本为Ubuntu 16.04 LTS
+ 下载源码包
+ 解压并进入解压后的目录
+ 开始编译
```bash
./configure
make
make install
cp /usr/local/bin/node /usr/sbin/
```

### 已编译好的源码安装
+ 从node官网下载Linux Binaries,例如下载后文件名为 node-v8.x.x-linux-x64.tar.gz，并移动到指定安装目录，这里假定为 /usr/local/src
+ 安装
```bash
# 解压
tar -zcvf node-v8.x.x-linux-x64.tar.gz
# 通过软链接的形式将node和npm连接到系统默认的PATH目录下的一个（此处以/usr/local/bin为例）
ln -s /usr/local/src/node-v8.x.x-linux-x64/bin/node /usr/local/bin/node
ln -s /usr/local/src/node-v8.x.x-linux-x64/bin/npm /usr/local/bin/npm
```

### [nvm](https://github.com/creationix/nvm)安装

## 设置源
```bash
# 使用淘宝镜像
npm config set registry=https://registry.npm.taobao.org
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass
```

## 离线安装npm全局包
+ 此处以离线安装pm2为例
+ 在具备互联网连接的PC执行
```bash
npm i pm2 -g
# 查看全局安装包的路径
npm root -g
# 进入全局安装包的路径后执行
# 打包pm2
tar czvf pm2.tar.gz pm2
```
+ 在不具备互联网连接的服务器执行
```bash
# 查看全局安装包的路径
npm root -g
# 将上述打包的 pm2.tar.gz 上传到 服务器的npm默认全局安装目录(<npm_path>)下
# 解压
tar -zcvf pm2.tar.gz
# 通过软链接的形式将node和npm连接到系统默认的PATH目录下的一个（此处以/usr/local/bin为例）
ln -s <npm_path>/pm2/bin/pm2 /usr/local/bin/pm2
```
