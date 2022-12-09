### 选择器优先级

| 选择器 | 格式 | 优先级权重 |
| ----  | --- | -------  |
| ID选择器| #id | 100 |
| 类选择器|.classname|10|
|属性选择器|a[ref="aaaa"]|10|
|伪类选择器|li:last-child|10|
|标签选择器|div|1|
|伪元素选择器|li:after|1|
|相邻兄弟选择器| h1 + p|0|
|子选择器|ul>li|0|
|后代选择器| li a|0|
|通配符选择器|*|0|

有几点需要注意

- !important声明的样式优先级最高
- 如果权重相同，最后出现的样式生效
- 继承得到的样式优先级最低
- 样式表来源不同时，优先级如下： 内联样式 > 内部样式 > 外部样式 > 浏览器用户自定义样式 > 浏览器默认样式 

### css样式继承

#### 有继承性的属性

1. font-family 字体系列
2. font-weight 字体粗细
3. font-size 字体大小
4. font-style 字体风格
5. text-indent 文本缩进
6. text-aligin 文本水平对齐方式
7. line-height 行高
8. word-spacing: 单词之间的间距
9. letter-spacing: 中文或者字母之间的间距
10. text-transform:控制文本大小写
11. color:文本颜色
12. visibility:控制元素显示和隐藏
13. list-style:列表风格
14. cursor:光标显示形态

### 隐藏元素的几种方法

1. display:none，不会渲染该元素，因此页面中没有节点，事件也不会响应
2. visibility:hidden，元素在页面中占据空间，但是不会响应绑定的事件
3. position:absolute，通过绝对定位将元素移出可视区域
4. z-index设为负值，让其被其他元素遮挡
5. clip/clip-path ：使用元素裁剪的方法来实现元素的隐藏，这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。
6. transform: scale(0,0)：将元素缩放为 0，来实现元素的隐藏

### @import和link标签的区别

1. link是XHTML标签，除了加载CSS之外，还可以定义RSS等其他事务@import只能加载CSS
2. link引用CSS时，在页面载入时同事加载，@import需要网页完全载入之后加载
3. link是XHTML标签，不存在兼容问题，@import是CSS2.1提出的，低版本浏览器不支持
4. link支持使用Javascript控制DOM去改变样式；而@import不支持。
