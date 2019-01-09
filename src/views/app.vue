<template>
  <section :class="{'app-wrap': $route.name !== 'horizontal-screen'}">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <vuex-loading />
    <vuex-message />
  </section>
</template>
<script>
import 'normalize.css'
import FastClick from 'fastclick'
import Account from '@/logic/account'
import { saLogin } from '@/tools/sc'

FastClick.attach(document.body)

export default {
  name: 'App',
  created () {
    // 注册神策用户id
    saLogin()
    // 检查是否支持webp格式图片
    this.initWebp()
    // 初始化dpr
    this.initDpr()
    // 登录的信息时有外界通过cookie 注入的，有些字段不同环境，没有注入，需要配置。
    Account.initContext()
  },
  methods: {
    initWebp () {
      // 检查是否支持webp格式图片
      this.check_webp_feature('lossy', function (feature, flag) {
        if (flag) {
          document.documentElement.setAttribute('data-webp', 1)
        }
        // console.debug(feature, flag)
      })
    },
    /**
         * 初始化dpr,rem
         * @return {[type]} [description]
         */
    initDpr () {
      // 自适应方案
      var doc = window.document
      var docEl = doc.documentElement
      var dpr = 0
      var tid = 0

      var isIPhone = window.navigator.appVersion.match(/iphone/gi)
      var devicePixelRatio = window.devicePixelRatio
      if (isIPhone) {
        // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
        if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
          dpr = 2
        } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
          dpr = 2
        } else {
          dpr = 1
        }
      } else {
        // 其他设备下，仍旧使用1倍的方案
        dpr = 1
      }

      function refreshRem () {
        var width = docEl.getBoundingClientRect().width
        var height = docEl.getBoundingClientRect().height

        if (window.orientation === 90 || window.orientation === -90) {
          width = height
        }
        if (width > 750) {
          width = 750
        }
        var fz = Number(width / 3.75).toFixed(0)
        document.getElementsByTagName('html')[0].style.cssText = 'font-size: ' + fz + 'px'
        var realfz = ~~(+window.getComputedStyle(document.getElementsByTagName('html')[0]).fontSize.replace('px', '') * 10000) / 10000
        if (fz !== realfz) {
          fz = fz * (fz / realfz)
          document.getElementsByTagName('html')[0].style.cssText = 'font-size: ' + fz + 'px'
        }
      }

      window.addEventListener('resize', function () {
        clearTimeout(tid)
        tid = setTimeout(refreshRem, 300)
      }, false)

      window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
          clearTimeout(tid)
          tid = setTimeout(refreshRem, 300)
        }
      }, false)

      refreshRem()

      docEl.setAttribute('data-dpr', dpr)
    },

    /**
         * 检查是否支持webp格式图片
         * @param  {[type]}   feature  [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
    check_webp_feature (feature, callback) {
      var kTestImages = {
        lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
        lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
        alpha: 'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
        animation: 'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA'
      }
      var img = new Image()
      img.onload = function () {
        var result = (img.width > 0) && (img.height > 0)
        callback(feature, result)
      }
      img.onerror = function () {
        callback(feature, false)
      }
      img.src = 'data:image/webp;base64,' + kTestImages[feature]
    }
  }
}

</script>
<style lang="less">
@import '../assets/css/font.less';
@import '../assets/css/style.less';
@import '../assets/css/app.less';
@import '../assets/css/button.less';
@import '../assets/fonts/iconfont.css';
</style>
<style lang="less" scope>
section{
    min-height: 100%;
    &.app-wrap{
        margin: 0 auto;
        max-width: 3.75rem;
    }
}
</style>
