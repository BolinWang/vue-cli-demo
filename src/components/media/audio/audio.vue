<template>
    <div class="custom-detail-audio-wrap" :class="'theme-' + theme">
        <template v-if="src">
            <!-- <div class="custom-detail-audio-face">
                <img src="../file/audio/avatar.png"/>
            </div> -->
            <div class="custom-detail-audio">
                <div class="custom-detail-audio-left">
                    <div class="custom-detail-audio-left-main">
                        <!--按钮-->
                        <div class="custom-detail-audio-left-button" @click="handlerClick">
                            <div class="custom-detail-audio-left-waiting" v-show="status === playerStatus.loading"></div> 

                            <span v-show="!playStaus" class="custom-detail-audio-left-icon-zanting"></span>
                            <span v-show="playStaus" class="custom-detail-audio-left-icon-bofangzhong"></span>
                        </div>
                        <!--进度-->

                        <div v-show="!isFocus">
                            <div class="custom-detail-audio-left-noplay" @click="handlerClick">
                                <div class="custom-detail-audio-left-noplay-img"></div>
                            </div>
                        </div>

                        <div class="custom-detail-audio-left-progress" v-show="isFocus"
                            @touchstart.passive="touchStart"
                            @touchmove.stop.prevent="touchMove"
                            @touchend.passive="touchEnd"
                            @touchcancel.passive="touchEnd"
                        >
                            <div class="custom-detail-audio-left-bg-progress" ref="oLine">
                                <span class="custom-detail-audio-left-play-progress" ref="oProgress" :style="playProgress"></span>
                            </div>
                            <i class="custom-detail-audio-point" ref="oPoint" :style="pointStyle"></i>
                        </div>

                    </div>
                </div>
                <div class="custom-detail-audio-right">
                    <i v-if="noPlay"></i>
                    <template v-if="duration">{{ durationStr }}</template>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import system from '@/tools/system'
import Util from '@/tools/util.js'
import $ from '@/tools/dom.js'
import { Howl } from 'howler'
import { stopOtherMeta } from '@/tools/media.js'

const playerStatus = new Util.Enum(['default', 'error', 'loading', 'loaded', 'playing', 'pause', 'stoped', 'played', 'draging', 'allPause'])
const themeEnum = new Util.Enum(['default', 'lakeBlue'])

