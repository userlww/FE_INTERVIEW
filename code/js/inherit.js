function SuperType () {
  this.colors = ['red', 'blue', 'green'];
}

function SubType () {
  SuperType.call(this);
}

const instance1 = new SubType();
instance1.colors.push('black');
console.log(instance1.colors); // "red,blue,green,black"
const instance2 = new SubType();
console.log(instance2.colors); // "red,blue,green"
