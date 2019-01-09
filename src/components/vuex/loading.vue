<template>
    <div class="PopupUILoading_wrap" v-show='PopupUILoading' @touchmove.stop.prevent @mousewheel.stop.prevent >
        <div class="PopupUILoading"></div>
    </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
        methods: {

        },
}
</script>
<style lang="less" scoped>
.PopupUILoading_wrap {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 99;
    transform: transLateX(-50%) translateY(-50%);
}
.PopupUILoading{
    width:1.25rem;
    height: .75rem;
    background: url("../../assets/images/loading.gif") no-repeat center center;
    background-size: 100%;
    margin: 0 auto;
    z-index: 100;
}

// .PopupUILoading {
//     width: 0.30rem;
//     height: 0.30rem;
//     margin: 0 auto;
//     background: url("../../assets/images/load.png") no-repeat center center/cover;
//     animation: PopupUILoading-run 1s linear 0s infinite;
// }

// @keyframes PopupUILoading-run {
//     from {
//         transform: rotate(0deg);
//     }
//     to {
//         transform: rotate(360deg);
//     }
// }

</style>
