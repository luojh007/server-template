const { curry } = require('lodash')

// curry化，偏函数
const match = curry((what, str) => str.match(what))
const replace = curry((what, replacement, str) => str.replace(what, replacement))
const filter = curry((fn, arr) => arr.filter(fn))
const map = curry((fn, arr) => arr.map(fn))


const hasSpace = match(/\s+/g)
const replaceLJH = replace(/(ljh)/g)
const replaceLjhToBBB = replaceLJH('BBB')

// 组合
const filterSpace = filter(hasSpace)


console.log(hasSpace('aaa bbb'))

console.log(filterSpace(['a b', 'ss', 'e f']))

console.log(replaceLjhToBBB('ljhsdasljh'))