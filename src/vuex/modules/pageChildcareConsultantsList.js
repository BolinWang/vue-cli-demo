export default {
    namespaced: true,
    state: {
        dataIsLoad: false,
        list: [],
        totalNumber: 0,
        pageNumber: 1,
        pageSize: 20,
        end: false
    },
    getters: {
        scrollDisabled({ end }, getters, { popupUI: { PopupUILoading } }){
            return end || PopupUILoading;
        }
    },
    mutations: {
        setList(state, list){
            state.pageNumber++;
            state.list = list || [];
            state.dataIsLoad = true;
        },
        setEnd(state){
            state.end = true;
        },
        setTotalNumber(state, totalNumber){
            state.totalNumber = totalNumber || 0;
        },
        resetData(state){
            state.dataIsLoad = false;
            state.list = [];
            state.totalNumber = 0;
            state.pageNumber = 1;
            state.pageSize = 20;
            state.end = false;
        }
    },
    actions: {
        loadList({ state: { pageNumber, pageSize, list, end }, commit, dispatch }, payload){
            if(end){
                // dispatch('actionVuexMessageShow', '没有更多数据了～', { root: true });
                return;
            }

            dispatch('actionVuexSetLoading', true, { root: true });

            httpPost('/dist/user/list', {
                pageNumber, pageSize, roleId: 4
            }, (obj)=>{
                dispatch('actionVuexSetLoading', false, { root: true });

                let { code, data, desc } = obj;

                if(code === 10000){
                    let newList = data && data.data || [];
                    
                    let { totalNumber } = data || {};

                    if(newList.length < pageSize){
                        commit('setEnd');
                    }

                    list = list.concat(newList);

                    if(pageNumber == 1){
                        commit('setTotalNumber', totalNumber);
                    }
                    commit('setList', list);
                }else{
                    commit('setEnd');
                    dispatch('actionVuexMessageShow', desc || '系统异常~', { root: true });
                }

            });
        }
    }
}
