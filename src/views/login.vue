<template>
  <div class="height-100">
    <div class="header text-center box">
      <div class="box-item-1">
        <img
          v-if="userInfo.head"
          :src="userInfo.head"
          class="avatar"
          alt=""
        >
        <img
          v-else
          src="../assets/images/avatar.png"
          class="avatar"
          alt=""
        >
      </div>
      <div class="p10-lr f18  m10-t c-22 f14 box-item-2">
        <p
          v-if="userInfo.nickname"
          class="f14"
        >
          {{ userInfo.nickname }}
          <span
            v-show="userInfo.nickname"
            :class="['btn','f18','p10']"
            @click="onMockLogout"
          >
            模拟退出
          </span>
        </p>
        <p
          v-else
          class="f14 c-999"
        >
          未登录，选择一个session模拟
        </p>
      </div>
    </div>
    <div class="header-gap" />
    <div class="search-wrap">
      <input
        v-model="condition.user_id"
        placeholder="user_id"
        class="text-left c-99 input-1"
      >
      <input
        v-model="condition.app_id"
        placeholder="app_id"
        class="text-left c-99 input-2"
      >
      <div
        class="btn btn-light  btn-search f12"
        @click="ajaxSearch"
      >
        搜索
      </div>
    </div>
    <div class="search-wrap-gap" />
    <div
      v-for="(item, index) in sessionList"
      :key="index"
      class="session-wrap bg-fff   m10-t box p10"
    >
      <div class="session">
        <div class="filed">
          <span class="field-title">
            user_id:
          </span> {{ item.user_id }}
        </div>
        <div class="filed">
          <span class="field-title">
            app_id:
          </span> {{ item.app_id }}
        </div>
        <div class="filed">
          <span class="field-title">
            login_type:
          </span> {{ item.login_type }}
        </div>
        <div class="filed">
          <h3>
            <span class="field-title">
              terminal:
            </span>
          </h3> {{ item.terminal }}
        </div>
        <div class="filed">
          <span class="field-title">
            access_token:
          </span> {{ item.access_token }}
        </div>
        <div class="filed">
          <h3>
            <span class="field-title">
              access_token_timeout:
            </span>
          </h3> {{ item.access_token_timeout }}
        </div>
      </div>
      <div class="session-title text-right">
        <span
          :class="['btn','f18','p10',{'btn-disable':item.user_id==currentSession.user_id && item.access_token==currentSession.access_token}]"
          @click="onMockLogin(item)"
        >
          {{ item.user_id==currentSession.user_id && item.access_token==currentSession.access_token?'已模拟':'模拟它' }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import {
  // eslint-disable-next-line no-unused-vars
  mapActions
} from 'vuex'

import Account from '@/logic/account'
import Cookie from 'js-cookie'

export default {
  data () {
    return {
      condition: {
        user_id: '',
        app_id: 'wx8aae36b94fe14a70',
        login_type: 'WECHAT',
        limit: 1000
      },
      // 当前登录的用户信息
      userInfo: {},

      // 当前选择的session
      currentSession: {},
      // 当前登录的session列表
      sessionList: []
    }
  },
  created () {
    this.ajaxSearch()
    this.ajaxUserInfo()
  },
  methods: {

    /**
         * 模拟退出功能
         * @return {[type]} [description]
         */
    onMockLogout () {
      this.currentSession = {}
      this.userInfo = {}
      Account.cleanContext()
    },

    /**
         * 获得用户信息
         * @return {[type]} [description]
         */
    ajaxUserInfo () {
      let _this = this
      let userId = Account.getUserId()
      var terminal = Account.getTerminal()

      if (userId) {
        // eslint-disable-next-line no-undef
        httpPost('/account/userInfo', {
          userId,
          terminal
        }, function (obj) {
          if (obj.code === 10000) {
            _this.userInfo = obj.data
          } else {
            _this.actionVuexMessageShow(obj.desc || '获取个人信息失败')
          }
        })
      } else {
        _this.actionVuexMessageShow('没有登录')
      }
    },
    /**
         * 获得当前登录session列表，从中选择一个模拟登录
         * @return {[type]} [description]
         */
    ajaxSearch () {
      let _this = this
      let condition = this.condition

      // eslint-disable-next-line no-undef
      httpPost('http://10.86.10.254:9100/api/login_session/list', condition, function (obj) {
        if (obj.code === 10000) {
          _this.sessionList = obj.data
        } else {
          _this.actionVuexMessageShow(obj.desc || '获取登录信息失败')
        }
      })
    },
    /**
         * 模拟登录
         * @param  {[type]} sessionItem [description]
         * @return {[type]}      [description]
         */
    onMockLogin (session) {
      let _this = this
      this.currentSession = session

      let id = session.id
      // eslint-disable-next-line no-undef
      httpPost('http://10.86.10.254:9100/api/login_session/info', {
        id
      }, function (obj) {
        if (obj.code === 10000) {
          let data = obj.data || {}

          Cookie.set('mock_app_id', data.app_id)
          Cookie.set('user_id', data.user_id)
          Cookie.set('access_token', data.access_token)
          Cookie.set('client_token', data.terminal)

          Account.initContext()

          _this.ajaxUserInfo()
        } else {
          _this.actionVuexMessageShow(obj.desc || '获取登录信息失败')
        }
      })
    }

  }
}

</script>
<style lang="less" scoped>
.box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 .1rem;
    .box-item-1 {
        width:0.6rem;
        flex: 0 0 .6rem;
    }
    .box-item-2 {
        flex: 1 1 auto;
        text-align: left;
    }
}

