(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-09e6590a"],{a42d:function(t,s,i){"use strict";var e=i("ec07"),a=i.n(e);a.a},ec07:function(t,s,i){},f1e9:function(t,s,i){"use strict";i.r(s);var e=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadList,expression:"loadList"}],staticClass:"catalog-content-wrap",attrs:{"infinite-scroll-disabled":"scrollDisabled","infinite-scroll-distance":"10"}},[i("ul",{staticClass:"list"},t._l(t.pageInfo.list,function(s){return i("li",{key:s.distOrderId},[i("div",{staticClass:"title"},[i("div",{staticClass:"_left"},[t._v("\n          销售分红\n        ")]),i("div",{staticClass:"_right"},[t._v("\n          "+t._s(t.getSettlementStatusStr(s.settlementStatus))+"\n        ")])]),i("div",{staticClass:"content"},[i("div",{staticClass:"_left"},[i("img",{attrs:{src:t._f("ali")(s.itemIcon,80)}})]),i("div",{staticClass:"_center"},[i("p",{staticClass:"p1"},[t._v("\n            "+t._s(s.itemTitle)+"\n          ")])]),i("div",{staticClass:"_right"},[i("p",{staticClass:"p1"},[t._v("\n            收 益："),i("strong",[t._v("¥"+t._s(t.getCommission(s.commission)))])])])])])}),0)])},a=[],n=i("de57"),l=i("f2de"),c={computed:Object(n["a"])({},Object(l["e"])({pageInfo:"pageProfitList"}),Object(l["c"])({scrollDisabled:"pageProfitList/scrollDisabled"})),methods:Object(n["a"])({},Object(l["b"])({loadList:"pageProfitList/loadList"}),{getCommission:function(t){return t?(t/100).toFixed(2):"0.00"},getSettlementStatusStr:function(t){return 1===t?"未结算":3===t?"已结算":4===t?"已退款":void 0}})},o=c,r=(i("a42d"),i("25c1")),d=Object(r["a"])(o,e,a,!1,null,"1ccfefc2",null);d.options.__file="list.vue";s["default"]=d.exports}}]);
//# sourceMappingURL=chunk-09e6590a.47e6868a.js.map