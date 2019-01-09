function getDistUrl (url) {
  // 判断一下是否跳转到其他域名
  let result = /http(|s):\/\/([\w\.]*)/.exec(url)
  // 说明要跳转到子域名 需要吧distUserId拼接上
  if (result && result[2] != location.host) {
    // 判断url是否已经包含distUserId
    if (!/[\?&]distUserId=/.test(url)) {
      let distUserId = sessionStorage.getItem('distUserId')
      if (distUserId) {
        url = url + (url.indexOf('?') == -1 ? '?' : '&') + `distUserId=${distUserId}`
      }
    }
  }
  return url
}

function locationHref (url) {
  url = getDistUrl(url)
  window.location.href = url
}

function locationReplace (url) {
  url = getDistUrl(url)
  window.location.replace(url)
}

export default {
  getDistUrl, locationHref, locationReplace
}
export { getDistUrl, locationHref, locationReplace }
