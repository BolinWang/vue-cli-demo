<template>
  <section v-if="pageInfo.dataIsLoad">
    <div class="section-bg" />
    <div class="section-main">
      <!-- 可提现金额 -->
      <div class="putForward card">
        <h2>
          可提现金额<small class="sq">
            (税前)
          </small>
        </h2>
        <div class="putForward-amount">
          <small>¥</small><strong>{{ remain }}</strong>
        </div>
        <template v-if="pageInfo.data.roleId == 1 || pageInfo.data.roleId == 2">
          <div class="detailed">
            <div class="_left">
              <div class="title">
                顾问佣金
              </div>
              <div class="amount">
                <small>¥</small><strong>{{ commission }}</strong>
              </div>
            </div>
            <div class="line" />
            <div class="_right">
              <div class="title">
                合伙人收益
              </div>
              <div class="amount">
                <small>¥</small><strong>{{ bonus }}</strong>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="already-presented">
      <p class="p1">
        已提现金额<small class="sq">
          (税前)
        </small></h2>
      </p>
      <p class="p2">
        <small>¥</small><strong>{{ withdraw }}</strong>
      </p>
    </div>

    <button
      class="tx-btn"
      :disabled="popupUI.PopupUILoading || remain <= 0"
      @click="doPutForward"
    >
      提现
    </button>

    <template v-if="withdrawInfoIsload">
      <template v-if="!withdrawInfo || withdrawInfo.signUpStatus != 2">
        <div
          class="txxxbq"
          @click="goPutForwardCertification"
        >
          提现信息补全<t-icon name="arrow-right" />
        </div>
      </template>
    </template>

    <div class="putForward-tip">
      发起提现后，收入会在7个工作日内到账
    </div>
  </section>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import putForwardDialog from './components/putForwardDialog'
import pageShareMixin from '@/mixins/pageShare.js'

export default {
  mixins: [pageShareMixin],
  computed: {
    ...mapState({
      'pageInfo': 'pagePutForwardIndex',
      'popupUI': 'popupUI',
      'pagePutForwardCertificationPageInfo': 'pagePutForwardCertification'
    }),
    remain () {
      let { pageInfo: { data } } = this
      return data.remain ? (data.remain / 100).toFixed(2) : '0.00'
    },
    commission () {
      let { pageInfo: { data } } = this
      return data.commission ? (data.commission / 100).toFixed(2) : '0.00'
    },
    bonus () {
      let { pageInfo: { data } } = this
      return data.bonus ? (data.bonus / 100).toFixed(2) : '0.00'
    },
    withdraw () {
      let { pageInfo: { data } } = this
      return data.withdraw ? (data.withdraw / 100).toFixed(2) : '0.00'
    },
    withdrawInfoIsload () {
      let { pageInfo: { withdrawInfoIsload } } = this
      return withdrawInfoIsload || false
    },
    withdrawInfo () {
      let { pageInfo: { withdrawInfo } } = this
      return withdrawInfo || {}
    }
  },
  created () {
    this.resetData()
    this.loadData()
    this.loadWithdrawInfo()
  },
  methods: {
    ...mapMutations({
      'resetData': 'pagePutForwardIndex/resetData'
    }),
    ...mapActions({
      'loadData': 'pagePutForwardIndex/loadData',
      'loadWithdrawInfo': 'pagePutForwardIndex/loadWithdrawInfo',
      'withdrawStart': 'pagePutForwardIndex/withdrawStart'
    }),
    doPutForward () {
      // 检测一下用户是否已经补全过信息
      this.loadWithdrawInfo().then((withdrawInfo) => {
        // 已经完善过信息
        if (withdrawInfo && withdrawInfo.signUpStatus == 2) {
          // 弹窗填写信息
          putForwardDialog({ el: this.$el,
            callback: (amount) => {
              if (amount) {
              // 发起提现
                this.withdrawStart({ amount }).then(() => {
                  this.actionVuexMessageShow('申请提现成功～')
                  // 重新加载数据
                  this.loadData()
                })
              }
            } })
        } else {
          this.goPutForwardCertification()
        }
      })
    },
    goPutForwardCertification () {
      this.$router.push({
        path: '/distribution/putForward/certification'
      })
    }
  }
}
</script>
<style lang="less" scoped>
section{
    font-family:PingFangSC-Regular;
    background:#F6F8FB;
    .section-bg{
        height:0.995rem;
        background:linear-gradient(131deg,rgba(42,46,82,1) 0%,rgba(41,38,77,1) 100%);
        position: absolute;
        left:0;
        top:0;
        width:100%;
        border-bottom-right-radius: 0.6rem 0.1rem;
        border-bottom-left-radius: 0.6rem 0.1rem;
    }
    .section-main{
        position: relative;
        z-index: 1;
        padding-top:0.22rem;
    }
    .putForward{
        width:3.51rem;
        // height:1.5rem;
        background:#FFFFFF;
        border-radius:0.05rem;
        margin:0 auto;
        margin-bottom:0.32rem;
        padding-bottom:0.3rem;
        h2{
            height:0.55rem;
            line-height:0.55rem;
            font-size:0.15rem;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:#222;
            text-align:center;
            color:#222;
            small.sq{
                font-size:0.12rem;
                color:#666666;
            }
        }
        .putForward-amount{
            height:0.375rem;
            font-size:0.2rem;
            font-family:PingFangSC-Medium;
            font-weight:600;
            color:rgba(255,101,101,1);
            line-height:0.375rem;
            text-align:center;
            strong{
                font-size:0.3rem;
                margin-left:0.03rem;
            }
        }
        .detailed{
            display: flex;
            height:0.58rem;
            align-items: center;
            text-align:center;
            margin-top:0.2rem;
            ._left, ._right{
                flex:1;
                .title{
                    height:0.165rem;
                    font-size:0.12rem;
                    font-family:PingFangSC-Light;
                    font-weight:300;
                    color:#999999;
                    line-height:0.165rem;
                }
                .amount{
                    height:0.3rem;
                    font-size:0.2rem;
                    font-family:PingFangSC-Medium;
                    font-weight:600;
                    color:#666666;
                    line-height:0.395rem;
                    strong{
                        font-size:0.22rem;
                        margin-left:0.03rem;
                    }
                }
            }
            .line{
                flex: 0 0 1px;
                width:1px;
                height:0.325rem;
                background:rgba(232,232,232,1);
            }
        }
    }
    .already-presented{
        text-align:center;
        .p1{
            height:0.21rem;
            font-size:0.15rem;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(34,34,34,1);
            line-height:0.21rem;
            margin-bottom:0.1rem;
            small.sq{
                font-size:0.12rem;
                color:#666666;
            }
        }
        .p2{
            height:0.395rem;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(255,101,101,1);
            line-height:0.395rem;
            margin-bottom:0.3rem;
            small{
                font-size:0.2rem;
            }
            strong{
                font-size:0.32rem;
                margin-left:0.025rem;
            }
        }
    }
    .tx-btn{
        width:1.53rem;
        height:0.4rem;
        background:rgba(255,172,45,1);
        border-radius:0.245rem;
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
    .txxxbq{
        height:0.21rem;
        font-size:0.15rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(44,45,82,1);
        line-height:0.21rem;
        text-align:center;
        i{
            margin-left:0.02rem;
            &:before{
                font-weight: bold;
                line-height:0.17rem;
            }
        }
    }

    .putForward-tip{
        text-align:center;
        position: absolute;
        bottom:0.2rem;
        width:100%;
        height:0.165rem;
        font-size:0.12rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:0.165rem;
    }
}
</style>
