这个题是之前有一次面试的时候被问到的一题，这里整理一下

### 题目描述
```
var entryObj = {
 a: {
  b: {
   c: {
    dd: 'abcdd'
   }
  },
  d: {
   xx: 'adxx'
  },
  e: 'ae'
 }
}
```
// 要求转换成如下对象
```
var outputObj = {
 'a.b.c.dd': 'abcdd',
 'a.d.xx': 'adxx',
 'a.e': 'ae'
}
```

### 解题思路



### 代码实现

```
function flat(obj, key = "", res = {}, isArray = false) { 
  for (let [k, v] of Object.entries(obj)) { 
    if (Array.isArray(v)) { 
      let tmp = isArray ? key + "[" + k + "]" : key + k 
      flat(v, tmp, res, true) 
    } else if (typeof v === "object") { 
      let tmp = isArray ? key + "[" + k + "]." : key + k + "." 
      flat(v, tmp, res) 
    } else { 
      let tmp = isArray ? key + "[" + k + "]" : key + k 
      res[tmp] = v 
    } 
  } 
  return res 
}

```

### 参考文献

- [Javascript深层数组及对象扁平化
](https://juejin.cn/post/6844904103609368589)
