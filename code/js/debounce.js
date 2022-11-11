function debounce (fn, delay, ctx) {
  let timer = null;
  return function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        console.log(this);
        fn.apply(ctx || this, arguments);
      }, delay);
    };
}

const util = {
  debounce (fn, delay, ctx) {
    console.log('debounce_this', this);
    let timer = null;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          console.log(this);
          fn.apply(ctx || this, arguments);
        }, delay);
      };
  }
};

const func = util.debounce(function () {
  console.log('11111');
  console.log('func_this', this);
}, 1000);

func();
