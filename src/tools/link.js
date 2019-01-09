import browser from '@/tools/browser'

export default {
  deepLink (ap_str, schemeLink) {
    if (browser.isIphone) {
      window.location.href = 'https://oia.ngmm365.com/deeplink?hlink=' + encodeURIComponent(schemeLink) + '&ip=' + encodeURIComponent(JSON.stringify(ap_str))
    } else {
      window.location.href = schemeLink
      setTimeout(function () {
        window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.nicomama.niangaomama'
      }, 1500)
    }
  }
}
