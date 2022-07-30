this关键字是函数运行是自动生成的一个内部对象，只能在函数内部使用，总是指向调用它的对象，this一旦确定，就不可更改。有以下几种绑定方式
#### 默认绑定

全局定义一个函数，在其内使用this关键字


```
const name = 'Maxwell';
function person() {
  retuen this.name;
}

console.log(person()) //Maxwell
```

结果输出Maxwell，原因是调用函数的对象在浏览器中是window，因此this指向window，所以输出Maxwell

注意：

**严格模式下，不能将全局对象用于默认绑定，this会绑定到undefined，只有函数运行在非严格模式下，默认绑定才能绑定到全局对象**

#### 隐式绑定

函数同时也可以作为某一个对象的方法进行调用，这是this指向上级对象

```
function sayName() {
  console.log(this.name)
}

const obj = {};
obj.name = 'Maxwell';
obj.sayName = sayName;
obj.sayName()  //Maxwell
```
如果函数有多层嵌套的话，即便是被最外层调用，this也只是指向上层对象

```
var o = {
    a:10,
    b:{
        fn:function(){
            console.log(this.a); //undefined
        }
    }
}
o.b.fn();
```
b对象没有a这个属性，所以输出undefined。

一种特殊情况

```
var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a); //undefined
            console.log(this); //window
        }
    }
}
var j = o.b.fn;
j();
```

this永远指向最后调用它的对象，所以结果是window。

#### new 绑定

```
function test() {
　this.x = 1;
}

var obj = new test();
obj.x // 1
```

//上面例子中this指向创建的实例对象


#### 箭头函数

箭头函数的this在编译时就已经确定了,下面这个例题中，输出的两个结果都是10，这两次调用this都是执行window。

```
var a = 10
var obj = {
  a: 20,
  say: () => {
    console.log(this.a)
  }
}
obj.say() 
var anotherObj = { a:30 }
obj.say.apply(anotherObj)
```
