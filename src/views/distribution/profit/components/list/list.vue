<template>
    <div class="catalog-content-wrap" v-infinite-scroll="loadList"
                infinite-scroll-disabled="scrollDisabled"
                infinite-scroll-distance="10">
        <ul class="list">
            <li v-for="item in pageInfo.list" :key="item.distOrderId">
                <div class="title">
                    <div class="_left">
                        销售分红
                    </div>
                    <div class="_right">
                        {{ getSettlementStatusStr(item.settlementStatus) }}
                    </div>
                </div>
                <div class="content">
                    <div class="_left">
                        <img :src="item.itemIcon | ali(80)"/>
                    </div>
                    <div class="_center">
                        <p class="p1">
                            {{item.itemTitle}}
                        </p>
                    </div>
                    <div class="_right">
                        <p class="p1">收 益：<strong>¥{{getCommission(item.commission)}}</strong></p>
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
            'pageInfo': 'pageProfitList'
        }),
        ...mapGetters({
            'scrollDisabled': 'pageProfitList/scrollDisabled'
        })
    },
    methods: {
        ...mapActions({
            'loadList': 'pageProfitList/loadList'
        }),
        getCommission(commission){
            return commission ? (commission / 100).toFixed(2) : '0.00';
        },
        getSettlementStatusStr(settlementStatus){
            if(settlementStatus == 1){
                return '未结算';
            }else if(settlementStatus == 3){
                return '已结算';
            }else if(settlementStatus == 4){
                return '已退款';
            }
        }
    }
}
</script>
<style lang="less" scoped>
.list{
    padding-top:0.15rem;
    padding-bottom:0.15rem;
    li{
        margin: 0 auto;
        margin-bottom:0.15rem;
        width:3.51rem;
        height:1.445rem;
        box-sizing: border-box;
        background:white;
        box-shadow:0 0.01rem 0.075rem 0 rgba(243,243,243,1);
        border-radius:0.06rem;
        &:last-of-type{
            margin-bottom:0;
        }
        .title{
            height:0.37rem;
            display: flex;
            align-items: center;
            padding-left:0.17rem;
            padding-right:0.15rem;
            ._left{
                flex: auto;
                min-width:0;
            }
            ._right{
                flex: 0 0 0.5rem;
                width:0.5rem;
                text-align:right;
                font-size:0.12rem;
                font-weight:400;
                color:rgba(153,153,153,1);
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
</style>
