/* eslint-disable no-useless-escape */
import Cookie from 'js-cookie'

export default {
  getAppVersion () {
    let client_version = Cookie.get('client_version') ? Cookie.get('client_version').toLowerCase() : '1.0.0'
    return client_version
  },
  getWechatVersion () {
    let wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i)
    if (!wechatInfo) {
      return ''
    } else {
      return wechatInfo[1]
    }
  },

  setApp (type = 'android') {
    Cookie.set('platform', type)
  },

  isApp () {
    let platform = Cookie.get('platform') ? Cookie.get('platform').toLowerCase() : ''
    if (platform === 'android' || platform === 'ios') {
      return true
    } else {
      return false
    }
  },
  isIos () {
    let platform = Cookie.get('platform') ? Cookie.get('platform').toLowerCase() : ''
    return platform === 'ios'
  },
  isAndroid () {
    let platform = Cookie.get('platform') ? Cookie.get('platform').toLowerCase() : ''
    return platform === 'android'
  },
  isDev () {
    if (process.env.NODE_ENV === 'development') {
      return true
    } else {
      return false
    }
  },
  isTest () {
    if (process.env.NODE_ENV === 'testing') {
      return true
    } else {
      return false
    }
  },
  isPro () {
    if (process.env.NODE_ENV === 'production') {
      return true
    } else {
      return false
    }
  },
  isWechat () {
    return /micromessenger/.test(navigator.userAgent.toLowerCase())
  },
  isPC () {
    var userAgentInfo = navigator.userAgentInfo
    var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
    var flag = true
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > -1) { flag = false; break }
    }
    return flag
  },
  phoneIsAndroid () {
    let u = navigator.userAgent
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
  }
}
