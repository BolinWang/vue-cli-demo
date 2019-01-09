import ConfigUrls from './config-urls.js'
import system from '@/tools/system'

// 常用的配置
let config = {}

let API_ENV = process.env.API_ENV

if (API_ENV == 'pro') {
  config = {
    // (辅食小店的)微信授权的appid
    // appId:"wx8aae36b94fe14a70",
    // (糕妈优选国际)公众号appID
    // appId:"wx77606a251e1818bf",

    // 课程
    appId: 'wx18b28466a68944a4',
    appId_yx: 'wx18b28466a68944a4',
    loginCallbackUrl: 'https://callback.ngmm365.com/account/wechatAuth/callback',
    authorizeCallbackUrl: 'https://callback.ngmm365.com/account/wechatAuth/callback'
  }
} else if (API_ENV == 'beta') {
  config = {
    // 学院
    // appId:"wxf292488bb1d28004",
    appId: 'wx8aae36b94fe14a70',
    appId_yx: 'wx8aae36b94fe14a70',
    loginCallbackUrl: 'http://callback.ngmm001.com/account/wechatAuth/callback',
    authorizeCallbackUrl: 'http://callback.ngmm001.com/account/wechatAuth/callback',
    logoutUrl: 'http://callback.ngmm001.com/account/wechatAuth/logout'
  }
} else if (API_ENV == 'test') {
  config = {
    // 学院
    appId: 'wxf292488bb1d28004',
    appId_yx: 'wx8aae36b94fe14a70',
    loginCallbackUrl: '',
    authorizeCallbackUrl: ''
  }
} else {
  config = {
    // 学院
    appId: 'wxf292488bb1d28004',
    appId_yx: 'wx8aae36b94fe14a70',
    loginCallbackUrl: '',
    authorizeCallbackUrl: ''
  }
}

/**
 * 根据接口的路径，返回匹配的微服务器地址
 * @param  {string} url 请求的路径
 * @return {string}      匹配的服务器ip:port
 */

function get_api_url (url) {
  // 如果路径已http,https开头的，则不作处理。
  if (url && url.indexOf('http') === 0) {
    return url
  }

  var base_url_map = ConfigUrls.base_url_map

  var match = false
  var match_base_url = ''
  for (var key in base_url_map) {
    if (url.indexOf(key) == 0) {
      match = true
      var size = base_url_map[key].length
      match_base_url = base_url_map[key][Math.floor(Math.random() * size)]
      break
    }
  }

  if (match) {
    return match_base_url + url
  } else {
    return ConfigUrls.default_base_url + url
  }
}

export default {
  get_api_url,
  config
}
export {
  get_api_url,
  config
}
