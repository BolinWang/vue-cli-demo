import Vue from 'vue'
import Account from '@/tools/account'
import { get_api_url } from '@/common'

let API_ENV = process.env.API_ENV
let openMock = false
let urlPre = '/education/'

function registerHttp (Vue) {
  // HTTP相关
  Vue.http.options.crossOrigin = true
  Vue.http.options.xhr = {
    withCredentials: true
  }

  Vue.http.options.emulateJSON = true

  Vue.http.interceptors.push((request, next) => {
    // //请求超时20秒
    request.timeout = 20000

    // // 请求地址映射
    request.url = get_api_url(request.url)

    // // 请求参数构建
    let data = request.body || {}
    let auth = Account.buildHttpHeaders()

    request.body = {
      data: JSON.stringify(data),
      auth: JSON.stringify(auth)
    }

    // continue to next interceptor
    next((response) => {
      if (response && response.body) {
        let obj = response.body

        // 需要登录或者access-token缺失，支付不匹配
        if (obj.code === 11991019 || obj.code === 11991011 || obj.code === 11020013) {
          Account.cleanContext()
          Account.login()
        }
      }
    })
  })
}

function httpPost (url, params, success, fail) {
  if (!url || typeof url !== 'string') {
    console.error('httpPost:url参数有误')
    return
  }
  if (typeof params === 'function') {
    fail = success
    success = params
    params = {}
  }
  // mock
  if (API_ENV !== 'pro' && API_ENV !== 'beta' && ((openMock && url.indexOf(urlPre) > -1) || params.openMock === true) && !/^http(s|)/.test(url)) {
    url = '' + url
  }

  http('post', url, params, success, fail)
}

function http (method, url, params, success, fail) {
  Vue.http[method](url, params).then(response => {
    try {
      success && success(response.body)
    } catch (e) {
      console.error(e.stack)

      let errInfo = 'api-error:' + e.stack + ';url:' + url + ',params:' + JSON.stringify(params)
      url = get_api_url('/data/front')

      Vue.http.post(url, {
        text: errInfo
      }).then((obj) => {
        console.debug(JSON.stringify(obj))
      })
    }
  }, response => {
    let paramStr = JSON.stringify(params)
    let resStr = JSON.stringify(response)

    let infoStr = 'req:' + paramStr + ';res:' + resStr

    console.error('apiErr:' + infoStr)

    fail && fail({
      code: 120,
      desc: response,
      success: false
    })
  })
}

window.httpPost = httpPost

export default registerHttp
export { registerHttp, httpPost }
