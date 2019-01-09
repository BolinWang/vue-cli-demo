import { types } from '../types'

let {
  VuexSetDetailAudioLoop
} = types

// 老数据处理
let local = localStorage.getItem('detail-audio-loop') || 1
if (local === 'true') {
  local = 2
  localStorage.setItem('detail-audio-loop', local)
} else if (local === 'false') {
  local = 1
  localStorage.setItem('detail-audio-loop', local)
} else {
  localStorage.removeItem('detail-audio-loop')
}

const detailAudioLoop = {
  state: {// 1、关闭 2、循环 3、单首循环
    isLoop: local || 1
  },
  mutations: {
    [VuexSetDetailAudioLoop]: function (state, isLoop) {
      localStorage.setItem('detail-audio-loop', isLoop)
      state.isLoop = isLoop
    }
  },
  actions: {
    ['action' + VuexSetDetailAudioLoop]: ({ commit }, payload) => {
      commit(VuexSetDetailAudioLoop, payload)
    }
  }
}

export default detailAudioLoop
