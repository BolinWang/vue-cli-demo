<template>
  <div>
    test
    <button @click="mockLogin('bolin')">
      柏林
    </button>
    <button @click="mockLogin('3450001')">
      柏林3450001
    </button>
    <button @click="go(10058)">
      10058
    </button>
    <button @click="go(10250)">
      10250
    </button>
    <button @click="go(10274)">
      10274
    </button>
    <button @click="go(113)">
      113
    </button>
    <button @click="go(10138)">
      10138免费
    </button>
    <button @click="go(32021)">
      32021免费
    </button>
  </div>
</template>
<script>
import Cookie from 'js-cookie'

export default {
  data () {
    return {
      userInfo: {
        'default': {
          client_token: '921463166ded446d9b1eed96bbd19045',
          client_version: '2.0.1',
          gr_imp_1356382514: '{"expiredAt":1522389778227,"value":true}',
          login_type: 'h5_mock',
          method_version: '1.0',
          network_type: 'unknown',
          pingpp_uid: 'xIaIhmOGRpshy8YlJSNg0nZHJQJEwnTw',
          platform: 'wechat',
          system_version: '10.1.1',
          wechatCurPage: 'http://m.ngmm001.com/',
          user_id: '1510003',
          access_token: '12825cfefa6b46c49294f3b1abd91279'
        },
        'bolin': {
          client_token: 'oC7_TwomrnT7_TBnxSSp3yiuK3qc',
          user_id: '3210017',
          access_token: '24f8e5ad52bc4203bc9a283c1f058c5b'
        },
        '3450001': {
          client_token: 'oC7_Twitdf5d6Aesqja4MLVW6LOY',
          user_id: '3450001',
          access_token: '3de7b1f23d724bc3964d859301208338'
        }
      }
    }
  },
  created () {
    this.mockLogin('default')
  },
  methods: {
    go (val) {
      window.location.href = `${location.origin}/mathbox/detail/${val}`
      // this.$router.push({
      //     path: `/mathbox/detail/${val}`
      // })
    },
    mockLogin (user) {
      const userData = this.userInfo[user] || {}
      for (let key in userData) {
        Cookie.set(key, userData[key])
      }
      if (user !== 'default') {
        this.$router.push({
          path: '/distribution/index'
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
button{
    border:1px solid black;
}
</style>
