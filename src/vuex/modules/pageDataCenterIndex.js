import { formatDate } from '@/tools/formatDate';

export default {
    namespaced: true,
    state: {
        dataIsLoad: false,
        list: [],
        data: {},
        activeIndex: 0,
        year: 2018,
        tempYear: 2018,
        yearPopupVisible: false,
        yearSlots: [
            {
                defaultIndex: 0,
                values: [2018],
                className: 'slot1',
                textAlign: 'center'
            }
        ]
    },
    mutations: {
        initState(state, data){
            let nowYear = parseInt(formatDate(Date.now(), 'yyyy'));
            //初始化year，默认选中当前年
            state.year = state.tempYear = nowYear;
            //设置yearSlots
            this.commit('pageDataCenterIndex/setYearSlots');
        },
        setYearSlots(state, yearSlots){
            if(yearSlots){
                state.yearSlots = yearSlots;
                return;
            }

            let startYear = 2018,
                nowYear = parseInt(formatDate(Date.now(), 'yyyy')),
                yearList = [];

            if(nowYear <= startYear){
                yearList = [startYear];
            }else{
                for(let i = startYear; i <= nowYear; i ++){
                    yearList.push(i);
                }
            }

            state.yearSlots = [
                {
                    defaultIndex: yearList.indexOf(nowYear),
                    values: yearList,
                    className: 'slot1',
                    textAlign: 'center'
                }
            ]
        },
        setYearPopupVisible(state, yearPopupVisible){
            state.yearPopupVisible = yearPopupVisible;
        },
        setYear(state, year){
            state.year = year;
        },
        setTempYear(state, tempYear){
            state.tempYear = tempYear;
        },
        setActiveIndex(state, activeIndex){
            state.activeIndex = activeIndex;
        },
        setData(state, data){
            state.data = data || {};
            state.dataIsLoad = true;
        },
        setList(state, list){
            state.list = list || [];
        },
        setDefaultIndex(state, defaultIndex){
            state.yearSlots[0].defaultIndex = defaultIndex;
        },
        resetData(state){
            state.dataIsLoad = false;
            state.list = [];
            state.data = {};
            state.activeIndex = 0;
            state.year = 2018;
            state.tempYear = 2018;
            state.yearPopupVisible = false;
            state.yearSlots = [
                {
                    defaultIndex: 0,
                    values: [2018],
                    className: 'slot1',
                    textAlign: 'center'
                }
            ];
        }
    },
    actions: {
        loadData({ state, commit, dispatch }, payload){

            dispatch('actionVuexSetLoading', true, { root: true });

            httpPost('/dist/commission/data', (obj)=>{
                dispatch('actionVuexSetLoading', false, { root: true });

                let { code, data, desc } = obj;
                if(code === 10000){
                    commit('setData', data);
                }else{
                    dispatch('actionVuexMessageShow', desc || '系统异常~', { root: true });
                }

            });

        },
        loadList({ state: { year }, commit, dispatch }, payload){
            //重置list
            commit('setList', []);

            dispatch('actionVuexSetLoading', true, { root: true });

            httpPost('/dist/data/monthData', {
                start: `${year}-01-01 00:00:00`,
                end: `${year}-12-31 23:59:59`
            }, (obj)=>{
                dispatch('actionVuexSetLoading', false, { root: true });

                let { code, data: list, desc } = obj;
                if(code === 10000){
                    commit('setList', list);
                }else{
                    dispatch('actionVuexMessageShow', desc || '系统异常~', { root: true });
                }

            });

        }
    }
}
