(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7ae3e604"],{"0b8b":function(t,e,i){"use strict";var a=i("d64d"),n=i.n(a);n.a},"13b4":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"put-forward-detail-wrap"},[i("ul",{staticClass:"form-detail"},[i("li",[i("label",[i("span",[t._v("持卡人")]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.bankCardName,expression:"bankCardName"}],attrs:{type:"text",maxlength:"10"},domProps:{value:t.bankCardName},on:{input:function(e){e.target.composing||(t.bankCardName=e.target.value)}}})])]),i("li",[i("label",[i("span",[t._v("卡号")]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.bankCardNumber,expression:"bankCardNumber"}],attrs:{type:"text",maxlength:"19"},domProps:{value:t.bankCardNumber},on:{input:function(e){e.target.composing||(t.bankCardNumber=e.target.value)}}})])]),i("li",[i("div",{staticClass:"li-flex"},[i("div",{staticClass:"_left",on:{click:t.showPopupProvinceVisible}},[i("label",[i("span",[t._v("省市")]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.province,expression:"province"}],attrs:{type:"text",readonly:""},domProps:{value:t.province},on:{input:function(e){e.target.composing||(t.province=e.target.value)}}}),i("t-icon",{attrs:{name:"jiantx"}})],1)]),i("div",{staticClass:"_right",on:{click:t.showPopupCityVisible}},[i("label",[i("span",[t._v("城市")]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.city,expression:"city"}],attrs:{type:"text",readonly:""},domProps:{value:t.city},on:{input:function(e){e.target.composing||(t.city=e.target.value)}}}),i("t-icon",{attrs:{name:"jiantx"}})],1)])])]),i("li",[i("label",[i("span",[t._v("分支行")]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.bankName,expression:"bankName"}],attrs:{type:"text",maxlength:"100"},domProps:{value:t.bankName},on:{input:function(e){e.target.composing||(t.bankName=e.target.value)}}})])]),i("li",[i("label",[i("span",[t._v("手机号")]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.phoneNumber,expression:"phoneNumber"}],attrs:{type:"text",maxlength:"11"},domProps:{value:t.phoneNumber},on:{input:function(e){e.target.composing||(t.phoneNumber=e.target.value)}}})])]),i("li",[i("label",[i("span",[t._v("身份证号")]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.idCardNumber,expression:"idCardNumber"}],attrs:{type:"text",maxlength:"18"},domProps:{value:t.idCardNumber},on:{input:function(e){e.target.composing||(t.idCardNumber=e.target.value)}}})])])]),i("button",{staticClass:"save-btn",attrs:{disabled:t.popupUI.PopupUILoading},on:{click:t.doSave}},[t._v("\n    保存\n  ")]),t._m(0),i("mt-popup",{staticClass:"putForward-detail-mt-popup",attrs:{position:"bottom"},model:{value:t.popupProvinceVisible,callback:function(e){t.popupProvinceVisible=e},expression:"popupProvinceVisible"}},[i("div",{staticClass:"title"},[i("div",{staticClass:"_left",on:{click:t.provinceCancel}},[i("t-icon",{attrs:{name:"guanbi"}})],1),i("div",{staticClass:"_center"},[t._v("\n        选择省市\n      ")]),i("div",{staticClass:"_right",on:{click:t.provinceConfirm}},[i("t-icon",{attrs:{name:"duigou"}})],1)]),i("mt-picker",{attrs:{slots:t.provinceSlots,"value-key":"aname"},on:{change:t.onProvinceValueChange}})],1),i("mt-popup",{staticClass:"putForward-detail-mt-popup",attrs:{position:"bottom"},model:{value:t.popupCityVisible,callback:function(e){t.popupCityVisible=e},expression:"popupCityVisible"}},[i("div",{staticClass:"title"},[i("div",{staticClass:"_left",on:{click:t.cityCancel}},[i("t-icon",{attrs:{name:"guanbi"}})],1),i("div",{staticClass:"_center"},[t._v("\n        选择城市\n      ")]),i("div",{staticClass:"_right",on:{click:t.cityConfirm}},[i("t-icon",{attrs:{name:"duigou"}})],1)]),i("mt-picker",{attrs:{slots:t.citySlots,"value-key":"aname"},on:{change:t.onCityValueChange}})],1)],1)},n=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("p",{staticClass:"tip"},[t._v("\n    注意事项： "),i("br"),t._v("\n    1.银行卡信息用来提现收款"),i("br"),t._v("\n    2.请确保姓名、卡号、分支行、省市及身份证号码真实准确并且匹配"),i("br"),t._v("\n    3.验证通过后身份证号码不可修改"),i("br"),t._v("\n    4.补全信息后您还需要签订兼职劳动合同"),i("br"),t._v("\n    5.海外店主请添加官方管家：qxzl02 提供提现所需信息\n  ")])}],o=i("de57"),r=i("f2de"),s=i("9181"),p=i("cea3"),u={mixins:[p["a"]],computed:Object(o["a"])({},Object(r["e"])({pageInfo:"pagePutForwardDetail",popupUI:"popupUI"}),{provinceSlots:function(){var t=this.pageInfo;return t.provinceSlots||[]},citySlots:function(){var t=this.pageInfo;return t.citySlots||[]},popupProvinceVisible:{set:function(t){this.setPopupProvinceVisible(t)},get:function(){var t=this.pageInfo;return t.popupProvinceVisible||!1}},popupCityVisible:{set:function(t){this.setPopupCityVisible(t)},get:function(){var t=this.pageInfo;return t.popupCityVisible||!1}},withdrawInfo:function(){var t=this.pageInfo.withdrawInfo;return t||{}},bankCardName:{set:function(t){this.updateWithdrawInfo({bankCardName:t})},get:function(){var t=this.pageInfo.withdrawInfo;return t.bankCardName}},bankCardNumber:{set:function(t){this.updateWithdrawInfo({bankCardNumber:t})},get:function(){var t=this.pageInfo.withdrawInfo;return t.bankCardNumber}},bankName:{set:function(t){this.updateWithdrawInfo({bankName:t})},get:function(){var t=this.pageInfo.withdrawInfo;return t.bankName}},city:{set:function(t){this.updateWithdrawInfo({city:t})},get:function(){var t=this.pageInfo.withdrawInfo;return t.city}},province:{set:function(t){this.updateWithdrawInfo({province:t})},get:function(){var t=this.pageInfo.withdrawInfo;return t.province}},phoneNumber:{set:function(t){this.updateWithdrawInfo({phoneNumber:t})},get:function(){var t=this.pageInfo.withdrawInfo;return t.phoneNumber}},idCardNumber:{set:function(t){this.updateWithdrawInfo({idCardNumber:t})},get:function(){var t=this.pageInfo.withdrawInfo;return t.idCardNumber}},tempProvince:function(){var t=this.pageInfo;return t.tempProvince},tempCity:function(){var t=this.pageInfo;return t.tempCity}}),created:function(){this.resetData(),this.loadData()},methods:Object(o["a"])({},Object(r["d"])({resetData:"pagePutForwardDetail/resetData",updateWithdrawInfo:"pagePutForwardDetail/updateWithdrawInfo",setTempCity:"pagePutForwardDetail/setTempCity",setTempProvince:"pagePutForwardDetail/setTempProvince",setPopupProvinceVisible:"pagePutForwardDetail/setPopupProvinceVisible",setPopupCityVisible:"pagePutForwardDetail/setPopupCityVisible",updateCitys:"pagePutForwardDetail/updateCitys"}),Object(r["b"])({loadData:"pagePutForwardDetail/loadData",saveWithdrawInfo:"pagePutForwardDetail/saveWithdrawInfo"}),{doCheck:function(){var t=this.bankCardName,e=this.bankCardNumber,i=this.bankName,a=this.city,n=this.province,o=this.phoneNumber,r=this.idCardNumber;return t?e?/\D/.test(e)?"卡号有误":n?a?i?o?/\d{11}/.test(o)?r?Object(s["a"])(r)?void 0:"身份证号有误":"请输入身份证号":"手机号有误":"请输入手机号":"请输入分支行":"请选择城市":"请选择省市":"请输入卡号":"请输入持卡人姓名"},doSave:function(){var t=this,e=this.doCheck();e?this.actionVuexMessageShow(e):this.saveWithdrawInfo().then(function(){t.$router.back()})},provinceCancel:function(){this.setPopupProvinceVisible(!1)},provinceConfirm:function(){var t=this.province,e=this.tempProvince;this.setPopupProvinceVisible(!1),t!==e&&(this.updateWithdrawInfo({province:e}),this.updateCitys())},onProvinceValueChange:function(t,e){this.setTempProvince(e[0].aname)},cityCancel:function(){this.setPopupCityVisible(!1)},cityConfirm:function(){var t=this.city,e=this.tempCity;this.setPopupCityVisible(!1),t!==e&&this.updateWithdrawInfo({city:e})},onCityValueChange:function(t,e){this.setTempCity(e[0].aname)},showPopupProvinceVisible:function(){this.setPopupProvinceVisible(!0)},showPopupCityVisible:function(){this.setPopupCityVisible(!0)}})},c=u,l=(i("2870"),i("0b8b"),i("25c1")),d=Object(l["a"])(c,a,n,!1,null,"32ad4037",null);d.options.__file="detail.vue";e["default"]=d.exports},2870:function(t,e,i){"use strict";var a=i("407c"),n=i.n(a);n.a},"407c":function(t,e,i){},9181:function(t,e,i){"use strict";i.d(e,"a",function(){return o});var a=i("a6eb"),n=i.n(a);function o(t){if(!t||18!==t.length)return!1;t=t.toUpperCase();var e=0,i=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],a=["1","0","X","9","8","7","6","5","4","3","2"];try{for(var o=0;o<17;o++){var r=n()(t.substring(o,o+1)),s=i[o];e+=r*s}}catch(c){return!1}var p=e%11,u=a[p];return t.substring(17)===u}},cea3:function(t,e,i){"use strict";e["a"]={created:function(){0===this.$route.path.indexOf("/distribution")&&this.wxSetShareSign({hideShareMenu:!0})}}},d64d:function(t,e,i){}}]);
//# sourceMappingURL=chunk-7ae3e604.ecd6ae85.js.map