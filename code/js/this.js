class ClassD {
  sayName = ()=> {
    console.log(this)
  }
}

const obj = {
  sayName:()=>{
    console.log(this)
  }
}

const a = new ClassD();
new ClassD().sayName();

obj.sayName();
