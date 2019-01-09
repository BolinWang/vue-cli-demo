<template>
    <section v-if="pageInfo.dataIsLoad">
        <tabMenu></tabMenu>
        <template v-if="totalNumber">
            <list></list>
        </template>
        <template v-else>
            <empty></empty>
        </template>
    </section>
</template>
<script>
import tabMenu from './components/list/tab.vue';
import list from './components/list/list.vue';
import empty from '../components/empty.vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import pageShareMixin from '@/mixins/pageShare.js'

export default {
    mixins: [pageShareMixin],
    components: {
        tabMenu,
        list,
        empty
    },
    computed: {
        ...mapState({
            'pageInfo': 'pageOrderList'
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
            'resetData': 'pageOrderList/resetData'
        }),
        ...mapActions({
            'loadList': 'pageOrderList/loadList'
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
