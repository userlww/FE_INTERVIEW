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

这个问题的思路其实也比较简单，就是遍历对象，将它的key用.做连接符拼接起来，再去判断它的value的类型，如果是对象或者数组的话，则对其进行递归操作，否则将拼起来的key作为结果对象的key，将value作为值。

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
