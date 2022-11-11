const rgba = '  r g b(255,  255  ,252)';
// 传入rgb格式的颜色值，返回对应的#十六进制的格式
const testReg = /rgb\((\d{1,3},\1,\1\))/;
function covertRgbaToHex (str) {
  const filteredStr = str.replace(/\s/g, '');
  const nums = [...filteredStr.matchAll(/\d{1,3}/g)];
  let result = '#';
  nums.forEach(item => {
    result += covertNums(+item[0]);
  });
  return result;
}

// 传入十进制数，返回对应的16进制
function covertNums (num) {
  let result = '';
  const letterMaps = {
    10: 'A',
    11: 'B',
    12: 'C',
    13: 'D',
    14: 'E',
    15: 'F'
  };
  while (num > 0) {
    let cur = num % 16;
    num = Math.floor(num / 16);
    if (cur > 9) {
      cur = letterMaps[cur];
    }
    result = cur + result;
  }
  return result;
}

console.log(covertRgbaToHex(rgba));
