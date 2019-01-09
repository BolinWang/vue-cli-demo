<template>
	<section class="aliplayer-wrap">
		<div v-show="false">
			<div class="prism-player" style="position: absolute" :id="videoId"></div>
		</div>
		<template v-if="mediaUrl">
			<template v-if="mediaType == 'video'">
				<tVideo 
					tStyle="height:100%"
		            :src="mediaUrl"
		            :poster="poster"
		            :useH5="useH5"
		            :scale="scale"
		            :autoplay="autoplay"
		            :preload="preload"
		            :loop="loop"
		            :theme="theme"
		            :progressType="progressType"
		        ></tVideo>
	        </template>	
			<template v-else-if="mediaType == 'audio'" >
				<tAudio 
		            :src="mediaUrl"
		            :scale="scale"
		            :theme="theme"
		            :defaultDuration="duration"
		        ></tAudio>
			</template>
        </template>
	</section>
</template>
<script>
import Account from '@/logic/account'
import tVideo from './video/video.vue';
import tAudio from './audio/audio.vue';

export default {
	props: ['contentId', 'mediaType', 'format', 'cover', 'autoplay', 'preload', 'useH5', 'loop', 'scale', 'theme', 'duration', 'url', 'progressType'],
	data(){
		return {
			videoId: 'aliplayer' + (Math.random() + '').replace(/\D/g, ''),
			mediaUrl: '',
			poster: '',
		}
	},
	components: {
		tVideo,
		tAudio
	},
	computed: {
		userId() {
            return Account.getUserId() || null;
        },
	},
	mounted(){
		let { url } = this;
		this.insertScriptTag().then(()=>{
			//如果直接传url直接跳过aliplayer实例化
			if(url){
				this.mediaUrl = url;
				this.setPoster();
			}else{
				this.getPlayauth();
			}
		});
	},
	methods: {
		insertScriptTag(){
			return new Promise((resolve, reject) => {
				let aliplayerJsTag = document.getElementById('aliplayerJsTag');
				if(aliplayerJsTag == null){
					aliplayerJsTag = document.createElement('script');
	                aliplayerJsTag.type = 'text/javascript'; 
	                aliplayerJsTag.src = '//g.alicdn.com/de/prismplayer/2.7.1/aliplayer-min.js'; 
	                aliplayerJsTag.id = 'aliplayerJsTag';

	                let head = document.getElementsByTagName('head')[0];
	                head.appendChild(aliplayerJsTag);
				}
				if (aliplayerJsTag.loaded) {
	                resolve();
	            } else {
	                aliplayerJsTag.addEventListener('load', () => {
	                    aliplayerJsTag.loaded = true;
	                    resolve();
	                });
	            }
            })
		},
		getPlayauth(){
			let { contentId, userId } = this;
			httpPost('/knowledge/source/getSourcePlayAuth', {
	            contentId,
	            userId
	        }).then((obj) => {
                let { code } = obj;
	            if(code === 10000){
	                let { data } = obj;
	                let { playAuth } = data;

	                this.createPlayer({ playAuth }).then((mediaUrl)=>{
	                	this.mediaUrl = mediaUrl;
	                	//如果没有传封面图，默认设置第一帧视频内容
	                	this.setPoster();
	                }).catch((e)=>{
	                	console.error(e);
	                });
	            }
            });
		},
		setPoster(){
			if(this.mediaType == 'video' && this.mediaUrl){
        		this.poster = this.cover || `${this.mediaUrl}?x-oss-process=video/snapshot,t_0,f_jpg,m_fast`;
        	}
		},
		createPlayer({ playAuth }){
			let { videoId, contentId, mediaType, format } = this;
			let controlBarVisibility = '';
			//设置默认值
			mediaType = mediaType || 'audio';

			if(mediaType == 'video'){
				format = format || 'mp4';
				controlBarVisibility = 'click';
			}else{
				//服务端mp3存到服务器也变mp4了
				format = format || 'mp4';
				controlBarVisibility = 'always';
			}

			return new Promise((resolve, reject)=>{

				try{
					let player = new Aliplayer({
						"id": videoId,
						"vid": contentId,
		  				"playauth": playAuth,
						"qualitySort": "asc",
						"format": format,
						"mediaType": mediaType,
						"width": "100%",
						"height": "100%",
						"autoplay": false,
						"isLive": false,
						"rePlay": false,
						"playsinline": true,
						"preload": false,
						"controlBarVisibility": controlBarVisibility,
						"useH5Prism": true,
						"showBuffer": true,
						"skinLayout": false
					}, (player, a,b)=>{
						player.on("sourceloaded", ()=>{
							resolve(player._options.source);
						});
					});
				}catch(e){
					reject(e);
				}

			});
			
		}
	}
}
</script>
<style lang="less" scoped>
.aliplayer-wrap{
	height:100%;
	position:relative;
}
</style>