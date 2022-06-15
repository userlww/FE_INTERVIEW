AJAX是“Asynchronous Javascript And XML”的简称，AJAX技术的诞生是前端发展史上一个里程碑式的飞跃，在AJAX出现之前，浏览器只能从服务器端获得HTML文档，图片等资源，而AJAX可以单纯的从服务器获取数据，使得浏览器和服务器的数据交换更加的轻量级和简单，给了前端开发人员发挥创造力提供了基石一样的帮助，从那以后，网页功能更加强大，交互更加繁复，给人们带来了无数的惊喜。

### XMLHttpRequest

**XMLHttpRequest（XHR）对象用于与服务器交互。通过 XMLHttpRequest 可以在不刷新页面的情况下请求特定 URL，获取数据。这允许网页在不影响用户操作的情况下，更新页面的局部内容。XMLHttpRequest 在 AJAX 编程中被大量使用。**

XMLHttpRequest()是一个构造函数，XMLHttpRequest对象是AJAX技术实现的关键，理解XHR对象也就对AJAX技术的原理掌握的差不多了，下面从对象实例的属性、方法和事件3个方面介绍下XHR对象

#### XHR实例属性

- readyState，它的值是一个Number，代表当前请求的状态码
  - 0 未初始化，尚未调用open方法
  - 1 已调用open方法，但尚未调用send方法
  - 2 调用了send方法，但为收到响应
  - 3 已经接收到部分响应数据
  - 4 已经接收到全部数据，可以在客户端使用
- onreadystatechange 当XHR对象实例的readyState发生变化时执行的函数
- response 是一个只读属性，包含了请求响应的整个实体
- responseText 是一个DOMString包含对请求的响应，若请求失败或者未发送，它的值是null
- responseType 用于定义响应的枚举值
- responseUrl 序列化之后的响应URL，为空则返回空字符串
- responseXML 包含请求的响应，如果返回内容不能被解析为XML或者HTML，返回值为null
- status 请求的响应状态
- statusText 响应状态的文本

#### XHR实例方法
- abort 请求发出之后终止请求
- getAllResponseHeaders 获取全部响应头
- open 初始化一个请求
- send 发送请求
- setRequestHeader 设置请求头

#### 事件

- abort:请求被终止时触发
- error:出错时触发
- load:请求成功完成时触发
- loadend：请求完成之后（成功和失败）触发
- timeout:超时触发
- loadstart：接收到数据时触发
- progress:请求到更多数据时周期性触发

### 一次AJAX请求的过程

  1. 创建XHR对象实例
  2. 通过XHR对象实例的open方法创建请求，open方法接收的参数
     1. method：请求方式：常见的比如get和post
     2. url：请求地址
     3. async：标识是否异步
     4. user:用户名
     5. password：密码
  3. 调用send方法发送请求，send方法接收的参数是请求的body，如果是get请求，参数拼在URL后面，值为null，post则为参数内容
  4. 请求状态发生变化时触发onreadystatechange事件来做处理
  5. 拿到数据之后反映在页面上
   
### 手动封装AJAX

简版

```
  const request = new XMLHttpRequest()
  request.onreadystatechange = function(e){
      if(request.readyState === 4){ // 整个请求过程完毕
          if(request.status >= 200 && request.status <= 300){
              console.log(request.responseText) // 服务端返回的结果
          }else if(request.status >=400){
              console.log("错误信息：" + request.status)
          }
      }
  }
  request.open('POST','http://xxxx')
  request.send()
```

较为完整的版本
```
//封装一个ajax请求
function ajax(options) {
    //创建XMLHttpRequest对象
    const xhr = new XMLHttpRequest()


    //初始化参数的内容
    options = options || {}
    options.type = (options.type || 'GET').toUpperCase()
    options.dataType = options.dataType || 'json'
    const params = options.data

    //发送请求
    if (options.type === 'GET') {
        xhr.open('GET', options.url + '?' + params, true)
        xhr.send(null)
    } else if (options.type === 'POST') {
        xhr.open('POST', options.url, true)
        xhr.send(params)

    //接收请求
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            let status = xhr.status
            if (status >= 200 && status < 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML)
            } else {
                options.fail && options.fail(status)
            }
        }
    }
}
```

### 参考文档
- [Ajax原理一篇就够了](https://juejin.cn/post/6844903618764603399)
- [XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)
