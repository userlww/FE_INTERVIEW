在JavaScript中，原型链是最主要的继承方式，通过原型链继承多个引用类型的属性和方法，在讲继承之前我们先回顾一下构造函数、对象实例和原型对象之间的关系:

- 每一个构造函数都有一个原型对象
- 原型对象有一个属性指回构造函数
- 实例有一个内部指针指向原型

### 原型链继承

#### 原型链继承的实现

那么，如果原型是另一个类型的实力的话，就意味着原型本身有一个内部指针指向了另一个原型，另一个原型也有一个指针指向另一个构造函数。这样实例和原型之间构造了一条原型链。，程序实现

```javascript
function SupertType () {
  this.property = true;
}

SupertType.prototype.getSuperValue = function () {
  return this.property;
};

function SubType () {
  this.subproperty = false;
}

SubType.prototype = new SupertType();

SubType.prototype.getSubValue = function () {
  return this.subproperty;
};

const instance = new SubType();
console.log(instance.getSuperValue()); // true

```

在这个实例中，我们将subType的原型对象赋值为SuperType的一个实例，借用这种方式实现了subType对SuperType的继承，父类型SuperType的所有方法和属性在子类型SubType中都可以访问和使用，下面这张图说明了对象实例，构造函数和原型之间的关系

![原型](/images/yuanxing.jpg)

#### 原型链继承的问题

原型链继承的主要问题在于，当SubType类型的原型对象，即SuperType对象的实例上存在引用类型的属性时，当我们修改某一个实例的对应属性，其他实例的该属性值也会被修改。

另一个问题是，子类型在实例化的时候不能给父类型的构造函数传参，也就是说子类型无法自定义继承自父类型的属性。

### 盗用构造函数

为了解决原型对象包含引用类型导致的属性继承问题，出现了一种盗用构造函数的的继承方式，它的优点在于可以在子类的构造函数向父类的构造函数传参，解决我们上文说到的原型引用类型属性的问题，实现方式如下

```javascript

function SuperType () {
  this.colors = ['red', 'blue', 'green'];
}

function SubType () {
  SuperType.call(this);
}

const instance1 = new SubType();
instance1.colors.push('black');
console.log(instance1.colors); // "red,blue,green,black"
const instance2 = new SubType();
console.log(instance2.colors); // "red,blue,green"
```

盗用构造函数的方式能够解决不能向父类构造函数传参的问题，可以在调用父类构造函数的时候传入参数

#### 盗用构造函数的缺点

盗用构造函数的主要缺点，也是使用构造函数模式自定义类型的问题：必须在构造函数中定义方法，因此函数不能重用。此外，子类也不能访问父类原型上定义的方法，因此所有类型只能使用构造函数模式。由于存在这些问题，盗用构造函数基本上也不能单独使用。


### 参考文献

- 《JavaScript高级程序设计第四版》
