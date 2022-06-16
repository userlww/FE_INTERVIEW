浏览器中的事件，指的是用户和网页之间发生的一种交互操作，使得网页具备和人互动的能力，常见的事件包括加载事件，鼠标事件，自定义事件等，


### 事件流
由于DOM是一个树形结构，事件会经历三个阶段
- 事件捕获阶段
- 处于目标阶段
- 事件冒泡阶段

![事件模型](./../images/event.png)
如图所示，捕获指的是从文档根节点Document一直传递到目标元素的过程，冒泡阶段则是由下往上传播，从目标元素一直传递到DOM最高级的根节点。

### 事件模型

事件模型分为3种
- 原始事件模型(DOM0级)
- 标准事件模型(DOM2级)
- IE事件模型(虽然IE浏览器已经彻底退出了历史舞台，这里我们还是简单提一下，避免面试的时候被问到)

#### 原始事件模型
原始事件模型有两种绑定方式

```
//HTML中直接绑定

<input type="button" onclick="fun()">

//通过JavaScript脚本绑定

var btn = document.getElementById('.btn');
btn.onclick = fun;

```
原始事件模型有几个特点

- 绑定速度快
  但是有一个问题是有可能事件已经绑定好了，但是JavaScript还没加载完，导致事件回调无法触发
- 只支持冒泡，不支持捕获
- 同一个事件只能绑定一次

解绑方式

```
btn.onclick = null;

```

#### 标准事件模型

  标准事件模型会完整的经历捕获、处于目标、冒泡三个阶段，会分别检查所在的节点是否绑定了事件监听函数，如果有则会执行。
  ```
  绑定方式
  addEventListener(eventType, handler, useCapture)

  解绑方式
  removeEventListener(eventType, handler, useCapture)

  ```
绑定和解绑各自接收三个参数
- eventType 指定事件类型
- handler 是事件处理函数
- useCapture 是一个boolean用于指定是否在捕获阶段进行处理，一般设置为false与IE浏览器保持一致

标准事件模型的几个特性

- 可以绑定多个事件处理函数，不会互相冲突
- 当第三个参数(useCapture)设置为true就在捕获过程中执行，反之在冒泡过程中执行处理函数
  

#### IE事件模型

IE事件模型有两个过程，处于目标过程和冒泡

```
//绑定
attachEvent(eventType, handler)

//解绑
detachEvent(eventType, handler)

```


### 事件委托(事件代理)
假设有以下两种场景
1. 假设我们有一个长列表，我们要给列表中的每一项都添加一个点击事件，如果绑定n次的话显然是很麻烦的，
2. 我们的列表不长，但是列表元素会经常增加和删除，如果每次新增节点都去给它绑一次事件的话，显然也是非常麻烦

以上这两个场景，我们通过用事件委托来解决

事件委托是指在以上场景中，我们可以将事件绑定在列表的容器上，当事件触发时，子元素也会有响应，可以判断当前元素是子节点时进行对应的事件处理

```
//DOM结构

<input type="button" name="" id="btn" value="添加" />
<ul id="ul1">
    <li>item 1</li>
    <li>item 2</li>
    <li>item 3</li>
    <li>item 4</li>
</ul>

//JavaScript代码
const oBtn = document.getElementById("btn");
const oUl = document.getElementById("ul1");
const num = 4;

//事件委托，添加的子元素也有事件
oUl.onclick = function (ev) {
    ev = ev || window.event;
    const target = ev.target || ev.srcElement;
    if (target.nodeName.toLowerCase() == 'li') {
        console.log('the content is: ', target.innerHTML);
    }

};

//添加新节点
oBtn.onclick = function () {
    num++;
    const oLi = document.createElement('li');
    oLi.innerHTML = `item ${num}`;
    oUl.appendChild(oLi);
};

```

使用事件委托可以帮我们解决很多问题，节省很多工作量

### 参考文档

- [什么是事件代理？应用场景](https://github.com/febobo/web-interview/issues/66)
- [JavaScript事件模型](https://github.com/febobo/web-interview/issues/64)
