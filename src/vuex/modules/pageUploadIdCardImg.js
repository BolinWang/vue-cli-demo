export default {
    namespaced: true,
    state: {
        dataIsLoad: true,
        cardImg1: '',
        cardImg2: ''
    },
    getters: {

    },
    mutations: {
        resetData(state){
            state.dataIsLoad = false;
        },
        setCardImg1(state, cardImg1){
            state.cardImg1 = cardImg1;
        },
        setCardImg2(state, cardImg2){
            state.cardImg2 = cardImg2;
        }
    },
    actions: {
        getPhoneCode({ state, commit, dispatch }, payload){

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
