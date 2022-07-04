Promise是ES6提供的一种异步编程的解决方案，相比较传统的callback的方式，Promise的程序逻辑更加清晰，对开发者更友好，避免陷入“回调地狱”，下面我们通过一个例子来对比一下传统写法和使用Promise写法的不同。

```
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('得到最终结果: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```
以上就是一种很常见的回调地狱，下面我们使用Promise对其进行改造

```
doSomething().then(function(result) {
  return doSomethingElse(result);
})
.then(function(newResult) {
  return doThirdThing(newResult);
})
.then(function(finalResult) {
  console.log('得到最终结果: ' + finalResult);
})
.catch(failureCallback);

```
显然提升了可读性，并且编码的难度也有所降低。

### Promise介绍


笔者个人的理解，Promise是一个包装着异步操作的容器，它只有3种状态，pendding、fulfilled和rejected，Promise的状态一旦发生变化，就不会再改变，只有内部包装着的异步操作的结果会决定它处于哪一种状态。Promise一旦创建就会立即执行，无法取消，下图是一个Promise执行过程的介绍

![Promise](./../images/Promise.png)

### Promise使用

Promise是一个构造函数，用来创建Promise实例
```
const promise = new Promise(function(resolve, reject) {});

```
#### Promise方法

- then 是Promise实例状态从pendding变为fulfilled时的回调函数
- catch 是Promise实例状态从pendding变为rejected时的回调函数
- finally 用于指定不管 Promise 对象最后状态如何，都会执行的操作

#### 构造函数方法

##### Promise.all()
用于将多个Promise封装成一个Promise，当所有的Promise都resolve之后，这个Promise才会resolve，如果有一个reject了，那么这个Promise就会reject。

##### Promise.race()
用于将多个Promise封装成一个Promise，只要有一个Promise resolve之后，这个Promise就会resolve，如果有一个reject了，那么这个Promise就会reject。

##### resolve

将现有对象转为 Promise 对象,状态为resolved

```
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

##### reject

将现有对象转为 Promise 对象,状态为rejected

```
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了
```

### 参考文献

- [面试官：你是怎么理解ES6中 Promise的？使用场景？ #40](https://github.com/febobo/web-interview/issues/40)
