(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-aa36c67a"],{"1d00":function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.pageInfo.dataIsLoad?s("section",{ref:"index-wrap",staticClass:"evaluation-index-wrap"},[s("div",{staticClass:"bg question"},[s("div",{staticClass:"content"},[s("p",[s("font",[s("strong",[e._v(e._s(e.questionIndex+1))]),e._v("/"+e._s(e.questionLen)+"\n        ")]),e._v("\n        "+e._s(e.question.questionsDesc)+"\n      ")],1),e.question.questionsImage?[s("div",{staticClass:"img"},[s("img",{attrs:{src:e._f("ali")(e.question.questionsImage,258)}})])]:e._e(),s("ul",[e.question.optionA?s("li",[s("label",[s("div",{staticClass:"_left"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.userAnswer,expression:"userAnswer"}],attrs:{type:"radio",value:"A"},domProps:{checked:e._q(e.userAnswer,"A")},on:{change:function(t){e.userAnswer="A"}}}),s("span")]),s("div",{staticClass:"_right"},[e._v("\n              "+e._s(e.question.optionA)+"\n            ")])])]):e._e(),e.question.optionB?s("li",[s("label",[s("div",{staticClass:"_left"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.userAnswer,expression:"userAnswer"}],attrs:{type:"radio",value:"B"},domProps:{checked:e._q(e.userAnswer,"B")},on:{change:function(t){e.userAnswer="B"}}}),s("span")]),s("div",{staticClass:"_right"},[e._v("\n              "+e._s(e.question.optionB)+"\n            ")])])]):e._e(),e.question.optionC?s("li",[s("label",[s("div",{staticClass:"_left"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.userAnswer,expression:"userAnswer"}],attrs:{type:"radio",value:"C"},domProps:{checked:e._q(e.userAnswer,"C")},on:{change:function(t){e.userAnswer="C"}}}),s("span")]),s("div",{staticClass:"_right"},[e._v("\n              "+e._s(e.question.optionC)+"\n            ")])])]):e._e(),e.question.optionD?s("li",[s("label",[s("div",{staticClass:"_left"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.userAnswer,expression:"userAnswer"}],attrs:{type:"radio",value:"D"},domProps:{checked:e._q(e.userAnswer,"D")},on:{change:function(t){e.userAnswer="D"}}}),s("span")]),s("div",{staticClass:"_right"},[e._v("\n              "+e._s(e.question.optionD)+"\n            ")])])]):e._e()])],2),s("div",{staticClass:"btn-group"},[s("button",{directives:[{name:"show",rawName:"v-show",value:e.questionIndex>0,expression:"questionIndex > 0"}],staticClass:"pre page-btn",on:{click:e.preQuestion}},[s("t-icon",{attrs:{name:"arrow-left"}}),e._v("上一题\n      ")],1),e.questionIndex<e.questionLen-1?[s("button",{staticClass:"next page-btn",attrs:{disabled:!e.userAnswer},on:{click:e.nextQuestion}},[e._v("\n          下一题"),s("t-icon",{attrs:{name:"arrow-right"}})],1)]:[s("button",{staticClass:"show-result",attrs:{disabled:!e.userAnswer},on:{click:e.nextQuestion}},[e._v("\n          查看结果\n        ")])]],2)])]):e._e()},i=[],a=s("de57"),o=s("f2de"),r=s("cea3"),u={mixins:[r["a"]],computed:Object(a["a"])({},Object(o["e"])({pageInfo:"pageLearnDetail"}),{userAnswer:{set:function(e){var t=this.question;this.setQuestionUserAnswer({question:t,userAnswer:e})},get:function(){var e=this.question;return e.userAnswer}},questionIndex:function(){var e=this.pageInfo;return e.questionIndex||0},questionList:function(){var e=this.pageInfo.data;return e.evaluationQuestionDTOList||[]},question:function(){var e=this.questionList,t=this.pageInfo.questionIndex;return e[t]},questionLen:function(){var e=this.questionList;return e.length}}),created:function(){this.resetData(),this.loadData()},methods:Object(a["a"])({},Object(o["d"])({resetData:"pageLearnDetail/resetData",updateQuestionIndex:"pageLearnDetail/updateQuestionIndex",setQuestionUserAnswer:"pageLearnDetail/setQuestionUserAnswer"}),Object(o["b"])({loadData:"pageLearnDetail/loadData",commitResult:"pageLearnDetail/commitResult"}),{preQuestion:function(){this.updateQuestionIndex(-1)},nextQuestion:function(){var e=this.questionIndex,t=this.questionLen,s=this.question,n=s.answer,i=s.userAnswer;n===i?e<t-1?this.updateQuestionIndex(1):this.showResult():this.actionVuexMessageShow("答错啦，请选择正确答案")},showResult:function(){var e=this;this.commitResult().then(function(t){var s=t||{},n=s.evaluationResult;1===n?e.$router.push({path:"/distribution/learn/success"}):2===n&&e.actionVuexMessageShow("答错啦，请选择正确答案")})}})},c=u,l=(s("7fb3"),s("25c1")),d=Object(l["a"])(c,n,i,!1,null,"2770e57a",null);d.options.__file="detail.vue";t["default"]=d.exports},"569f":function(e,t,s){},"7fb3":function(e,t,s){"use strict";var n=s("569f"),i=s.n(n);i.a},cea3:function(e,t,s){"use strict";t["a"]={created:function(){0===this.$route.path.indexOf("/distribution")&&this.wxSetShareSign({hideShareMenu:!0})}}}}]);
//# sourceMappingURL=chunk-aa36c67a.bd0c7b93.js.map