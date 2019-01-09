<template>
	<div ref="video-wrap">
        <template v-if="src">
    		<div class="custom-detail-video-wrap" :style="tStyle" v-video>
                <template v-if="phoneIsAndroid">
                    <video class="video" ref="video"
                        :src="src" 
                        webkit-playsinline="true" 
                        playsinline="true" 
                        :preload="preload || 'none'"
                        controlsList="nodownload" 
                        :poster="poster" 
                        x5-playsinline 
                    ></video>
                </template>
                <template v-else>
                    <video class="video" ref="video"
                        :src="src" 
                        webkit-playsinline="true" 
                        x-webkit-airplay="allow" 
                        playsinline="true" 
                        x5-video-player-type="h5" 
                        x5-video-orientation="h5" 
                        x5-video-player-fullscreen="false" 
                        :preload="preload || 'none'"
                        controlsList="nodownload" 
                        :poster="poster" 
                        x5-playsinline 
                    ></video>
                </template>
                
				<div class="custom-detail-video-controls" v-show="showControls">
					<div class="btn-group">
                        <div v-show="!waiting">
                            <transition-group name="btn-rotate" tag="div">
                                <span class="play-btn" key="play-btn" v-show="!playing" ></span>
                                <span class="pause-btn" key="pause-btn" v-show="playing" ></span>
                            </transition-group>
                        </div>
                        <div v-show="waiting">
                            <span class="waiting-btn"></span>
                        </div>
						<p v-show="duration">{{ currentTimeStr }}<font>/{{ durationStr }}</font></p>
					</div>
				</div>	

                <div class="custom-detail-video-controls waiting" v-show="!showControls && waiting">
                    <div class="btn-group">
                        <span class="waiting-btn"></span>
                        <p v-show="duration"></p>
                    </div>
                </div>  

                <div class="custom-detail-video-left-progress">
                <!-- @touchstart.passive="touchStart"
                    @touchmove.stop.prevent="touchMove"
                    @touchend.passive="touchEnd"
                    @touchcancel.passive="touchEnd" -->
                    <div>
                        <div v-show="duration" class="custom-detail-video-left-bg-progress">
                            <span class="custom-detail-video-left-play-progress" :style="playProgress"></span>
                        </div>
                        <!--点只在播放过了才显示-->
                        <i v-show="duration && showControls && !noPlay" class="custom-detail-video-point" :style="pointStyle"></i>
                    </div>
                </div>
    	    </div>
        </template>
	</div>
</template>

<script>
import system from '@/tools/system'
import _e from '@/tools/event.js'
import { getRem } from '@/tools/util'
import $ from '@/tools/dom.js'

