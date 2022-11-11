/**
 * 工厂模式
 * @param {*} name
 * @param {*} age
 * @param {*} job
 * @returns
 */
function creatPerson (name, age, job) {
  const obj = new Object();
  obj.name = name;
  obj.age = age;
  obj.job = job;
  obj.sayName = function () {
    console.log(this.name);
  };
  return obj;
}

const person1 = creatPerson('Maxwell', 26, 'FE');
const person2 = creatPerson('Maxwell1', 26, 'writer');

person1.sayName(); // Maxwell
person2.sayName(); // Maxwell1
/**
 * 构造函数模式
 * @param {*} name 
 * @param {*} age 
 * @param {*} job 
 */
function Person (name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    console.log(this.name);
  };
}

let person1 = new Person("Nicholas", 29, "Software Engineer"); 
let person2 = new Person("Greg", 27, "Doctor"); 
person1.sayName(); // Nicholas 
person2.sayName(); // Greg


function Person() {} 
Person.prototype.name = "Nicholas"; 
Person.prototype.age = 29; 
Person.prototype.job = "Software Engineer"; 
Person.prototype.sayName = function() { 
console.log(this.name); 
}; 
let person3 = new Person(); 
person1.sayName(); // "Nicholas" 
let person4 = new Person(); 
person2.sayName(); // "Nicholas" 
console.log(person3.sayName == person2.sayName); // true
