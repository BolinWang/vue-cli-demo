<template>
    <section v-if="pageInfo.dataIsLoad">
        <template v-if="totalNumber">
            <div class="tip">
                您目前拥有<strong>{{totalNumber}}</strong>位渠道合伙人
            </div>
            <list></list>
        </template>
        <template v-else>
            <empty content="您暂时还没有渠道合伙人"></empty>
        </template>
    </section>
</template>
<script>
import list from './components/list/list.vue';
import empty from '../components/empty.vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import pageShareMixin from '@/mixins/pageShare.js'

export default {
    mixins: [pageShareMixin],
    components: {
        list,
        empty
    },
    computed: {
        ...mapState({
            'pageInfo': 'pageChannelPartnersList'
        }),
        totalNumber(){
            let { pageInfo: { totalNumber, list } } = this;
            return totalNumber || list.length;
        }
    },
    created(){
        this.resetData();
        this.loadList();
    },
    methods: {
        ...mapMutations({
            'resetData': 'pageChannelPartnersList/resetData'
        }),
        ...mapActions({
            'loadList': 'pageChannelPartnersList/loadList'
        })
    }
}
</script>
<style lang="less" scoped>
section{
    font-family:PingFangSC-Regular;
    background:#F6F8FB;
    .tip{
        height:0.44rem;
        font-size:0.12rem;
        font-family:PingFangSC-Light;
        font-weight:300;
        color:rgba(102,102,102,1);
        line-height:0.44rem;
        padding-left:0.15rem;
        strong{
            font-size:0.15rem;
            margin: 0 0.025rem;
            font-family:PingFangSC-Regular;
        }
    }
}
</style>
