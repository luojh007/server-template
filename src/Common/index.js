module.exports = {
  serialize: function (obj) {
    let str = '?'
    Object.keys(obj).forEach(function (key) {
      str += key + "=" + obj[key] + '&'
    });

    var reg = /&$/gi;
    str = str.replace(reg, ""); //清除最后一个&符号
    return str
  }
}