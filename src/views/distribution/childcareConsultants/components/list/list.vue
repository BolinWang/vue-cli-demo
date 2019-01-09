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
        <div class="title">
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
              招募时间：{{ formatDate(item.bindTime, 'yyyy-MM-dd') }}
            </p>
          </div>
        </div>
        <div class="content">
          <div class="item">
            <p class="p1">
              客户
            </p>
            <p class="p2">
              {{ item.consumerNum }}
            </p>
          </div>
          <div class="item">
            <p class="p1">
              累计销售
            </p>
            <p class="p2 light">
              <small>¥</small><strong>{{ ((item.sales || 0) / 100).toFixed(2) }}</strong>
            </p>
          </div>
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
      'pageInfo': 'pageChildcareConsultantsList'
    }),
    ...mapGetters({
      'scrollDisabled': 'pageChildcareConsultantsList/scrollDisabled'
    })
  },
  methods: {
    ...mapActions({
      'loadList': 'pageChildcareConsultantsList/loadList'
    })
  }
}
</script>
<style lang="less" scoped>
.list{
  padding-bottom:0.15rem;
  li{
    margin: 0 auto;
    margin-bottom:0.15rem;
    width:3.51rem;
    height:1.295rem;
    box-sizing: border-box;
    background:white;
    box-shadow:0 0.01rem 0.075rem 0 rgba(243,243,243,1);
    border-radius:0.06rem;
    &:last-of-type{
      margin-bottom:0;
    }
    .title{
      height:0.52rem;
      display: flex;
      align-items: center;
      padding-right:0.15rem;
      ._left{
        flex: 0 0 0.555rem;
        width:0.555rem;
        display:flex;
        justify-content: center;
        align-items: center;
        img{
          width:0.29rem;
          height:0.29rem;
          border-radius: 100%;
        }
      }
      ._center{
        flex:auto;
        min-width:0;
        .p1{
          height:0.165rem;
          line-height:0.165rem;
          font-size:0.12rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(34,34,34,1);
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          span{
            height:0.145rem;
            line-height:0.145rem;
            background:rgba(180,154,143,1);
            margin-right:0.055rem;
            box-sizing: border-box;
            font-size:0.1rem;
            color:white;
            padding:0 0.055rem;
            border-radius: 0.015rem;
          }
        }
        .p2{
          height:0.14rem;
          line-height:0.14rem;
          font-size:0.1rem;
          font-family:PingFangSC-Light;
          font-weight:300;
          color:rgba(153,153,153,1);
          margin-top:0.015rem;
        }
      }
      ._right{
        flex: 0 0 1.3rem;
        width:1.3rem;
        text-align:right;
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
      .content{
          display: flex;
          height:0.775rem;
          background:#FCFCFD;
          box-sizing: border-box;
          .item{
              padding-top:0.115rem;
              flex:1;
              text-align:center;
              .p1{
                  height:0.14rem;
                  font-size:0.1rem;
                  font-family:PingFangSC-Light;
                  font-weight:300;
                  color:rgba(102,102,102,1);
                  line-height:0.14rem;
                  margin-bottom:0.1rem;
              }
              .p2{
                  height:0.22rem;
                  font-size:0.12rem;
                  font-weight:bold;
                  color:rgba(102,102,102,1);
                  line-height:0.22rem;
                  letter-spacing:0.005rem;
                  strong{
                      font-size:0.18rem;
                  }
                  &.light{
                      color:rgba(255,101,101,1);
                  }
              }
          }
      }
  }
}
</style>
