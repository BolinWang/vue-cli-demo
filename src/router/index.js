const _import = require('./_import_' + process.env.NODE_ENV)
const routes = [
  // {
  //     path: '/',
  //     name: 'index',
  // meta: {
  //     title: '数学盒子',
  //     keepAlive: true, //是否使用vue的keepAlive缓存页面
  //     isRememberScrollPosition: true, //是否记忆滚动位置
  //     scrollWrapperId: '_inner_meta_scroll_wrapper-index', //滚动容器的ID，注意保持全局唯一
  // },
  //     alias: '/index', //别名
  //     component: function(resolve) {
  //         require(['./views/index/index'], resolve);
  //     }
  // },
  {
    path: '/distribution/index',
    name: 'distribution-index',
    meta: {
      title: '分销中心',
      keepAlive: true
    },
    component: _import('distribution/index/index')
  },
  {
    path: '/distribution/order/list',
    name: 'distribution-order-list',
    meta: {
      title: '顾问体系订单明细'
    },
    component: _import('distribution/order/list')
  },
  {
    path: '/distribution/profit/list',
    name: 'distribution-profit-list',
    meta: {
      title: '已结算收益明细'
    },
    component: _import('distribution/profit/list')
  },
  {
    path: '/distribution/channelPartners/list',
    name: 'distribution-channelPartners-list',
    meta: {
      title: '我的渠道合伙人'
    },
    component: _import('distribution/channelPartners/list')
  },
  {
    path: '/distribution/goldConsultants/list',
    name: 'distribution-goldConsultants-list',
    meta: {
      title: '我的育儿大使'
    },
    component: _import('distribution/goldConsultants/list')
  },
  {
    path: '/distribution/childcareConsultants/list',
    name: 'distribution-childcareConsultants-list',
    meta: {
      title: '我的育儿顾问'
    },
    component: _import('distribution/childcareConsultants/list')
  },
  {
    path: '/distribution/customer/list',
    name: 'distribution-customer-list',
    meta: {
      title: '我的客户'
    },
    component: _import('distribution/customer/list')
  },
  {
    path: '/distribution/dataCenter/index',
    name: 'distribution-dataCenter-index',
    meta: {
      title: '数据中心'
    },
    component: _import('distribution/dataCenter/index')
  },
  {
    path: '/distribution/putForward/index',
    name: 'distribution-putForward-index',
    meta: {
      title: '提现'
    },
    component: _import('distribution/putForward/index')
  },
  {
    path: '/distribution/putForward/detail',
    name: 'distribution-putForward-detail',
    meta: {
      title: '提现'
    },
    component: _import('distribution/putForward/detail')
  },
  // {
  //     path: '/distribution/putForward/login',
  //     name: 'distribution-putForward-login',
  //     meta: {
  //         title: '登录',
  //     },
  //     component: _import('distribution/putForward/login')
  // },
  {
    path: '/distribution/putForward/certification',
    name: 'distribution-putForward-certification',
    meta: {
      title: '实名认证'
    },
    component: _import('distribution/putForward/certification')
  },
  // {
  //     path: '/distribution/putForward/uploadIdCardImg',
  //     name: 'distribution-putForward-uploadIdCardImg',
  //     meta: {
  //         title: '上传身份证照片',
  //     },
  //     component: _import('distribution/putForward/uploadIdCardImg')
  // },
  {
    path: '/distribution/putForward/agreement',
    name: 'distribution-putForward-agreement',
    meta: {
      title: '服务协议'
    },
    component: _import('distribution/putForward/agreement')
  },
  {
    path: '/distribution/learn/index',
    name: 'distribution-learn-index',
    meta: {
      title: '学习和答题'
    },
    component: _import('distribution/learn/index')
  },
  {
    path: '/distribution/learn/detail',
    name: 'distribution-learn-detail',
    meta: {
      title: '学习和答题'
    },
    component: _import('distribution/learn/detail')
  },
  {
    path: '/distribution/learn/success',
    name: 'distribution-learn-success',
    meta: {
      title: '恭喜你完成结业'
    },
    component: _import('distribution/learn/success')
  },
  {
    path: '/distribution/router/index',
    name: 'distribution-router-index',
    meta: {
      title: '跳转中...'
    },
    component: _import('distribution/router/index')
  },
  //= =========以下是测试页面=========================
  {
    path: '/test',
    meta: {
      name: 'test',
      title: 'test'
    },
    component: _import('test')
  },
  {
    path: '/system-error',
    name: 'system-error',
    meta: {
      title: 'system-error'
    },
    component: _import('system-error')
  },
  {
    path: '*',
    name: '404',
    meta: {
      title: '找不到这个页面'
    },
    component: _import('404')
  }
]

export default routes
