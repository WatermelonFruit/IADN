# linux常用命令

## 进程
```
ps aux | grep xxx  //如 ps aux | grep node //查看进程
kill -9 PID //kill进程
```

## 文件操作
```
mkdir 目录名         // 创建一个目录
rmdir 空目录名      // 删除一个空目录
rm 文件名 文件名   // 删除一个文件或多个文件
rm –rf 非空目录名 // 删除一个非空目录下的一切
touch 文件名      // 创建一个空文件
mv file1 file2    // 将文件 file1，更改文件名为 file2
mv file1 dir1    // 将文件 file1，移到目录 dir1下，文件名仍为 file1
mv dir1 dir2    // 若目录 dir2 存在，则将目录 dir1，及其所有文件和子目录，移到目录 dir2 下，新目录名称为 dir1。若目录 dir2 不存在，则将dir1，及其所有文件和子目录，更改为目录 dir2
```

## ssh
```
scp (-r) localpath user@ip:/remotepath // ssh本地传文件(夹)到服务器(-r 传文件夹)
nohup program & //ssh关闭后保持当前进程继续运行,如： nohup npm start & 
```

## 压缩/解压
+ tar压缩/解压(tar [-cxtzjvfpPN] 文件与目录 ....)
```
// 将整个 /etc 目录下的文件全部打包成为/tmp/etc.tar
tar -cvf /tmp/etc.tar /etc    // 仅打包，不压缩
tar -zcvf /tmp/etc.tar.gz /etc   // 打包后，以 gzip 压缩
// 将 /tmp/etc.tar.gz 文件解压缩在当前目录下
tar -zxvf /tmp/etc.tar.gz
```

## 查看日志
```
tail -f /home/proc/logs/log.txt // 查看/home/proc/logs/log.txt日志文件
```