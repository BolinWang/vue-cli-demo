<template>
    <section>
        <img src="../../../../assets/images/distribution/banner/banner.gif" @click="goLink"/>
    </section>
</template>
<script>
export default {
    methods: {
        goLink(){
            window.location.href = 'https://m.ngmm365.com/page/3211';
        }
    }
}
</script>
<style lang="less" scoped>
section{
    padding:0 0.12rem 0.1rem;
    img{
        display:block;
        width:100%;
        border-radius: 0.05rem;
    }
}
</style>
