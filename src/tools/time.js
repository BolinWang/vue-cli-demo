/* eslint-disable no-useless-escape */
import { locationReplace } from '@/tools/logic.js'

module.exports = {
  /**
   * 判断时间是否在现在之前
   * @param  {[type]}  dateStr [description]
   * @return {Boolean}         [description]
   */
  isBeforeNow (dateStr) {
    // console.log(dateStr)
    // fix safari bug
    dateStr = dateStr.replace(/\-/g, '/').replace(/\.\d{1}$/, '')
    return new Date(dateStr).getTime() < new Date().getTime()
  },
  times (countDownTime, doing, finish) {
    let timer, antherEndTime
    let ts = countDownTime // 10*1000;//countDownTime;

    var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10) // 计算剩余的天数
    var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10) // 计算剩余的小时数
    var mm = parseInt(ts / 1000 / 60 % 60, 10) // 计算剩余的分钟数
    var ss = parseInt(ts / 1000 % 60, 10) // 计算剩余的秒数
    doing({ d: dd, h: hh, m: mm, s: ss })

    let endTime = new Date().getTime() + ts

    timer = setInterval(function () {
      // let nowTime = new Date();
      ts = ts - 1000 // 计算剩余的毫秒数
      dd = parseInt(ts / 1000 / 60 / 60 / 24, 10) // 计算剩余的天数
      hh = parseInt(ts / 1000 / 60 / 60 % 24, 10) // 计算剩余的小时数
      mm = parseInt(ts / 1000 / 60 % 60, 10) // 计算剩余的分钟数
      ss = parseInt(ts / 1000 % 60, 10) // 计算剩余的秒数

      antherEndTime = new Date().getTime() - 1 + ts
      // console.log(Math.abs(endTime - antherEndTime));
      if (Math.abs(endTime - antherEndTime) > 60000) {
        clearInterval(timer)
        locationReplace(location)
      }

      if (typeof doing === 'function') {
        doing({ d: dd, h: hh, m: mm, s: ss, t: timer })
      }
      if (dd === 0 && hh === 0 && mm === 0 && ss <= 0) {
        if (typeof finish === 'function') {
          finish()
        }
        clearInterval(timer)
      }
    }, 1000)
  }
}