.session-wrap {
    box-sizing: border-box;
    .session-title {
        width:0.8rem;
        flex: 0 0 .8rem;
    }
    .session {
        flex: 1 1 auto;
        .filed {
            padding-bottom: .05rem;
            border-bottom: 1px dashed #ddd;
            color: #999;
            .field-title {
                color: #333;
            }
        }
    }
}

.item {
    box-sizing: border-box;
}

.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    height: .8rem;
    border-bottom: 1px solid #f0f0f0;
    box-sizing: border-box;
    background-color: #fff;
}

.header-gap {
    height: .8rem;
}

.avatar {
    width: .6rem !important;
    height: .6rem !important;
    border-radius: 100%;
}

.order-status-box {
    justify-content: space-around;
}

.coupons-number {
    text-align: right;
}

.banner {
    position: absolute;
    width: 100%;
    bottom: 2px;
    left: 0;
    height: 0.38rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 0.10rem;
    line-height: 1.5;
}

.btn {
    display: inline-block;
    box-sizing: border-box;
    background-color: #F15A0C;
    color: #fff;
    border-radius: .05rem;
    padding: .05rem .1rem;
}

.btn-disable {
    background-color: #999;
}

.search-wrap {
    position: fixed;
    width: 100%;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    height: .5rem;
    background-color: #eee;
    padding: .1rem;
    input {
        outline: none;
    }
}

.search-wrap-gap {
    height: .5rem;
}

.btn-light {
    border: 1px solid #F15A0C;
    background-color: #F15A0C;
    color: #fff;
}

.c-12 {
    color: #121212;
}

.c-99-l {
    color: #999999;
    font-family: PingFangSC-Light;
}

.c-6d {
    color: #6d6d6d;
}

.c-22 {
    color: #222222;
    font-family: PingFangSC-Regular;
}

.c-22-l {
    color: #222222;
    font-family: PingFangSC-Light;
}

.c-66-l {
    color: #666666;
    font-family: PingFangSC-Light;
}

.mb-7 {
    margin-bottom: 7px;
}

.input-1 {
    width: .7rem;
}

.input-2 {
    width: 1.6rem;
}

</style>
