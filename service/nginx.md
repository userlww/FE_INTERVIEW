
Nginx是一个高性能的HTTP和反向代理服务器,具有内存占用少，并发能力强等特点，国内的百度、京东、新浪、网易、腾讯、淘宝等网站都使用了nginx。

#### nginx可以作为web服务器

nginx可以作为静态页面web服务器使用，同时也支持CGI协议的动态语言，比如php、perl等。但是不支持Java，程序只能通过与 tomcat 配合完成。nginx专为性能优化而开发，性能是其最重要的考量,实现上非常注重效率 ，能经受高负载的考验。

#### 正向代理与反向代理

几点区别
##### 位置不同	
正向代理，架设在客户机和目标主机之间；

反向代理，架设在服务器端；

##### 代理对象不同	
正向代理，代理客户端，服务端不知道实际发起请求的客户端；

反向代理，代理服务端，客户端不知道实际提供服务的服务端；



#### 负载均衡概念

客户端发送多个请求到服务器，服务器处理请求，有一些可能要与数据库进行交互，服务器处理完毕后，再将结果返回给客户端。

这种架构模式对于早期的系统相对单一，并发请求相对较少的情况下是比较适合的，成本也低。但是随着信息数量的不断增长，访问量和数据量的飞速增长，以及系统业务的复杂度增加，这种架构会造成服务器相应客户端的请求日益缓慢，并发量特别大的时候，还容易造成服务器直接崩溃。很明显这是由于服务器性能的瓶颈造成的问题，那么如何解决这种情况呢？

我们首先想到的可能是升级服务器的配置，比如提高CPU执行频率，加大内存等提高机器的物理性能来解决此问题，但是我们知道摩尔定律的日益失效，硬件的性能提升已经不能满足日益提升的需求了。一个例子，双十一当天，某个热销商品的瞬时访问量是极其庞大的，那么类似上面的系统架构，将机器都增加到现有的顶级物理配置，都是不能够满足需求的。那么怎么办呢？

上面的分析我们去掉了增加服务器物理配置来解决问题的办法，也就是说纵向解决问题的办法行不通了，那么横向增加服务器的数量呢？这时候集群的概念产生了，单个服务器解决不了，我们增加服务器的数量，然后将请求分发到各个服务器上，将原先请求集中到单个服务器上的情况改为将请求分发到多个服务器上，将负载分发到不同的服务器，也就是我们所说的负载均衡

![负载均衡](./../images/nginx.png)

#### 动静分离概念

为了加快网站的解析速度，可以把动态页面和静态页面由不同的服务器来解析，加快解析速度。降低原来单个服务器的压力。

![动静分离](./../images/fenli.png)

#### nginx安装 

配置一个静态页面:
1. 安装依赖

```
yum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel
```

2. 安装nginx

```
wget http://nginx.org/download/nginx-1.20.2.tar.gz
```
3. 解压
```
tar -zxvf nginx-1.20.2.tar.gz
```
4. 进入nginx文件夹 将配置文件映射到某目录中

```
cd nginx-1.20.2/
./configure --prefix=/usr/local/nginx

```
5. make install

6. 进入目录修改配置文件
```

cd /usr/local/nginx/sbin

./nginx

./nginx -t 查看是否配置成功

查看nginx进程

ps -ef | grep nginx

```
7.修改配置文件

```
cd ../conf

vi nginx.conf.default

./configure make make install

```


 #### 参考文献

- https://www.zhihu.com/question/24723688
- https://zhuanlan.zhihu.com/p/34943332
- https://www.cnblogs.com/tinywan/p/7230039.html
