import { types } from '../types'

let {
  VuexMessageShow,
  VuexMessageHide,
  VuexHMessageShow,
  VuexHMessageHide,
  VuexLoadingShow,
  VuexLoadingHide,
  VuexHLoadingShow,
  VuexHLoadingHide,
  VuexSetLoading,
  VuexSetHLoading
} = types
let timer = null
let hTimer = null

const popupUI = {
  state: {
    PopupUIMessage: {
      show: false,
      text: ''
    },
    PopupUILoading: false,
    HPopupUIMessage: {
      show: false,
      text: ''
    },
    HPopupUILoading: false
  },
  mutations: {
    [VuexMessageShow]: function (state, text) {
      state.PopupUIMessage = {
        show: true,
        text
      }
    },
    [VuexMessageHide]: function (state, text) {
      state.PopupUIMessage = {
        show: false,
        text: ''
      }
    },
    [VuexHMessageShow]: function (state, text) {
      state.HPopupUIMessage = {
        show: true,
        text
      }
    },
    [VuexHMessageHide]: function (state, text) {
      state.HPopupUIMessage = {
        show: false,
        text: ''
      }
    },

    [VuexLoadingShow]: function (state) {
      state.PopupUILoading = true
    },
    [VuexLoadingHide]: function (state) {
      state.PopupUILoading = false
    },
    [VuexSetLoading]: function (state, data) {
      state.PopupUILoading = !!data
    },

    [VuexHLoadingShow]: function (state) {
      state.HPopupUILoading = true
    },
    [VuexHLoadingHide]: function (state) {
      state.HPopupUILoading = false
    },
    [VuexSetHLoading]: function (state, data) {
      state.HPopupUILoading = !!data
    }
  },
  actions: {
    ['action' + VuexMessageShow]: ({ commit }, payload) => {
      commit(VuexMessageShow, payload)
      // 3.5秒之后自动隐藏
      clearTimeout(timer)
      timer = setTimeout(function () {
        commit(VuexMessageHide, payload)
      }, 3500)
    },
    ['action' + VuexMessageHide]: ({ commit }, payload) => {
      commit(VuexMessageHide, payload)
    },

    ['action' + VuexHMessageShow]: ({ commit }, payload) => {
      commit(VuexHMessageShow, payload)
      // 3.5秒之后自动隐藏
      clearTimeout(hTimer)
      hTimer = setTimeout(function () {
        commit(VuexHMessageHide, payload)
      }, 3500)
    },
    ['action' + VuexHMessageHide]: ({ commit }, payload) => {
      commit(VuexHMessageHide, payload)
    },

    ['action' + VuexLoadingShow]: ({ commit }, payload) => {
      commit(VuexLoadingShow, payload)
    },
    ['action' + VuexLoadingHide]: ({ commit }, payload) => {
      commit(VuexLoadingHide, payload)
    },
    ['action' + VuexSetLoading]: ({ commit }, payload) => {
      commit(VuexSetLoading, payload)
    },

    ['action' + VuexHLoadingShow]: ({ commit }, payload) => {
      commit(VuexHLoadingShow, payload)
    },
    ['action' + VuexHLoadingHide]: ({ commit }, payload) => {
      commit(VuexHLoadingHide, payload)
    },
    ['action' + VuexSetHLoading]: ({ commit }, payload) => {
      commit(VuexSetHLoading, payload)
    }
  },
  getters: {
    PopupUIMessage (state) {
      return state.PopupUIMessage
    },
    PopupUILoading (state) {
      return state.PopupUILoading
    },
    HPopupUIMessage (state) {
      return state.HPopupUIMessage
    },
    HPopupUILoading (state) {
      return state.HPopupUILoading
    }
  }
}

export default popupUI
