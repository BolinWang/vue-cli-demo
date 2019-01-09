import Vue from 'vue'
import Vuex from 'vuex'

import pay from './modules/pay.js'
import popupUI from './modules/popupUI'
import pageDistributionIndex from './modules/pageDistributionIndex'
import pageChannelPartnersList from './modules/pageChannelPartnersList'
import pageChildcareConsultantsList from './modules/pageChildcareConsultantsList'
import pageGoldConsultantsList from './modules/pageGoldConsultantsList'
import pageCustomerList from './modules/pageCustomerList'
import pageDataCenterIndex from './modules/pageDataCenterIndex'
import pagePutForwardIndex from './modules/pagePutForwardIndex'
import pagePutForwardDetail from './modules/pagePutForwardDetail'
import pageLearnIndex from './modules/pageLearnIndex'
import pageLearnDetail from './modules/pageLearnDetail'
import pageOrderList from './modules/pageOrderList'
import pageProfitList from './modules/pageProfitList'
// import pagePutForwardLogin from './modules/pagePutForwardLogin'
import pagePutForwardCertification from './modules/pagePutForwardCertification'
// import pageUploadIdCardImg from './modules/pageUploadIdCardImg'
import componentHelpDialog from './modules/componentHelpDialog'

import publicInterface from './modules/publicInterface'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    pay,
    popupUI,
    pageDistributionIndex,
    pageChannelPartnersList,
    pageChildcareConsultantsList,
    pageCustomerList,
    pageDataCenterIndex,
    pagePutForwardIndex,
    pagePutForwardDetail,
    pageLearnIndex,
    pageLearnDetail,
    pageOrderList,
    pageProfitList,
    publicInterface,
    pageGoldConsultantsList,
    // pagePutForwardLogin,
    pagePutForwardCertification,
    // pageUploadIdCardImg,
    componentHelpDialog
  }
})

export default store
