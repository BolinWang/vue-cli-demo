import system from '@/tools/system'

function stopOtherMeta (cMeta) {
  // 暂停所有标签媒体
  let metas = document.querySelectorAll('video, audio, embed')
  for (let i = 0; i < metas.length; ++i) {
    let meta = metas[i]
    if (cMeta != meta) {
      meta && meta.pause && meta.pause()
    }
  }
  // 暂停主音频
  if (window.__curAudio && window.__curAudio != cMeta) {
    	window.__curAudio.broadcast && window.__curAudio.broadcast('stop')
  }

  // 告知app
  if (system.isApp()) {
    NGJsBridge.startPlay()
  }
}

export default {
  stopOtherMeta
}
export { stopOtherMeta }
