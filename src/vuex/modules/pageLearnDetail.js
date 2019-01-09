/* eslint-disable no-undef */
export default {
  namespaced: true,
  state: {
    dataIsLoad: false,
    data: {},
    questionIndex: 0
  },
  getters: {

  },
  mutations: {
    setData (state, data) {
      // 初始化答案
      data = data || {}

      let list = data.evaluationQuestionDTOList || []
      list.forEach((item, i) => {
        item.userAnswer = null
      })

      state.data = data
      state.dataIsLoad = true
    },
    setQuestionUserAnswer (state, { question, userAnswer }) {
      question.userAnswer = userAnswer
    },
    updateQuestionIndex (state, val) {
      state.questionIndex += val
    },
    resetData (state) {
      state.dataIsLoad = false
      state.data = {}
      state.questionIndex = 0
    }
  },
  actions: {
    loadData ({ state, commit, dispatch }, payload) {
      dispatch('actionVuexSetLoading', true, { root: true })

      httpPost('/dist/recruit/evaluation', (obj) => {
        dispatch('actionVuexSetLoading', false, { root: true })

        let { code, data, desc } = obj
        if (code === 10000) {
          commit('setData', data)
        } else {
          dispatch('actionVuexMessageShow', desc || '系统异常~', { root: true })
        }
      })
    },
    commitResult ({ state, commit, dispatch }, payload) {
      let { data, data: { id } } = state

      if (!id) {
        dispatch('actionVuexMessageShow', '系统异常,id缺失~')
        return
      }

      let evaluationAnswer = data.evaluationQuestionDTOList.map(({ id, userAnswer }) => {
        return { id, userAnswer }
      })

      return new Promise((resolve, reject) => {
        dispatch('actionVuexSetLoading', true, { root: true })

        httpPost('/dist/recruit/evaluation/submit', {
          id,
          evaluationAnswer
        }, (obj) => {
          dispatch('actionVuexSetLoading', false, { root: true })

          let { code, data, desc } = obj
          if (code === 10000) {
            resolve(data)
          } else {
            dispatch('actionVuexMessageShow', desc || '系统异常~', { root: true })
          }
        })
      })
    }
  }
}
