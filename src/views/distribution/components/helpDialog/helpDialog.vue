<template>
  <section v-if="showDialog">
    <div class="help-dialog">
      <div
        class="bg"
        @click="close"
      />
      <div class="content">
        <h2>联系您的合伙人获取帮助</h2>
        <ul v-if="userInfo.wechat || userInfo.phone">
          <li v-if="userInfo.wechat">
            <div class="li-content">
              <div class="_left">
                微信
              </div>
              <div class="_center">
                {{ userInfo.wechat }}
              </div>
              <div class="_right">
                <button
                  v-clipboard:copy="userInfo.wechat"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                >
                  复制
                </button>
              </div>
            </div>
          </li>
          <li v-if="userInfo.phone">
            <div class="li-content">
              <div class="_left">
                手机
              </div>
              <div class="_center">
                {{ userInfo.phone }}
              </div>
              <div class="_right">
                <a :href="`tel:${userInfo.phone}`">
                  <img src="../../../../assets/images/distribution/helpDialog/phone_icon.png">
                </a>
              </div>
            </div>
          </li>
        </ul>

        <span
          class="close"
          @click="close"
        >
          <t-icon name="guanbi" />
        </span>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      showDialog: true
    }
  },
  computed: {
    ...mapState({
      'componentInfo': 'componentHelpDialog'
    }),
    userInfo () {
      let { componentInfo: { data } } = this
      return data || {}
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    ...mapActions({
      'loadData': 'componentHelpDialog/loadData'
    }),
    close () {
      this.showDialog = false
      this.callback()
    },
    onCopy () {
      this.actionVuexMessageShow('复制成功～')
    },
    onError (e) {
      console.log(e)
      this.actionVuexMessageShow('复制失败，请手动输入～')
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
  }
}
</script>
<style lang="less" scoped>
section{
	.help-dialog{
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
            height:1.9rem;
	        box-sizing: border-box;
	        background:white;
        	border-radius:0.06rem;
        	background-size:100%;
        	h2{
                height:0.65rem;
                line-height:0.65rem;
                font-size:0.19rem;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(255,255,255,1);
                text-indent: 0.16rem;
                background:url(../../../../assets/images/distribution/helpDialog/title_bg.png) no-repeat left top;
                background-size:100% 100%;
            }
            ul{
                margin-top:0.15rem;
                li{
                    .li-content{
                        display: flex;
                        padding:0.1rem 0;
                        align-items: center;
                        ._left{
                            flex: 0 0 0.56rem;
                            width:0.56rem;
                            text-align: center;
                            font-size:0.14rem;
                            color:#999999;
                        }
                        ._center{
                            flex: auto;
                            min-width: 0;
                            font-size:0.16rem;
                            color:#222222;
                        }
                        ._right{
                            flex:0 0 0.56rem;
                            width:0.56rem;
                            position: relative;
                            button{
                                width:0.8rem;
                                height:0.4rem;
                                border-radius:0.2rem;
                                border:1px solid #FFAC2D;
                                padding:0;
                                background:none;
                                font-size:0.24rem;
                                color:#FFAC2D;
                                transform: translateY(-50%) scale(0.5);
                                transform-origin: left center;
                                position:absolute;
                                left:0;
                                top:50%;
                            }
                            a{
                                display: block;
                                height:0.15rem;
                                width:0.4rem;
                                img{
                                    display:block;
                                    width:0.15rem;
                                    height:0.15rem;
                                    margin:0 auto;
                                }
                            }
                        }
                    }
                }
            }
        	.close{
		    	position:absolute;
		    	bottom: -.65rem;
		    	left:50%;
		    	transform: translateX(-50%);
		    	i{
		    		line-height: 0.32rem;
		    		&:before{
						font-size: 0.32rem;
						font-weight: bold;
						color:#9D9D9D;
		    		}
		    	}
		    }
	    }
	}
}
</style>
