/**
 * 函数式编程-compose/curry
 */
const JsonData = {
    data: {
        divs: [
            { url: '1' },
            { url: '2' },
            { url: '3' },
            { url: '4' },
            { url: '5' },
            { url: '6' }
        ]
    }
}

const map = _.curry((fn, arr) => arr.map(fn))

const addDiv = _.curry((dom, divDom) => dom.append(divDom))

const createDom = (text) => {
    const div = document.createElement('div')
    div.innerHTML = text
    return div
}

// 获取图片渲染在 body中
function render () {
    const divs = _.compose(_.prop('divs'), _.prop('data'))
    const url = _.prop('url')
    const srcs = _.compose(map(url), divs)

    const showDiv = document.getElementsByClassName('show')[0]
    const append = addDiv(showDiv)
    const showText = _.compose(map(append), map(createDom))

    const show = _.compose(showText, srcs)
    show(JsonData)

}

render()