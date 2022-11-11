这是一道常见的CSS布局的面试题，下面介绍下实现这个布局的几个简单的方法

### flex布局

flex毫无疑问是现代CSS布局的一个利器，使用flex能够比较轻易的解决这个问题首先给容器设置display:flex，然后给左侧容器给定一个固定宽度，然后给右侧设置flex:1，让右侧部分填充剩余空间，即可实现左侧固定，右侧自适应的布局

```html
<div class="container">
    <div class="left">
      左侧部分
    </div>
    <div class="right">右侧部分</div>
</div>
```

```css
.container {
  width: 100%;
  height: 100%;
  display: flex;
}
.left {
  height: 100%;
  width: 400px;
  background: red;
}
.right {
  flex: 1;
  background: skyblue;
}
```

### 浮动+overflow:hidden

我们可以使用浮动让左侧部分脱离文档流，然后右侧使用overflow:hidden使其创建BFC，与浮动元素产生边界，以占满右侧的剩余空间

```css
.left {
  height: 100%;
  width: 400px;
  background: red;
  float: left;
}
.right {
  background: skyblue;
  height: 100%;
  overflow: hidden;
}
```

### 浮动+margin-left/padding-left

左侧浮动脱离文档流，右侧使用一个margin-left或者padding-left来腾出来左侧固定部分的位置

```css
.container {
  width: 100%;
  height: 100%;
}
.left {
  height: 100%;
  width: 400px;
  background: red;
  float: left;
}
.right {
  background: skyblue;
  height: 100%;
  /* overflow: hidden; */
  margin-left: 400px;  //或者padding-left
}
```

### 定位absolute

```css
.left {
  height: 100%;
  width: 400px;
  background: red;
  position: absolute;
}
.right {
  background: skyblue;
  height: 100%;
  margin-left: 400px;
  /* overflow: hidden; */
}
```

### calc计算宽度

使用calc来计算右侧剩余的空间

```css
.left {
  height: 100%;
  width: 400px;
  background: red;
  float: left;
}
.right {
  background: skyblue;
  height: 100%;
  /* overflow: hidden; */
  width: calc(100% - 400px);
  float: left;
}
```
