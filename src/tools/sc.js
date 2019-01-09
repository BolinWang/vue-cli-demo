/* eslint-disable no-undef */
import system from '@/tools/system'
import Account from '@/logic/account'

// 注册共有属性
let platformType = system.isApp() ? (system.isIos() ? 'iOS' : 'Android') : 'H5'

// 注册通用信息
function saRegister (path) {
  try {
    sa.register({
      $url: path,
      platformType: platformType,
      $title: document.title
    })
  } catch (e) {
    console.log('error:saRegister=', e)
  }
}
// 注入用户真实id
function saLogin () {
  try {
    clearInterval(saLogin.timer)
    saLogin.timer = setInterval(login, 200)
    // eslint-disable-next-line no-inner-declarations
    function login () {
      if (sa && sa.store && Account.getUserId() && (sa.store.getDistinctId() !== Account.getUserId())) {
        clearInterval(saLogin.timer)
        sa.login(Account.getUserId())
      }
    }
  } catch (e) {
    console.log('error:saLogin=', e)
  }
}

let channelCodeType = ['viewCourseDetail', 'viewLessonDetail']
function saTa (type, params) {
  try {
    if (!params) return

    if (channelCodeType.indexOf(type) > -1) {
      if (!params.channel_code) delete params.channel_code
    }// shareCourse,payCourseOrder_web

    console.log('type=', type, 'params=', params)
    sa.track(type, params)
  } catch (e) {
    console.log('error:saTa=', e)
  }
}

export {
  saRegister,
  saLogin,
  saTa
}
