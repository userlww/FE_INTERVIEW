尝试一下各种情况下this指针的指向
首先第一种,定义一个全局的普通函数

```
var name = 'a';
function func() {
  console.log(this);
  console.log(this.name)
}

const obj = {
  name:'obj',
  func
}

func();  // window  a
obj.func()  // obj ,obj

```
