import shareMixin from '@/mixins/share.js'
import { mapGetters, mapActions } from 'vuex'
import system from '@/tools/system'
import Account from '@/logic/account'
import imageAli from '@/tools/image.js'
import { locationHref, locationReplace, getDistUrl } from '@/tools/logic.js'
import { formatDate } from '@/tools/formatDate'

export default function (Vue) {
  Vue.mixin({
    mixins: [shareMixin],
    computed: {
      ...mapGetters([
        'PopupUILoading',
        'HPopupUILoading'
      ]),
      isApp () {
        return system.isApp()
      },
      userId () {
        return Account.getUserId() || null
      },
      isWechat () {
        return system.isWechat()
      },
      isPro () {
        return system.isPro()
      },
      isAndroid () {
        return system.isAndroid()
      },
      appVersion () {
        return system.getAppVersion()
      },
      apiEnv () {
        return process.env.API_ENV
      },
      phoneIsIOS () {
        let u = navigator.userAgent
        return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      },
      phoneIsAndroid () {
        let u = navigator.userAgent
        return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
      }
    },
    methods: {
      ...mapActions([
        'actionVuexMessageShow',
        'actionVuexSetLoading',
        'actionVuexHMessageShow',
        'actionVuexSetHLoading'
      ]),
      image_ali (url, w) {
        return imageAli(url, w)
      },
      formatDate,
      locationHref,
      locationReplace,
      getDistUrl
    }
  })
}
