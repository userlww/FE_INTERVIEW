const data = {
  price: '10000元',
  name: 'iphone14'
};

const tmp = 'name:$name$，price:$price$';

const parse = function (tmp, data) {
  const reg = /\$((\w){1,})\$/g;
  const result = tmp.replaceAll(reg, function ($1, $2) {
    return data[$2];
  });
  return result;
};

parse(tmp, data);
