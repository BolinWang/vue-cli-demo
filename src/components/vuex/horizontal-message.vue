<template>
    <div class="HPopupUIMessage" @touchmove.stop.prevent @mousewheel.stop.prevent v-show="HPopupUIMessage.show">
        <span>{{HPopupUIMessage.text || '&nbsp;'}}</span>
    </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    computed: {
        ...mapGetters(['HPopupUIMessage']),
    }
}
</script>
<style lang="less" scoped>
.HPopupUIMessage {
    position: absolute;
    bottom: .45rem;
    left: 0;
    width: 100%;
    text-align: center;
    z-index: 1025;
    box-sizing: border-box;
    transform: translateZ(0);
}
.HPopupUIMessage span {
    display: inline-block;
    background: rgba(0,0,0,0.70);
    border-radius: .5rem;
    color: #fff;
    padding: 0 .255rem;
    height:.39rem;
    line-height: .39rem;
    word-wrap: break-word;
    text-align: center;
    word-break: break-all;
    transition: all 1s;
    font-family: PingFangSC-Medium;
    font-size: .16rem;
    box-sizing: border-box;
}
</style>
