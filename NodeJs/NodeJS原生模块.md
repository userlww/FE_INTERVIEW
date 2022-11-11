本文介绍一下NodeJS原生文件处理模块fs，本文中的程序示例均来自文末的参考文档

### fs模块

NodeJS基本所有的与文件相关的操作都由fs模块完成，fs模块导入方式
```
const fs = require('fs');
```

#### fs模块的功能

fs模块提供以下一些功能模块：

- 文件读取
- 文件写入
- 文件追加写入
- 文件拷贝
- 创建目录

#### fs模块的方法

fs提供了一些文件操作的方法，每一项操作都提供了同步和异步两种方式，同步方式方法后多了一个Sync的后缀

##### readFileSync/readFile

readFile方法用于读取文件，调用方式如下

```JavaScript
const fs = require("fs");

//同步读取文件
let buf = fs.readFileSync("1.txt");
let data = fs.readFileSync("1.txt", "utf8");

console.log(buf); // <Buffer 48 65 6c 6c 6f>
console.log(data); // Hello
//异步调用
fs.readFile("1.txt", "utf8", (err, data) => {
   if(!err){
       console.log(data); // Hello
   }
});
```
- 第一个参数为读取文件的路径或文件描述符
- 第二个参数为 options，默认值为 null，其中有 encoding（编码，默认为 null）和 flag（标识位，默认为 r），也可直接传入 encoding

异步方法第三个参数是回调函数。

##### writeFileSync/writeFile

writeFile方法用于写文件，调用方式示例

```JavaScript

const fs = require("fs");

//同步调用
fs.writeFileSync("2.txt", "Hello world");
let data = fs.readFileSync("2.txt", "utf8");

console.log(data); // Hello world

//异步调用
fs.writeFile("2.txt", "Hello world", err => {
    if (!err) {
        fs.readFile("2.txt", "utf8", (err, data) => {
            console.log(data); // Hello world
        });
    }
});
```

- 第一个参数为写入文件的路径或文件描述符
- 第二个参数为写入的数据，类型为 String 或 Buffer
- 第三个参数为 options，默认值为 null，其中有 encoding（编码，默认为 utf8）、 flag（标识位，默认为 a）和 mode（权限位，默认为 0o666），也可直接传入 encoding。

异步方法同样多一个参数，为回调函数

##### appendFileSync/appendFile

appendFileSync/appendFile用于追加写入文件

```JavaScript

const fs = require("fs");

//同步调用
fs.appendFileSync("3.txt", " world");
let data = fs.readFileSync("3.txt", "utf8");

//异步调用
fs.appendFile("3.txt", " world", err => {
    if (!err) {
        fs.readFile("3.txt", "utf8", (err, data) => {
            console.log(data); // Hello world
        });
    }
});
```

- 第一个参数为写入文件的路径或文件描述符
- 第二个参数为写入的数据，类型为 String 或 Buffer
- 第三个参数为 options，默认值为 null，其中有 encoding（编码，默认为 utf8）、 flag（标识位，默认为 a）和 mode（权限位，默认为 0o666），也可直接传入 encoding

异步调用方式多一个参数回调函数

##### copyFileSync/copyFile

copyFileSync/copyFile用于copy文件

```JavaScript
const fs = require("fs");

//同步调用
fs.copyFileSync("3.txt", "4.txt");
let data = fs.readFileSync("4.txt", "utf8");

console.log(data); // Hello world

//异步调用

const fs = require("fs");

fs.copyFile("3.txt", "4.txt", () => {
    fs.readFile("4.txt", "utf8", (err, data) => {
        console.log(data); // Hello world
    });
});

```

第一个参数是源文件路径，第二个参数是目标文件，异步方法同样多一个参数为回调函数

##### mkdirSync/mkdir

mkdirSync/mkdir用于创建目录

```JavaScript

//同步调用
fs.mkdirSync("a/b/c")
//异步调用
fs.mkdir("a/b/c", err => {
    if (!err) console.log("创建成功");
});

```

接收一个参数为文件路径，异步方法也是多一个参数回调函数。
### 参考文档

- [面试官：说说对 Node 中的 fs模块的理解? 有哪些常用方法](https://github.com/febobo/web-interview/issues/156)
