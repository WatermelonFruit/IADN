# nginx入门

## 安装nginx
```bash
docker pull nginx:1.13
```

## 运行
```bash
docker run --name nginx -p 80:80 -p 443:443 -v /home/docker/nginx/html:/usr/share/nginx/html -v /home/docker/nginx/conf.d:/etc/nginx/conf.d -v /home/docker/nginx/logs:/var/log/nginx -v /home/docker/nginx/certs:/etc/nginx/certs -d nginx:1.13
docker start nginx
```

## 配置
```bash
# 编辑 /home/docker/nginx/conf.d/default.conf
# http跳转至 https
server {
    listen 80;
    server_name  example.com *.example.com;
    return 301 https://$host$request_uri;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    #location / {
	# root /usr/share/nginx/html;
    #}

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    # error_page   500 502 503 504  /50x.html;
    #location = /50x.html {
    #   root   /usr/share/nginx/html;
    #}

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ /.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ /.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ //.ht {
    #    deny  all;
    #}
}
# example.com
server {
    listen 443;
    server_name example.com;
    return 403;

    ssl on;
    ssl_certificate /etc/nginx/certs/2017201801.pem;
    ssl_certificate_key /etc/nginx/certs/2017201802.key;
}
# test.example.com
server {
    listen  443;
    server_name  test.example.com;

    ssl on;
    ssl_certificate /etc/nginx/certs/2017201802.pem;
    ssl_certificate_key /etc/nginx/certs/2017201802.key;

    location / {
      # proxy
	    proxy_pass http://192.168.31.24:8080;
    }
}
# *.example.com
server {
    listen 443;
    server_name *.example.com;
    return 403;
}
```