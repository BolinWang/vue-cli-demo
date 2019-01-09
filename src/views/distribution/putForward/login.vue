<template>
  <section v-if="pageInfo.dataIsLoad">
    <div class="section-bg" />

    <div class="section-main">
      <ul>
        <li>
          <label>
            <div class="li-content border5">
              <div class="_left">
                手机号
              </div>
              <div class="_center">
                <input
                  v-model="phone"
                  type="text"
                  maxlength="11"
                >
              </div>
            </div>
          </label>
        </li>
        <li>
          <label class="getcode-content">
            <div class="li-content border5">
              <div class="_left">
                验证码
              </div>
              <div class="_center">
                <input
                  v-model="code"
                  type="tel"
                  maxlength="6"
                >
              </div>
            </div>
            <div class="button-wrap">
              <template v-if="getPhoneCodeing">
                <button disabled>
                  60s后再次获取
                </button>
              </template>
              <template v-else>
                <button :disabled="getCodeBtnDisabled">
                  获取验证码
                </button>
              </template>
            </div>
          </label>
        </li>
      </ul>

      <button
        class="login-btn"
        :disabled="loginDisabled"
      >
        登录
      </button>
    </div>
  </section>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import pageShareMixin from '@/mixins/pageShare.js'

export default {
  mixins: [pageShareMixin],
  data () {
    return {
      getPhoneCodeing: false
    }
  },
  computed: {
    ...mapState({
      'pageInfo': 'pagePutForwardLogin',
      'popupUI': 'popupUI'
    }),
    phone: {
      set (val) {
        this.setPhone(val)
      },
      get () {
        let { pageInfo } = this
        return pageInfo.phone || ''
      }
    },
    code: {
      set (val) {
        this.setCode(val)
      },
      get () {
        let { pageInfo } = this
        return pageInfo.code || ''
      }
    },
    loginDisabled () {
      let { popupUI, phone, code } = this
      return popupUI.PopupUILoading || phone.length < 11 || code.length < 6
    },
    getCodeBtnDisabled () {
      let { phone } = this
      return phone.length < 11
    }
  },
  created () {

  },
  methods: {
    ...mapMutations({
      'resetData': 'pagePutForwardLogin/resetData',
      'setPhone': 'pagePutForwardLogin/setPhone',
      'setCode': 'pagePutForwardLogin/setCode'
    }),
    ...mapActions({
      'getPhoneCode': 'pagePutForwardLogin/getPhoneCode'
    })
  }
}
</script>
<style lang="less" scoped>
section{
    font-family:PingFangSC-Regular;
    background:white;
    .section-bg{
        position: absolute;
        left:0;
        top:0;
        width:100%;
        height:100%;
        background:white;
    }
    .section-main{
        position: relative;
        z-index: 1;
        padding-top:0.22rem;
    }
    ul{
        width:3.065rem;
        margin:0 auto;
        margin-bottom:0.57rem;
        li{
            padding-top:0.15rem;
            position: relative;
            label{
                display: block;
                width:100%;
                height:100%;
                &.getcode-content{
                    display: flex;
                    align-items: center;
                    .button-wrap{
                        flex:0 0 1.215rem;
                        width:1.215rem;
                        text-align:center;
                        button{
                            margin-left:0.115rem;
                            width:1.1rem;
                            height:0.32rem;
                            line-height:0.32rem;
                            padding:0;
                            border-radius:0.155rem;
                            border:1px solid #FFAC2D;
                            color:#FFAC2D;
                            letter-spacing:0.005rem;
                            font-size:0.12rem;
                            font-family:PingFangSC-Medium;
                            font-weight:500;
                            background:none;
                            &:disabled{
                                border:1px solid #ccc;
                                color:#ccc;
                            }
                        }
                    }
                }
            }
            .li-content{
                position: relative;
                display: flex;
                height:0.4rem;
                line-height:0.4rem;
                align-items: center;
                &:before{
                    border:none;
                    bottom:0;
                    border-bottom:1px solid #E0E0E0;
                    transform-origin: left bottom;
                    height:0.03rem;
                }
                ._left{
                    flex: 0 0 0.62rem;
                    width:0.62rem;
                }
                ._center{
                    flex: auto;
                    min-width: 0;
                    input{
                        border:none;
                        padding:0;
                        display:block;
                        width:100%;
                        color:#222222;
                        height:0.2rem;
                        line-height:0.2rem;
                        outline: none;
                    }
                }
            }
        }
    }
    .login-btn{
        width:2.65rem;
        height:0.49rem;
        background:rgba(255,172,45,1);
        border-radius:0.27rem;
        margin: 0 auto;
        border:none;
        display:block;
        padding:0;
        color:white;
        font-size:0.15rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        margin-bottom:0.32rem;
        &:disabled{
            background:#ccc;
        }
    }
}
</style>
