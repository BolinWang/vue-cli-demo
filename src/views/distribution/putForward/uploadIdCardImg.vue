<template>
  <section v-if="pageInfo.dataIsLoad">
    <div class="section-bg" />

    <div class="section-main">
      <h2>上传证件材料</h2>

      <ul class="clearfixed">
        <li>
          <template v-if="cardImg1">
            <img :src="cardImg1 | ali(375)">
          </template>
          <template v-else>
            <div class="li-content">
              <button>
                <t-icon name="tianjiatupian" />
              </button>
              <p>身份证正面照片</p>
            </div>
          </template>
          <input
            ref="file1"
            type="file"
            accept="image/*"
          >
        </li>
        <li>
          <template v-if="cardImg2">
            <img :src="cardImg2 | ali(375)">
          </template>
          <template v-else>
            <div class="li-content">
              <button>
                <t-icon name="tianjiatupian" />
              </button>
              <p>身份证反面照片</p>
            </div>
          </template>
          <input
            ref="file2"
            type="file"
            accept="image/*"
          >
        </li>
      </ul>

      <button
        class="confirm-btn"
        :disabled="confirmDisabled"
      >
        完成认证
      </button>
    </div>
  </section>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import pageShareMixin from '@/mixins/pageShare.js'
import lrz from 'lrz'

export default {
  mixins: [pageShareMixin],
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      'pageInfo': 'pageUploadIdCardImg',
      'popupUI': 'popupUI'
    }),
    cardImg1: {
      set (val) {
        this.setCardImg1(val)
      },
      get () {
        let { pageInfo } = this
        return pageInfo.cardImg1 || ''
      }
    },
    cardImg2: {
      set (val) {
        this.setCardImg2(val)
      },
      get () {
        let { pageInfo } = this
        return pageInfo.cardImg2 || ''
      }
    },
    confirmDisabled () {
      let { cardImg1, cardImg2 } = this
      return !cardImg1 || !cardImg2
    },
    url () {
      return 'https://nodejsapi.ngmm365.com/admin-api'
      let API_ENV = process.env.API_ENV
      if (API_ENV == 'pro') {
        return 'https://nodejsapi.ngmm365.com/admin-api'
      } else if (API_ENV == 'beta') {
        return 'http://10.86.10.254:9000/admin-api'
      } else if (API_ENV == 'test') {
        return 'http://localhost:9000/admin-api'
      } else {
        return 'http://localhost:9000/admin-api'
      }
    }
  },
  mounted () {
    this.initUploadEvent()
  },
  methods: {
    ...mapMutations({
      'resetData': 'pageUploadIdCardImg/resetData',
      'setCardImg1': 'pageUploadIdCardImg/setCardImg1',
      'setCardImg2': 'pageUploadIdCardImg/setCardImg2'
    }),
    initUploadEvent () {
      this.initUpload(this.$refs.file1, 'cardImg1')
      this.initUpload(this.$refs.file2, 'cardImg2')
    },
    initUpload (oFile, cardImg) {
      let self = this
      function changeFn () {
            	let files = this.files
        lrz(files[0], {
          width: 750,
          quality: 0.4
        })
          .then(function (rst) {
            // 处理成功会执行
            let name = rst.origin.name
            let ext = ''
            if (name.indexOf('.') > -1) {
              ext = name.substring(name.lastIndexOf('.') + 1)
            }
            self.uploadImage(rst.base64, ext, cardImg)
          })
          .catch(function (err) {
            // 处理失败会执行
          })
          .always(function () {
            // 不管是成功失败，都会执行
          })

        let clone = this.cloneNode(true)
        clone.value = ''
        this.parentNode.replaceChild(clone, this)
        clone.addEventListener('change', changeFn)
      }
      oFile.addEventListener('change', changeFn)
    },
    uploadImage (base64, ext, cardImg) {
      this.$http.post(this.url + '/file/upload/base64', { base64: base64, ext: ext }).then((response) => {
        let data = response.body
        if (data.code == 10000) {
          this[cardImg] = data.data.url
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
section{
    font-family:PingFangSC-Regular;
    background:white;
    .section-bg{
        position: absolute;
        left:0;
        top:0;
        width:100%;
        height:100%;
        background:white;
    }
    .section-main{
        position: relative;
        z-index: 1;
        padding-top:0.22rem;
    }
    h2{
        height:0.2rem;
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(34,34,34,1);
        line-height:0.2rem;
        padding-left:0.2rem;
        margin-bottom:0.2rem;
    }
    ul{
        width:3.3rem;
        margin: 0 auto;
        margin-bottom:0.4rem;
        li{
            float:left;
            margin-right:0.1rem;
            width:1.6rem;
            height:0.975rem;
            background:rgba(250,250,250,1);
            border-radius:0.04rem;
            border:1px dashed #F2F2F2;
            box-sizing: border-box;
            position: relative;
            &:last-of-type{
                margin-right:0;
            }
            img{
                display: block;
                width:100%;
                height:100%;
            }
            .li-content{
                padding-top:0.22rem;
                button{
                    border:none;
                    padding:0;
                    width:0.35rem;
                    height:0.35rem;
                    opacity:0.5;
                    border:1.5px dashed #ccc;
                    text-align:center;
                    display:block;
                    margin:0 auto;
                    border-radius: 100%;
                    background:none;
                    margin-bottom:0.08rem;
                    i{
                        color:#ccc;
                        &:before{
                            font-weight: bold;
                            font-size:0.18rem;
                        }
                    }
                }
                p{
                    height:0.14rem;
                    font-size:0.1rem;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(204,204,204,1);
                    line-height:0.14rem;
                    text-align:center;
                }
            }
            input{
                position:absolute;
                width:100%;
                height:100%;
                z-index:9;
                opacity: 0;
                left:0;
                top:0;
            }
        }
    }
    .confirm-btn{
        width:2.65rem;
        height:0.49rem;
        background:rgba(255,172,45,1);
        border-radius:0.27rem;
        margin: 0 auto;
        border:none;
        display:block;
        padding:0;
        color:white;
        font-size:0.15rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        margin-bottom:0.32rem;
        &:disabled{
            background:#ccc;
        }
    }
}
</style>
