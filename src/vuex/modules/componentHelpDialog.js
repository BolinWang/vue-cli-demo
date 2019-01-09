export default {
    namespaced: true,
    state: {
        data: {}
    },
    getters: {

    },
    mutations: {
        setData(state, data){
            state.data = data;
        }
    },
    actions: {
        loadData({ state, commit, dispatch }, preload){

            dispatch('actionVuexSetLoading', true, { root: true });

            httpPost('/dist/user/getDirectPartnerInfo', {}, (obj)=>{
                dispatch('actionVuexSetLoading', false, { root: true });

                let { code, data, desc } = obj;
                if(code === 10000){
                    commit('setData', data);
                }else{
                    dispatch('actionVuexMessageShow', desc || '系统异常~', { root: true });
                }

            });
        }
    }
}
