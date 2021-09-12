
function currentDymic (fn) {
    const _this = this
    let _arg = []
    return function handle () {
        const arg = Array.from(arguments)
        if (arg.length) {
            _arg = _arg.concat(arg)
            return handle
        } else {
            return Reflect.apply(fn, _this, _arg)
        }
    }
}
function currentStatic (fn) {
    const _this = this
    let _arg = new Array(0)
    let length = fn.length
    return function handle () {
        length--
        const arg = Array.from(arguments)
        _arg.push(...arg)
        if (length === 0) {
            return Reflect.apply(fn, _this, _arg)
        } else {
            return handle
        }
    }
}
function add () {
    const arg = Array.from(arguments)
    return arg.reduce((total, it) => total += it, 0)
}

function addThree (a, b, c) {
    return a + b + c
}

// const currentAdd = currentDymic(add)
// currentAdd(1)
// currentAdd(2)
// currentAdd(3)
// console.log(currentAdd())


const currentAddStatic = currentStatic(addThree)
currentAddStatic(1)
currentAddStatic(3)
console.log(currentAddStatic(2))