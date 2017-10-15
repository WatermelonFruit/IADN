# linux常用命令

## 进程
```bash
lsof -n -P| grep :xxx  # 查看端口号是否被占用
ps aux | grep xxx  #如 ps aux | grep node #查看进程
kill -9 PID #kill进程
```

## 文件操作
```bash
mkdir 目录名         # 创建一个目录
rmdir 空目录名      # 删除一个空目录
rm 文件名 文件名   # 删除一个文件或多个文件
rm –rf 非空目录名 # 删除一个非空目录下的一切
touch 文件名      # 创建一个空文件
mv file1 file2    # 将文件 file1，更改文件名为 file2
mv file1 dir1    # 将文件 file1，移到目录 dir1下，文件名仍为 file1
mv dir1 dir2    # 若目录 dir2 存在，则将目录 dir1，及其所有文件和子目录，移到目录 dir2 下，新目录名称为 dir1。若目录 dir2 不存在，则将dir1，及其所有文件和子目录，更改为目录 dir2
```

## scp & ssh
```bash
scp (-r) localpath user@ip:/remotepath # ssh本地传文件(夹)到服务器(-r 传文件夹)
nohup program & #ssh关闭后保持当前进程继续运行,如： nohup npm start & 
```

## 压缩/解压

### tar压缩/解压(tar [-cxtzjvfpPN] 文件与目录 ....)
```bash
# 将整个 /etc 目录下的文件全部打包成为/tmp/etc.tar
tar -cvf /tmp/etc.tar /etc    # 仅打包，不压缩
tar -zcvf /tmp/etc.tar.gz /etc   # 打包后，以 gzip 压缩
# 打包成tar.xz 方法1
tar -cvf xxx.tar xxx/ # 先打包成tar
xz -z xxx.tar
# 打包成tar.xz 方法2
tar -Jcf xxx.tar.xz xxx/
# 将 /tmp/etc.tar.gz 文件解压缩在当前目录下
tar -zxvf /tmp/etc.tar.gz
# 解压tar.xz 方法1
xz -d xxx.tar.xz # 先解压成tar
tar xvf xxx.tar # 再解压tar文件
# 解压tar.xz 方法2
tar -Jxf xxx.tar.xz
```

### 7z压缩/解压
```bash
7z a Files.7z * -r ： #增加当前文件夹及其子文件夹下的所有文件到Files.7z中
7z x Files.7z -oabc #解压Files.7z到abc文件夹
```

## 查看日志
```bash
tail -f /home/proc/logs/log.txt # 查看/home/proc/logs/log.txt日志文件
```