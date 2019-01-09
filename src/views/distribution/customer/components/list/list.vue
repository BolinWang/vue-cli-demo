<template>
  <div
    v-infinite-scroll="loadList"
    class="catalog-content-wrap"
    infinite-scroll-disabled="scrollDisabled"
    infinite-scroll-distance="10"
  >
    <ul class="list">
      <li
        v-for="item in pageInfo.list"
        :key="item.userId"
      >
        <div class="_left">
          <template v-if="item.userAvatar">
            <img :src="item.userAvatar | ali(29)">
          </template>
          <template v-else>
            <img src="../../../../../assets/images/avatar.png">
          </template>
        </div>
        <div class="_center">
          <p class="p1">
            {{ item.userName }}
          </p>
          <p class="p2">
            ID：{{ item.userId }}
          </p>
        </div>
        <div class="_right">
          <p class="p1">
            绑定时间：{{ formatDate(item.createdTime, 'yyyy-MM-dd') }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      'pageInfo': 'pageCustomerList'
    }),
    ...mapGetters({
      'scrollDisabled': 'pageCustomerList/scrollDisabled'
    })
  },
  methods: {
    ...mapActions({
      'loadList': 'pageCustomerList/loadList'
    })
  }
}
</script>
<style lang="less" scoped>
.list{
    padding-top:0.02rem;
    padding-bottom:0.15rem;
    li{
        display: flex;
        align-items: center;
        padding:0.13rem 0;
        ._left{
            flex: 0 0 0.845rem;
            width:0.845rem;
            display:flex;
            justify-content: center;
            align-items: center;
            img{
                width:0.49rem;
                height:0.49rem;
                border-radius: 100%;
            }
        }
        ._center{
            flex:auto;
            min-width:0;
            .p1{
                height:0.2rem;
                font-size:0.14rem;
                font-weight:400;
                color:rgba(34,34,34,1);
                line-height:0.2rem;
                margin-bottom:0.045rem;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            .p2{
                height:0.165rem;
                font-size:0.12rem;
                font-family:PingFangSC-Light;
                font-weight:300;
                color:rgba(153,153,153,1);
                line-height:0.165rem;
            }
        }
        ._right{
            flex: 0 0 1.425rem;
            width:1.425rem;
            text-align:right;
            padding-right:0.2rem;
            box-sizing: border-box;
            .p1{
                height:0.165rem;
                font-size:0.1rem;
                font-weight:400;
                color:rgba(153,153,153,1);
                line-height:0.165rem;
                &.wjs{
                    color:rgba(255,162,32,1);
                }
                &.yjs{
                    color:rgba(114,201,27,1);
                }
            }
        }
    }
}
</style>
