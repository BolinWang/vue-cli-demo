<template>
    <section>
        <img src="../../../assets/images/distribution/learn/success.png"/>
        <button @click="goSpreadPage">查看上手攻略</button>
    </section>
</template>
<script>
import Config from '@/config-urls';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import pageShareMixin from '@/mixins/pageShare.js'

export default {
    mixins: [pageShareMixin],
    methods: {
        ...mapActions({
            'loadRecruitProcess': 'publicInterface/loadRecruitProcess'
        }),
        goSpreadPage(){
            // //获取用户当前进度
            // this.loadRecruitProcess().then(({ recruitProcess = [] } = {})=>{
            //     //nodeType 1-付款, 2-学习, 3-测评, 4-创建分销账户
            //     //nodeStatus 1-todo, 2-done
            //     recruitProcess = recruitProcess[3] || {};

            //     let { nodeStatus } = recruitProcess;
            //     if(nodeStatus != 2){
            //         this.actionVuexMessageShow('正在为您创建账户中，请稍后重试...');
            //     }else{
            //         this.$router.replace({
            //             path: `/distribution/index`
            //         });
            //     }
            // }).catch(({ desc })=>{
            //     this.actionVuexMessageShow(desc || '系统异常');
            // });

            window.location.href = Config.spread_page;
        }
    }
}
</script>

<style lang="less" scoped>
section{
    font-family:PingFangSC-Regular;
    position: absolute;
    width:100%;
    height:100%;
    background:#222;
    overflow-y: auto;
    img{
        display: block;
        width:3.165rem;
        height:4.635rem;
        margin: 0 auto;
    }
    button{
        position: absolute;
        border:none;
        left:50%;
        transform: translateX(-50%);
        width:2.5rem;
        top:3.65rem;
        opacity: 0;
        height:0.5rem;
    }
}
</style>
