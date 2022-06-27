#### 什么是DOM

以下是摘自MDN的对DOM的定义

*文档对象模型 (DOM) 是 HTML 和 XML 文档的编程接口。它提供了对文档的结构化的表述，并定义了一种方式可以使从程序中对该结构进行访问，从而改变文档的结构，样式和内容。DOM 将文档解析为一个由节点和对象（包含属性和方法的对象）组成的结构集合。简言之，它会将 web 页面和脚本或程序语言连接起来。*

DOM是独立于JavaScript的，它并不是JavaScript语言的一部分。它被设计成与特定的浏览器脚本语言相独立，使得文档的结构化表述可以通过单一、一致的API获取到，虽然实际开发中我们都会用到JavaScript，但事实上DOM操作也可以借助其他语言，比如Python(以下示例引用自MDN)

```
# Python DOM example
import xml.dom.minidom as m

doc = m.parse("C:\\Projects\\Py\\chap1.xml");

doc.nodeName # DOM property of document object;

p_list = doc.getElementsByTagName("para");

```

### DOM API

浏览器提供给JavaScript一个对象document来获取和操作DOM，我们常用到的API有以下几种

- document.getElementById(id)   //通过id属性值获取DOM节点
- document.getElementsByTagName(name) //通过标签名获取DOM节点
- document.createElement(name)  //创建节点
- parentNode.appendChild(node)  //将节点插入到父节点最后
- element.innerHTML //设置元素内的HTML结构
- element.style.left   //设置元素样式
- element.setAttribute()  //设置元素熟悉
- element.getAttribute()  //获取属性值
- element.addEventListener()  //添加事件监听

### 什么是BOM

BOM指的是浏览器对象模型，它是浏览器环境下使用JavaScript开发的极为重要的一部分，BOM提供了很多对象和api来提供了脚本语言帮助其访问浏览器的功能，这些功能与具体的网页内容无关，它们提供了与浏览器的互操作性。

### BOM API

- 全局对象window，window是BOM的核心对象，它是浏览器的一个实例，既是通过JavaScript访问浏览器的一个接口，又是ES5规定的全局对象,以下列举一些常用BOM操作API

- console对象，是用于调试和在控制输出的方法的合集
- location对象，当前浏览器窗口加载的文档的有关信息，有一些常见的属性和方法
  - location.href:完整了URL，可以手动修改
  - location.orgin: ：域名标准形式。包含协议、域名、端口号。
  - location.protocol：当前URL的协议，包括冒号（:）。
  - location.host：域名，包含:后面的端口号。
  - location.hostname：域名，不包括端口号。
  - location.port：端口号
  - location.reload():方法，重载页面
  - location.toString():方法,返回整个URL字符串
  
  ...

- navigator：用于获取当前浏览器信息，常用的属性有
  - userAgent： 浏览器UA
  - appCodeName： 浏览器代号
  - onLine：是否联网
  
  ...

- sereen对象：获取当前屏幕信息，常用属性比如width和height，用于获取浏览器宽高

- window.innerHeight：窗口的视图可见高度（单位：像素），也包括滚动条高度
- window.innerWidth：窗口的视图可见宽度（单位：像素），也包括滚动条的宽度
- window.scrollX：页面水平方向滚动距离（单位：像素），window.pageXOffset是别名。
- window.scrollY：页面垂直方向已滚动距离（单位：像素），window.pageYOffset是别名。

...

BOM提供了各种的访问和操作BOM的API，这里只列举了一小部分，具体可以参考MDN上的说明。
### 参考文档

- [DOM概述](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Introduction)

- [快速了解JavaScript的BOM模型](https://zhuanlan.zhihu.com/p/344683823)
