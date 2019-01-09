<template>
  <div
    v-if="pageInfo.data.roleId == 3 || pageInfo.data.roleId == 4"
    class="help-bar-wrap"
  >
    <p
      class="help-bar"
      @click="showHelpDialog"
    >
      获取帮助<t-icon name="arrow-right" />
    </p>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import helpDialog from '@/views/distribution/components/helpDialog/index'

export default {
  computed: {
    ...mapState({
      'pageInfo': 'pageDistributionIndex'
    })
  },
  methods: {
    showHelpDialog () {
      helpDialog({ el: this.$el })
    }
  }
}
</script>
<style lang="less" scoped>
.help-bar{
    text-align:center;
    margin-top:0.25rem;
    font-size:0.12rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(101,105,129,1);
    padding:0.2rem 0;
    i{
        font-weight: bold;
        font-size:0.12rem;
        line-height:0.125rem;
        margin-left:0.04rem;
        transform: translateY(0.003rem);
    }
}
</style>
