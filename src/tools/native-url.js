/* eslint-disable no-useless-escape */
// 判断是否为付费内容页面
export function isKnowledgeDetail (url) {
  return url.indexOf('/knowledge/detail') > -1
}
export function isKnowledgeDetailItem (url) {
  return url.indexOf('/knowledge/detail/item') > -1
}
export function isAppCollegeIndex (url) { // 是否是学院首页
  let reg = new RegExp(`^(http|https):\/\/${location.host.replace(/\./g, '\\.')}\/app_college_index`)
  return reg.test(url)
}
export function isAppPostShare (url) {
  return url.indexOf('/app/postshare/') > -1
}
export function isAppTopiclist (url) {
  return url.indexOf('/app/topiclist/') > -1
}
export function isAppCommunityIndex (url) {
  return url.indexOf('/haohuorecommend') > -1
}
export function isAppMallIndex (url) {
  let reg = new RegExp(`(${location.origin.replace(/\./g, '\\.')}[\/]*|[\/]*\\?.*)`, 'g')

  let temp_url = url.replace(reg, '')

  let isGoIndex = false

  if (temp_url === '' || temp_url === 'index') { // 判断配置的是不是商城首页地址
    isGoIndex = true
  }
  return isGoIndex
}
export function isAppRequiredParenting (url) {
  return url.indexOf('native-ywbd') > -1
}
export function isAppAllBabyKnowledgeHome (url) { // 养娃必读 全部知识
  return url.indexOf('native-qbzs') > -1
}
