function Test () {
  this.data = {
    a: 1,
    b: 2
  };
}

const test1 = new Test();
const test2 = new Test();

console.log('test1', test1.data.a);
test1.data.a = '222222';
console.log('test2', test2.data.a);
