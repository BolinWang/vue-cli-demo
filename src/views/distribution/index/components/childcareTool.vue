<template>
  <!--育儿顾问-->
  <div
    v-if="pageInfo.data.roleId == 4"
    class="childcareTool card"
  >
    <h2>
      <template v-if="pageInfo.data.isPromote === false">
        您差 <template v-if="needCustomer > 0">
          <strong>{{ needCustomer }}</strong> 位客户
        </template><template v-if="needCustomer > 0 && needSales > 0">
          和
        </template><template v-if="needSales > 0">
          <strong><small>￥</small>{{ needSales }}</strong>元销售额
        </template><br>
        <template>或 再招募<strong>{{ needAdviser }}</strong><span>位育儿顾问</span></template><template>
          即可晋升为<strong>「育儿大使」</strong><img
            src="../../../../assets/images/wenhao.png"
            @click="clickImg"
          >
        </template>
      </template>
      <template v-else>
        您已成功晋升为育儿大使，预估系统15分钟左右对您的身份界面完成升级！
      </template>
    </h2>
    <div class="detailed">
      <div class="_left">
        <div class="title">
          已结算收入<small class="sq">
            (税前)
          </small>
        </div>
        <div class="amount">
          <small>¥</small><strong>{{ commission }}</strong>
        </div>
      </div>
      <div class="line" />
      <div class="_right">
        <div class="title">
          未结算收入<small class="sq">
            (税前)
          </small>
        </div>
        <div class="amount">
          <small>¥</small><strong>{{ waitCommission }}</strong>
        </div>
      </div>
    </div>
    <div
      class="more"
      @click="goOrderList"
    >
      订单明细<t-icon name="arrow-right" />
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState({
      'pageInfo': 'pageDistributionIndex'
    }),
    // 已结算佣金
    commission () {
      let { pageInfo: { data } } = this
      return data.commission ? (data.commission / 100).toFixed(2) : '0.00'
    },
    // 未结算佣金
    waitCommission () {
      let { pageInfo: { data } } = this
      return data.waitCommission ? (data.waitCommission / 100).toFixed(2) : '0.00'
    },
    needCustomer () {
      let { pageInfo: { data } } = this
      return data.needCustomer ? data.needCustomer : 0
    },
    needSales () {
      let { pageInfo: { data } } = this
      return data.needSales ? (data.needSales / 100).toFixed(2) : '0'
    },
    needAdviser () {
      let { pageInfo: { data } } = this
      return data.needAdviser ? data.needAdviser : 0
    }
  },
  methods: {
    ...mapMutations({
      'show': 'pageDistributionIndex/show'
    }),
    goOrderList () {
      this.$router.push({
        path: `/distribution/order/list`
      })
    },
    clickImg () {
      this.show()
      // this.$emit('clickImg')
    }
  }
}
</script>
<style lang="less" scoped>
.childcareTool{
    width:3.51rem;
    background:#FFFFFF;
    border-radius:0.05rem;
    overflow: hidden;
    padding-bottom:0.18rem;
    h2{
        line-height:0.23rem;
        font-size:0.12rem;
        font-family:PingFangSC-Light;
        font-weight:500;
        color:#666;
        text-align:center;
        background:#F6F8FB;
        box-sizing:border-box;
        padding:0.07rem 0.12rem;
        strong{
            font-family:PingFangSC-Medium;
            margin: 0 0.025rem;
            font-size:0.14rem;
        }
        small{
            font-size:0.1rem;
        }
        span{
            margin-right: .105rem;
        }
        img{
            width: .135rem;
            height: .135rem;
            background: 100% 100% no-repeat;
            vertical-align:sub;
            margin-left: -.09rem;
        }
    }
    .detailed{
        display: flex;
        height:0.91rem;
        align-items: center;
        text-align:center;
        ._left, ._right{
            flex:1;
            .title{
                height:0.165rem;
                font-size:0.12rem;
                font-family:PingFangSC-Light;
                font-weight:300;
                color:rgba(153,153,153,1);
                line-height:0.165rem;
                small.sq{
                    font-family:PingFangSC-Light;
                    font-weight:300;
                    color:rgba(153,153,153,1);
                    font-size:0.1rem;
                }
            }
            .amount{
                height:0.395rem;
                font-size:0.2rem;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:rgba(255,101,101,1);
                line-height:0.395rem;
                strong{
                    font-size:0.3rem;
                    margin-left:0.035rem;
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
    .more{
        text-align:center;
        color:#636880;
        height:0.165rem;
        line-height:0.165rem;
        font-size:0.12rem;
        i{
            font-weight: bold;
            font-size:0.12rem;
            line-height:0.125rem;
            margin-left:0.04rem;
            transform: translateY(0.003rem);
        }
    }
}
</style>