export default {
    props: {
        src: null,
        isReverse: null,
        scale: null,
        loop: null,
        theme: {
            default: themeEnum.default
        },
        defaultDuration: null
    },
    data() {
        return {
            noPlay: true,
            currentTime: 0,//当前播放时长
            duration: 0,
            autoplay: true,//如果是第一次点击则在onload方法中启动播放
            playerStatus,
            status: playerStatus.default, //default、paused、waiting、playing、stoped
            progressBarLength: Util.getRem(1.85),
            pause: false,//记录拖动前音频的状态
            pauseStatus: false,
            isFocus: false,
            playStaus: false,
            themeEnum
        }
    },
    computed: {
        durationStr(){
            let { duration, addZero } = this;
            if(!duration) return 0;
            return (duration / 60 | 0) + '\'' + addZero(duration % 60 | 0) + '\"';
        },
        pointStyle(){
            let { currentTime, duration } = this;
            let left = (currentTime / duration) * 100;
            return {
                'left': left + '%'
            };
        },
        playProgress(){
            let { currentTime, duration } = this;
            let width = (currentTime / duration) * 100;
            return {
                'width': width + '%'
            };
        }
    },
    created(){
        this.init();
    },
    methods: {
        init(){
            let { defaultDuration } = this;
            if(defaultDuration){
                this.duration = parseFloat(defaultDuration);
            }
        },
        addZero(val){
            return val > 9 ? val : '0' + val;
        },
        broadcast(method, params){
            if(method === 'load'){
                this.autoplay = false;
                if (this.sound) return;
                this.compatiblePlayControl();
            }else if(method === 'play'){
                this.compatiblePlayControl();
            }else if(method === 'stop'){
                this.sound && this.sound.stop();
            }
        },
        onLoad(){
            let { src, noPlay, loop } = this;

            this.status = playerStatus.loading;
            this.sound = new Howl({
                src: [src],
                loop: false,
                html5: true,
                onload: () => {
                  /**如果有下一条，加载下一条**/
                  console.log('audio=onload');
                  this.duration = this.sound.duration();
                  
                  if(this.autoplay){
                    this.status = playerStatus.loaded;
                    this.sound.play();
                  }else{//如果只是加载的情况 不需要自动播放
                    this.autoplay = true;
                    this.status = playerStatus.default;//重置状态
                  }
                  
                  if(this.dispatch){
                    this.dispatch('audio', 'loadNext', this);//加载下一个音频
                  }
                },
                onplay: () => {
                    if(noPlay) this.noPlay = false;
                    this.isFocus = true;
                    this.status = playerStatus.playing;
                    this.playStaus = true;
                    this.pointMoving();

                    //暂停其他音频
                    stopOtherMeta(this);
                    //共享全局变量出来
                    window.__curAudio = this;
                    if(this.dispatch){
                        this.dispatch('audio', 'play', this);//暂停其他音视频
                        this.dispatch('audio', 'loadNext', this);//加载下一个音频
                    }
                    console.log('audio=onplay');
                },
                onseek: () => {
                    console.log('audio=onseek');
                    if (this.pause) {
                        this.sound.play()
                        this.pause = false
                        return
                    }
                    this.sound.play()
                },
                onloaderror: (a, e) => {
                  this.sound.stop()
                  this.status = playerStatus.error
                  console.warn(e)
                  // alert(e)
                },
                onplayerror: (a, e) => {
                  this.sound.stop()
                  this.status = playerStatus.error
                  console.warn(e)
                },
                onpause: () => {
                  console.log('audio=onpause');
                  if (this.pauseStatus) {
                    this.pauseStatus = false;
                    return
                  } 
                  clearInterval(this.moving);
                  if (this.status === playerStatus.allPause) return;
                  this.status = playerStatus.pause;
                  this.playStaus = false;
                },
                onend: () => {
                  //播放下一个
                  console.log('audio=onend');
                  this.isFocus = false;
                  clearInterval(this.moving);
                  this.status = playerStatus.played;
                  this.playStaus = false;

                  if(this.dispatch){
                    this.dispatch('audio', 'playNext', this);
                  }else{
                    if(loop == 'loop'){
                      this.compatiblePlayControl();
                    }
                  }
                },
                onstop: () => {
                  console.log('audio=onstop');
                  this.isFocus = false;
                  clearInterval(this.moving)
                  this.status = playerStatus.played;
                  this.playStaus = false;
                },
              })
        },
        handlerClick(){
            this.compatiblePlayControl();
        },
        compatiblePlayControl() {
            if (system.isPro() && Util.isIOS() && system.isWechat()) {
                wx.ready(()=>{
                    wx.getNetworkType({
                        success: () => {
                            this.playControl();
                        },
                    })
                })
                return;
            }
            this.playControl();
        },
        playControl() {
            switch (this.status) {
                case playerStatus.default:
                  if (this.sound && this.sound.state() === 'loaded') {
                    this.sound.play()
                  } else {
                    this.onLoad()
                  }
                  break
                case playerStatus.error:
                  this.status = playerStatus.default
                  this.onLoad()
                  break
                case playerStatus.loading:
                  break
                case playerStatus.loaded:
                  break
                case playerStatus.playing:
                  this.sound.pause()
                  break
                case playerStatus.played:
                  this.currentTime = 0;
                  this.sound.play()
                  break
                case playerStatus.pause:
                  this.sound.play()
                  break
                case playerStatus.stoped:
                  this.sound.play()
                  break
                case playerStatus.draging:
                  this.sound.play()
                  break
                case playerStatus.allPause:
                  this.onLoad()
                  break
                default:
              }
        },
        pointMoving() {
            const duration = this.sound.duration();
            if(this.duration !== duration) this.duration = duration;

            this.moving = setInterval(() => {
                let { currentTime } = this;
                currentTime += 0.5;
                if(currentTime > duration) currentTime = duration;
                this.currentTime = currentTime;
            }, 500)
        },
        touchStart({ changedTouches: [{ clientX, clientY }] }) {
            if (this.status === playerStatus.played || this.status === playerStatus.default) return;
            if (this.status === playerStatus.pause) {
                this.pause = true;
            }
            clearInterval(this.moving);
            this.status = playerStatus.draging;
            let left = this.getLeft({ clientX, clientY }) + 'px';
            this.$refs.oPoint.style.left = left;
            this.$refs.oProgress.style.width = left;
        },
        touchMove({ changedTouches: [{ clientX, clientY }] }) {
            if (this.status === playerStatus.played || this.status === playerStatus.default) return;
            clearInterval(this.moving);
            this.status = playerStatus.draging;
            let left = this.getLeft({ clientX, clientY }) + 'px';
            this.$refs.oPoint.style.left = left;
            this.$refs.oProgress.style.width = left;
        },
        touchEnd({ changedTouches: [{ clientX, clientY }] }) {
            if (this.status === playerStatus.played || this.status === playerStatus.default) return;
            this.currentTime = (this.getLeft({ clientX, clientY }) / this.progressBarLength) * this.duration;
            this.pauseStatus = true;
            this.sound.pause();
            this.sound.seek(Math.floor(this.currentTime));
        },
        getLeft({ clientX, clientY }){
            let clientXOrY = this.isReverse && this.isReverse() ? clientY : clientX;
            let { oPoint } = this.$refs;
            let left = clientXOrY - ($.getOffsetLeft(oPoint, this.scale) - oPoint.offsetLeft);
            if(left < 0) left = 0;
            if(left > this.progressBarLength) left = this.progressBarLength;
            return left;
        }
    },
    beforeDestroy() {
        if (this.status === playerStatus.default) return
        this.sound.stop()
        this.sound.unload()
    },
}

