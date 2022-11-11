上篇讲了原型链继承和盗用构造函数继承，今天这篇继续讲其他几种JavaScript继承的实现

### 组合式继承

组合式继承将原型链和盗用构造函数结合在一起，将二者的优点结合了起来，实现思路是通过原型链继承原型上的属性和方法，通过盗用构造函数继承实例属性，这样既能共享原型上的实例方法，又能给父类的构造函数传参，具体实现如下：

```JavaScript
function SuperType (name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

SuperType.prototype.sayName = function () {
  console.log(this.name);
};

function SubType (age, name) {
  this.age = age;
  SuperType.call(this, name);
}

SubType.prototype = new SuperType();

SubType.prototype.sayAge = function () {
  console.log(this.name);
};

const instance1 = new SubType('Nicholas', 29);
instance1.colors.push('black');
console.log(instance1.colors); // "red,blue,green,black"
instance1.sayName(); // "Nicholas";
instance1.sayAge(); // 29
const instance2 = new SubType('Greg', 27);
console.log(instance2.colors); // "red,blue,green"
instance2.sayName(); // "Greg";
instance2.sayAge(); // 27
```

在这个例子中，子类型SubType可以传参给父类的构造函数，又可以继承原型上的方法实例，兼具了原型链和盗用构造函数模式的优点。

### Class

Class是ES6新出的语法糖，它的实现的本质也是基于原型链和构造函数，Class实现继承的实现如下：

```js
class Vehicle { 
 constructor(licensePlate) { 
 this.licensePlate = licensePlate; 
 } 
} 
class Bus extends Vehicle { 
 constructor(licensePlate) { 
 super(licensePlate); 
 } 
} 
console.log(new Bus('1337H4X')); // Bus { licensePlate: '1337H4X' }
```
在类中，调用super()实现继承，super()的行为如同调用构造函数，如果需要给父类构造函数传参，则需要手动传入，类的继承的实现类似于我们上面讲到的组合式继承

### 参考

- 《JavaScript高级程序设计》 第四版
