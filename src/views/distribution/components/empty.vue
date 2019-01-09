<template>
    <div class="empty-wrap">
        <img src="../../../assets/images/distribution/common/empty-bg.png"/>
        <p>{{content || '暂无数据'}}</p>
    </div>
</template>
<script>
export default {
    props: ['content']
}
</script>

<style lang="less" scoped>
.empty-wrap{
    padding-top:1.615rem;
    img{
        width:1.62rem;
        height:0.975rem;
        display:block;
        margin:0 auto;
        margin-bottom:0.495rem;
    }
    p{
        height:0.2rem;
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:0.2rem;
        text-align:center;
    }
}
</style>
