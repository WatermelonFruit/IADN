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

## docker下mongodb安装与配置

### 安装与启动
```
docker pull mongo
// -v：创建一个位置 /home/docker/mongo数据卷并挂载到容器的/data/db位置
// -p：指定容器27017端口映射到本地宿主27017端口，以便mongo裸露在外网
// -d：守护态运行mongo
docker run --name mongo -v /home/docker/mongo:/data/db -p 27017:27017 -d mongo
// 进入正在运行的 MongoDB 容器
docker exec -it mongo /bin/bash
// 在容器中运行
mongo
```

### 访问控制
```
// 进入正在运行的 MongoDB 容器
docker exec -it mongo /bin/bash
// 在容器中运行
mongo
// 创建用户
use admin
db.createUser({user:'admin',pwd:'admin',roles: [{role: 'root',db: 'admin'}]})
// 测试是否通过，返回1代表验证通过
db.auth('admin','admin')
// 退出mongo后
cp /entrypoint.sh /data/db
// 宿主机执行
// 在exec gosu mongodb "$@"之前增加一行内容set -- "$@" "--auth"
nano /home/docker/mongo/entrypoint.sh
// 在容器执行
cp -f /data/db/entrypoint.sh /
// 在宿主机重启mongo
docker restart mongo
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
// insert
db.info.insert([{'name':'Stim',age:25,'brothers':['John','Ian']},{'name':'',age:32,'brothers':['Jim','Starr']}])
// find
db.info.find()
```

