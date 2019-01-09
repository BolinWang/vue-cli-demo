import $ from '@/tools/dom.js'
import {
  mapState,
  // eslint-disable-next-line no-unused-vars
  mapActions
} from 'vuex'
import loadImg from '../../static/loading.png'
import imageAli from '@/tools/image.js'
import AudioC from '@/components/t/audio/index.js'
import event from '@/tools/event'
import { stopOtherMeta } from '@/tools/media.js'

let lazyLoadImg = {
  data () {
    return {
      customVueInstances: [], // 存放所有vue实例
      lazyLoad_isFirst: true,
      lazyload_metas: [],
      lazyload_imgs: []
    }
  },
  computed: {
    ...mapState([
      'detailAudioLoop'
    ])
  },
  methods: {
    ...event,
    lazyLoad ({ oImgWrap, condition, isReverse, lazyload, scale }) { // condition条件控制在某种情况下不加载图片
      lazyload = (lazyload !== false)
      this.$nextTick(() => {
        let self = this;

        (function (self) { // 处理音频
          let audioWraps = document.querySelectorAll('.t-custom-audio-wrap')

          if (!audioWraps.length) {
            return
          }

          self.detailHasAudio = true// 如果详情存在音频则显示循环播放按钮

          // 实例化自定义音频控件
          for (let i = 0; i < audioWraps.length; i++) {
            let el = audioWraps[i]
            if (el && !el.isInstance) {
              el.isInstance = true
              let { role, src } = el.dataset || {}
              if (role === 'audio') {
                let uniqueId = el.uniqueId = 'audio' + (Math.random() + '').replace(/\D/g, '')// 每个音频的唯一标识
                let AudioCI = AudioC({ src, el, uniqueId, isReverse, scale })
                AudioCI.dispatch = self.dispatch.bind(self)
                self.customVueInstances.push(AudioCI)
              }
            }
          }
          // 排序实例 保证播放顺序
          let tempCustomVueInstances = []
          for (let i = 0; i < audioWraps.length; i++) {
            let el = audioWraps[i]
            if (el.uniqueId) {
              for (let j = 0; j < self.customVueInstances.length; ++j) {
                let vueIns = self.customVueInstances[j]
                if (el.uniqueId === vueIns.uniqueId) {
                  vueIns.t_index = i
                  tempCustomVueInstances.push(vueIns)
                  break
                }
              }
            }
          }
          self.customVueInstances = tempCustomVueInstances

          // 初始化音频事件
          // self.initAudioEvent();
        })(self)

        if (lazyload) {
          (function (self, oImgWrap, condition) { // 处理懒加载图片
            let imgs

            if (oImgWrap) { // 如果有传范围
              imgs = oImgWrap.querySelectorAll('img')
            } else { // 查询全部图片
              imgs = document.querySelectorAll('.lazyLoadImg')
            }

            if (!imgs || !imgs.length) return

            imgs = [...imgs]

            imgs = imgs.filter((img, i) => { // 过滤掉已经加入事件的图片
              if (!img.isSelect) {
                img.isSelect = true
                return true
              }
            })

            if (!imgs || !imgs.length) return

            self.lazyload_imgs = self.lazyload_imgs.concat(imgs)

            // 第一次先执行一次
            lazyloadFn(true)
            self.event_bind(window, 'scroll', lazyloadFn)// 绑定懒加载事件
            self.$once('hook:beforeDestroy', () => {
              self.event_unbind(window, 'scroll', lazyloadFn)
            })

            function lazyloadFn (isFirst) {
              // 控制在某一条件下不执行，比如商品详情页在切换到更多买家秀的时候不加载详情页面的图片
              if (condition && !condition()) {
                return
              }

              imgs.forEach((img, i) => {
                if (img.getAttribute('isLoad') !== 'true' && (($.getElmTop(img) - 40 <= (window.innerHeight + $.getScrollTop())) && ($.getScrollTop() - 40 <= ($.getElmTop(img) + img.offsetHeight)))) {
                  // console.log('img=', img);
                  let vSrc = img.getAttribute('v-src')
                  img.setAttribute('src', vSrc)
                  img.setAttribute('isLoad', 'true')
                  // 设置渐变动画
                  img.onload = function (e) {
                    let curImg = e.currentTarget
                    curImg.style.opacity = '0'
                    setTimeout(function () {
                      curImg.style.transition = 'opacity 0.5s'
                      curImg.style.opacity = '1'
                    }, 100)
                  }
                }
              })
            }
          })(self, oImgWrap, condition)
        }

        (function (self) { // 绑定视频需要处理的事件
          self.initMetas()
        })(self)
      })
    },
    dispatch (type, method, params) {
      if (type === 'audio') {
        if (method === 'loadNext') {
          if (this.detailAudioLoop.isLoop === 2) { // 开启列表循环
            let index = params.t_index + 1
            if (index > this.customVueInstances.length - 1) {
              index = 0
            }
            this.customVueInstances[index].broadcast('load')
          }
        } else if (method === 'playNext') {
          // 判断是否开启循环播放
          if (this.detailAudioLoop.isLoop === 2) { // 开启列表循环
            let index = params.t_index + 1
            if (index > this.customVueInstances.length - 1) {
              index = 0
            }
            this.customVueInstances[index].broadcast('play')
          } else if (this.detailAudioLoop.isLoop === 3) { // 开启单首循环
            let index = params.t_index
            this.customVueInstances[index].broadcast('play')
          }
        } else if (method === 'stop') {
          this.curAudio && this.curAudio.broadcast('stop')
        } else if (method === 'play') {
          if (this.curAudio && this.curAudio.uniqueId !== params.uniqueId) {
            this.curAudio.broadcast('stop')
          }
          // 恭喜一个全局变量方便其他组件调用，后期得优化
          window.__curAudio = this.curAudio = params
          stopOtherMeta(window.__curAudio)
        }
      }
    },
    initMetas () {
      let metas = this.lazyload_metas = document.querySelectorAll('video.richtext-detail-video')// audio已经在组件里面处理了
      for (let i = 0; i < metas.length; ++i) {
        let meta = metas[i]
        this.event_unbindAll(meta)
        this.event_bind(meta, 'play', this.playFn.bind(this))
        this.event_bind(meta, 'x5videoenterfullscreen', () => {
          meta.className = 'richtext-detail-x5videoenterfullscreen-video'
        })
        this.event_bind(meta, 'x5videoexitfullscreen', () => {
          meta.className = ''
        })
      }
    },
    playFn (e) {
      let cMeta = e.target
      if (cMeta.currentTime === 0) {
        this.actionVuexMessageShow('资源正在缓冲，请耐心等待...')
      }
      // 暂停所有播放中的音频视频
      stopOtherMeta(cMeta)// 暂停所有标签中的媒体
      this.dispatch('audio', 'stop')// 暂停所有音频
    },
    transform (option) {
      let { data, poster, lazyload } = option
      let text = data

      lazyload = lazyload !== false

      // 转换图片
      text = text.replace(/<img[^>]*>/g, function () {
        let content = arguments[0]
        return content.replace(/(class|style|isLoad|v-src)=(["'])([^"']*)(\2)/ig, function () {
          return ''// 清空自定义的class|style
        }).replace(/(src=)(["'])([^"']*)(\2)/g, function () {
          let str = 'class="lazyLoadImg" '
          if (!lazyload) { // 不需要懒加载图片功能
            str += 'src="' + imageAli(arguments[3]) + '" isLoad="true"'
          } else {
            str += 'v-src="' + imageAli(arguments[3]) + '" ' + ' src="' + loadImg + '"'
          }
          return str
        })
      })

      // 转换视频
      text = text.replace(/(<video)([^>]*)(>)/g, function () {
        let arguments2 = arguments[2].replace(/(class|loop|controlsList|preload)=(["'])([^"']*)(\2)/ig, function () {
          return ''
        })

        let content = arguments[1] + `
                webkit-playsinline="true"
                x-webkit-airplay="true"
                playsinline="true"
                x5-video-player-type="h5"
                x5-video-orientation="h5"
                x5-video-player-fullscreen="true"
                preload="none"
                controlsList="nodownload"
                loop="loop"
                class="richtext-detail-video"
                ` + ' poster=' + imageAli(poster)
        return content + arguments2 + arguments[3]
      })
      // 转换音频
      text = this.transformAudio(text)
      // 清空a标签的target（解决app中如果配置target="_blank"会失效）
      text = text.replace(/<a[^>]*>/g, function () {
        let content = arguments[0]
        return content.replace(/(target=)(["'])([^"']*)(\2)/g, function () {
          return ''
        })
      })
      return text
    },
    transformAudio (text) {
      text = text.replace(/(<audio)([^>]*)(>)/g, function () {
        let content = arguments[0]

        let result = /(src=)(["'])([^"']*)(\2)/.exec(content)
        if (!result) return ''
        content = '<div class="t-custom-audio-wrap" data-role="audio" data-src="' + result[3] + '"></div>'
        return content
      })

      return text
    },
    destoryAllCustomVueInstance () { // 销毁所有vue实例
      for (let i = 0; i < this.customVueInstances.length; ++i) {
        let instance = this.customVueInstances[i]
        instance.$destroy && instance.$destroy()
        this.customVueInstances.splice(i--, 1)
      }
    }
  },
  beforeDestroy () {
    this.destoryAllCustomVueInstance()// 销毁所有自己创建的vue实例
    this.lazyload_metas.forEach((meta, i) => {
      this.event_unbindAll(meta)
    })
  }
}
export default lazyLoadImg
