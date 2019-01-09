<template>
  <div class="training-center card">
    <h2>
      培训中心
    </h2>
    <div
      class="more"
      @click="goLearnIndex"
    >
      快速掌握致富秘籍<t-icon name="arrow-right" />
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { mapState, mapGetters, mapActions } from 'vuex'
import Config from '@/config-urls'

export default {
  ...mapState({
    'pageInfo': 'pageDistributionIndex'
  }),
  methods: {
    goLearnIndex () {
      this.locationHref(Config.training_center)
    }
  }
}
</script>

<style lang="less" scoped>
.training-center{
    width:3.51rem;
    height:0.81rem;
    background:rgba(255,255,255,1);
    box-shadow:0 0.04rem 0.125rem 0 rgba(93,93,93,0.08);
    border-radius:0.05rem;
    h2{
        font-size:0.15rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(34,34,34,1);
        line-height:0.43rem;
        height:0.43rem;
        text-align: center;
        i{
            margin-left:0.015rem;
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