</script>
<style lang="less" scoped>

// 
.custom-detail-audio-wrap{
    padding:.1rem 0;
    font-size:0;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    width: 3.5rem;
    margin: 0 auto;

    &.theme-default{
        @theme-color: #FF2266;
        @theme-progress-bg-color: rgba(255,34,102,0.25);
        @theme-file-path: '';
        @thme-right-font-color:#999;
        .theme-mixin();
    }
    &.theme-lakeBlue{
        @theme-color: #00DBDB;
        @theme-progress-bg-color: #D9D9D9;
        @theme-file-path: 'theme/lakeBlue/';
        @thme-right-font-color:#00BBBB;
        .theme-mixin();
    }

    .theme-mixin() {
      div.custom-detail-audio-left-bg-progress{
        background:@theme-progress-bg-color;
      }
      span.custom-detail-audio-left-play-progress{
        background:@theme-color;
      }
      i.custom-detail-audio-point{
        &:before{
            background:@theme-color;
        }
      }
      .custom-detail-audio-right{
        color:@thme-right-font-color;
        i{
            background: @theme-color;
        }
      }
      .custom-detail-audio-left-button{
        background:url("../file/audio/@{theme-file-path}button-bg.png") no-repeat center center;
        .custom-detail-audio-left-waiting{
            background:url("../file/audio/@{theme-file-path}loading-bg.png") no-repeat center center;
        }
      }
    }


    .custom-detail-audio-face{
        flex: 0 0 .58rem;
        width:.58rem;
        height:.58rem;
        border-radius: 100%;
        box-sizing: border-box;
        img{
            display: block;
            width:100%;
            height:100%;
        }
    }
    .custom-detail-audio{
        flex: auto;
        min-width: 0;
        max-width: 2.9rem;
        padding-left:.09rem;
        display: flex;
        flex-wrap: nowrap;
        align-items:center;
        .custom-detail-audio-left{
            width:2.8rem;
            flex:0 0 2.8rem;
            height:.48rem;
            // background:url(../file/audio/bg-img.png) no-repeat center center;
            // background-size: 100%;
            background:#F7F7F7;
            border-radius:.48rem;
            .custom-detail-audio-left-main{
                height:.48rem;
                position:relative;
                .custom-detail-audio-left-button{
                    position:absolute;
                    left:0;
                    top:50%;
                    transform: translateY(-50%);
                    // background:url(../file/audio/button-bg.png) no-repeat center center;
                    background-size:100%;
                    width:.48rem;
                    height:.48rem;
                    .custom-detail-audio-left-waiting{
                        position:absolute;
                        left:0;
                        top:0;
                        // background:url(../file/audio/loading-bg.png) no-repeat center center;
                        background-size:100%;
                        width:100%;
                        height:100%;
                        transform-origin: center;
                        animation: run 5s linear 0s infinite;
                    }
                    span{
                        position:absolute;
                        left:0;
                        top:0;
                        width:.48rem;
                        height:.48rem;
                    }
                    span.custom-detail-audio-left-icon-zanting{
                        background:url(../file/audio/zanting-icon.png) no-repeat center center;
                        background-size:100%;
                    }
                    span.custom-detail-audio-left-icon-bofangzhong{
                        background:url(../file/audio/bofangzhong-icon.png) no-repeat center center;
                        background-size:100%;
                    }
                }
                .custom-detail-audio-left-noplay{
                    position:absolute;
                    padding-left:0.78rem;
                    left:0;
                    top:50%;
                    width:100%;
                    box-sizing: border-box;
                    transform: translateY(-50%);
                    .custom-detail-audio-left-noplay-img{
                        width:1.615rem;
                        height:.3rem;
                        background:url(../file/audio/noplay-image.png) no-repeat center center;
                        background-size:100%;
                    }
                }
                .custom-detail-audio-left-progress{
                    position:absolute;
                    left:.7rem;
                    top:0;
                    width:1.85rem;
                    height:.48rem;
                    div.custom-detail-audio-left-bg-progress{
                        position:absolute;
                        top:50%;
                        transform: translateY(-50%);
                        width:100%;
                        height:0.03rem;
                        box-sizing: border-box;
                        border-radius:0.03rem;
                        // background:@theme-progress-bg-color;
                        &:after{
                            content: '';
                            position:absolute;
                            left:0;
                            top:0;
                            width:100%;
                            height:.1rem;
                            top:50%;
                            left:50%;
                            transform: translateX(-50%) translateY(-50%);
                        }
                        span.custom-detail-audio-left-play-progress{
                            position:absolute;
                            width:0;
                            left:0;
                            height:100%;
                            // background:@theme-color;
                            border-radius:0.03rem;
                        }
                    }
                    i.custom-detail-audio-point{
                        position:absolute;
                        top:50%;
                        transform: translateX(-50%) translateY(-50%);
                        width:.25rem;
                        height:.25rem;
                        left:0;
                        &:before{
                            content: '';
                            position:absolute;
                            top:50%;
                            left:50%;
                            width:.1rem;
                            height:.1rem;
                            transform: translateX(-50%) translateY(-50%);
                            // background:@theme-color;
                            border-radius:100%;
                        }
                    }
                }
                .custom-detail-audio-left-block{
                    position:absolute;
                    left:0;
                    top:0;
                    width:100%;
                    height:100%;
                }
            }
        }
        .custom-detail-audio-right{
            // width:.55rem;
            // flex:0 0 .55rem;
            flex: auto;
            min-width: .48rem;
            height:.48rem;
            line-height:.48rem;
            text-align:right;
            position:relative;
            font-size:0.14rem;
            // color:#999;
            white-space: nowrap;
            i{
                position:absolute;
                left:0;
                top:0;
                width:.06rem;
                height:.06rem;
                opacity: 0.8;
                // background: @theme-color;
                border-radius: 100%;
            }
        }
    }
}

@keyframes run {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

</style>
