这个题目面试的时候一般不会问，但是如果有JavaScript编程题的话这个知识点就显得很重要

### 数组的遍历

#### for循环

```
const array = [1,2,3,4,5];
for(let i = 0; i < array.length;i++) {
  console.log(array[i])
}
```

#### forEach

```
const array = [1,2,3,4,5];
array.forEach((item,index)=>{
  console.log(item);
  console.log(index)
})
```

#### for-of

```
const array = [1,2,3,4,5];
for(const item of array) {
  console.log(item)
}
```

#### for-in

```
const array = [1,2,3,4,5];
for(const i in array) {
  console.log(i);
  console.log(array[i]);
}
```
### 遍历对象

#### Object.keys()

```
const obj = {
  a:'1',
  b:'2',
  c:'3'
}
Object.keys(obj).forEach(key=>{
  console.log(key);
  console.log(obj[key]);
})
```

#### for-in

```
const obj = {
  a:'1',
  b:'2',
  c:'3'
}
for(const key in obj) {
  console.log(key);
  console.log(obj[key]);
}
```

#### Object.getOwnPropertyNames()

```
const obj = {
  a:'1',
  b:'2',
  c:'3'
}
Object.getOwnPropertyNames(obj).forEach(key=>{
  console.log(key);
  console.log(obj[key]);
})
```

#### Reflect.ownKeys()

```  
const obj = {
  a:'1',
  b:'2',
  c:'3'
}
Reflect.ownKeys(obj).forEach(key=>{
  console.log(key);
  console.log(obj[key]);
})
```
