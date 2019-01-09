const map = {
  // 公共配置
  base: {
    // 商品详情html文档的base url
    goods_detail_html_base_url: 'http://m.ngmm001.com/virtual-static/html/',
    // 帖子详情html文档的base url
    posts_detail_html_base_url: 'http://m.ngmm001.com/virtual-static/html/content/',
    // 付费内容文档内容
    knowledge_detail_html_base_url: 'http://m.ngmm001.com/virtual-static/html/knowledge/',

    default_base_url: 'http://10.86.10.254:9000/api',
    // 引导下载页面url
    go_download_page_url: 'http://m.ngmm001.com/page/165',
    // 笔记预览页面请求地址
    posts_detail_preview_html_base_url: 'http://adminapi.ngmm001.com/content/community/post/admin/detail',
    // 图片跨域处理路径
    proxy_img_base_url: 'http://proxyimg.ngmm001.com/proxy/image',

    mall_origin: 'http://m.ngmm001.com',
    // 数学盒子首页
    mathbox_index: 'http://m.ngmm001.com/mathbox/index',
    // 招募育儿顾问首页
    channelPartners_index: 'http://m.ngmm001.com/pay/parenting',
    // 分销培训中心地址
    training_center: 'http://m.ngmm001.com/page/547',
    // 错误日志统计接口
    logReportUrl: 'https://tj.ngmm365.com/s.gif',
    // 推广中心
    spread_page: 'http://m.ngmm001.com/page/559'
  },

  // 线上环境配置
  pro: {
    // 每个模块对应的base_url
    base_url_map: {
      '/trade/': ['https://tradeapi.ngmm365.com'], // 订单模块
      '/account/': ['https://accountapi.ngmm365.com'], // app账户模块
      '/goods/': ['https://goodsapi.ngmm365.com'], // 商品模块
      '/pay/': ['https://payapi.ngmm365.com'], // 支付模块
      '/logistics/': ['https://lgscapi.ngmm365.com'], // 物流模块
      '/data/': ['https://dataapi.ngmm365.com'], // 数据统计模块
      '/cart/': ['https://cartapi.ngmm365.com'], // 购物车模块
      '/content/': ['https://contentapi.ngmm365.com'], // 内容模块
      '/mall/': ['https://cardapi.ngmm365.com'], // 优惠券
      '/protect/': ['https://protectapi.ngmm365.com'], // 维权
      '/internalAccount/': ['https://accountapi.ngmm365.com'], // 内部员工信息录入
      '/buyershow/': ['https://buyershowapi.ngmm365.com'], // 买家秀
      '/personalCenter/': ['https://contentapi.ngmm365.com'], // App用户中心
      '/follower/': ['https://contentapi.ngmm365.com'], // App关注用户
      '/knowledge/': ['https://knowledgeapi.ngmm365.com'], // 付费内容
      '/card/': ['https://cardapi.ngmm365.com'], // 裂变活动
      '/message/': ['https://contentapi.ngmm365.com'], // 消息
      '/community/': ['https://englishapi.puppyenglish.com'], // 皮皮爱英语
      '/distribution/': ['https://distributionapi.ngmm365.com'], // 分销
      '/education/': ['https://knowledgeapi.ngmm365.com'], // 付费内容
      '/dist/': ['https://distapi.ngmm365.com']// 分销新
    },
    // 商品详情html文档的base url
    goods_detail_html_base_url: 'https://m.ngmm365.com/virtual-static/html/',
    // 帖子详情html文档的base url
    posts_detail_html_base_url: 'https://m.ngmm365.com/virtual-static/html/content/',
    // 付费内容文档内容
    knowledge_detail_html_base_url: 'https://m.ngmm365.com/virtual-static/html/knowledge/',
    // 默认的base url，没有匹配上base_url_map则使用default_base_url
    default_base_url: 'http://api.ngmm365.com/api',
    // 引导下载页面url
    go_download_page_url: 'https://m.ngmm365.com/page/441',
    // 笔记预览页面请求地址
    posts_detail_preview_html_base_url: 'https://adminapi.ngmm365.com/content/community/post/admin/detail',
    // 图片跨域处理路径
    proxy_img_base_url: 'https://sticker.ngmm365.com/proxy/image',

    mall_origin: 'https://m.ngmm365.com',
    // 数学盒子首页
    mathbox_index: 'https://m.ngmm365.com/mathbox/index',
    // 招募育儿顾问首页
    channelPartners_index: 'https://m.ngmm365.com/pay/parenting',
    // 分销培训中心地址
    training_center: 'https://m.ngmm365.com/page/2684',
    // 推广中心
    spread_page: 'https://m.ngmm365.com/page/3077'
  },
  // 预发环境（beta）
  beta: {
    // 每个模块对应的base_url
    base_url_map: {
      '/trade/': ['http://tradeapi.ngmm001.com'], // 订单模块
      '/account/': ['http://accountapi.ngmm001.com'], // app账户模块
      '/goods/': ['http://goodsapi.ngmm001.com'], // 商品模块
      '/pay/': ['http://payapi.ngmm001.com'], // 支付模块
      '/logistics/': ['http://lgscapi.ngmm001.com'], // 物流模块
      '/data/': ['http://dataapi.ngmm001.com'], // 数据统计模块
      '/cart/': ['http://cartapi.ngmm001.com'], // 购物车模块
      '/content/': ['http://contentapi.ngmm001.com'], // 内容模块
      '/mall/': ['http://cardapi.ngmm001.com'], // 优惠券
      '/protect/': ['http://protectapi.ngmm001.com'], // 维权
      '/internalAccount/': ['http://accountapi.ngmm001.com'], // 内部员工信息录入
      '/buyershow/': ['http://buyershowapi.ngmm001.com'], // 买家秀
      '/personalCenter/': ['http://contentapi.ngmm001.com'], // App用户中心
      '/follower/': ['http://contentapi.ngmm001.com'], // App关注用户
      '/knowledge/': ['http://knowledgeapi.ngmm001.com'], // 付费内容
      '/card/': ['http://cardapi.ngmm001.com'], // 裂变活动
      '/message/': ['http://contentapi.ngmm001.com'], // 消息
      '/community/': ['http://english.ngmm001.com'], // 皮皮爱英语
      '/distribution/': ['http://distributionapi.ngmm001.com'], // 分销
      '/education/': ['http://knowledgeapi.ngmm001.com'], // 付费内容
      '/dist/': ['http://distapi.ngmm001.com']// 分销
    },
    // 商品详情html文档的base url
    goods_detail_html_base_url: 'http://m.ngmm001.com/virtual-static/html/',
    // 帖子详情html文档的base url
    posts_detail_html_base_url: 'http://m.ngmm001.com/virtual-static/html/content/',
    // 付费内容文档内容
    knowledge_detail_html_base_url: 'http://m.ngmm001.com/virtual-static/html/knowledge/',
    // 默认的base url，没有匹配上base_url_map则使用default_base_url
    default_base_url: 'http://api.ngmm001.com/api',
    // 引导下载页面url
    go_download_page_url: 'http://m.ngmm001.com/page/165',
    // 笔记预览页面请求地址
    posts_detail_preview_html_base_url: 'http://adminapi.ngmm001.com/content/community/post/admin/detail',
    // 图片跨域处理路径
    proxy_img_base_url: 'http://proxyimg.ngmm001.com/proxy/image',

    mall_origin: 'http://m.ngmm001.com',
    // 数学盒子首页
    mathbox_index: 'http://m.ngmm001.com/mathbox/index',
    // 招募育儿顾问首页
    channelPartners_index: 'http://m.ngmm001.com/pay/parenting',
    // 分销培训中心地址
    training_center: 'http://m.ngmm001.com/page/547',
    // 推广中心
    spread_page: 'http://m.ngmm001.com/page/559'
  },

  // 254测试环境
  test: {
    base_url_map: {
      '/trade/': ['http://10.86.10.243:8100'], // 订单模块
      '/account/': ['http://10.86.10.242:10101'], // app账户模块
      '/goods/': ['http://10.86.10.243:10201'], // 商品模块
      '/pay/': ['http://10.86.10.243:8040'], // 支付模块
      '/logistics/': ['http://10.86.10.243:8040'], // 物流模块
      '/data/': ['http://10.86.10.243:10101'], // 数据统计模块
      '/cart/': ['http://10.86.10.243:8050'], // 购物车模块
      '/content/': ['http://10.86.10.243:8103'], // 内容模块
      '/mall/': ['http://10.86.10.243:8120'], // 优惠券
      '/protect/': ['http://10.86.10.243:8130'], // 维权
      '/login_session/': ['http://10.86.10.254:9100/api'],
      '/internalAccount/': ['http://10.86.10.242:10101'], // 内部员工信息录入
      '/buyershow/': ['http://10.86.10.243:8131'], // 买家秀
      '/personalCenter/': ['http://10.86.10.243:8103'], // App用户中心
      '/follower/': ['http://10.86.10.243:8103'], // App关注用户
      '/knowledge/': ['http://10.86.10.243:8139'], // 付费内容
      '/message/': ['http://10.86.10.243:8103'], // 消息
      '/education/': ['http://10.86.10.243:8139'] // 付费内容
    },
    // 商品详情html文档的base url
    goods_detail_html_base_url: 'http://m.ngmm001.com/virtual-static/html/',
    // 帖子详情html文档的base url
    posts_detail_html_base_url: 'http://m.ngmm001.com/virtual-static/html/content/',
    // 付费内容文档内容
    knowledge_detail_html_base_url: 'http://m.ngmm001.com/virtual-static/html/knowledge/',
    default_base_url: 'http://10.86.10.254:9000/api',
    // 引导下载页面url
    go_download_page_url: 'http://m.ngmm001.com/page/165',
    // 笔记预览页面请求地址
    posts_detail_preview_html_base_url: 'http://10.86.10.243:8102/content/community/post/admin/detail',
    // 图片跨域处理路径
    proxy_img_base_url: 'http://proxyimg.ngmm001.com/proxy/image',

    mall_origin: 'http://m.ngmm001.com',
    // 数学盒子首页
    mathbox_index: 'http://m.ngmm001.com/mathbox/index',
    // 招募育儿顾问首页
    channelPartners_index: 'http://m.ngmm001.com/pay/parenting',
    // 分销培训中心地址
    training_center: 'http://m.ngmm001.com/page/547',
    // 推广中心
    spread_page: 'http://m.ngmm001.com/page/559'
  },

  // 本地开发环境
  local: {
    base_url_map: {
      '/login_session/': ['http://10.86.10.254:9100/api']
    },
    // 商品详情html文档的base url
    goods_detail_html_base_url: 'http://m.ngmm001.com/virtual-static/html/',
    // 帖子详情html文档的base url
    posts_detail_html_base_url: 'http://m.ngmm001.com/virtual-static/html/content/',
    // 付费内容文档内容
    knowledge_detail_html_base_url: 'http://m.ngmm001.com/virtual-static/html/knowledge/',
    default_base_url: 'http://localhost:3200/api',
    //
    // default_base_url: "http://10.86.10.43:8080",
    // default_base_url: "http://10.86.10.43:8080",
    // 引导下载页面url
    go_download_page_url: 'http://m.ngmm001.com/page/165',
    // 笔记预览页面请求地址
    posts_detail_preview_html_base_url: 'http://adminapi.ngmm001.com/content/community/post/admin/detail',
    // 图片跨域处理路径
    proxy_img_base_url: 'http://proxyimg.ngmm001.com/proxy/image',

    mall_origin: 'http://m.ngmm001.com',
    // 数学盒子首页
    mathbox_index: 'http://m.ngmm001.com/mathbox/index',
    // 招募育儿顾问首页
    channelPartners_index: 'http://m.ngmm001.com/pay/parenting',
    // 分销培训中心地址
    training_center: 'http://m.ngmm001.com/page/547',
    // 推广中心
    spread_page: 'http://m.ngmm001.com/page/559'
  }
}

let config = {}
let API_ENV = process.env.API_ENV
if (API_ENV === 'pro') {
  config = Object.assign({}, map.base, map['pro'])
} else if (API_ENV === 'beta') {
  config = Object.assign({}, map.base, map['beta'])
} else if (API_ENV === 'test') {
  config = Object.assign({}, map.base, map['test'])
} else {
  // config = Object.assign({}, map.base, map['local'])
  // config = Object.assign({}, map.base, map['test'])
  config = Object.assign({}, map.base, map['beta'])
  // config = Object.assign({}, map.base, map['pro'])
}

export default config
