
续前篇数组常用方法中篇[JavaScript数组常用方法(中)](./JavaScript数组常用方法(中).md)

#### reduce

对数组中的每个元素执行一个reducer 函数（升序执行），将其结果汇总为单个返回值
举例，我们写一个方法返回数组元素的总和

```
const list = [1,2,3,4,5,6,7,8,9];
const sum = list.reduce((pre,cur)=>{
  return pre + cur
})  // 45
```
reduce方法第二个参数可以指定初始值，

```
const list = [1,2,3,4,5,6,7,8,9];
const sum = list.reduce((pre,cur)=>{
  return pre + cur
},10)  // 55
```

#### reverse()

将数组中元素的位置颠倒，并返回该数组。该方法会改变原数组

```

const list = [1,2,3,4,5,6,7,8,9];
list.reverse(); //[9, 8, 7, 6, 5, 4, 3, 2, 1]

```


#### Array.prototype.some()

测试数组中是不是至少有一个元素通过了被提供的函数测试

```
const list = [1,2,3,4,5,6,7,8,9];
list.some(item => item > 5)  //true
list.some(item => item > 9)  //false
```

#### Array.prototype.sort()

对数组元素进行原地排序并返回此数组

```

const list = [1,3,2,8,6,9]
list.sort((a,b)=> a-b) //[1, 2, 3, 6, 8, 9]

```

#### toString
返回一个字符串表示指定的数组及其元素。数组中的元素将使用各自的 Object.prototype.toString() 方法转成字符串

```
[1,2,3].toString()  //'1,2,3'
```


#### values
返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值

```
var a = ['w', 'y', 'k', 'o', 'p'];
var iterator = a.values();

console.log(iterator.next().value); // w
console.log(iterator.next().value); // y
console.log(iterator.next().value); // k
console.log(iterator.next().value); // o
console.log(iterator.next().value); // p
```

### 参考文档

-[MDN:Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
