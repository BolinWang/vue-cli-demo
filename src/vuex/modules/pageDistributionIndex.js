export default {
    namespaced: true,
    state: {
        dataIsLoad: false,
        isShow: false,
        data: {}
    },
    mutations: {
        //每次进入页面都要先重置数据
        resetData(state){
            state.dataIsLoad = false;
            state.data = {};
        },
        setData(state, data){
            state.data = data || {};
            state.dataIsLoad = true;
        },
        show(state) {
            state.isShow = true;
        },
        hide(state) {
            state.isShow = false;
        },

    },
    actions: {
        loadData({ state, commit, dispatch }, payload){
            dispatch('actionVuexSetLoading', true, { root: true });

            httpPost('/dist/commission/data', (obj)=>{
                dispatch('actionVuexSetLoading', false, { root: true });

                let { code, data, desc } = obj;
                if(code === 10000){
                    commit('setData', data || {});
                }else{
                    dispatch('actionVuexMessageShow', desc || '系统异常~', { root: true });
                }

            });
        }
    },
    getters: {
        
    }
}
