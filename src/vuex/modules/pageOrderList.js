/* eslint-disable no-undef */
export default {
  namespaced: true,
  state: {
    dataIsLoad: false,
    list: [],
    totalNumber: 0,
    pageNumber: 1,
    pageSize: 20,
    end: false,
    settlementStatus: null
  },
  getters: {
    scrollDisabled ({ end }, getters, { popupUI: { PopupUILoading } }) {
      return end || PopupUILoading
    }
  },
  mutations: {
    resetData (state, { changeSettlementStatus } = {}) {
      state.list = []
      state.totalNumber = 0
      state.pageNumber = 1
      state.pageSize = 20
      state.end = false
      if (!changeSettlementStatus) {
        state.dataIsLoad = false
        state.settlementStatus = null
      }
    },
    setList (state, list) {
      state.pageNumber++
      state.list = list || []
      state.dataIsLoad = true
    },
    setEnd (state, end) {
      state.end = end
    },
    setTotalNumber (state, totalNumber) {
      state.totalNumber = totalNumber || 0
    },
    setSettlementStatus (state, settlementStatus) {
      state.settlementStatus = settlementStatus
    },
    setPageNumber (state, pageNumber) {
      state.pageNumber = pageNumber
    }
  },
  actions: {
    loadList ({ state: { pageNumber, pageSize, list, end, settlementStatus }, commit, dispatch }, preload) {
      if (end) {
        // dispatch('actionVuexMessageShow', '没有更多数据了～', { root: true });
        return
      }
      dispatch('actionVuexSetLoading', true, { root: true })

      httpPost('/dist/commission/detail', {
        pageNumber, pageSize, flag: 1, settlementStatus
      }, (obj) => {
        dispatch('actionVuexSetLoading', false, { root: true })

        let { code, data, desc } = obj
        if (code === 10000) {
          let newList = (data && data.data) || []
          let { totalNumber } = data || {}

          if (newList.length < pageSize) {
            commit('setEnd', true)
          }

          list = list.concat(newList)

          if (pageNumber === 1) {
            commit('setTotalNumber', totalNumber)
          }

          commit('setList', list)
        } else {
          commit('setEnd', true)
          dispatch('actionVuexMessageShow', desc || '系统异常~', { root: true })
        }
      })
    }
  }
}
