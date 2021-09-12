const { compose, map, last, split, filter, Maybe, eq, head } = require('./myFP')
class IO {
    constructor(fn) {
        this.__value = fn
    }
}

var url = 'www.baidu.com?a=1&b=2&c=3'
const arr = split('&')('a=1&b=2&c=3')
const toPairs = compose(map(split('=')), split('&'))

const params = compose(toPairs, last, split('?'))

const findParms = function (key) {
    const pa = compose(filter(compose(eq(key), head)), params)
    const res = compose(last, head, pa)
    return res(url)
}

console.log(findParms('a'))