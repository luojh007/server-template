// 深拷贝
// 递归
/**
 * 1. 实现深拷贝
 * 2. 使用栈的数据结构替代递归，防止内存溢出
 * 3. 实现Symbol对象的拷贝
 * 4. 解决重复引用的情况
 */
function deepClone (arr, hash = new WeakMap()) {
  if (typeof arr !== 'object') {
    return arr
  }
  var result = arr instanceof Array ? [] : {}
  var loopList = [{
    data: arr,
    key: undefined,
    parent: result,
  }]

  while (loopList.length) {
    var node = loopList.pop()
    var { data, key, parent } = node

    // 遍历第一个节点
    var current = parent;

    // 遍历非第一个节点
    if (key !== undefined) {
      current = parent[key] = data instanceof Array ? [] : {}
    }
    // 防止重复引用
    if (hash.has(data)) {
      parent[key] = hash.get(data)
      continue;
    }
    hash.set(data, current)

    Reflect.ownKeys(data).forEach(i => {
      if (typeof data[i] === 'object') {
        loopList.push({
          data: data[i],
          key: i,
          parent: current
        })
      }
      else {
        current[i] = data[i]
      }
    })

  }
  return result
}


//test 1
var a1 = {}
var b1 = {}
b1.a = a1
a1.b = b1
var sym1 = Symbol('11')
var sym2 = Symbol('22')
var obj1 = { sym1: 'symbol1', sym2: 'symbol2', c: { a: 1, b: 2, c: { a: 1, b: 2 } }, a1 }
// console.log(obj1)

var obj2 = deepClone(obj1)
console.log(obj2)

console.log(obj2.a1)

