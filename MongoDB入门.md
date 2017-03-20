# MongoDB入门

## 前述
+ 服务器环境为Ubuntu 16.04 LTS

## 安装MongoDB
```
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.4.list
apt update
apt install -y mongodb-org
```

## 启动/停止/重启MongoDB
```
service mongod start/stop/restart
```

## 连接数据库
```
mongo // 本地连接
mongo ip:port //默认端口号27017
```

## 数据库操作

### 查看数据库
```
show dbs
```

### 创建与使用数据库
```
use dbname
```

### 查看当前数据库下collections
```
show collections
```

### 增删查改
```
// collections name 为 info
db.info.insert({'name':'Stim',age:25,'brothers':['John','Ian']},{'name':'',age:32,'brothers':['Jim','Starr']})
```

