/* eslint-disable no-undef */
import address from '@/data/address.js'

const provinces = address.filter(item => item.apid === '0')
const citys = address.filter(item => item.apid === provinces[0].aid)

export default {
  namespaced: true,
  state: {
    dataIsLoad: false,
    withdrawInfo: {},
    tempCity: '',
    tempProvince: '',
    popupProvinceVisible: false,
    popupCityVisible: false,
    provinceSlots: [
      {
        defaultIndex: 0,
        values: provinces,
        className: 'slot1',
        textAlign: 'center'
      }
    ],
    citySlots: [
      {
        defaultIndex: 0,
        values: citys,
        className: 'slot1',
        textAlign: 'center'
      }
    ]
  },
  getters: {

  },
  mutations: {
    setWithdrawInfo (state, withdrawInfo) {
      state.withdrawInfo = withdrawInfo
      // 初始化下拉框的数据
      this.commit('pagePutForwardDetail/initSlots', withdrawInfo)

      state.dataIsLoad = true
    },
    initSlots (state, withdrawInfo) {
      let { province, city } = withdrawInfo

      let provinceDefaultIndex = provinces.map(item => item.aname).indexOf(province)
      provinceDefaultIndex = provinceDefaultIndex === -1 ? 0 : provinceDefaultIndex
      state.provinceSlots[0].defaultIndex = provinceDefaultIndex

      let citys = address.filter(item => item.apid === provinces[provinceDefaultIndex].aid)
      state.citySlots[0].values = citys

      let cityDefaultIndex = citys.map(item => item.aname).indexOf(city)
      cityDefaultIndex = cityDefaultIndex === -1 ? 0 : cityDefaultIndex
      state.citySlots[0].defaultIndex = cityDefaultIndex
    },
    updateWithdrawInfo (state, withdrawInfo) {
      state.withdrawInfo = Object.assign({}, state.withdrawInfo, withdrawInfo)
    },
    updateCitys (state) {
      let { withdrawInfo: { province } } = state
      let provinceDefaultIndex = provinces.map(item => item.aname).indexOf(province)
      if (provinceDefaultIndex > -1) {
        let citys = address.filter(item => item.apid === provinces[provinceDefaultIndex].aid)
        state.citySlots[0].values = citys
        state.citySlots[0].defaultIndex = 0
      }
    },
    setTempCity (state, tempCity) {
      state.tempCity = tempCity
    },
    setTempProvince (state, tempProvince) {
      state.tempProvince = tempProvince
    },
    setPopupProvinceVisible (state, popupProvinceVisible) {
      state.popupProvinceVisible = popupProvinceVisible
    },
    setPopupCityVisible (state, popupCityVisible) {
      state.popupCityVisible = popupCityVisible
    },
    resetData (state) {
      state.dataIsLoad = false
      state.withdrawInfo = {}
      state.tempCity = ''
      state.tempProvince = ''
      state.popupProvinceVisible = false
      state.popupCityVisible = false
      state.provinceSlots = [
        {
          defaultIndex: 0,
          values: provinces,
          className: 'slot1',
          textAlign: 'center'
        }
      ]
      state.citySlots = [
        {
          defaultIndex: 0,
          values: citys,
          className: 'slot1',
          textAlign: 'center'
        }
      ]
    }
  },
  actions: {
    loadData ({ state, commit, dispatch }, payload) {
      dispatch('actionVuexSetLoading', true, { root: true })

      httpPost('/dist/withdraw/query', (obj) => {
        dispatch('actionVuexSetLoading', false, { root: true })

        let { code, data, desc } = obj
        if (code === 10000) {
          commit('setWithdrawInfo', data)
        } else {
          dispatch('actionVuexMessageShow', desc || '系统异常~', { root: true })
        }
      })
    },
    saveWithdrawInfo ({ state: { withdrawInfo }, commit, dispatch }, payload) {
      dispatch('actionVuexSetLoading', true, { root: true })

      return new Promise((resolve, reject) => {
        httpPost('/dist/withdraw/save', withdrawInfo, (obj) => {
          dispatch('actionVuexSetLoading', false, { root: true })

          let { code, desc } = obj
          if (code === 10000) {
            resolve()
          } else {
            dispatch('actionVuexMessageShow', desc || '系统异常~', { root: true })
          }
        })
      })
    }
  }
}
