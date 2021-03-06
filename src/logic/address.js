import queryString from 'query-string'

export default {
  // 检查页面是否从来自订单确认页
  check_from_trade_check_page (query) {
    const tradeCheckPages = ['trade-check', 'knowledge-receive', 'knowledge-edit-receive']
    return query && tradeCheckPages.indexOf(query.from) > -1
  },
  // 根据传入的redirect_path，构建新的redirect_path。追加或替换addressId参数
  build_redirect_path (redirect_path, addressId) {
    let path = decodeURIComponent(redirect_path)

    let index = path.indexOf('?')

    let base

    if (index > -1) {
      base = path.substr(0, index)
    } else {
      base = path
    }

    var query = queryString.parse(path.replace(base, ''))
    query.addressId = addressId

    return base + '?' + decodeURIComponent(queryString.stringify(query))
  }
}
