众所周知async/await是generator函数的语法糖，所以在说async/await之前，先简单介绍下generator函数，

#### generator函数

generator函数是协程在ES6的实现，整个generator函数就是一个封装的异步任务，异步操作需要暂停，都用yield语句注明，generator函数的执行方法如下:

```JavaScript
function* gen(x) {
  console.log('start')
  const y =  x * 2
  return y
}

const g = gen(1)
g.next()   // start { value: 2, done: false }
g.next(4)  // { value: 4, done: true }
```
- gen()​ 不会立即执行，而是一上来就暂停，返回一个 ​Iterator ​对象（具体可以参考 Iterator遍历器）
- 每次​ g.next() ​都会打破暂停状态去执行，直到遇到下一个​ yield ​或者 ​return​
遇到​ yield ​时，会执行 ​yeild​ 后面的表达式，并返回执行之后的值，然后再次进入暂停状态，此时​ done: false​。
​- next​ 函数可以接受参数，作为上个阶段异步任务的返回结果，被函数体内的变量接收
- 遇到​ return ​时，会返回值，执行结束，即 ​done: true​
- 每次​ g.next() ​的返回值永远都是 ​{value: ... , done: ...} ​的形式

#### 借助generator函数实现async/await

实现的思路是这样的，
 - myAwait方法接收一个generator函数，先调用一个这个generator函数得到迭代器
 - 返回一个promise，然后调用一个递归函数，函数内部执行迭代器next方法
 - next方法返回done和value，如果done为true表示generator函数执行结束，执行resolve
 - 则返回一个fulfilled状态的promise进行下一次递归

```JavaScript
function* generator() {
  let result = yield afunc();
  console.log(result);
  let other = yield bfunc();
  console.log(other);
}
myAwait(generator);

function myAwait(genner, ...args) {
  let iter = genner(...args); //得到生成器的迭代器
  return new Promise((resolve, reject) => {
      let result; //iter每次暂停时的结果
      //! inner就是在手动迭代iter
      let inner = function (yield) {
          result = iter.next(yield); //开始迭代 将这里的yield当作yield传入生成器
          if (result.done) {
              //迭代结束：
              resolve(result.value); //Promise结束
          } else {
              //如果没有结束 等到promise的结束继续递归
              return Promise.resolve(result.value).then((fulfilled) => {
                  inner(fulfilled);
              });
          }
      };
      inner(); //迭代器第一次不应该传入参数
  });
}

```

### 参考文档

- [async、await 实现原理](https://zhuanlan.zhihu.com/p/115112361)
