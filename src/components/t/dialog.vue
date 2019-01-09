<template>
  <div class="t-dialog-wrapper">
    <transition name="dialog-bounce">
      <div class="t-dialog" v-show="value" :style="dialogStyle">
        <div class="t-dialog-header" v-if="title !== ''" :style="{'height': titleHeight + 'rem'}">
          <div class="t-dialog-title">{{ title }}</div>
        </div>
        <div class="t-dialog-content">
          <slot></slot>
        </div>
        <div class="t-dialog-btns" v-show="!hideBtn">
          <template v-if="confirmButtonPosition == 'right'">
            <button :class="[ cancelButtonClasses ]" v-show="showCancelButton" @click="handleAction('cancel')">{{ cancelButtonText }}</button>
            <button :class="[ confirmButtonClasses ]" v-show="showConfirmButton" @click="handleAction('confirm')">{{ confirmButtonText }}</button>
          </template>
          <template v-if="confirmButtonPosition == 'left'">
            <button :class="[ confirmButtonClasses ]" v-show="showConfirmButton" @click="handleAction('confirm')">{{ confirmButtonText }}</button>
            <button :class="[ cancelButtonClasses ]" v-show="showCancelButton" @click="handleAction('cancel')">{{ cancelButtonText }}</button>
          </template>
        </div>
      </div>
    </transition>
    <transition name="modal">
      <div class="v-modal" style="z-index: 199;" @click="handleAction('cancel')" v-show="value"></div>
    </transition>
  </div>

</template>

<style lang="less">
.t-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index:200;
  -webkit-transform: translate3d(-50%, -50%, 1px);
  transform: translate3d(-50%, -50%, 1px);
  background-color: #fff;
  width: 2.7rem;
  -webkit-user-select: none;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: .2s;
  transition: .2s;
  padding:0 0.22rem;
  box-sizing: border-box;
  font-family: PingFangSC-Regular;
  border-radius:0.06rem;
  .t-dialog-header{
    padding:0.21rem 0;
    height:0.265rem;
    line-height: 0.265rem;
    font-size:0.19rem;
  }
  .t-dialog-message{
    padding:0.22rem 0;
    font-size:0.19rem;
    line-height:0.265rem;
  }
  .t-dialog-btns{
    height:0.54rem;
    .t-dialog-btn{
      position:absolute;
      width:1rem;
      height:0.54rem;
      line-height:0.54rem;
      text-align:center;
      font-size:0.16rem;
      border:none;
      background:none;
      &:first-child{
        left:0;
        bottom:0;
        color:#999;
        border-radius:0 0.5rem 0 0;
        &.t-dialog-btn-highlight{
          color:white;
          background-image: linear-gradient(-144deg, #FFC51D 14%, #FFAA1D 91%);
        }
      }
      &:last-child{
        right:0;
        bottom:0;
        color:#999;
        border-radius:0.5rem 0 0 0;
        &.t-dialog-btn-highlight{
          color:white;
          background-image: linear-gradient(144deg, #FFC51D 14%, #FFAA1D 91%);
        }
      }
      &.t-dialog-cancel{
        
      }
      &.t-dialog-confirm{
        
      }
    }
  }
}

.dialog-bounce-enter {
  opacity: 0;
  transform: translate3d(-50%, -50%, 1px) scale(0.7);
}
.dialog-bounce-leave-active {
  opacity: 0;
  transform: translate3d(-50%, -50%, 1px) scale(0.9);
}

.modal-enter,
.modal-leave-active {
  transition: 0.1s;
}



</style>


<script type="text/babel">
  let CONFIRM_TEXT = '确定';
  let CANCEL_TEXT = '取消';


  export default {
    name: 't-dialog',
    props: {
      value: {
        type: Boolean,
      },
      title: {
        type: String,
        default: '',
      },
      confirmButtonPosition: {
        type: String,
        default: 'right',
      },
      confirmButtonHighlight: {
        type: Boolean,
        default: true,
      },
      cancelButtonHighlight: {
        type:Boolean,
        default: false,
      },
      showCancelButton: {
        type: Boolean,
        default: true,
      },
      showConfirmButton: {
        type: Boolean,
        default: true,
      },
      confirmButtonText: {
        type: String,
        default: CONFIRM_TEXT,
      },
      cancelButtonText: {
        type: String,
        default: CANCEL_TEXT,
      },
      hideBtn: {
        type: Boolean,
        default: false,
      },
      titleHeight: {
        type: String,
        default: '0.265',
      },
      wrapStyle: {
        type:Object,
        default: ()=>{
          return {}
        }
      },
    },

    computed: {
      dialogStyle(){
        return this.wrapStyle;
      },
      confirmButtonClasses() {
        let classes = 't-dialog-btn t-dialog-confirm ' + this.confirmButtonClass;
        if (this.confirmButtonHighlight) {
          classes += ' t-dialog-btn-highlight';
        }
        return classes;
      },
      cancelButtonClasses() {
        let classes = 't-dialog-btn t-dialog-cancel ' + this.cancelButtonClass;
        if (this.cancelButtonHighlight) {
          classes += ' t-dialog-btn-highlight';
        }
        return classes;
      }
    },

    methods: {
      handleAction(action) {
        if(action == 'confirm'){
          this.$emit('confirm');
        }else if(action == 'cancel'){
          this.$emit('cancel');
        }
      },
    },

    data() {
      return {

      }
    },
  };
</script>
