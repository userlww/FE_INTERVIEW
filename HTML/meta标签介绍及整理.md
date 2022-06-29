meta标签提供关于HTML文档的元数据，不会显示在页面上，但对于机器是可读的,通常被用来描述页面的描述，作者，最后修改时间等其他元数据，meta标签定义在head标签之内，提供给浏览器、搜索引擎、或者其他web服务使用。

### meta标签的属性

#### content
   content包含http-equiv 或name 属性的值，具体取决于所使用的值。
#### charset
定义文档的字符编码，如果使用这个属性，那么值必须是与ASCII大小写无关的“utf-8”

#### http-equiv

http-equiv属性值定义了一个编译指示的指令，它的值是特定的HTTP头部的指令,例如

- content-type
如果使用这个属性，其值必须是"text/html; charset=utf-8"。注意：该属性只能用于MIME type 为text/html 的文档，不能用于 MIME类型为 XML 的文档。
- x-ua-compatible
  如果指定，则 content 属性必须具有值 "IE=edge"。用户代理必须忽略此指示。

#### name

name 和 content 属性可以一起使用，以名 - 值对的方式给文档提供元数据，其中 name 作为元数据的名称，content 作为元数据的值。

### 常见meta标签整理

#### charset
使用charset指定文档使用的字符编码

```
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
```

#### 百度禁止转码

```
<meta http-equiv="Cache-Control" content="no-siteapp" />

```

#### SEO优化相关

```
<!-- 页面标题<title>标签(head 头部必须) -->
<title>your title</title>
<!-- 页面关键词 keywords -->
<meta name="keywords" content="your keywords">
<!-- 页面描述内容 description -->
<meta name="description" content="your description">
<!-- 定义网页作者 author -->
<meta name="author" content="author,email address">
<!-- 定义网页搜索引擎索引方式，robotterms 是一组使用英文逗号「,」分割的值，通常有如下几种取值：none，noindex，nofollow，all，index和follow。 -->
<meta name="robots" content="index,follow">

```

#### viewport

```
<meta name="viewport" content="width=device-width, initial-scale=1.0">

```

content 参数：

  - width viewport 宽度(数值/device-width)
  - height viewport 高度(数值/device-height)
  - initial-scale 初始缩放比例
  - maximum-scale 最大缩放比例
  - minimum-scale 最小缩放比例
  - user-scalable 是否允许用户缩放(yes/no)

### 参考文献

- [meta标签的作用及整理](https://juejin.cn/post/6844904083296370702)
