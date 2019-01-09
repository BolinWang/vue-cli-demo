<template>
    <i :class="['icon iconfont','icon-'+name]"></i>
</template>
<script>
export default {
    name: 'icon',
    props: {
        name: {
            type: String,
        },
    },
}
</script>
<style lang="less" scoped>
i{
    font-style: normal;
    font-size:0.16rem;
    line-height:0.16rem;
    display:inline-block;
    &:before{
        display:inline-block;
        vertical-align:top;
    }
}

</style>
