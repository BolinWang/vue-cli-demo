<template>
    <ul class="list">
        <li v-for="item in list" :key="item.month">
            <div class="content data-center-list-item" :data-role="item.month">
                <h2>{{getYear(item)}}年{{getMonth(item)}}月数据</h2>
                <div class="detailed">
                    <div class="_left">
                        <div class="title">
                            销售额<span class="sq">(税前)</span>
                        </div>
                        <div class="amount">
                            <small>¥</small><strong>{{((item.sales || 0) / 100).toFixed(2)}}</strong>
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="_right">
                        <div class="title">
                            已结算收入<span class="sq">(税前)</span>
                        </div>
                        <div class="amount">
                            <small>¥</small><strong>{{(((item.bonus || 0) + (item.commission || 0)) / 100).toFixed(2)}}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            'pageInfo': 'pageDataCenterIndex'
        }),
        list(){
            let { pageInfo } = this;
            let list = pageInfo.list || [];
            return list.reverse();
        }
    },
    methods: {
        getYear({ month }){
            return (month + '').substring(0, 4);
        },
        getMonth({ month }){
            return parseInt((month + '').substring(4, 6))
        }
    }
}
</script>
<style lang="less" scoped>
.list{
    padding-bottom:0.15rem;
    li{
        margin-bottom:0.15rem;
        .content{
            width:3.51rem;
            height:1.5rem;
            background:#FFFFFF;
            border-radius:0.05rem;
            margin:0 auto;
            h2{
                height:0.55rem;
                line-height:0.55rem;
                font-size:0.15rem;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:#222;
                text-align:center;
            }
            .detailed{
                display: flex;
                margin-bottom:0.15rem;
                height:0.58rem;
                align-items: center;
                text-align:center;
                ._left, ._right{
                    flex:1;
                    .title{
                        height:0.165rem;
                        font-size:0.12rem;
                        font-family:PingFangSC-Light;
                        font-weight:300;
                        color:rgba(153,153,153,1);
                        line-height:0.165rem;
                        span.sq{
                            font-size:0.1rem;
                            color:#999;
                        }
                    }
                    .amount{
                        height:0.395rem;
                        font-size:0.2rem;
                        font-family:PingFangSC-Medium;
                        font-weight:600;
                        color:#666666;
                        line-height:0.395rem;
                        strong{
                            font-size:0.32rem;
                            margin-left:0.03rem;
                        }
                    }
                }
                .line{
                    flex: 0 0 1px;
                    width:1px;
                    height:0.325rem;
                    background:rgba(232,232,232,1);
                }
            }
        }
    }
}
</style>
