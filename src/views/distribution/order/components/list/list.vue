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
        :key="item.distOrderId"
      >
        <template v-if="item.directadviserName">
          <div class="role-mark-wrap">
            <div class="role-mark">
              育儿顾问：{{ item.directadviserName }}
            </div>
          </div>
        </template>
        <div class="li-content">
          <div class="title">
            <div class="_left">
              <template v-if="item.customerHeadimgurl">
                <img :src="item.customerHeadimgurl | ali(80)">
              </template>
              <template v-else>
                <img src="../../../../../assets/images/avatar.png">
              </template>
            </div>
            <div class="_center">
              <p class="p1">
                {{ item.customerUserName }}
              </p>
              <p class="p2">
                订单编号：{{ item.orderId }}
              </p>
            </div>
            <div class="_right">
              <p
                class="p1"
                :class="{'wjs': item.settlementStatus == 1, 'yjs': item.settlementStatus == 3, 'ytk': item.settlementStatus == 4}"
              >
                {{ getSettlementStatusStr(item.settlementStatus) }}
              </p>
              <p class="p2">
                {{ formatDate(item.createdTime, 'yyyy.MM.dd hh:mm:ss') }}
              </p>
            </div>
          </div>
          <div class="content">
            <div class="_left">
              <img :src="item.itemIcon | ali(64)">
            </div>
            <div class="_center">
              <p class="p1">
                {{ item.itemTitle }}
              </p>
              <p
                class="p2"
                :style="getPayment(item.payment).length >= 6 ? 'font-size:0.1rem' : ''"
              >
                客户实付：¥{{ getPayment(item.payment) }}
              </p>
              <template v-if="item.settlementStatus == 4">
                <p class="p3">
                  退&nbsp;&nbsp;&nbsp;&nbsp;款：¥{{ getRefundAmount(item.refundAmount) }}
                </p>
              </template>
            </div>
            <div class="_right">
              <p class="p1">
                应收<small class="sq">
                  (税前)：
                </small><strong>¥{{ getCommission(item.commission) }}</strong>
              </p>
            </div>
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
      'pageInfo': 'pageOrderList'
    }),
    ...mapGetters({
      'scrollDisabled': 'pageOrderList/scrollDisabled'
    })
  },
  methods: {
    ...mapActions({
      'loadList': 'pageOrderList/loadList'
    }),
    getSettlementStatusStr (settlementStatus) {
      if (settlementStatus == 1) {
        return '未结算'
      } else if (settlementStatus == 3) {
        return '已结算'
      } else if (settlementStatus == 4) {
        return '已退款'
      }
    },
    getPayment (payment) {
      return payment ? (payment / 100).toFixed(2) : '0.00'
    },
    getCommission (commission) {
      return commission ? (commission / 100).toFixed(2) : '0.00'
    },
    getRefundAmount (refundAmount) {
      return refundAmount ? (refundAmount / 100).toFixed(2) : '0.00'
    }
  }
}
</script>
<style lang="less" scoped>
.list{
    padding-top:0.15rem;
    padding-bottom:0.15rem;
    li{
        margin-bottom:0.15rem;
        .role-mark-wrap{
            position: relative;
            height:0.17rem;
        }
        .role-mark{
            height:0.34rem;
            line-height:0.34rem;
            background:rgba(180,154,143,1);
            color:white;
            text-align:center;
            transform: scale(0.5);
            font-size:0.2rem;
            transform-origin: right top;
            position: absolute;
            right:0.25rem;
            top:0;
            white-space: nowrap;
            padding:0 0.17rem;
            border-radius: 0 0.03rem 0 0;
            &:before{
                content: '';
                border-left:0.1rem solid transparent;
                border-top:0 solid transparent;
                border-bottom:0.34rem solid rgba(180,154,143,1);
                border-right:0 solid transparent;
                position: absolute;
                left:0;
                top:0;
                transform: translateX(-100%);
            }
        }
        .li-content{
            margin: 0 auto;
            width:3.51rem;
            height:1.445rem;
            box-sizing: border-box;
            background:white;
            box-shadow:0 0.04rem 0.125rem 0 rgba(93,93,93,0.08);
            border-radius:0.06rem;
            overflow:hidden;
            position:relative;
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
                        position: relative;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        span{
                            height:0.145rem;
                            line-height:0.145rem;
                            font-size:0.1rem;
                            padding:0 0.055rem;
                            display:inline-block;
                            margin-right:0.02rem;
                            box-sizing: border-box;
                            border-radius: 0.015rem;
                            &.span-wrap{
                                visibility: hidden;
                            }
                            &.span-main{
                                position:absolute;
                                left:0;
                                top:0;
                                height:0.29rem;
                                line-height:0.29rem;
                                background:rgba(180,154,143,1);
                                font-size:0.2rem;
                                transform: scale(0.5);
                                transform-origin: left top;
                                color:white;
                                padding:0 0.11rem;
                                border-radius: 0.03rem;
                            }
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
                        word-break:break-all;
                    }
                }
                ._right{
                    flex: 0 0 1.1rem;
                    width:1.1rem;
                    text-align:right;
                    .p1{
                        height:0.165rem;
                        font-size:0.12rem;
                        font-weight:400;
                        color:rgba(153,153,153,1);
                        line-height:0.165rem;
                        word-break:break-all;
                        &.wjs{
                            color:rgba(255,162,32,1);
                        }
                        &.yjs{
                            color:rgba(114,201,27,1);
                        }
                    }
                    .p2{
                        height:0.14rem;
                        font-size:0.1rem;
                        font-family:PingFangSC-Light;
                        font-weight:300;
                        color:rgba(153,153,153,1);
                        line-height:0.14rem;
                        word-break:break-all;
                    }
                }
            }
            .content{
                display: flex;
                height:0.925rem;
                align-items: center;
                padding-right:0.15rem;
                background:#FCFCFD;
                box-sizing: border-box;
                position:relative;
                ._left{
                    flex: 0 0 0.945rem;
                    width:0.945rem;
                    height:0.925rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        width:0.64rem;
                        height:0.64rem;
                    }
                }
                ._center{
                    flex: auto;
                    min-width: 0;
                    height:0.925rem;
                    box-sizing: border-box;
                    padding-top:0.155rem;
                    .p1{
                        max-height:0.4rem;
                        font-size:0.16rem;
                        font-weight:400;
                        color:rgba(34,34,34,1);
                        line-height:0.2rem;
                        margin-bottom:0.07rem;
                        display: -webkit-box;
                        /* autoprefixer: off */
                        -webkit-box-orient: vertical;
                        /* autoprefixer: on */
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        word-break:break-all;
                    }
                    .p2{
                        height:0.15rem;
                        font-size:0.12rem;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(102,102,102,1);
                        line-height:0.15rem;
                        margin-bottom:0.05rem;
                        word-break:break-all;
                    }
                    .p3{
                        height:0.15rem;
                        font-size:0.12rem;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(102,102,102,1);
                        line-height:0.15rem;
                    }
                }
                ._right{
                    // flex: 0 0 1.1rem;
                    width:1.1rem;
                    position:absolute;
                    right:0.12rem;
                    bottom:0;
                    display: flex;
                    height:0.925rem;
                    box-sizing: border-box;
                    .p1{
                        position: absolute;
                        right:0;
                        bottom:0.19rem;
                        height:0.15rem;
                        font-size:0.12rem;
                        font-weight:400;
                        color:rgba(102,102,102,1);
                        line-height:0.15rem;
                        word-break:break-all;
                        text-align: right;
                        width:3rem;
                        small{
                            font-size:0.1rem;
                        }
                        strong{
                            font-size:0.16rem;
                            font-weight:bold;
                            color:rgba(255,101,101,1);
                            line-height:0.195rem;
                            letter-spacing:0.005rem;
                        }
                    }
                }
            }
        }
    }
}
</style>
