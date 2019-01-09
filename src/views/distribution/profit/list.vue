<template>
    <section v-if="pageInfo.dataIsLoad">
        <template v-if="totalNumber">
            <list></list>
        </template>
        <template v-else>
            <empty></empty>
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
            'pageInfo': 'pageProfitList'
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
            'resetData': 'pageProfitList/resetData'
        }),
        ...mapActions({
            'loadList': 'pageProfitList/loadList'
        })
    }
}
</script>
<style lang="less" scoped>
section{
    font-family:PingFangSC-Regular;
    background:#F6F8FB;
}
</style>
