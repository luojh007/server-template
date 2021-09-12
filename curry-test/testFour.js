const { curry } = require('lodash')

const slice = curry((start, end, arr) => arr.slice(start, end))

const sliceForm2To5 = slice(2)(5)

console.log(sliceForm2To5([1,2,3,4,5,6,7]))