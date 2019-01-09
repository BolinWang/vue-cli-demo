import browser from '@/tools/browser'

function wechat_share_save_curpage (to, from, next) {
  if (browser.isIphone) {
    if (from.name == null && from.path == '/') {
      localStorage.setItem('wechatCurPage', location.origin + to.fullPath)
    }
  }
}

export default {
  wechat_share_save_curpage
}
