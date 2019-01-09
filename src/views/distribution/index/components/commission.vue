<template>
  <!--顶级合伙人|渠道合伙人|育儿大使-->
  <div
    v-if="pageInfo.data.roleId == 1 || pageInfo.data.roleId == 2 || pageInfo.data.roleId == 3"
    class="commission card"
  >
    <h2>顾问体系佣金</h2>
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
import { mapState, mapGetters, mapActions } from 'vuex'

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
    }
  },
  methods: {
    goOrderList () {
      this.$router.push({
        path: `/distribution/order/list`
      })
    }
  }
}
</script>
<style lang="less" scoped>
.commission, .profit{
    width:3.51rem;
    height:1.605rem;
    background:#FFFFFF;
    border-radius:0.05rem;
    h2{
        height:0.53rem;
        line-height:0.53rem;
        font-size:0.15rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:#222;
        text-align:center;
    }
    .detailed{
        display: flex;
        margin-bottom:0.15rem;
        height:0.58rem;
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
