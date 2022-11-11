Flex布局意为“弹性布局”，用来为盒模型提供最大的灵活性，设为Flex布局之后，子元素的float、clear和vertical-aligin属性将失效。

当容器设置为Flex布局，会存在两根轴，水平方向的主轴和垂直的交叉轴，子元素默认沿主轴进行排列。

### 容器属性

#### flex-direction

flex-direction决定主轴的方向，也就是子元素的排列方向，有四个值可以设置

- row：水平方向为主轴，左边为起点
- row-reverse:水平方向为主轴，右侧为起点
- column: 主轴为垂直方向，起点在上沿
- column-reverse: 主轴为垂直方向，起点在下沿
![flex](./../images/flex.png)

#### justify-content
定义子元素在主轴上的对齐方式，有5种取值

- flex-start（默认值）：左对齐
- flex-end：右对齐
- center： 居中
- space-between：两端对齐，项目之间的间隔都相等。
- space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

#### align-items

align-items定义项目在交叉轴上的对齐方式，有5种取值

- flex-start：交叉轴的起点对齐。
- flex-end：交叉轴的终点对齐。
- center：交叉轴的中点对齐。
- baseline: 项目的第一行文字的基线对齐。
- stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

我们可以利用aligin-items:center来作为垂直居中的一种解决方案

以上3个属性是我们用flex布局时定义在容器上最常用的几个属性，除了这几个属性之外还有几个属性也可以定义在容器上：
- flex-wrap: 用来定义在主轴上师范可以换行
- flex-flow: flex-direction和flex-wrap的简写形式
- align-content: 定义多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。


### 元素属性

#### order
定义元素的排列顺序，数值越小，排列越靠前，默认值为0

#### flex-grow

定义元素的放大比例，默认为0

#### flex-shrink

定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

####  flex-basis

定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

#### align-self

允许单个元素有跟其他元素不一样的对齐方式，可以覆盖容器的aligin-items属性，默认值为auto，表示继承父元素的aligin-items属性。

### 参考文档
- [Flex布局教程：语法篇]
