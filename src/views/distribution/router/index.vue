<template>
    <section></section>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import pageShareMixin from '@/mixins/pageShare.js'

export default {
    mixins: [pageShareMixin],
    created(){
        this.loadData();
    },
    methods: {
        ...mapActions({
            'loadRecruitProcess': 'publicInterface/loadRecruitProcess'
        }),
        loadData(){
            //获取用户当前进度
            this.loadRecruitProcess().then(({ recruitProcess = [] } = {})=>{
                //nodeType 1-付款, 2-学习, 3-测评, 4-创建分销账户
                //nodeStatus 1-todo, 2-done
                let recruitProcess0 = recruitProcess[0] || {},
                    recruitProcess1 = recruitProcess[1] || {},
                    recruitProcess2 = recruitProcess[2] || {},
                    recruitProcess3 = recruitProcess[3] || {};

                //用户未付款直接报错
                if(recruitProcess0.nodeStatus != 2){
                    this.actionVuexMessageShow('未获取到付款信息，请刷新页面重试...');
                }else if(recruitProcess1.nodeStatus != 2 || recruitProcess2.nodeStatus != 2){
                    this.$router.replace({
                        path: `/distribution/learn/index`
                    });
                }else if(recruitProcess3.nodeStatus != 2){
                    this.$router.replace({
                        path: `/distribution/learn/success`
                    });
                }else{
                    this.$router.replace({
                        path: `/distribution/index`
                    });
                }
            }).catch(({ desc })=>{
                this.actionVuexMessageShow(desc || '系统异常');
            });
        }
    }
}
</script>

