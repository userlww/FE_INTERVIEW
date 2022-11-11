function add (x, y, z) {
  return x + y + z;
}

function curryAdd (x) {
  return function (y) {
    return function (z) {
      return x + y + z;
    };
  };
}

console.log(curryAdd(1)(2)(3));
