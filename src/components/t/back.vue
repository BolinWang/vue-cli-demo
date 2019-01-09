<template>
    <t-icon class="t-back" name="arrow-left" @click.native.stop.prevent="back"><slot></slot></t-icon>
</template>
<script>
export default {
    name: 'back',
    methods: {
        back() {
            this.$router.back();
        },
    }
}
</script>
<style lang="less" scoped>
.t-back{
    line-height:0.23rem;
	&:before{
		font-size:0.23rem;
	}
}
</style>
