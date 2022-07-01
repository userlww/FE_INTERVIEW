const HIM = {
  main(data) {
    console.log('main')
    const ins = new IMSDK(data);
    console.log('ins',ins);
    if(data){
      this.im =  new IMSDK(data);
    }
    return this;
  }
}

class IMSDK {
  constructor(data) {
    this.test = data
    // console.log('HIM_construtor',data);
    // if(data) {
    //   console.log('data',this);
    //   this.test = data;
    //   console.log('this.test',this.test)
    // }
    console.log('info',this)
  }
}
let obj = {}
obj.test1 = HIM.main('222222222');
console.log('obj',obj)
console.log('test1.im.test',obj.test1.im.test)
obj = {};
obj.test1 = HIM.main();
console.log('obj',obj)
console.log('test1.im.test',obj.test1.im.test)
