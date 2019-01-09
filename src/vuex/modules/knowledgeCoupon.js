import { types } from '../types'
let {
    VuexLoadKnowledgeCoupon,
    VuexSetKnowledgeCouponShow,
    VuexSetKnowledgeCouponList,
    VuexUpdateKnowledgeCouponCheck,
    VuexInitKnowledgeCoupon,
    VuexSetCheckKnowledgeCouponPrice,
    VuexSetKnowledgeCouponCouponId,
    VuexSetKnowledgeCouponIsActivity
} = types;

const knowledgeCoupon = {
    state: {
        //基础参数
        salePrice: null,//当前售价
        courseId: null,
        userId: null,
        activityId: null,
        //优惠券相关数据
        couponId: null,
        couponName: '',
        show: false,
        list: [],
        price: 0,
        isActivity: false,//判断是否参与活动
    },
    mutations: {
        [VuexInitKnowledgeCoupon]: function(state, { userId, courseId, salePrice, activityId }) {
            state.userId = userId;
            state.courseId = courseId;
            state.salePrice = salePrice;
            state.activityId = activityId;
        },
        [VuexSetKnowledgeCouponList]: function(state, list) {
            state.list = list;
        },
        [VuexSetKnowledgeCouponShow]: function(state, show) {
            state.show = show;
        },
        [VuexSetCheckKnowledgeCouponPrice]: function(state, price) {
            state.price = price;
        },
        [VuexSetKnowledgeCouponCouponId]: function(state, { couponId, couponName }){
            state.couponId = couponId || null;
            state.couponName = couponName || '';
        },
        [VuexSetKnowledgeCouponIsActivity]: function(state, isActivity){
            state.isActivity = isActivity || false;
        },
    },
    actions: {
        ['action' + VuexInitKnowledgeCoupon]: ({ state, commit, dispatch }, payload) => {
            return new Promise((resolve, reject)=>{

                commit(VuexInitKnowledgeCoupon, payload);//保存基础参数

                let { userId, courseId, activityId } = payload;
                dispatch('actionVuexSetLoading', true);
                httpPost('/education/4/coupon/getUserCouponList', {//加载优惠券
                    courseId,
                    // activityId: state.isActivity ? activityId : null
                }, (data)=>{
                    dispatch('actionVuexSetLoading', false);
                    let { code, desc } = data;
                    if (code === 10000) {
                        let { data: list } = data;
                        //设置list
                        list = list && list.length ? list : [];
                        dispatch('actionVuexSetKnowledgeCouponList', list);
                        resolve(list);
                    }else{
                        reject(desc);
                    }
                });

            });
        },
        ['action' + VuexSetKnowledgeCouponList]: ({ commit, dispatch }, list) => {
            let couponId, couponName;
            list = list.map((_item, i)=>{//默认选中第一张优惠券
                if(i === 0){
                    _item.t_check = true;
                    couponId = _item.couponId;
                    couponName = _item.name;
                }else{
                    _item.t_check = false;
                }
                return _item;
            });

            commit(VuexSetKnowledgeCouponList, list);//设置list
            dispatch('actionVuexSetCheckKnowledgeCouponPrice', { couponId, couponName });//传入优惠券id，获取选择优惠券之后的价格
        },
        ['action' + VuexSetKnowledgeCouponShow]: ({ commit }, payload) => {
            commit(VuexSetKnowledgeCouponShow, payload);
        },
        ['action' + VuexUpdateKnowledgeCouponCheck]: ({ state, commit, dispatch }, { item, t_check }) => {
            let list = state.list.map((_item, i)=>{//修改点击优惠券选中状态
                if(_item.couponId === item.couponId){
                    _item.t_check = t_check;
                }else{
                    _item.t_check = false;
                }
                return _item;
            });
            commit(VuexSetKnowledgeCouponList, list);//设置list

            let couponId = t_check && item.couponId || null,
                couponName = t_check && item.name || '';
            dispatch('actionVuexSetCheckKnowledgeCouponPrice', { couponId, couponName });// 传入优惠券id，获取选择优惠券之后的价格     
        },
        ['action' + VuexSetCheckKnowledgeCouponPrice]: ({ state, commit }, { couponId, couponName}) => {
            commit(VuexSetKnowledgeCouponCouponId, { couponId, couponName });//保存当前选中的优惠券id包括null

            let { courseId, userId, salePrice } = state;
            if(!couponId){//如果没有选中优惠券则显示售价
                commit(VuexSetCheckKnowledgeCouponPrice, salePrice);
                return;
            }
            
            httpPost('/education/4/coupon/calcuCouponPrice', {
                couponId, courseId
            }, (data)=>{
                let { code } = data;
                if(code === 10000){
                    let { data: price } = data;
                    commit(VuexSetCheckKnowledgeCouponPrice, price);
                }
            });
        },
        ['action' + VuexSetKnowledgeCouponIsActivity]: ({ state, commit }, isActivity) => {
            commit(VuexSetKnowledgeCouponIsActivity, isActivity);
        }
    },
    getters: {
        
    }
}

export default knowledgeCoupon
