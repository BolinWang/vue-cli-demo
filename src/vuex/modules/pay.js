import Account from '@/logic/account.js'
import { Toast } from 'mint-ui'
import { formatDate } from '@/tools/formatDate'
import pingpp from 'pingpp-js'
import wxpay from '@/lib/wxpay'
import { saTa } from '@/tools/sc'
import { types } from '../types'
let {
  VuexPaymentCreate,
  VuexPaymentCallback
} = types

const ISNEW = 1

const pay = {
  state: {
    data: {}
  },
  mutations: {
    [VuexPaymentCreate] (state, data) {
      state.data = data
    }
  },
  actions: {
    ['action' + VuexPaymentCreate]: ({ commit, dispatch }, payload) => {
      let { self, postData, data, type } = payload
      let { isGive, courseId } = data

      // 支付迁移增加isNew参数
      postData = Object.assign({}, postData, { isNew: ISNEW })
      // 创建订单
      httpPost('/pay/payment/create', postData, (response) => {
        let res = { data: response, time: new Date().getTime() }
        let { code, data: charge } = response

        console.log('charge=', JSON.stringify(charge))

        commit(VuexPaymentCreate, res)

        if (code == 10000) {
          let payOwner = pingpp

          if (charge && charge.paySdk && charge.paySdk == 'wxPay') {
            payOwner = wxpay
          }

          // 唤起微信支付
          payOwner.createPayment(charge, (result, err) => {
            // 微信支付回调
            if (type == 'knowledge') {
              if (result == 'success') {
                // 神策统计
                saTa('payCourseOrder_web', {
                  course_id: courseId + '', //  课程ID
                  course_title: self.data.title//   课程名称
                })

                // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                httpPost('/pay/payment/clientcallback', {
                  tradeId: postData.tradeId,
                  clientSuccessTime: formatDate(new Date().getTime(), 'yyyy-MM-dd hh:mm:ss') + '.000',
                  chargeId: charge.id,
                  userId: self.userId,
                  isNew: ISNEW
                })

                setTimeout(function () {
                  self.actionVuexSetLoading(false)
                  self.data.isBuy = true

                  function callback () {
                    if (isGive == 1) { // 有礼品
                      let path = `/mathbox/receive/${courseId}?redirect_path=${encodeURIComponent(location.href)}`

                      self.$router.push({
                        path: path
                      })
                    } else {
                      window.location.reload()
                    }
                  }
                  callback.bind(self)

                  callback()
                }, 800)
              } else { // fail cancel
                window.location.reload()
              }
            }
          })
        } else if (code == 11020013) { // 用户未授权
          if (type == 'knowledge') {
            Account.authorize(postData.appId, location.href, 'kuajing')
          }
        } else {
          Toast(response.desc || '支付失败！')
        }
      })
    }
  }
}

export default pay
