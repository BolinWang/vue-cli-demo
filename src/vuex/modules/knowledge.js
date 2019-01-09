import { types } from '../types'
let {
  VuexInitKnowledgeData
} = types

const knowledge = {
  state: {
    data: null// 详情数据
  },
  mutations: {
    [VuexInitKnowledgeData]: function (state, { data }) {
      state.data = data
    }
  },
  actions: {
    ['action' + VuexInitKnowledgeData]: ({ state, commit, dispatch }, payload) => {
      let { userId, courseId } = payload

      dispatch('actionVuexSetLoading', true)

      return new Promise((resolve, reject) => {
        httpPost('/education/4/course/queryMathCourseDetailById', {
          userId,
          courseId
        }, (obj) => {
          dispatch('actionVuexSetLoading', false)

          let { code } = obj
          if (code === 10000) {
            let { data } = obj
            if (!data) {
              // 处理接口出错
              reject()
              return
            }
            // dealdata
            data = Object.assign({}, data, { _t: Date.now() })

            commit(VuexInitKnowledgeData, { data })
            resolve({ data })
          } else {
            reject()
          }
        })
      })
    }
  },
  getters: {

  }
}

export default knowledge
