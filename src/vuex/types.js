import keyMirror from 'keymirror';

let mKeys = {
	//通用弹窗加载
    VuexMessageShow: null,
    VuexMessageHide: null,
    VuexHMessageShow: null,
    VuexHMessageHide: null,
    VuexLoadingShow: null,
    VuexLoadingHide: null,
    VuexSetLoading: null,
    VuexHLoadingShow: null,
    VuexHLoadingHide: null,
    VuexSetHLoading: null,
    //通用支付
    VuexPaymentCreate: null,
    VuexPaymentCallback:null,
    //课程优惠券
    VuexInitKnowledgeCoupon: null,
    VuexSetKnowledgeCouponShow: null,
    VuexSetKnowledgeCouponList: null,
    VuexUpdateKnowledgeCouponCheck: null,
    VuexSetCheckKnowledgeCouponPrice: null,//加载选择优惠券之后的价格
    VuexSetKnowledgeCouponCouponId: null,
    VuexSetKnowledgeCouponIsActivity: null,
    //详情音频循环播放按钮
    VuexSetDetailAudioLoop: null,
    //课程详情
    VuexInitKnowledgeData: null,//初始化详情数据
}

let types = keyMirror(mKeys);


export default types
export { types }