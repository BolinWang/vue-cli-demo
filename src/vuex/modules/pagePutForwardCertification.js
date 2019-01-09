export default {
    namespaced: true,
    state: {
        dataIsLoad: false,
        withdrawInfo: {
            bankCardName: '',
            bankCardNumber: '',
            idCardType: '身份证',
            idCardNumber: '',
            phoneNumber: '',
        },
        isAgree: false,
        tempIdCardType: '身份证',
        idCardTypePopupVisible: false,
        idCardTypeSlots: [
            {
                defaultIndex: 0,
                values: ['身份证'],
                className: 'slot1',
                textAlign: 'center'
            }
        ]
    },
    getters: {

    },
    mutations: {
        resetData(state){
            state.dataIsLoad = false;
            state.withdrawInfo = {
                bankCardName: '',
                bankCardNumber: '',
                idCardType: '身份证',
                idCardNumber: '',
                phoneNumber: '',
            };
            state.isAgree = false;
            state.tempIdCardType = '身份证';
            state.idCardTypePopupVisible = false;
            state.idCardTypeSlots = [
                {
                    defaultIndex: 0,
                    values: ['身份证'],
                    className: 'slot1',
                    textAlign: 'center'
                }
            ];
        },
        setWithdrawInfo(state, withdrawInfo){
            state.withdrawInfo = Object.assign({}, state.withdrawInfo, withdrawInfo);
            state.dataIsLoad = true;
        },
        setIsAgree(state, isAgree){
            state.isAgree = isAgree;
        },
        setIdCardTypePopupVisible(state, idCardTypePopupVisible){
            state.idCardTypePopupVisible = idCardTypePopupVisible;
        },
        setTempIdCardType(state, tempIdCardType){
            state.tempIdCardType = tempIdCardType;
        }
    },
    actions: {
        loadData({ state, commit, dispatch }, payload){
            dispatch('actionVuexSetLoading', true, { root: true });

            httpPost('/dist/withdraw/query', (obj)=>{
                dispatch('actionVuexSetLoading', false, { root: true });

                let { code, data, desc } = obj;
                if(code === 10000){

                    //如果用户还没有签约过保留用户上次填写的信息
                    if(!data || !data.bankCardNumber){
                        data = {
                            bankCardName: sessionStorage.getItem('putForward-certification-bankCardName') || '',
                            bankCardNumber: sessionStorage.getItem('putForward-certification-bankCardNumber') || '',
                            idCardType: sessionStorage.getItem('putForward-certification-idCardType') || '身份证',
                            idCardNumber: sessionStorage.getItem('putForward-certification-idCardNumber') || '',
                            phoneNumber: sessionStorage.getItem('putForward-certification-phoneNumber') || ''
                        }
                    }

                    let isAgree = sessionStorage.getItem('putForward-certification-isAgree');
                    isAgree = isAgree == 'true' ? true : false;

                    commit('setIsAgree', isAgree);
                    commit('setWithdrawInfo', data);
                }else{
                    dispatch('actionVuexMessageShow', desc || '系统异常~', { root: true });
                }

            });
        },
        saveWithdrawInfo({ state: { withdrawInfo }, commit, dispatch }, payload){
            dispatch('actionVuexSetLoading', true, { root: true });

            return new Promise((resolve, reject)=>{
                httpPost('/dist/withdraw/save', withdrawInfo, (obj)=>{
                    dispatch('actionVuexSetLoading', false, { root: true });

                    let { code, data, desc } = obj;
                    if(code === 10000){
                        resolve()
                    }else{
                        dispatch('actionVuexMessageShow', desc || '系统异常~', { root: true });
                        reject({ code });
                    }

                });
            });
        }
    }
}
