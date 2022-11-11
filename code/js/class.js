const HIM = {
  main (data) {
    const ins = new IMSDK(data);
    if (data) {
      this.im = new IMSDK(data);
    }
    return this;
  }
};

class IMSDK {
  constructor (data) {
    this.test = data;
  }
}
let obj = {};
obj.test1 = HIM.main('222222222');
obj = {};
obj.test1 = HIM.main();
