本文介绍下JavaScript创建对象的几种方式

### 工厂模式

工厂模式是一种常见的设计模式，用于抽象创建特定对象，下面是一个例子

```JavaScript
function creatPerson (name, age, job) {
  const obj = new Object();
  obj.name = name;
  obj.age = age;
  obj.job = job;
  obj.sayName = function () {
    console.log(this.name);
  };
  return obj;
}

const person1 = creatPerson('Maxwell', 26, 'FE');
const person2 = creatPerson('Maxwell1', 26, 'writer');

person1.sayName(); // Maxwell
person2.sayName(); // Maxwell1

```

在这个例子中 createPerson函数就是一个工厂，它接收3个参数，我们可以传入不同的参数多次调用这个方法，每次都会返回一个包含3个属性和一个方法的对象，这种工厂模式可以解决创建多个类似对象的问题，但是问题在于我们无法知道新创建的对象是什么类型。

### 构造函数模式

在JavaScript中，构造函数用于创建特定类型的对象，有一些原生的构造函数比如Object和Array，运行时可以直接在执行环境中去使用，当然我们也可以自定义构造函数，以函数的形式为对象定义属性和方法，示例如下
```javascript
function Person (name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    console.log(this.name);
  };
}

let person1 = new Person("Nicholas", 29, "Software Engineer"); 
let person2 = new Person("Greg", 27, "Doctor"); 
person1.sayName(); // Nicholas 
person2.sayName(); // Greg
```

在这个例子中，我们使用Person构造函数代替了createPerson工厂函数，在代码实现上只有以下几个区别

- 没有显示创建对象
- 属性和方法直接赋值给this
- 没有return 

使用构造函数去创建一个对象要通过使用new运算符，使用new运算符创建对象时做了以下几件事情

1. 在内存中创建一个新对象
2. 对象的[[Prototype]]特性被赋值为构造函数的prototype属性
3. this指向新对象
4. 执行构造函数的代码
5. 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。

在示例代码中，创建的两个实例都一个constructor属性，指向它们的构造函数Person，这样就可以解决标识对象的问题，但是构造函数模式他也有自己的缺点，就是构造函数中定义的方法属性会在每个对象实例上创建一遍，事实上绝大多数情况这并不是有必要的，所以我们可以用原型模式来解决这个问题

#### 原型模式

每个函数都会创建一个prototype属性，它的值是一个对象，包含由特定引用类型实例共享的属性和方法，我们可以通过给原型对象添加属性的方式将公共的方法和属性添加到原型链上，这样所有的对象实例就可以共享公共的对象属性和方法，而不需要创建多个Function实例，举例如下：

```js
function Person() {} 
Person.prototype.name = "Nicholas"; 
Person.prototype.age = 29; 
Person.prototype.job = "Software Engineer"; 
Person.prototype.sayName = function() { 
  console.log(this.name); 
}; 
let person1 = new Person(); 
person1.sayName(); // "Nicholas" 
let person2 = new Person(); 
person2.sayName(); // "Nicholas" 
console.log(person1.sayName == person2.sayName); // true

```

关于原型和原型链还有很多知识，这篇主要讲创建对象的几种方式，关于原型链后面的文章中再进行详解。

### 参考

- 《JavaScript高级程序设计第四版》
