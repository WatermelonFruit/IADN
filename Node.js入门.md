# Node.js入门

## 基本约定

### 常用命令
+ npm root 查看当前包的安装路径
+ npm root -g 查看全局安装包的路径
+ npm install 安装命令
+ npm install -g 全局安装
+ npm ls 显示所有的安装包
+ npm remove 卸载命令
+ npm update 更新

### 命名规则
+ 变量命名 adminUser passwrod studentID
+ 方法命名 getStudentId returnUserInfo
+ 类命名 UserDatabase
+ 常量命名 FORM_NAME 下划线命名的方式
+ 包名 不要包含js/node等

### 异步
```js
function sss(err,data) {
}
```

## Ubuntu下安装node

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
+ 从node官网下载Linux Binaries
+ 解压并进入解压后的目录
+ 拷贝安装
```bash
cp -r bin include lib share /usr/local/
```

