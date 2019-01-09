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
            keepAlive: true,
        },
        component: function(resolve) {
            require(['./views/distribution/index/index.vue'], resolve);
        }
    },
    {
        path: '/distribution/order/list',
        name: 'distribution-order-list',
        meta: {
            title: '顾问体系订单明细',
        },
        component: function(resolve) {
            require(['./views/distribution/order/list.vue'], resolve);
        }
    },
    {
        path: '/distribution/profit/list',
        name: 'distribution-profit-list',
        meta: {
            title: '已结算收益明细',
        },
        component: function(resolve) {
            require(['./views/distribution/profit/list.vue'], resolve);
        }
    },
    {
        path: '/distribution/channelPartners/list',
        name: 'distribution-channelPartners-list',
        meta: {
            title: '我的渠道合伙人',
        },
        component: function(resolve) {
            require(['./views/distribution/channelPartners/list.vue'], resolve);
        }
    },
    {
        path: '/distribution/goldConsultants/list',
        name: 'distribution-goldConsultants-list',
        meta: {
            title: '我的育儿大使',
        },
        component: function(resolve) {
            require(['./views/distribution/goldConsultants/list.vue'], resolve);
        }
    },
    {
        path: '/distribution/childcareConsultants/list',
        name: 'distribution-childcareConsultants-list',
        meta: {
            title: '我的育儿顾问',
        },
        component: function(resolve) {
            require(['./views/distribution/childcareConsultants/list.vue'], resolve);
        }
    },
    {
        path: '/distribution/customer/list',
        name: 'distribution-customer-list',
        meta: {
            title: '我的客户',
        },
        component: function(resolve) {
            require(['./views/distribution/customer/list.vue'], resolve);
        }
    },
    {
        path: '/distribution/dataCenter/index',
        name: 'distribution-dataCenter-index',
        meta: {
            title: '数据中心',
        },
        component: function(resolve) {
            require(['./views/distribution/dataCenter/index.vue'], resolve);
        }
    },
    {
        path: '/distribution/putForward/index',
        name: 'distribution-putForward-index',
        meta: {
            title: '提现',
        },
        component: function(resolve) {
            require(['./views/distribution/putForward/index.vue'], resolve);
        }
    },
    {
        path: '/distribution/putForward/detail',
        name: 'distribution-putForward-detail',
        meta: {
            title: '提现',
        },
        component: function(resolve) {
            require(['./views/distribution/putForward/detail.vue'], resolve);
        }
    },
    // {
    //     path: '/distribution/putForward/login',
    //     name: 'distribution-putForward-login',
    //     meta: {
    //         title: '登录',
    //     },
    //     component: function(resolve) {
    //         require(['./views/distribution/putForward/login.vue'], resolve);
    //     }
    // },
    {
        path: '/distribution/putForward/certification',
        name: 'distribution-putForward-certification',
        meta: {
            title: '实名认证',
        },
        component: function(resolve) {
            require(['./views/distribution/putForward/certification.vue'], resolve);
        }
    },
    // {
    //     path: '/distribution/putForward/uploadIdCardImg',
    //     name: 'distribution-putForward-uploadIdCardImg',
    //     meta: {
    //         title: '上传身份证照片',
    //     },
    //     component: function(resolve) {
    //         require(['./views/distribution/putForward/uploadIdCardImg.vue'], resolve);
    //     }
    // },
    {
        path: '/distribution/putForward/agreement',
        name: 'distribution-putForward-agreement',
        meta: {
            title: '服务协议',
        },
        component: function(resolve) {
            require(['./views/distribution/putForward/agreement.vue'], resolve);
        }
    },
    {
        path: '/distribution/learn/index',
        name: 'distribution-learn-index',
        meta: {
            title: '学习和答题',
        },
        component: function(resolve) {
            require(['./views/distribution/learn/index.vue'], resolve);
        }
    },
    {
        path: '/distribution/learn/detail',
        name: 'distribution-learn-detail',
        meta: {
            title: '学习和答题',
        },
        component: function(resolve) {
            require(['./views/distribution/learn/detail.vue'], resolve);
        }
    },
    {
        path: '/distribution/learn/success',
        name: 'distribution-learn-success',
        meta: {
            title: '恭喜你完成结业',
        },
        component: function(resolve) {
            require(['./views/distribution/learn/success.vue'], resolve);
        }
    },
    {
        path: '/distribution/router/index',
        name: 'distribution-router-index',
        meta: {
            title: '跳转中...',
        },
        component: function(resolve) {
            require(['./views/distribution/router/index.vue'], resolve);
        }
    },
    //==========以下是测试页面=========================
    {
        path: '/test',
        meta: {
            name: 'test',
            title: 'test',
        },
        component: function(resolve) {
            require(['./views/test.vue'], resolve);
        }
    },
    {
        path: '/system-error',
        name: 'system-error',
        meta: {
            title: 'system-error',
        },
        component: function(resolve) {
            require(['./views/system-error.vue'], resolve);
        }
    },
    {
        path: '*',
        name: '404',
        meta: {
            title: '找不到这个页面',
        },
        component: function(resolve) {
            require(['./views/404.vue'], resolve);
        }
    },
]

export default routes
