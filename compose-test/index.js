

function compose (fns, callback) {
    return function async (context) {
        let index = -1
        return dispatch(0)
        function dispatch (i) {
            if (i <= index) return Promise.reject('多次调用next')
            let fn = fns[i]
            index = i
            if (i === fns.length) fn = callback
            if (!fn) return Promise.resolve()
            try {
                return Promise.resolve(fn(context, function next () {
                    return dispatch(i + 1)
                }))
            } catch (error) {
                return Promise.reject('调用失败')
            }
        }
    }
}