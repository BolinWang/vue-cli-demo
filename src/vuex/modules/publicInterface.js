export default {
  namespaced: true,
  state: {
    recruitProcess: {}
  },
  getters: {

  },
  mutations: {
    setRecruitProcess (state, recruitProcess) {
      state.recruitProcess = recruitProcess
    }
  },
  actions: {
    loadRecruitProcess ({ state, commit, dispatch }, preload) {
      return new Promise((resolve, reject) => {
        dispatch('actionVuexSetLoading', true, { root: true })

        httpPost('/dist/recruit/process', (obj) => {
          dispatch('actionVuexSetLoading', false, { root: true })

          let { code, data: recruitProcess, desc } = obj
          if (code === 10000) {
            commit('setRecruitProcess', recruitProcess)
            resolve({ recruitProcess })
          } else {
            dispatch('actionVuexMessageShow', desc || '系统异常~', { root: true })
            reject({ desc })
          }
        })
      })
    }
  }
}
