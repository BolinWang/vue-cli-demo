(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e3bfad8"],{"029a":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.pageInfo.dataIsLoad?a("section",[a("div",{staticClass:"aliplayer-wrap"},[a("aliplayer",{attrs:{url:e.pageInfo.data.audition,"media-type":"video","progress-type":"2"}})],1),e._m(0),a("button",{staticClass:"start-btn",on:{click:e.goLearnDetail}},[e._v("\n    开始答题\n  ")])]):e._e()},i=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",{staticClass:"tip"},[e._v("\n    只差最后一步啦！"),a("br"),e._v("完成答题即可升级为育儿顾问！\n  ")])}],s=a("de57"),r=a("9d7e"),c=a("f2de"),o=a("cea3"),d={components:{aliplayer:r["default"]},mixins:[o["a"]],computed:Object(s["a"])({},Object(c["e"])({pageInfo:"pageLearnIndex"})),created:function(){var e=this;this.resetData(),this.loadRecruitProcess().then(function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=t.recruitProcess,n=void 0===a?[]:a;n=n[0]||{};var i=n,s=i.nodeStatus;2!==s?e.actionVuexMessageShow("未获取到付款信息，请刷新页面重试..."):e.loadData()}).catch(function(t){var a=t.desc;e.actionVuexMessageShow(a||"系统异常")})},methods:Object(s["a"])({},Object(c["d"])({resetData:"pageLearnIndex/resetData"}),Object(c["b"])({loadData:"pageLearnIndex/loadData",loadRecruitProcess:"publicInterface/loadRecruitProcess"}),{goLearnDetail:function(){this.$router.push({path:"/distribution/learn/detail"})}})},u=d,l=(a("282d"),a("25c1")),p=Object(l["a"])(u,n,i,!1,null,"a6a00e70",null);p.options.__file="index.vue";t["default"]=p.exports},"282d":function(e,t,a){"use strict";var n=a("d95d"),i=a.n(n);i.a},cea3:function(e,t,a){"use strict";t["a"]={created:function(){0===this.$route.path.indexOf("/distribution")&&this.wxSetShareSign({hideShareMenu:!0})}}},d95d:function(e,t,a){}}]);
//# sourceMappingURL=chunk-7e3bfad8.2ee53851.js.map