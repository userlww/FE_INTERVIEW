本文简单介绍下HTTP协议中常见的几个请求头

#### Accept

- Accept:text/html 浏览器可以接口服务器返回的类型为text/html
- Accept:*/* 代表浏览器可以处理所有类型

#### Accept-Encoding

- Accept-Encoding:gzip,deflate。浏览器声明自己接收的编码方式，通常指定压缩方式

#### Accept-Language

- Accept-Language:zh-CN,zh;q=0.9,浏览器声明自己接收的语言

#### Host

用于指定被请求资源的网络主机和端口号，通常从HTTP URL中提取出来

#### Referer

浏览器向web服务器发送请求时，一般会带上referer，告诉服务器当前请求是从哪个页面链接过来的。

#### User-Agent 

客户端使用的浏览器版本和名称以及操作系统信息等。

- Cache-Control:private 默认为private  响应只能够作为私有的缓存，不能再用户间共享Cache-Control:public 响应会被缓存，并且在多用户间共享。正常情况, 如果要求HTTP认证,响应会自动设置为 private.
- Cache-Control:must-revalidate  响应在特定条件下会被重用，以满足接下来的请求，但是它必须到服务器端去验证它是不是仍然是最新的。
- Cache-Control:no-cache  响应不会被缓存,而是实时向服务器端请求资源。
- Cache-Control:max-age=10 设置缓存最大的有效时间，但是这个参数定义的是时间大小（比如：60）而不是确定的时间点。单位是[秒 seconds]。
- Cache-Control:no-store 在任何条件下，响应都不会被缓存，并且不会被写入到客户端的磁盘里，这也是基于安全考虑的某些敏感的响应才会使用这个。

#### Cookie

Cookie是用来存储一些关键信息，他会在每一次请求的时候被带给服务器

#### Range（用于断点续传）

Range:bytes=0-5 指定第一个字节的位置和最后一个字节的位置。用于告诉服务器自己想取对象的哪部分。


#### 参考文献

- [关于常用的http请求头以及响应头详解
](https://juejin.cn/post/6844903745004765198)
