export default {
  namespaced: true,
  state: {
    dataIsLoad: false,
    data: {}
  },
  getters: {

  },
  mutations: {
    setData (state, data) {
      state.data = data || {}
      state.dataIsLoad = true
    },
    resetData (state) {
      state.dataIsLoad = false
      state.data = {}
    }
  },
  actions: {
    loadData ({ state, commit, dispatch }, payload) {
      dispatch('actionVuexSetLoading', true, { root: true })

      httpPost('/dist/recruit/courses', (obj) => {
        dispatch('actionVuexSetLoading', false, { root: true })

        let { code, data, desc } = obj
        if (code === 10000) {
          commit('setData', data)
        } else {
          dispatch('actionVuexMessageShow', desc || '系统异常~', { root: true })
        }
      })
    }
  }
}
