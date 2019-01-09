<template>
  <div class="userinfo">
    <div class="avatar">
      <template v-if="pageInfo.data.headimgurl">
        <img :src="pageInfo.data.headimgurl | ali(40)">
      </template>
      <template v-else>
        <img src="../../../../assets/images/avatar.png">
      </template>
    </div>
    <div class="userid">
      ID:{{ pageInfo.data.userId || '无' }}
    </div>
    <div class="role">
      <template v-if="pageInfo.data.roleId">
        <ul>
          <li
            v-show="pageInfo.data.roleId == 1"
            class="djhhr"
          >
            <img src="../../../../assets/images/distribution/common/role/djhhr.png">
          </li>
          <li
            v-show="pageInfo.data.roleId == 2"
            class="qdhhr"
          >
            <img src="../../../../assets/images/distribution/common/role/qdhhr.png">
          </li>
          <!-- roleType 1是顾问 2是合伙人  合伙人也是育儿大使-->
          <li
            v-show="pageInfo.data.roleType == 2 || pageInfo.data.roleId == 3"
            class="jpgw"
          >
            <img src="../../../../assets/images/distribution/common/role/jpgw.png">
          </li>
          <li
            v-show="pageInfo.data.roleId == 4"
            class="yrgw"
          >
            <img src="../../../../assets/images/distribution/common/role/yrgw.png">
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      'pageInfo': 'pageDistributionIndex'
    })
  }
}
</script>

<style lang="less" scoped>
.userinfo{
    height:0.67rem;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    .avatar{
        flex: 0 0 0.4rem;
        width:0.4rem;
        margin-left:0.19rem;
        img{
            width:0.4rem;
            height:0.4rem;
            display: block;
            border-radius: 100%;
        }
    }
    .userid{
        flex:0 0 0.9rem;
        width: 0.9rem;
        margin-left:0.165rem;
        color:white;
    }
    .role{
        flex:auto;
        min-width:0;
        ul{
            display: flex;
            flex-wrap:nowrap;
            li{
                color:#806154;
                flex:auto;
                min-width:0;
                img{
                    display: block;
                }
                &.djhhr{
                    flex:0 0 0.78rem;
                    width:0.78rem;
                    height:0.25rem;
                }
                &.qdhhr{
                    flex:0 0 0.78rem;
                    width:0.78rem;
                    height:0.25rem;
                }
                &.jpgw{
                    flex:0 0 0.71rem;
                    width:0.71rem;
                    height:0.25rem;
                }
                &.yrgw{
                    flex:0 0 0.71rem;
                    width:0.71rem;
                    height:0.25rem;
                }
            }
        }
    }
}
</style>
