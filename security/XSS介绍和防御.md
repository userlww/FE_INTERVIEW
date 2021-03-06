在现代的web开发中，安全性越来越被人们重视，对于web应用的攻击方式有很多种，今天简单介绍一下其中较为常见的一种攻击方式:XSS

### 定义

以下来自百度百科的定义：

  *“XSS是跨站脚本攻击(Cross Site Scripting)，为不和层叠样式表(Cascading Style Sheets, CSS)的缩写混淆，故将跨站脚本攻击缩写为XSS。恶意攻击者往Web页面里插入恶意Script代码，当用户浏览该页之时，嵌入其中Web里面的Script代码会被执行，从而达到恶意攻击用户的目的。”*

举一个简单的例子，我们有一个提供给用户留言的页面，然后我们将用户输入的内容保存到数据库，下次用户访问的时候回显用户此前填写的内容，如果用户在输入框中输入了一段script标签包裹着的JavaScript脚本，比如下面这样一段输入的内容

```
<script>alert(“hello XSS”)</script>

```

如果我们没有经过任何处理，直接将这段输入的脚本回显到页面上的话，那我们的页面上将会是这样的结构

```
<html>
    <head>
       <title>输入内容</title>
    </head>
<body>
<div id=”content” 
<script>alert(“hello XSS”)</script>
</div>     
    </body>
</html>
```

那么浏览器解析到这段脚本的时候就会执行它，会在页面上出现一个alert弹窗，这就是最简单的XSS共计的方式

### XSS攻击的危害

举两个例子来说明XSS攻击的危害

#### 窃取网页cookie

注入的脚本中通过document.cookie获取网页cookie，并将cookie发送给第三方网站

#### 流量劫持恶意跳转

比如我在页面中注入这样一段脚本

```
<script>window.location.href="http://www.baidu.com";</script>

```
这样相当于将目标网页的访问全部重定向到了第三方页面，实现了流量劫持

### 如何预防XSS

常见的防御XSS攻击的方式有以下几种
- 对可能存在注入的标签比如\<script>、\<img>、\<a>等进行过滤
- 转码，将构成注入标签的尖括号或者引号进行转义，避免发送注入
- 限制输入长度，因为注入一般需要输入较长的字符串，因此限制输入长度也可以一定程度上降低被攻击的可能

### 写在最后
这篇文档中只是简单介绍了XSS的攻击原理和方式，具体实施攻击的时候构建的语句和攻击的手段和目的更复杂更多样，有兴趣的可以深入了解。
