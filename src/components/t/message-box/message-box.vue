<template>
  <div class="t-msgbox-wrapper">
    <transition name="msgbox-bounce">
      <div class="t-msgbox" v-show="value">
        <div class="t-msgbox-header" v-if="title !== ''">
          <div class="t-msgbox-title">{{ title }}</div>
        </div>
        <div class="t-msgbox-content" v-if="message !== ''">
          <div class="t-msgbox-message" v-html="message"></div>
          <div class="t-msgbox-input" v-show="showInput">
            <input v-model="inputValue" :placeholder="inputPlaceholder" ref="input">
            <div class="t-msgbox-errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div>
          </div>
        </div>
        <div class="t-msgbox-btns">
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
  </div>
</template>

<style lang="less">
.t-msgbox {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
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
  .t-msgbox-header{
    padding:0.21rem 0;
    height:0.265rem;
    line-height: 0.265rem;
    font-size:0.19rem;
  }
  .t-msgbox-message{
    padding-bottom:0.22rem;
    font-size:0.19rem;
    line-height:0.265rem;
    font-size:0.16rem;
  }
  .t-msgbox-btns{
    height:0.54rem;
    .t-msgbox-btn{
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
        &.t-msgbox-btn-highlight{
          color:white;
          background-image: linear-gradient(-90deg, #FF5533 0%, #FF2266 76%);
        }
      }
      &:last-child{
        right:0;
        bottom:0;
        color:#999;
        border-radius:0.5rem 0 0 0;
        &.t-msgbox-btn-highlight{
          color:white;
          background-image: linear-gradient(90deg, #FF5533 0%, #FF2266 76%);
        }
      }
      &.t-msgbox-cancel{
        
      }
      &.t-msgbox-confirm{
        
      }
    }
  }
}

.msgbox-bounce-enter {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.7);
}
.msgbox-bounce-leave-active {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.9);
}



</style>


<script type="text/babel">
  let CONFIRM_TEXT = '确定';
  let CANCEL_TEXT = '取消';

  import Popup from '../utils/popup';

  export default {
    name: 'message-box',
    mixins: [ Popup ],

    props: {
      modal: {
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      lockScroll: {
        type: Boolean,
        default: false
      },
      closeOnClickModal: {
        default: true
      },
      closeOnPressEscape: {
        default: true
      },
      inputType: {
        type: String,
        default: 'text'
      },
    },

    computed: {
      confirmButtonClasses() {
        let classes = 't-msgbox-btn t-msgbox-confirm ' + this.confirmButtonClass;
        if (this.confirmButtonHighlight) {
          classes += ' t-msgbox-btn-highlight';
        }
        return classes;
      },
      cancelButtonClasses() {
        let classes = 't-msgbox-btn t-msgbox-cancel ' + this.cancelButtonClass;
        if (this.cancelButtonHighlight) {
          classes += ' t-msgbox-btn-highlight';
        }
        return classes;
      }
    },

    methods: {
      doClose() {
        this.value = false;
        this._closing = true;

        this.onClose && this.onClose();

        setTimeout(() => {
          if (this.modal && this.bodyOverflow !== 'hidden') {
            document.body.style.overflow = this.bodyOverflow;
            document.body.style.paddingRight = this.bodyPaddingRight;
          }
          this.bodyOverflow = null;
          this.bodyPaddingRight = null;
        }, 200);
        this.opened = false;

        if (!this.transition) {
          this.doAfterClose();
        }
      },

      handleAction(action) {
        if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
          return;
        }
        var callback = this.callback;
        this.value = false;
        callback(action);
      },

      validate() {
        if (this.$type === 'prompt') {
          var inputPattern = this.inputPattern;
          if (inputPattern && !inputPattern.test(this.inputValue || '')) {
            this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
            this.$refs.input.classList.add('invalid');
            return false;
          }
          var inputValidator = this.inputValidator;
          if (typeof inputValidator === 'function') {
            var validateResult = inputValidator(this.inputValue);
            if (validateResult === false) {
              this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
              this.$refs.input.classList.add('invalid');
              return false;
            }
            if (typeof validateResult === 'string') {
              this.editorErrorMessage = validateResult;
              return false;
            }
          }
        }
        this.editorErrorMessage = '';
        this.$refs.input.classList.remove('invalid');
        return true;
      },

      handleInputType(val) {
        if (val === 'range' || !this.$refs.input) return;
        this.$refs.input.type = val;
      }
    },

    watch: {
      inputValue() {
        if (this.$type === 'prompt') {
          this.validate();
        }
      },

      value(val) {
        this.handleInputType(this.inputType);
        if (val && this.$type === 'prompt') {
          setTimeout(() => {
            if (this.$refs.input) {
              this.$refs.input.focus();
            }
          }, 500);
        }
      },

      inputType(val) {
        this.handleInputType(val);
      }
    },

    data() {
      return {
        title: '',
        message: '',
        type: '',
        showInput: false,
        inputValue: null,
        inputPlaceholder: '',
        inputPattern: null,
        inputValidator: null,
        inputErrorMessage: '',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: CONFIRM_TEXT,
        cancelButtonText: CANCEL_TEXT,
        confirmButtonClass: '',
        cancelButtonHighlight: false,
        confirmButtonDisabled: false,
        confirmButtonPosition: 'right',
        confirmButtonHighlight: false,
        cancelButtonClass: '',
        editorErrorMessage: null,
        callback: null
      };
    }
  };
</script>
