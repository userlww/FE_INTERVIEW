
function myWait (geneFn) {
  const iter = geneFn();

  return new Promise((resolve, reject) => {
    const step = function (yieldVal) {
      const result = iter.next(yieldVal);
      const { done, value } = result;
      if (done) {
        resolve(value);
      } else {
        return Promise.resolve(value).then(val => {
          step(val);
        });
      }
    };
    step();
  });
}
