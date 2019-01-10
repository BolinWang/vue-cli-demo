/* eslint-disable no-undef */
/* eslint-disable import/no-duplicates */
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import 'mint-ui/lib/style.css'
import Mint from 'mint-ui'
import { Lazyload } from 'mint-ui'

import Swiper from '@/components/t/swiper'
import '@/components/t/swiper/swiper.css'

import store from '@/vuex/store'
import registerComponents from '@/config-components'
import registerFilter from '@/config-filter'
import registerHttp from '@/config-http'
import routes from '@/router/index.js'
import App from '@/views/app.vue'
import Account from '@/logic/account'
import system from '@/tools/system'
import bugfix from '@/tools/bugfix'
import $ from '@/tools/dom.js'
import { saRegister } from '@/tools/sc'
import directives from '@/directives'
import mixins from '@/mixins'
import '@/sa.js'
import '@/weixin.js'
import VueClipboards from 'vue-clipboard2'

// 错误日志收集
import ngmmdebug from './ngmmdebug'
Vue.use(Swiper)

// 开发环境显示vconsole按钮
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing' || process.env.API_ENV === 'beta') {
  // require("vconsole");
}

Vue.use(Lazyload, {
  preLoad: 2,
  error: '/static/loading.png',
  loading: '/static/loading.png',
  attempt: 1
})
Vue.use(Mint)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(registerComponents)
Vue.use(registerFilter)
Vue.use(registerHttp)
Vue.use(directives)
Vue.use(mixins)
Vue.use(VueClipboards)
// 初始化错误处理
Vue.use(ngmmdebug, { entryName: 'distributionc' })

const router = new VueRouter({
  mode: 'history',
  routes, // （缩写）相当于 routes: routes
  scrollBehavior (to, from, savedPosition) {
    // if (savedPosition) {
    //     return savedPosition
    // } else {
    //     return { x: 0, y: 0 }
    // }
    return false
  }
})
router.beforeEach(function (to, from, next) {
  // 处理iphone下设置微信签名失败问题
  bugfix.wechat_share_save_curpage(to, from, next)
  // 判断是否需要登录
  if (need_login(to.fullPath) && !Account.getUserId()) {
    Account.login()
    next(false)
  } else {
    next()
  }
})

/**
 * 是否需要登录
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
function need_login (path) {
  // 需要登录的页面
  const need_login_paths = ['/distribution/']// '/distribution/'

  let match = false
  for (let i = 0; i < need_login_paths.length; i++) {
    let item = need_login_paths[i]
    if (path.indexOf(item) === 0) {
      match = true
      break
    }
  }
  if (match) {
    console.debug('path:' + path + ',need login')
    return true
  } else {
    console.debug('path:' + path + ',need not login')
    return false
  }
}

router.afterEach(function (to, from, next) {
  // 记录滚动条位置
  if (from.meta.keepAlive === true) {
    sessionStorage.setItem(from.name + '-scrollTop', $.getScrollTop())
  }
  if (to && to.meta && to.meta.title !== undefined) {
    document.title = to.meta.title
    if (system.isApp()) {
      NGJsBridge.setH5Info({
        title: document.title
      })
    }
  }
  // 去除app端分享和购物车按钮
  if (system.isApp()) {
    if (to.path.indexOf('/distribution') === 0) {
      NGJsBridge.showToolBar({ cart: false, share: false })
    }
  }
  // 更新注册神策通用信息
  saRegister(to.fullPath)
})

// 开启vue调试功能
Vue.config.devtools = true

if (document.domain.indexOf('ngmm001.com') > -1 || document.domain.indexOf('ngmm365.com') > -1) {
  document.domain = document.domain.split('.').slice(-2).join('.')
}
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
console.log(router)
