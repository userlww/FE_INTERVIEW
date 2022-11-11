整理一些常见的JavaScript手写题目

#### 防抖函数

```
function debounce (fn,delay,ctx) {
  let timer = null;
  return function() {
      clearTimeout(timer)
      timer = setTimeout(()=>{
        fn.apply(ctx || this,arguments)
      },delay)
    }
}

```

#### 节流函数

```
function throttle(fn,delay,ctx) {
  let timer = null
  return function() {
    if(timer) {
      return
    }
    timer = setTimeout(()=>{
      fn.apply(ctx || this,arguments)
    },delay)
  }
}

```

#### Promise

```
class MyPromise {
  constructor(fn){
    // 存储 reslove 回调函数列表
    this.callbacks = []
    const resolve = (value) => {
      this.data = value // 返回值给后面的 .then
      while(this.callbacks.length) {
        let cb = this.callbacks.shift()
        cb(value)
      }
    }
    fn(resolve)
  }
  then(onResolvedCallback) {
    return new MyPromise((resolve) => {
      this.callbacks.push(() => {
        const res = onResolvedCallback(this.data)
        if (res instanceof MyPromise) {
          res.then(resolve)
        } else {
          resolve(res)
        }
      })
    })
  }
}
// 这是测试案例
new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
}).then((res) => {
    console.log(res)
    return new MyPromise((resolve) => {
      setTimeout(() => {
        resolve(2)
      }, 1000)
    })
}).then(res =>{console.log(res)})

```
