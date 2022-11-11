function throttle(fn,delay,ctx) {
  let last = 0;
  return function() {
    const cur = new Date();
    if(Number(cur) - last > delay) {
      fn.apply(this,arguments);
      last = cur;
      return false
    }
  }
  return true
} 
