const { curry } = require('lodash')

const _keepHeightest = function (x, y) { return x > y ? x : y }

const reduce = curry((fn, init, arr) => arr.reduce(fn, init))

const max = reduce(_keepHeightest, -Infinity)

console.log(max([1,2,3,222]))