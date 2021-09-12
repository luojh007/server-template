const { curry } = require('lodash')

// case one

// 1. curry化
const split = curry((delimiter, str) => str.split(delimiter))
const map = curry((fn, arr) => arr.map(fn))



const splitSpace = split(' ')
console.log(splitSpace('as asd '))

const splitSpaceMap = map(splitSpace)
console.log(splitSpaceMap(['asd sd sd', 'sd sad sa io ko ', 'mm n n m n ']))



