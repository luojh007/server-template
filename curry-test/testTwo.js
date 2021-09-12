const { curry } = require('lodash')
// case two

// 抽象，依赖于fn
const filter = curry((fn, arr) => arr.filter(fn))

// 实现fn
const matchQ = function (str) {
    return str.match(/\q/i)
}
const filterQ = filter(matchQ)

console.log(filterQ(['asa','qewe','qqqa']))