<template>
  <section v-if="pageInfo.dataIsLoad">
    <div class="aliplayer-wrap">
      <aliplayer
        :url="pageInfo.data.audition"
        media-type="video"
        progress-type="2"
      />
    </div>
    <p class="tip">
      只差最后一步啦！<br>完成答题即可升级为育儿顾问！
    </p>
    <button
      class="start-btn"
      @click="goLearnDetail"
    >
      开始答题
    </button>
  </section>
</template>
<script>
import aliplayer from '@/components/media/aliplayer'
// eslint-disable-next-line no-unused-vars
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import pageShareMixin from '@/mixins/pageShare.js'

export default {
  components: {
    aliplayer
  },
  mixins: [pageShareMixin],
  computed: {
    ...mapState({
      'pageInfo': 'pageLearnIndex'
    })
  },
  created () {
    this.resetData()
    // 获取用户当前进度
    this.loadRecruitProcess().then(({ recruitProcess = [] } = {}) => {
      // nodeType 1-付款, 2-学习, 3-测评, 4-创建分销账户
      // nodeStatus 1-todo, 2-done
      recruitProcess = recruitProcess[0] || {}

      let { nodeStatus } = recruitProcess
      if (nodeStatus !== 2) {
        this.actionVuexMessageShow('未获取到付款信息，请刷新页面重试...')
      } else {
        this.loadData()
      }
    }).catch(({ desc }) => {
      this.actionVuexMessageShow(desc || '系统异常')
    })
  },
  methods: {
    ...mapMutations({
      'resetData': 'pageLearnIndex/resetData'
    }),
    ...mapActions({
      'loadData': 'pageLearnIndex/loadData',
      'loadRecruitProcess': 'publicInterface/loadRecruitProcess'
    }),
    goLearnDetail () {
      this.$router.push({
        path: '/distribution/learn/detail'
      })
    }
  }
}
</script>

<style lang="less" scoped>
section{
    font-family:PingFangSC-Regular;
    position: absolute;
    width:100%;
    height:100%;
    background:white;
    .aliplayer-wrap{
        height:2.21rem;
    }
    .tip{
        font-size:0.18rem;
        color:#333;
        line-height:0.35rem;
        margin-top:0.4rem;
        text-align:center;
    }
    button.start-btn{
        display: block;
        width:2.65rem;
        height:0.49rem;
        background:rgba(255,172,45,1);
        border-radius:0.27rem;
        margin:0 auto;
        outline: none;
        padding:0;
        border:none;
        font-size:0.16rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:0.225rem;
        letter-spacing:0.01rem;
        margin-top:0.525rem;
        box-shadow:0 0.05rem 0.065rem 0 rgba(255,202,122,0.4);
    }
}
</style>
