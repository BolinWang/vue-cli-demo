<template>
    <div class="PopupUIMessage" @touchmove.stop.prevent @mousewheel.stop.prevent v-show="PopupUIMessage.show">
        <span>{{PopupUIMessage.text || '&nbsp;'}}</span>
    </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    computed: {
        ...mapGetters(['PopupUIMessage']),
    },
}
</script>
<style lang="less" scoped>
.PopupUIMessage {
    position: fixed;
    bottom: 10%;
    left: 0;
    width: 100%;
    text-align: center;
    z-index: 1025;
    box-sizing: border-box;
    transform: translateZ(1px);
}
.PopupUIMessage span {
    display: inline-block;
    background: rgba(0,0,0,0.70);
    color: #fff;
    padding: 0.08rem 0.15rem;
    border-radius: 5px;
    word-wrap: break-word;
    text-align: center;
    word-break: break-all;
    max-width: 80%;
    transition: all 1s;
    font-size:.16rem;
}
</style>
