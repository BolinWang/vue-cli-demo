<template>
  <section
    v-if="pageInfo.dataIsLoad"
    class="data-center-index-wrap"
  >
    <div class="section-bg" />
    <div class="section-main">
      <!-- 累计数据 -->
      <dataInfo />

      <tab />

      <list />
    </div>
  </section>
</template>
<script>
import dataInfo from './components/dataInfo.vue'
import list from './components/list.vue'
import tab from './components/tab.vue'
// eslint-disable-next-line no-unused-vars
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import pageShareMixin from '@/mixins/pageShare.js'

export default {
  components: {
    dataInfo,
    list,
    tab
  },
  mixins: [pageShareMixin],
  computed: {
    ...mapState({
      'pageInfo': 'pageDataCenterIndex'
    })
  },
  created () {
    this.resetData()
    this.initState()
    this.loadData()
    this.loadList()
  },
  methods: {
    ...mapMutations({
      'resetData': 'pageDataCenterIndex/resetData',
      'initState': 'pageDataCenterIndex/initState'
    }),
    ...mapActions({
      'loadData': 'pageDataCenterIndex/loadData',
      'loadList': 'pageDataCenterIndex/loadList'
    })
  }
}
</script>
<style lang="less">
.data-center-index-wrap{
    .mint-popup{
        transform: translate3d(-50%,0,1px);
    }
    .picker-item{
        color: #e0e0e0;
    }
    .picker-item.picker-selected{
        color:#000;
    }
    .picker-items{
        width:100%;
    }
}
</style>
<style lang="less" scoped>
section{
    font-family:PingFangSC-Regular;
    background:#F6F8FB;
    .section-bg{
        height:1.2rem;
        background:url(../../../assets/images/distribution/common/section-bg.png) no-repeat center bottom;
        background-size: 3.75rem 2rem;
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
}
</style>
