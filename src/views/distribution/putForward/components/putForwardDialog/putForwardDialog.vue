<template>
  <section v-if="showDialog">
    <div class="putForward-dialog">
      <div
        class="bg"
        @click="close(null)"
      />
      <div class="content">
        <h2>输入要提现金额</h2>
        <div class="input-wrap">
          <input
            v-model.lazy.trim="amount"
            v-focus
            type="text"
            maxlength="9"
            placeholder="大于10元小于10万元"
          >
          <template v-if="amount">
            <t-icon
              name="guanbi"
              @click.native="clearAmount"
            />
          </template>
        </div>
        <button
          class="cancel-btn"
          @click="close(null)"
        >
          取消
        </button>
        <button
          class="confirm-btn"
          @click="confirm"
        >
          保存
        </button>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      amount: null,
      showDialog: true
    }
  },
  watch: {
    'showDialog': function (val) {
      if (val === false) {
        this.$nextTick(() => {
          this.$destroy()
        })
      }
    }
  },
  created () {

  },
  methods: {
    close (amount) {
      this.showDialog = false
      this.callback(amount)
    },
    confirm () {
      let { amount } = this

      if (!/^(\d+)(\.\d{1,2}|)$/.test(amount)) {
        this.actionVuexMessageShow('金额格式有误，请重新填写～')
        return
      }

      if (amount < 10) {
        this.actionVuexMessageShow('单次提现金额不能低于10元')
        return
      } else if (amount > 100000) {
        this.actionVuexMessageShow('单次提现金额不能高于10万元')
        return
      }

      this.close(amount)
    },
    clearAmount () {
      this.amount = null
    }
  }
}
</script>
<style lang="less" scoped>
section{
  .putForward-dialog{
      position:fixed;
      left:0;
      top:0;
      width:100%;
      height:100%;
      background: rgba(0,0,0,0.70);
      transform:translate(0, 0) translateZ(0);
      z-index: 10;
      div.content{
        position:absolute;
          left: 50%;
          top:50%;
          transform: translate(-50%, -50%);
          z-index:10;
          width:2.7rem;
            height:1.85rem;
            background:rgba(255,255,255,1);
            border-radius:0.06rem;
            box-sizing: border-box;
            padding-top:0.28rem;
            h2{
                height:0.14rem;
                font-size:0.14rem;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(153,153,153,1);
                line-height:0.14rem;
                padding-left:0.26rem;
                margin-bottom:0.075rem;
            }
            .input-wrap{
                width:2.2rem;
                padding:0.11rem 0;
                position: relative;
                border-bottom:1px solid #E0E0E0;
                margin-left:0.26rem;
                input{
                    height:0.21rem;
                    line-height:0.21rem;
                    padding:0;
                    width:80%;
                    outline: none;
                    font-size:0.16rem;
                    color:rgba(102,102,102,1);
                    border:none;
                    &::-webkit-input-placeholder{
                        color: #ccc;
                    }
                }
                i{
                    position: absolute;
                    right:0;
                    top:50%;
                    transform:translateY(-50%);
                    &:before{
                        color:#999;
                        font-size:0.18rem;
                    }
                }
            }
        }
        button{
            position: absolute;
            bottom:0;
            width:1rem;
            height:0.54rem;
            line-height:0.54rem;
            border:none;
            padding:0;
            font-size:0.16rem;
            &.cancel-btn{
                left:0;
                color:rgba(153,153,153,1);
                background:none;
            }
            &.confirm-btn{
                right:0;
                color:rgba(255,255,255,1);
                background:linear-gradient(132deg,rgba(255,196,84,1) 0%,rgba(255,179,84,1) 100%);
                border-radius:0.5rem 0 0 0;
            }
        }
  }
}
</style>
