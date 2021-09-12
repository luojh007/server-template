const { curry, } = require('lodash')
const { compose, } = require('ramda')
const prop = curry((key, data) => data[key])
const split = curry((rex, str) => str.split(rex))
const map = curry((fn, arr) => arr.map((it) => fn(it)))
const filter = curry((fn, arr) => arr.filter(fn))
const last = curry(arr => arr[arr.length - 1])
const head = curry(arr => arr[0])
const eq = curry((key, source) => source === key)

function Maybe (x) {
    this.__value = x
}
Maybe.prototype.of = (x) => new Maybe(x)
Maybe.prototype.isNothing = (x) => (x === undefined || x === null)
Maybe.prototype.map = (fn) => this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this.__value))

module.exports = {
    prop,
    curry,
    compose,
    split,
    map,
    filter,
    last,
    eq,
    head,
    Maybe
}