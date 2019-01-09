<template>
    <div class="t-header-wrap">
        <div class="header-fixed" :class="oClass">
            <div class="left-box">
                <slot name="left"></slot>
            </div>
            <div class="center-box">
                <slot></slot>
            </div>
            <div class="right-box">
                <slot name="right" ></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'theader',
    props: {
        'borderBottom': {
            type: Boolean,
            default: true
        }
    },
    computed: {
        oClass(){
            return {
                'border-b-F3F3F3': this.borderBottom
            }
        }
    }
}
</script>
<style lang="less" scoped>

@height:0.45rem;

.t-header-wrap{
    font-family: PingFangSC-Regular;
    height:@height;
    .header-fixed {
        z-index: 100;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height:@height;
        line-height:@height;
        box-sizing: border-box;
        background:white;
    }
    .left-box{
        position:absolute;
        left:0;
        top:0;
        padding-left:0.14rem;
        height:100%;
    }
    .right-box{
        position:absolute;
        right:0;
        top:0;
        padding:0 0.1rem;
        height:100%;
        font-size:0.16rem;
        text-align:right;
    }
    .center-box{
        margin: 0 0.8rem;
        height: @height;
        line-height: @height;
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size:0.17rem;
        text-align:center;
    }
    .b-b {
        border-bottom:1px solid #F3F3F3;
    }
}




</style>
