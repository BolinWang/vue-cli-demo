<template>
  <section
    v-if="pageInfo.dataIsLoad"
    class="distribution-index-wrap"
  >
    <div
      v-if="pageInfo.isShow"
      class="section-tc"
    >
      <div class="tc-box">
        <p class="tc-content">
          成为育儿大使后，您可以发展更多人成为你的育儿顾问，一起科学育儿。同时您的育儿顾问赚取的收益，您也会有分润。
        </p>
        <p
          class="tc-button"
          @click="clickImg()"
        >
          确定
        </p>
      </div>
    </div>
    <div class="section-bg" />
    <div class="section-main">
      <!-- 用户信息 -->
      <userInfo />
      <!-- 合伙人收益 -->
      <profit />
      <!-- 佣金 -->
      <commission />
      <!-- 育儿顾问信息卡 -->
      <childcareTool />
      <!-- 培训中心 -->
      <trainingCenter />
      <!-- 爆款推荐banner -->
      <bkBanner />
      <!-- 菜单 -->
      <toolMenu />
      <!-- 获取帮助 -->
      <helpBar />
    </div>
  </section>
</template>
<script>
import userInfo from './components/userInfo.vue'
import toolMenu from './components/toolMenu.vue'
import commission from './components/commission.vue'
import profit from './components/profit.vue'
import childcareTool from './components/childcareTool.vue'
import trainingCenter from './components/trainingCenter.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
import pageShareMixin from '@/mixins/pageShare.js'
import helpBar from './components/helpBar.vue'
import bkBanner from './components/banner.vue'

export default {
  components: {
    userInfo,
    toolMenu,
    commission,
    profit,
    childcareTool,
    trainingCenter,
    helpBar,
    bkBanner
  },
  mixins: [pageShareMixin],
  computed: {
    ...mapState({
      'pageInfo': 'pageDistributionIndex'
    })
  },
  created () {
    // 重置数据
    this.resetData()
  },
  activated () {
    this.setScroll()
    this.loadData()
  },
  methods: {
    ...mapMutations({
      'resetData': 'pageDistributionIndex/resetData',
      'hide': 'pageDistributionIndex/hide'
    }),
    ...mapActions({
      'loadData': 'pageDistributionIndex/loadData'
    }),
    setScroll () {
      let { name } = this.$route

      let key = name + '-scrollTop'

      let scrollTop = sessionStorage.getItem(key) || 0

      this.$nextTick(() => {
        window.scrollTo(0, scrollTop)
      })
    },
    clickImg () {
      this.hide()
    }
  }
}
</script>
<style lang="less">
.distribution-index-wrap{
    .card{
        margin:0 auto;
        margin-bottom:0.16rem;
        box-shadow:0 0.04rem 0.125rem 0 rgba(93,93,93,0.08);
        &:last-of-type{
            margin-bottom:0.06rem;
        }
    }
}
</style>

<style lang="less" scoped>
section{
    font-family:PingFangSC-Regular;
    background:white;
    .section-bg{
        height:100%;
        background:white url(../../../assets/images/distribution/common/section-bg.png) no-repeat center -0.875rem;
        background-size: 3.75rem 2.53rem;
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
    }
    .section-tc{
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .7);
        // opacity: 0.7;
        z-index: 100;
        .tc-box{
            width: 2.7rem;
            background: rgba(255,255,255,1);
            border-radius: .06rem;
            margin-left: .525rem;
            margin-top: 50%;
            .tc-content{
                width: 2.18rem;
                height: 1.12rem;
                margin-left: .26rem;
                padding-top: .205rem;
                font-size: .15rem;
                font-family: 'PingFangSC-Regular';
                font-weight: 400;
                color: #666666;
                line-height: .28rem;
            }
            .tc-button{
                width: 1rem;
                height: .54rem;
                text-align: center;
                line-height: .54rem;
                margin-left: 1.7rem;
                font-size: .16rem;
                font-family: 'PingFangSC-Regular';
                font-weight: 400;
                color: rgba(255,255,255,1);
                background: url(../../../assets/images/button.png);
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
        }
    }
}
</style>
