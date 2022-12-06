function merge() {
  let isObj = (s) => "[object Object]" == Object.prototype.toString.call(s);
  let r = {};
  for (let i = 0, e = arguments.length; i < e; i++) {
    let m = arguments[i];
    if (isObj(m)) {
      for (let k in m) {
        let n = m[k];
        if (isObj(n)) {
          r[k] = merge(r[k] || {}, n);
        } else {
          r[k] = n;
        }
      }
    } else {
      throw new Error("arguments must be pure object.");
    }
  }
  return r;
}

module.exports = {
  merge,
};
