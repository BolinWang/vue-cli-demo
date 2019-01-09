<template>
  <section v-if="pageInfo.dataIsLoad">
    <tabMenu />
    <template v-if="totalNumber">
      <list />
    </template>
    <template v-else>
      <empty />
    </template>
  </section>
</template>
<script>
import tabMenu from './components/list/tab.vue'
import list from './components/list/list.vue'
import empty from '../components/empty.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import pageShareMixin from '@/mixins/pageShare.js'

export default {
  components: {
    tabMenu,
    list,
    empty
  },
  mixins: [pageShareMixin],
  computed: {
    ...mapState({
      'pageInfo': 'pageOrderList'
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
      'resetData': 'pageOrderList/resetData'
    }),
    ...mapActions({
      'loadList': 'pageOrderList/loadList'
    })
  }
}
</script>
<style lang="less" scoped>
section{
    font-family:PingFangSC-Regular;
    background:#F6F8FB;
}
</style>
