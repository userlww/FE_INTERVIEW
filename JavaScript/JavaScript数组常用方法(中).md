续上篇[JavaScript常用数组方法(上)](./JavaScript%E5%B8%B8%E7%94%A8%E6%95%B0%E7%BB%84%E6%96%B9%E6%B3%95.md)

### 数组对象方法

#### Array.from

从类数组对象或者可迭代对象中创建一个新的数组实例

```

const arrSet = new Set([1,2,2,3])
Array.from(arrSet)  //[1,2,3]

```

#### Array.isArray

判断传入的参数是不是一个数组

```

Array.isArray(1)  // false
Array.isArray([]) // true

```

#### Array.of()

//根据一组参数来创建新的数组实例，支持任意的参数数量和类型

```
Array.of(1,[],'a',{}) // [1,[],'a',{}]
```

### 数组实例方法

#### at

at方法接收一个数字，返回对应位置的数组元素,不传或者传的参数不是数字返回第一项

```
const list = [1,2,3]
list.at(2)  // 3
list.at()  // 1
list.at(undefined) // 1
```

#### every

测试一个数组内的所有元素是否都能通过某个指定函数的测试。返回一个布尔值

```
const list = [1,2,3]
list.every(item => item === 2) //false
const list1 = [2,2,2]
list1.every(item => item === 2) //true
```

#### fill

用指定值填充数组所有位置的元素

```
const list = [1,2,3];
list.fill(1)  //[1,1,1]
```
