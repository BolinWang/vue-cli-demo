<template>
  <ul class="menu">
    <li @click="goDataCenter">
      <div class="_left">
        <img src="../../../../assets/images/distribution/index/sjzx.png">
      </div>
      <div class="_right">
        数据中心
      </div>
    </li>
    <li
      v-if="pageInfo.data.roleId == 1"
      @click="goChannelPartnersList"
    >
      <div class="_left">
        <img src="../../../../assets/images/distribution/index/qdhhr.png">
      </div>
      <div class="_right">
        我的渠道合伙人
      </div>
    </li>
    <li
      v-if="pageInfo.data.roleId == 1 || pageInfo.data.roleId == 2"
      @click="goGoldConsultantsList"
    >
      <div class="_left">
        <img src="../../../../assets/images/distribution/index/jpgw.png">
      </div>
      <div class="_right">
        我的育儿大使
      </div>
    </li>
    <li
      v-if="pageInfo.data.roleId == 1 || pageInfo.data.roleId == 2 || pageInfo.data.roleId == 3"
      @click="goChildcareConsultants"
    >
      <div class="_left">
        <img src="../../../../assets/images/distribution/index/yrgw.png">
      </div>
      <div class="_right">
        我的育儿顾问
      </div>
    </li>
    <li
      v-if="pageInfo.data.roleId == 1 || pageInfo.data.roleId == 2 || pageInfo.data.roleId == 3"
      @click="goChannelPartnersIndex"
    >
      <div class="_left">
        <img src="../../../../assets/images/distribution/index/zmyrgw.png">
      </div>
      <div class="_right">
        招募育儿顾问
      </div>
    </li>
    <li @click="goCustomerList">
      <div class="_left">
        <img src="../../../../assets/images/distribution/index/kh.png">
      </div>
      <div class="_right">
        我的客户
      </div>
    </li>
    <li
      v-if="pageInfo.data.roleId == 4"
      @click="goChannelPartnersIndex"
    >
      <div class="_left">
        <img src="../../../../assets/images/distribution/index/zmyrgw.png">
      </div>
      <div class="_right">
        邀请育儿顾问<span>您和好友各得{{ pageInfo.data.couponAmount }}元无门槛券</span>
      </div>
    </li>
    <template v-if="withdrawSwitch">
      <template v-if="pageInfo.data.roleId == 3 || pageInfo.data.roleId == 4">
        <li @click="goPutForwardIndex">
          <div class="_left">
            <img src="../../../../assets/images/distribution/index/tx.png">
          </div>
          <div class="_right">
            提现
          </div>
        </li>
      </template>
    </template>
  </ul>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Config from '@/config-urls'

export default {
  computed: {
    ...mapState({
      'pageInfo': 'pageDistributionIndex'
    }),
    withdrawSwitch () {
      let { pageInfo: { data } } = this
      return data.withdrawSwitch || false
    }
  },
  methods: {
    goDataCenter () {
      this.$router.push({
        path: `/distribution/dataCenter/index`
      })
    },
    goGoldConsultantsList () {
      this.$router.push({
        path: `/distribution/goldConsultants/list`
      })
    },
    goChannelPartnersList () {
      this.$router.push({
        path: `/distribution/channelPartners/list`
      })
    },
    goChannelPartnersIndex () {
      this.locationHref(Config.channelPartners_index)
    },
    goCustomerList () {
      this.$router.push({
        path: `/distribution/customer/list`
      })
    },
    goPutForwardIndex () {
      this.$router.push({
        path: `/distribution/putForward/index`
      })
    },
    goChildcareConsultants () {
      this.$router.push({
        path: `/distribution/childcareConsultants/list`
      })
    }
  }
}
</script>
<style lang="less" scoped>
.menu{
    padding-left:0.15rem;
    padding-bottom:0.1rem;
    padding-right:0.3rem;
    li{
        display: flex;
        ._left{
            flex: 0 0 0.5rem;
            width:0.5rem;
            height:0.6rem;
            position: relative;
            img{
                position: absolute;
                width:0.2rem;
                height:0.2rem;
                left:50%;
                top:50%;
                transform: translateX(-50%) translateY(-50%);
            }
        }
        ._right{
            flex: auto;
            min-width:0;
            border-bottom:0.005rem solid #F3F3F3;
            height:0.6rem;
            line-height:0.6rem;
            font-size:0.15rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:#222222;
            position:relative;
            span{
                font-size:.12rem;
                font-family:'PingFangSC-Light';
                font-weight:300;
                color:rgba(153,153,153,1);
                position: absolute;
                right:0;
                height: .6rem;
                line-height: .6rem;
            }
        }
        &:last-of-type{
            ._right{
                border:none;
            }
        }
    }
}
</style>
