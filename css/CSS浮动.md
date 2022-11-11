float属性指定一个元素应沿其容器的左侧或右侧放置，允许文本和内联元素环绕它。该元素从网页的正常流动（文档流）中移除，尽管仍然保持部分的流动性

#### 浮动元素是如何定位的

当一个元素浮动之后，它会被移除正常的文档流，然后向左或者向右平移，一直平移知道碰到了所在的容器的边框，或者碰到另一个浮动的元素浮动元素。


### 清除浮动

由于浮动元素脱离文档流，因此父元素的高度支撑不起来，因此如果需要让父元素容器能够包住浮动元素，则需要清除浮动

#### 使用父元素添加伪元素来实现


DOM结构
```HTML
  <div class="container">
    <div class="item clearfix">
      <div class="content">孤鸿寡鹄个好好干活干活干活干活孤鸿寡鹄</div>
      <div class="time">2022-09-20</div>
    </div>
    <div class="item clearfix">
      <div class="content">孤鸿寡鹄个好开机即可尽快尽快好干活干活干活干活孤鸿寡鹄</div>
      <div class="time">2022-09-20</div>
    </div>
    <div class="item clearfix">
      <div class="content">孤鸿寡鹄个好好干活干活干活干活孤鸿寡鹄</div>
      <div class="time">2022-09-20</div>
    </div>
  </div>
```

CSS

```CSS
  .item {
    background: #DCDCDC;
    margin-bottom: 10px;
  }
  .content {
    display: inline;
  }
  .time {
    float: right;
  }
  .clearfix::after {
    content: '';
    display: block;
    clear: both;
  }
```

#### overflow:hidden

通过给父元素添加overflow:hidden来清除浮动。
