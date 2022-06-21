
简单总结一下CSS中的水平与垂直居中的解决方案，分为内联和块状元素的居中,比较基础的题目，简单的总结。
### 内联元素的居中
#### 水平居中
   
 - 为容器设置text-align:center
 
```
<div class="text1">
<span>使用text-align水平居中</span>
</div>
```
　对应的样式
```
.text1 {
  text-align: center;
  background-color:red;
  font-size: 3rem;
  color: white;
}
```
- flex设置居中
  　为容器设置display:flex; justify-content:center
```  
<div class="text2">
     <span>使用flex设置居中</span>
</div> 
```
　　样式
```
　.text2 {
    display: flex;
    font-size: 3rem;
    justify-content: center;
    background: yellow;
    color: #000c17;
　}
```

### 垂直居中
如果是单行文本的话，可以让其父元素的高度等于其line-height，即可实现单行文本的垂直居
```
　<div class="text3">
    <span>使用line—height垂直居中</span>
  </div>
```
　　样式
```
.text3 {
  height:500px;
  text-align: center;
  line-height: 500px;
  background-color: green;
}
.text3 span {
  color: white;
  font-size: 3rem;
}
```      

如果是多行文本,则可以借助表格的一些属性实现垂直居中，给父元素设置display:table,子元素设置display：table-cell;vertical-align：middle，可以实现多行文本的垂直居中，有一个需要注意的地方是，表格的宽度是会根据内容的宽度自动拉伸的，所以若要实现和div一样的宽度适应屏幕宽度的话需要给父元素设置width：100%

```
<div class="text4">
    <span>
        Lorem ipsum dolor sit amet,consectetur adipisicing elit. Atque aut culpa, dignissimos eligendi est<br>
        hic impedit, inventore, laudantium nobis praesentium quaerat quasi rem sapiente sequi similique <br>
        teneturvel voluptate voluptates!*100
    </span>
</div>
```
样式

```
.text4 {
        　　background: #2db7f5;
            height: 400px;
            display: table;
            font-size:1rem;
            width: 100%;
            text-align: center;
        }
 .text4 span {
            display: table-cell;
            vertical-align: middle;
            color: white;
            font-size: 1rem;
        }
```
### 块状元素居中
#### 水平居中

 - 定宽块状元素居中
 　定宽块状元素水平居中只需设置左右margin 为auto即可
```
<div class="container">
    <div class="block1"></div>
</div>
```

　　样式
```
        .block1 {
            width: 200px;
            height: 200px;
            background: yellow;
            margin:  auto;
        }
```

 - 不定宽块状元素居中
　　使用flex布局，设置父元素justify-content:center;display:flex
```
<div class="block2">
    <div class="blockChild">
        观世音菩萨，行深般若波罗蜜多时，照见五蕴皆空，度一切苦厄<br>
        舍利子，色不异空，空不异色，色即是空，空即是色，受想行识，亦复如是<br>
        舍利子，是诸法空相，不生不灭。不垢不净，不增不减，是故空中无色，无受想行识，无眼界
        <br>
    </div>
</div>
```
样式
```
 .block2 {
            display: flex;
            height: 500px;
            background-color: #e3d2d2;
            justify-content: center;
            align-items: center;
        }
        .blockChild {
            height: 300px;
            background-color: #d06b64;
        }
```
#### 垂直居中

 - 绝对定位的方法居中,使用负外边距实现


```
<div>
    <div class="block3"></div>
</div>
```
　　样式


```
.block3 {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -100px;
            margin-left: -100px;
            width: 100px;
            height: 100px;
            background-color: green;

        }
```
 - 使用绝对定位实现
```
<div class="block4"></div>
```
　　样式

```
.block4 {
            position: absolute;
            top:0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            width: 200px;
            height: 200px;
            background-color: orange;
        }
```

 - 使用CSS3的transform属性

```
<div class="block5"></div>
```

样式

```
        .block5 {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 300px;
            height: 300px;
            background-color: navy;

        }

```
 - 使用伪元素来实现居中

``` 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style type="text/css">
        .box {
            width: 300px;
            height:300px;
            border: 1px solid #ccc;
            text-align: center;
        }
        .content {
            width: 200px;
            height: 200px;
            background-color: orange;
            display: inline-block;
            vertical-align: middle;
        }
        .box:after {
            content: '';
            display: inline-block;
            width: 0;
            height: 100%;
            vertical-align: middle;
        }
    </style>
</head>
<body>
<div class='box'>
    <div class='content'>
    </div>
</div>
</body>
</html>
```
