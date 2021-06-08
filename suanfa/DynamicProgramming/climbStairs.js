/**
 * 爬楼梯问题
 * 问题概述：假设楼梯有n阶层，每次只能走1阶或者2阶，一共有多少种情况？
 * 核心思路：
 * 1. 第n阶只能从n-1阶，和n-2阶爬上来，所以：f(n) = f(n-2) + f(n-1)
 * 2. 寻找极限：f(1) = 1, f(2) = 2
 */

// 解1，暴力解决
// function dp1 (n) {
//   if (n === 1) {
//     return 1
//   }
//   if (n === 2) {
//     return 2
//   }
//   return dp1(n - 1) + dp1(n - 2)
// }
function dp1 (n, pre = 1, cur = 2) {
  if (n === 1) {
    return pre
  }
  if (n === 2) {
    return cur
  }
  return dp1(n - 1, cur, cur + pre)
}
console.log(dp1(10000))
// 产生的问题：
// 1. 计算重复，如：dp(10) = dp(9)+dp(8); dp(9) = dp(8) + dp(7); 重复计算dp(8)


// 解2，为解决重复计算，设置一个缓存表，缓存已经计算过的结果 var hash = new Map();

function dpWithCache (hash = {}) {
  // 柯里化分割参数
  return handle
  function add (n) {
    hash[n] = handle(n - 1) + handle(n - 2)
    return hash[n]
  }
  function handle (n) {
    if (n === 1) {
      hash[n] = 1
      return 1
    }
    if (n === 2) {
      hash[n] = 2
      return 2
    }
    if (hash[n]) {
      return hash[n]
    }
    return add(n)
  }
}
var dp = dpWithCache()

console.log(dp(1000))


// 解3：解2的hash表中最终保存的就是 1～n所有的计算结果。于是思路转换一下，从底层开始向上计算，逐步补充这张hash表

function dpBacktracking (n) {

  var hash = new Map()

  function dispatch (n) {
    if (n == 1) {
      hash.set(n, 1)
    }
    else if (n == 2) {
      hash.set(n, 2)
    }
    else {
      hash.set(n, hash.get(n - 2) + hash.get(n - 1))
    }
  }

  for (let i = 1; i <= n; i++) {
    dispatch(i)
  }
  return hash.get(n)
}

// console.log(dpBacktracking(100000))


// 解4：解2与解3类似，只是一个自上而下，一个是从下而上。但是都是存在空间的浪费，因为每次计算只需要前面两个计算结果。下面来做优化

function dpWithCacheAndLessMemory (n) {
  var hash = new Map()

  function dispatch (n) {
    if (n == 1) {
      hash.set(1, 1)
    }
    else if (n == 2) {
      hash.set(2, 2)
    }
    else {
      const pre = hash.get(2)
      const cur = hash.get(1) + hash.get(2)
      hash.set(1, pre)
      hash.set(2, cur)
    }
  }

  for (let i = 1; i <= n; i++) {
    dispatch(i)
  }
  return hash.get(2)
}

// console.log(dpWithCacheAndLessMemory(100000))
