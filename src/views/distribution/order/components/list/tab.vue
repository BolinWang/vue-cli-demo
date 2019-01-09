<template>
  <div>
    <div class="tab-wrap" />
    <ul class="tab">
      <li
        :class="{'active': !settlementStatus}"
        @click="changeTab(null)"
      >
        <span>全部</span>
      </li>
      <li
        :class="{'active': settlementStatus == 1}"
        @click="changeTab(1)"
      >
        <span>未结算</span>
      </li>
      <li
        :class="{'active': settlementStatus == 3}"
        @click="changeTab(3)"
      >
        <span>已结算</span>
      </li>
      <li
        :class="{'active': settlementStatus == 4}"
        @click="changeTab(4)"
      >
        <span>已退款</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      'pageInfo': 'pageOrderList'
    }),
    settlementStatus () {
      let { pageInfo } = this
      return pageInfo.settlementStatus || null
    }
  },
  methods: {
    ...mapMutations({
      'resetData': 'pageOrderList/resetData',
      'setSettlementStatus': 'pageOrderList/setSettlementStatus'
    }),
    ...mapActions({
      'loadList': 'pageOrderList/loadList'
    }),
    changeTab (settlementStatus) {
      if (settlementStatus == this.settlementStatus) return

      window.scroll(0, 0)
      this.setSettlementStatus(settlementStatus)
      this.resetData({ changeSettlementStatus: true })
      this.loadList()
    }
  }
}
</script>

<style lang="less" scoped>
.tab-wrap{
    height:0.4rem;
}
.tab{
    display: flex;
    align-items: center;
    justify-content: center;
    position:fixed;
    left:0;
    top:0;
    width:100%;
    z-index:10;
    li{
        background:#FCFCFC;
        flex: 1;
        color:#666666;
        height:0.4rem;
        display: flex;
        justify-content: center;
        span{
            height:0.35rem;
            line-height:0.4rem;
            box-sizing: border-box;
            position:relative;
            &:after{
                content: '';
                position: absolute;
                left:50%;
                bottom:0;
                transform: translateX(-50%);
                height:0.02rem;
                width:90%;
                border-radius:0.015rem;
            }
        }
        &.active{
            span{
                &:after{
                    background:#636880;
                }
            }
        }
    }
}
</style>