export default {
	props: ['src', 'uniqueId', 'tStyle', 'poster', 'preload', 'autoplay', 'loop'],
	data(){
		return {
			showControls: false, //是否显示控制按钮
            noPlay: true,//没有播放过
			playing: false,//播放中
			waiting: false,//加载中
			duration: 0,//总时长
			currentTime: 0,//当前播放时长
		};
	},
	computed: {
		video(){
			return this.$refs.video;
		},
		currentTimeStr(){
			let { currentTime, addZero } = this;
            currentTime = currentTime || 0;
            return addZero(currentTime / 60 | 0) + ':' + addZero(currentTime % 60 | 0);
		},
		durationStr(){
            let { duration, addZero } = this;
            duration = duration || 0;
            return addZero(duration / 60 | 0) + ':' + addZero(duration % 60 | 0);
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
	mounted(){
        //给wrap绑定video 方便外部调用
        this.$refs['video-wrap'].video = this.video;
	},
	methods: {
		..._e,
		addZero(val){
            return val > 9 ? val : '0' + val;
        }
	},
	directives: {
        video: {
            inserted: function(el, binding, vnode) {
                let self = vnode.context,
                    oVideo = el.querySelector('.video'),
                    oPoint = el.querySelector('.custom-detail-video-point'),
                    oProgress = el.querySelector('.custom-detail-video-left-progress'),
                    oPlayProgress = el.querySelector('.custom-detail-video-left-play-progress'),
                    oPlayBtn = el.querySelector('.play-btn'),
                    oPauseBtn = el.querySelector('.pause-btn');

                let currentTimeMoveTimer = null, 
                    autoHideControlsTimer = null;

                //开始播放
                (function(oPlayBtn){
                    self.oPlayBtn = oPlayBtn;
                    self.event_bind(oPlayBtn, 'click', (e)=>{
                        //取消默认行为和冒泡
                        e.preventDefault();
                        e.stopPropagation();

                        triggerVideoPlay();
                        //自动隐藏控制面板
                        autoHideControls();
                    });
                })(oPlayBtn);

                //暂停播放
                (function(oPauseBtn){
                    self.oPauseBtn = oPauseBtn;
                    self.event_bind(oPauseBtn, 'click', (e)=>{
                        //取消默认行为和冒泡
                        e.preventDefault();
                        e.stopPropagation();

                        triggerVideoPlay();
                        //自动隐藏控制面板
                        autoHideControls();
                    });
                })(oPauseBtn);

                //切换显示控制面板
                (function(el){
                    self.event_bind(el, 'click', (e)=>{
                        //取消默认行为和冒泡
                        e.preventDefault();
                        e.stopPropagation();

                        triggerShowControls();
                        //自动隐藏控制面板
                        autoHideControls();
                    });
                })(el);

            	(function(self, oVideo){
                    self.oVideo = oVideo;
                    //初始设置
                    self.duration = oVideo.duration || 0;

                    self.event_bind(oVideo, "durationchange", ()=>{
                        self.duration = oVideo.duration;
                    });

                    self.event_bind(oVideo, "waiting", ()=>{
                        self.waiting = true;
                    });

                    self.event_bind(oVideo, "playing", ()=>{
                        self.waiting = false;
                    });

                    self.event_bind(oVideo, "play", (e)=>{
                    	//开启定时器
                    	currentTimeMove();

                        self.playing = true;
                        self.waiting = false;
                        self.noPlay = false;
                        stopOtherMeta(e.target);
                    });

                    self.event_bind(oVideo, "pause", ()=>{
                        //关闭定时器
                    	clearInterval(currentTimeMoveTimer);
                    	
                        self.playing = false;
                        self.waiting = false;
                    });

                    self.event_bind(oVideo, 'ended', ()=>{
                    	if(self.loop){
                    		oVideo.play();
                    	}
                    });

                    //关闭其他媒体
                    function stopOtherMeta(cMeta){
                        let metas = document.querySelectorAll('video, audio, embed');
                        for(let i = 0; i < metas.length; ++ i){
                            let meta = metas[i];
                            if(cMeta!= meta){
                                meta && meta.pause && meta.pause();
                            }
                        }

                        window.__curAudio && window.__curAudio.broadcast('stop');

                        //告知app
                        if(system.isApp()){
                            NGJsBridge.startPlay();
                        }
                    }
                })(self, oVideo);

                (function(self, oPoint, oVideo, oProgress){
                    self.oPoint = oPoint;
                    self.oProgress = oProgress;

                    let x, y, curX, l, curL, isPlay = false;

                    function touchMoveFn(e){
                        //取消默认行为和冒泡
                        e.preventDefault();
                        e.stopPropagation();

                        if(self.noPlay) return;

                        let { changedTouches: [{ clientX }] } = e;
                        let left = getLeft(clientX);
                        oPlayProgress.style.width = oPoint.style.left = left + 'px';
                        self.currentTime = (getLeft(clientX) / oProgress.offsetWidth) * self.duration;
                    }

                    function touchEndFn(e){
                        //取消默认行为和冒泡
                        e.preventDefault();
                        e.stopPropagation();

                        if(self.noPlay) return;

                        let { changedTouches: [{ clientX }] } = e;
                        let left = getLeft(clientX);
                        oPlayProgress.style.width = oPoint.style.left = left + 'px';
                        self.currentTime = oVideo.currentTime = (getLeft(clientX) / oProgress.offsetWidth) * self.duration;
                        
                        //恢复定时器
                        currentTimeMove();
                        //自动隐藏控制面板
                        autoHideControls();
                        //取消绑定事件
                        self.event_unbind(oProgress, "touchmove", touchMoveFn);
                        self.event_unbind(oProgress, "touchend", touchEndFn);
                        self.event_unbind(oProgress, 'touchcancel', touchEndFn);
                    }
                    self.event_bind(oProgress, "touchstart", (e)=>{
                        //取消默认行为和冒泡
                        e.preventDefault();
                        e.stopPropagation();

                        if(self.noPlay) return;

                    	//清除定时器
                        clearInterval(currentTimeMoveTimer);
                        //清除自动隐藏控制面板
                        clearTimeout(autoHideControlsTimer);

                        let { changedTouches: [{ clientX }] } = e;
                        let left = getLeft(clientX);
                        oPlayProgress.style.width = oPoint.style.left = left + 'px';

                        //设置绑定事件
                        self.event_bind(oProgress, "touchmove", touchMoveFn);
                        self.event_bind(oProgress, "touchend", touchEndFn);
                        self.event_bind(oProgress, 'touchcancel', touchEndFn);
                    });

                    function getLeft(clientX){
                        let left = clientX - ($.getOffsetLeft(oPoint) - oPoint.offsetLeft);
                        if(left < 0) left = 0;
                        if(left > oProgress.offsetWidth) left = oProgress.offsetWidth;
                        return left;
                    }

                })(self, oPoint, oVideo, oProgress);


                //是否自动播放
                (function(self, oVideo){

                    function dealPreload(){
                        if(self.autoplay){
                            self.showControls = false;
                            if(!system.isWechat()){//不是微信浏览器中访问 不执行任何操作
                                oVideo.play();
                            }else{
                                //处理微信浏览器中autoplay无效问题
                                wx.ready(()=>{
                                    oVideo.play();
                                });
                            }
                        }else{
                            self.showControls = true;
                        }
                    }

                    //处理预加载
                    dealPreload();

                })(self, oVideo);


                function currentTimeMove(){
                    clearInterval(currentTimeMoveTimer);
                    currentTimeMoveTimer = setInterval(()=>{
                        self.currentTime = oVideo.currentTime;
                    }, 1000);
                }

                function autoHideControls(){
                    clearTimeout(autoHideControlsTimer);
                    if(self.noPlay) return;
                    if(!self.playing) return;
                    if(!self.showControls) return;
                    autoHideControlsTimer = setTimeout(()=>{
                        self.showControls = false;
                    }, 5000);
                }

                function triggerVideoPlay(){
                    if(self.playing){
                        oVideo.pause();
                    }else{
                        if(self.noPlay){
                            //从来没有播过的情况下，第一次点击播放 会自动隐藏面板
                            self.showControls = false;
                        }
                        oVideo.play();
                    }
                    self.playing = !self.playing;
                }

                function triggerShowControls(){
                    if(self.noPlay) return;
                    self.showControls = !self.showControls;
                }

            },
            unbind(el, binding, vnode){
                let self = vnode.context;

                self.event_unbindAll(self.oVideo);
                self.event_unbindAll(self.oProgress);
                self.event_unbindAll(self.oPlayBtn);
                self.event_unbindAll(self.oPauseBtn);
            }
        }
    }
}
</script>
<style lang="less" scoped>
.custom-detail-video-wrap{
	position: relative;
	video{
		width: 100%;
		height:100%;
	}
	.custom-detail-video-controls{
		position: absolute;
		z-index: 10;
		let:0;
		top:0;
		width:100%;
		height:100%;
		background: rgba(0, 0, 0, 0.3);
        &.waiting{
            background: none;
        }
		.btn-group{
			position: absolute;
			left:50%;
			top:50%;
			transform: translate(-50%, -50%);
			span.play-btn{
				display: block;
				width:.4rem;
				height:.4rem;
				margin: 0 auto;
				background: url(./file/play-btn.png) no-repeat center center;
				background-size:100%;
			}
            span.pause-btn{
                display: block;
                width:.4rem;
                height:.4rem;
                margin: 0 auto;
                background: url(./file/pause-btn.png) no-repeat center center;
                background-size:.32rem .32rem;
            }
            span.waiting-btn{
                display: block;
                width:.4rem;
                height:.4rem;
                margin: 0 auto;
                background: url(./file/waiting-btn.gif) no-repeat center center;
                background-size:100%;
            }
			p{
				margin-top:.125rem;
				text-align:center;
				color:white;
				font-size:.16rem;
				font{
					color:#CCCCCC;
				}
			}
		}
	}

	.custom-detail-video-left-progress{
        position:absolute;
        left:0;
        bottom:0;
        width:100%;
        height:0.5rem;
        z-index:10;
        transform: translateY(50%);
        div.custom-detail-video-left-bg-progress{
            position:absolute;
            top:50%;
            transform: translateY(-50%);
            width:100%;
            height:0.03rem;
            box-sizing: border-box;
            border-radius:0.03rem;
            background:rgba(255, 255, 255, 0.7);
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
            span.custom-detail-video-left-play-progress{
                position:absolute;
                width:0;
                left:0;
                height:100%;
                background:#FFB354;
            }
        }
        i.custom-detail-video-point{
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
                width:.15rem;
                height:.15rem;
                transform: translateX(-50%) translateY(-50%);
                background:#FFB354;
                border-radius:100%;
            }
        }
    }
}

.play-btn.btn-rotate-enter-active{
    opacity: 0;
    animation: btn-rotate-in .5s;
}
.pause-btn.btn-rotate-enter-active{
    opacity: 0;
    animation: btn-rotate-in1 .5s;
}
.btn-rotate-leave-active {
    opacity: 0;
    position: absolute;
}
@keyframes btn-rotate-in {
    0% {
        opacity: 0;
        transform: rotate(-180deg);
    }
    100% {
        opacity: 1;
        transform: rotate(0deg);
    }
}
@keyframes btn-rotate-in1 {
    0% {
        opacity: 0;
        transform: rotate(180deg);
    }
    100% {
        opacity: 1;
        transform: rotate(0deg);
    }
}
</style>