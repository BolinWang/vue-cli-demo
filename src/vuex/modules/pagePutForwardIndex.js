/* eslint-disable no-undef */
export default {
  namespaced: true,
  state: {
    dataIsLoad: false,
    data: {},
    withdrawInfoIsload: false,
    withdrawInfo: {}
  },
  getters: {

  },
  mutations: {
    setData (state, data) {
      state.data = data || {}
      state.dataIsLoad = true
    },
    setWithdrawInfo (state, withdrawInfo) {
      state.withdrawInfoIsload = true
      state.withdrawInfo = withdrawInfo
    },
    resetData (state) {
      state.dataIsLoad = false
      state.data = {}
      state.withdrawInfo = {}
    }
  },
  actions: {
    loadData ({ state, commit, dispatch }, payload) {
      dispatch('actionVuexSetLoading', true, { root: true })

      httpPost('/dist/account/withdrawInfo', (obj) => {
        dispatch('actionVuexSetLoading', false, { root: true })

        let { code, data, desc } = obj
        if (code === 10000) {
          commit('setData', data)
        } else {
          dispatch('actionVuexMessageShow', desc || '系统异常~', { root: true })
        }
      })
    },
    loadWithdrawInfo ({ state, commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        dispatch('actionVuexSetLoading', true, { root: true })

        httpPost('/dist/withdraw/query', (obj) => {
          dispatch('actionVuexSetLoading', false, { root: true })

          let { code, data, desc } = obj
          if (code === 10000) {
            commit('setWithdrawInfo', data)
            resolve(data)
          } else {
            dispatch('actionVuexMessageShow', desc || '系统异常~', { root: true })
          }
        })
      })
    },
    withdrawStart ({ commit, dispatch }, { amount }) {
      return new Promise((resolve, reject) => {
        dispatch('actionVuexSetLoading', true, { root: true })

        httpPost('/dist/withdraw/start', {
          withdrawAmount: amount * 100
        }, (obj) => {
          dispatch('actionVuexSetLoading', false, { root: true })

          let { code, desc } = obj
          if (code === 10000) {
            resolve()
          } else {
            dispatch('actionVuexMessageShow', desc || '系统异常~', { root: true })
          }
        })
      })
    }
  }
}
