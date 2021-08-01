import {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,


    AsyncParallelHook,
    AsyncParallelBailHook,

    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook,
    AsyncSeriesLoopHook,
} from 'tapable'
import competingCountries from './types/competingCountries'
class OlympicGames {
    constructor() {
        this.hooks = {
            admission: new SyncHook(['countries']),
            openingCeremony: new SyncBailHook(['program']),
            process: new AsyncParallelHook()
        }
    }
    // 入场
    admission (countries = []) {
        this.hooks.admission.call(countries)
    }

    // 开幕式表演节目
    openingCeremony (program) {
        this.hooks.openingCeremony.call(program)
    }

    // 颁奖
    award () {
        return this.hooks.process.promise()
    }

    // 新闻播报
    report (hookName) {
        let interceptor
        switch (hookName) {
            case 'process':
                interceptor = {
                    call: () => {
                        console.log('-------------------------')
                        console.log('现在奥运比赛正式开始')
                        console.log('-------------------------')
                    },
                    tap: (tap) => {
                        console.log('------------')
                        console.log(`${tap.name}项目开始了`)
                        console.log('------------')
                    },                   
                    done: () => {
                        console.log('-------------------------')
                        console.log('奥运比赛已经全部结束')
                        console.log('-------------------------')
                    }
                }
                break;
            default:
                break;
        }
        this.hooks[hookName].intercept(interceptor)
    }
}
// 1. 创建一个实例（东京举办了今年的奥运会）
let tokyoOlympic = new OlympicGames()
tokyoOlympic.report('process')
// 2. 在钩子函数上挂载plugin（在入场时 设立检查环节，检查参赛国身份）
tokyoOlympic.hooks.admission.tap('sign', (countries = []) => {
    for (let i = 0; i < countries.length; i++) {
        const country = countries[i]
        if (competingCountries.includes(country)) {
            console.log(country + '允许入场')
        } else {
            console.log(country + '不符合身份，不允许入场')
        }
    }
})
tokyoOlympic.hooks.openingCeremony.tap('pre', (program) => {
    console.log(`${program}：pre`)
})
tokyoOlympic.hooks.openingCeremony.tap('in', (program) => {
    console.log(`${program}：in`)
    if (typeof program === 'string') {
        if (program.toLowerCase().includes('sb')) {
            console.log(`${program}：STOP!!!`)
            return 'bail'
        }
    }
})
tokyoOlympic.hooks.openingCeremony.tap('post', (program) => {
    console.log(`${program}：post`)
})

tokyoOlympic.hooks.process.tapPromise('Ping-Pang', () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log('经过一天的乒乓球比赛，男单冠军是：马龙')
            res()
        }, 1000)
    })
})
tokyoOlympic.hooks.process.tapPromise('diving', () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log('经过两天跳水比赛，女子冠军是：施廷懋')
            res()
        }, 2000)
    })
})

// 3. 指定的时机hook，触发plugin（入场时，检查身份）
const testCountries = ['Taiwan', 'China', 'U.S.A', 'UK']

tokyoOlympic.admission(testCountries)
tokyoOlympic.openingCeremony('SB节目')
tokyoOlympic.openingCeremony('点燃圣火')

tokyoOlympic.award().then(_ => {
    console.log('升国旗，奏国歌')
})


tokyoOlympic.hooks.process.intercept({
    call
})
