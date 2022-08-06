整理一下JavaScript常用的数组方法及使用方式,

#### push、pop

push方法在数组最后插入一项，pop从数组最后弹出一项，借助这两个方法可以利用数组实现栈的功能，push进栈，pop出栈
```
const list = [1,2,3];
console.log(list.push(4))  //4
console.log(list);  //[1,2,3,4]
console.log(list.pop());  // 4
console.log(list) //[1,2,3]
```

#### shift、unshift

shift方法从数组头部弹出第一个元素，unshift往数组头部插入一个元素

```
const list = [1,2,3]
list.shift();   // 1
console.log(list) //[2,3]
list.unshift(-1) /s/[-1,2,3]
```

#### indexOf,includes

indexOf方法返回目标值在数组中的下标，不存在则返回-1,includes方法返回数组是否包含目标值，返回值是一个布尔值

```
const list = [1,2,3];
list.indexOf(2)   //1
list.indexOf(4)   //-1
list.includes(2)  //true
list.includes(4)  //false
```

#### splice
从数组中指定位置删除若干元素，并可在该位置新增元素，第一个参数代表要删除元素的起始位置，第二个参数代表要删除的元素的个数，后续的参数代表新增的数组元素

```
const list = [1,2,3];
list.splice(1,2,'aaaaaa','bbbbb')
console.log(list)  //[1, 'aaaaaa','bbbbb']
```

#### slice
slice对数组进行截取操作，接收两个参数，开始位置和结束位置，截取的结果包含开始位置不包含结束位置的字符，不传结束位置则截取至结束位置，不传参数则可对数组进行复制，不会改变原数组。

```
const list = [1,2,3];
list.slice() //[1,2,3]
list.slice(1)  //[2,3]
list.slice(0,2) //[1,2]
```

#### join

join方法将数组元素拼接成数组,参数为拼接符,不传默认用,做分隔符

```
const list = [1,2,3];
list.join('-')  //'1-2-3'
```

#### concat

拼接数组，不会改变原数组，而是返回一个新数组

```
const list = [1,2,3]
const list1 = list.concat([1]) // [1, 2, 3, 1]
```

#### 参考文档
[MDN Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
