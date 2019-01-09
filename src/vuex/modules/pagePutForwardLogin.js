export default {
  namespaced: true,
  state: {
    dataIsLoad: true,
    phone: '',
    code: ''
  },
  getters: {

  },
  mutations: {
    resetData (state) {
      state.dataIsLoad = false
    },
    setPhone (state, phone) {
      state.phone = phone
    },
    setCode (state, code) {
      state.code = code
    }
  },
  actions: {
    getPhoneCode ({ state, commit, dispatch }, payload) {

      // dispatch('actionVuexSetLoading', true, { root: true });

      // httpPost('/dist/recruit/courses', (obj)=>{
      //     dispatch('actionVuexSetLoading', false, { root: true });

      //     let { code, data, desc } = obj;
      //     if(code === 10000){
      //         commit('setData', data);
      //     }else{
      //         dispatch('actionVuexMessageShow', desc || '系统异常~', { root: true });
      //     }

      // });
    }
  }
}
