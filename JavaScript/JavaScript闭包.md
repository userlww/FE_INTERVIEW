
这里引用MDN关于闭包的定义

*闭包（closure）是一个函数以及其捆绑的周边环境状态（lexical environment，词法环境）的引用的组合。换而言之，闭包让开发者可以从内部函数访问外部函数的作用域。在 JavaScript 中，闭包会随着函数的创建而被同时创建。*

笔者对这句话的理解：所有的函数都是闭包（不一定准确）
在JavaScript中，函数可以嵌套定义，内部函数可以访问外部函数中声明的局部变量，举例说明(实例来自MDN)
```
function init() {
  var name = "Mozilla"; // name 是一个被 init 创建的局部变量
  function displayName() { // displayName() 是内部函数，一个闭包
      alert(name); // 使用了父函数中声明的变量
  }
  displayName();
}
init();
```

在init函数中，displayName函数可以访问init函数的局部变量name。

在举一个狭义上大家所理解的闭包的例子(示例来自MDN)

```

function makeFunc() {
    var name = "Mozilla";
    function displayName() {
        alert(name);
    }
    return displayName;
}

var myFunc = makeFunc();
myFunc();

```

在一些其他的编程语言中，这种写法并不能正常运行，因为，外层函数一旦运行结束，局部变量name便不能再访问到，而在JavaScript中，displayName会形成闭包，myFunc保存的是displayName函数的实例，该实例保存了makeFunc函数的局部变量，因此执行myFunc时能正常访问name。

#### 闭包示例

再举一个例子(这个例子还是来自MDN)

```
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```
在add5函数中，保存了局部变量x的值为5，因此add5(2)值为7,add10函数中保存局部变量x值为10，所以add10(2)值为12。

#### 闭包常见面试题

举两个常见的闭包相关的面试题

```
var n = 10
function fn(){
    var n =20
    function f() {
       n++;
       console.log(n)
     }
    return f
}

var x = fn()
x() // 21

```
这一题比较简单，x调用时，保存了函数fn内的局部变量20，执行自增之后返回值为21

```
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();
data[1]();
data[2]()
```

这里的 i 是全局下的 i，共用一个作用域，当函数被执行的时候这时的 i=3，导致输出的结构都是3。



### 参考文档

- [闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)
- [JS 闭包经典使用场景和含闭包必刷题](https://juejin.cn/post/6937469222251560990)
