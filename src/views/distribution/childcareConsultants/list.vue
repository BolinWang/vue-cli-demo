<template>
  <section v-if="pageInfo.dataIsLoad">
    <section class="bg" />
    <section class="main">
      <template v-if="totalNumber">
        <div class="tip">
          您目前拥有<strong>{{ totalNumber }}</strong>位育儿顾问
        </div>
        <list />
      </template>
      <template v-else>
        <empty content="您暂时还没有育儿顾问" />
      </template>
    </section>
  </section>
</template>
<script>
import list from './components/list/list.vue'
import empty from '../components/empty.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
import pageShareMixin from '@/mixins/pageShare.js'

export default {
  components: {
    list,
    empty
  },
  mixins: [pageShareMixin],
  computed: {
    ...mapState({
      'pageInfo': 'pageChildcareConsultantsList'
    }),
    totalNumber () {
      let { pageInfo: { totalNumber, list } } = this
      return totalNumber || list.length
    }
  },
  created () {
    this.resetData()
    this.loadList()
  },
  methods: {
    ...mapMutations({
      'resetData': 'pageChildcareConsultantsList/resetData'
    }),
    ...mapActions({
      'loadList': 'pageChildcareConsultantsList/loadList'
    })
  }
}
</script>
<style lang="less" scoped>
section{
  font-family:PingFangSC-Regular;
  &.bg{
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    background:#F6F8FB;
  }
  &.main{
    position: relative;
    z-index:1;
  }
  .tip{
    height:0.44rem;
    font-size:0.12rem;
    font-family:PingFangSC-Light;
    font-weight:300;
    color:rgba(102,102,102,1);
    line-height:0.44rem;
    padding-left:0.15rem;
    strong{
      font-size:0.15rem;
      margin: 0 0.025rem;
      font-family:PingFangSC-Regular;
    }
  }
}
</style>
