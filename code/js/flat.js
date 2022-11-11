const  flat = function(obj,key = '',res = {}) {
  for(let [k,v] of Object.entries(obj)) {
    if(Object.prototype.toString.call(v) === '[object Object]') {
      key = `${key}${k}.`
      flat(v,key,res)
    } else if (Array.isArray(v)) {
      key = `${key}[${k}]`
    } else {
      key = `${key}${k}`;
      res[key] = v;
    }
    return res;
  }
} 

const obj = {
  a: {
    b: {
      c:"d"
    }
  }
}

flat(obj);
