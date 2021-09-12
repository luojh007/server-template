const compose = function () {
    const args = Array.from(arguments)
    let length = args.length
    const _this = this
    return function () {
        let params = Array.from(arguments)
        let data = Reflect.apply(args[length - 1], _this, params)

        while (--length) {
            data = Reflect.apply(args[length - 1], _this, [data])
        }
        return data
    }
}

const f1 = function (a) {
    return a + 'I', '我吃了饭'
}

const f2 = function (b) {
    return b + ',' + '我吃甜点'
}

const c = compose(f2, f1)

console.log(c('I'))