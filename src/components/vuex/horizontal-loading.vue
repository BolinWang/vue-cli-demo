<template>
    <div class="HPopupUILoading_wrap" v-show='HPopupUILoading' @touchmove.stop.prevent @mousewheel.stop.prevent >
        <div class="HPopupUILoading"></div>
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
.HPopupUILoading_wrap {
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index: 99;
    transform: translateZ(0);
    background:rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
}
.HPopupUILoading{
    width:1.25rem;
    height: .75rem;
    background: url("../../assets/images/loading.gif") no-repeat center center;
    background-size: 100%;
    z-index: 100;
    position: absolute;
}

// .HPopupUILoading {
//     width: 0.30rem;
//     height: 0.30rem;
//     margin: 0 auto;
//     background: url("../../assets/images/load.png") no-repeat center center/cover;   
//     animation: HPopupUILoading-run 1s linear 0s infinite;
// }

// @keyframes HPopupUILoading-run {
//     from {
//         transform: rotate(0deg);
//     }
//     to {
//         transform: rotate(360deg);
//     }
// }

</style>
