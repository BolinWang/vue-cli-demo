import AccountLogic from '@/logic/account';
import queryString from 'query-string'
import {
    isKnowledgeDetail,
    isKnowledgeDetailItem,
    isAppCollegeIndex,
    isAppPostShare,
    isAppTopiclist,
    isAppCommunityIndex,
    isAppMallIndex,
    isAppRequiredParenting,
    isAppAllBabyKnowledgeHome,
    isAppZJIndex,
    isAppZJBuy,
    isMathboxDetail
} from '@/tools/native-url.js'
import system from '@/tools/system'
import goNative from '@/tools/go-native';
import { locationHref, locationReplace } from '@/tools/logic.js'

/**
 * @todo  list
 * 1. iframe src 队列机制？
 */
;

(function(win, undefined) {

    var NGJsBridge = {
        //回调函数的map
        _callback_map: {},

        //jsbridge维持一个数据中心，用于共享信息。
        _data: {
            //分享信息
            shareOption: {
                title: '年糕妈妈app',
                desc: '年糕妈妈是一款儿童电商app',
                imageUrl: 'https://m.ngmm365.com/static/applogo.png',
                url: 'http://www.nicomama.com',
                session:'',//用来判断是直接分享还是选择后分享，WXSceneTimeline 朋友圈 WXSceneSession 聊天界面 ＝＝ 微信 ，‘’
                from:''
            },
            dataCenter:{
                accessType:0, //访问类型 : 0:内部流量 , 1:外部导入流量
                //pageId:0, //页面id(商品页面则为商品id)
                pageName:"title", //页面名称，一般上title
                //stayTime:0, //页面停留时间,单位:秒
                //pageType:1, //页面类型。1:商品；2:活动。
                //userId:0,
            }
        },

        _log: function(type, msg) {
            if (process.env.NODE_ENV === 'dev') {
                win.console[type](msg)
            }
        },
        //做一些检查
        ready: function(cb) {
            if (!win.NGJsBridge || !(win.NGJsBridge instanceof Object)) {
                this._log('error', 'error：没有找到全局的NGJsBridge对象')
            } else {
                this._log('debug', 'ok：全局对象NGJsBridge已经注入')

                if (cb && cb instanceof Function) {
                    cb();
                }
            }
        },


        /**
         * @todo  可能需要优化
         * [_call description]
         * @param  {[type]} option [description]
         * @return {[type]}        [description]
         */
        _call: function(method,option,callback) {
            /**
             * 选项转地址字符串
             * @return {[type]} [description]
             */
            function build_jsbridge_url(method,option,callback_name) {
                var base = "ngmall://" + method;

                var arr = [];
                if (option && JSON.stringify(option) !="{}") {
                    arr.push("params=" + encodeURIComponent(JSON.stringify(option || "")))
                }

                if (callback_name) {
                    arr.push("callback=" + callback_name)
                }

                var query = arr.join("&");
                if(query){
                    return base + "?" + query;
                }else{
                    return base;
                }
            }

            if(!method){
                this._log("需要设置method")
            }

            var jsbridge_url = "";
            // 生成回调函数名称，并将回调函数加入map中
            if(callback && callback instanceof Function){
                var cb_name = "NGJsBridge_cb_" + new Date().getTime();
                jsbridge_url = build_jsbridge_url(method,option,cb_name);
                this._callback_map[cb_name] = callback;
            }else{
                jsbridge_url = build_jsbridge_url(method,option);
            }

            var iframe_id = "__jsbridge_iframe__"+new Date().getTime();
            var iframe;
            if (win.document.getElementById(iframe_id)) {
                iframe = win.document.getElementById(iframe_id);
            } else {
                var iframe = win.document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.id = iframe_id;
            }
            iframe.src = jsbridge_url;

            win.document.documentElement.appendChild(iframe);

            //3秒后删除这个iframe标签
            setTimeout(function(){
                try{
                    win.document.documentElement.removeChild(iframe)
                }catch(e){}
            },3000)
        },


        //js设置jsbrige的data数据集。
        JS_setData(key, value) {
            this._data[key] = value;
        },
        //js访问jsbrige的data数据集。
        JS_getData(key) {
            return this._data[key]
        },
        //设置LocalStorage
        NT_setLocalStorage:function(key,value){
            var value_str = value;
            if(value instanceof Object){
                value_str = JSON.stringify(value)
            }
            localStorage.setItem(key,value_str||"")
        },

        //设置登录信息给h5。
        NT_sendUserInfoToH5(jsonStr){
            var userInfo = JSON.parse(jsonStr)

            AccountLogic.initCookieForApp(userInfo)
            AccountLogic.initContext()

            // localStorage.setItem("userId",userInfo.userId|"")
            // localStorage.setItem("accessToken",userInfo.accessToken||"")
        },

        //清除登录信息给h5。
        NT_clearUserInfoToH5(){
            AccountLogic.cleanContext()

            // localStorage.removeItem("userId")
            // localStorage.removeItem("accessToken")
        },
        /**
         * native 返回信息给h5
         * @param  {[type]} cb_name [回调函数名称]
         * @param  {[String]} result     [函数的参数]
         */
        NT_sendMsgToH5: function(cb_name, result) {
            var cb = this._callback_map[cb_name];
            if (cb && cb instanceof Function) {
                try {
                    var obj = JSON.parse(result)

                    cb(obj)
                } catch (e) {
                    cb({
                        code: 120,
                        desc: "返回值不是合法的JSON：" + result,
                    });
                }
            } else {
                this._log('warn', 'NT_sendMsgToH5被调用，但是没有回调函数')
            }
            delete this._callback_map[cb_name];
        },

        //native调用分享功能
        NT_share: function() {
            var option = NGJsBridge._data.shareOption;
            if (NGJsBridge.shareWechat) {
                NGJsBridge.shareWechat({
                    params: option,
                })
            }
        },
        // //native调用 数据统计
        NT_dataCenter: function() {
            var option = NGJsBridge._data.dataCenter;
            if (NGJsBridge.dataCenter) {
                NGJsBridge.dataCenter({
                    params: option,
                })
            }
        },

        NT_reload: function(){
            window.location.reload();
        },
        /**
         * [调用h5的页面跳转]
         * @param  {[type]} option [跳转参数对象]
         * url:"",//绝对路径跳转方式。
         * name:"",//h5的name路由跳转方式
         * path:"",//h5的path路由跳转方式
         */
        NT_goH5: function(url) {
            if (url) {
                var tmps = url.split("@")
                var type = tmps[0];
                if (tmps.length == 1) {
                    locationHref(url);
                } else {
                    var path = tmps[1];
                    if (type == 'link') {
                        locationHref(path);
                    } else {
                        if (win.VueRouter) {
                            var route;
                            if (type == 'name') {
                                route = { name: path }
                            } else if (type == 'path') {
                                route = { path: path }
                            }
                            win.VueRouter.go && win.VueRouter.go instanceof Function && win.VueRouter.go(route);
                        } else {
                            this._log('error', '没有找到全局VueRouter对象，故不支持前端路有跳转:' + JSON.stringify(url))
                        }

                    }
                }
            }
        },
        NT_clearLogingFlag(){
            sessionStorage.removeItem('isLoging');
        },
        NT_pauseAllMetas(){//暂停所有视频音频
            let metas = document.querySelectorAll('video, audio, embed');

            for(let i = 0; i < metas.length; ++ i){
                let meta = metas[i];
                meta.pause();
            }

            //暂停主音频
            if(window.__curAudio && window.__curAudio.broadcast){
                window.__curAudio.broadcast('stop');
            }
        },
        NT_changeUrl(url){
            //第一期付费内容兼容处理方案
            //判断1、是否首页 2、支付付费页面
            if(!url)return;

            if(system.isApp()){
                if(isMathboxDetail(url)){//数学盒子

                    goNative.goNativeMathBoxDetail(url);

                }else if(isKnowledgeDetail(url)){//知识付费的内容
                    //审核版本控制
                    let API_ENV = process.env.API_ENV;
                    if (API_ENV == 'pro') {
                        if (system.isIos() && system.getAppVersion() == "4.3.10") {
                            return;
                        }
                    }

                    let index = url.indexOf('?');
                    if(index == -1){

                        NGJsBridge.NT_goUrl(url);

                    }else{

                        if(isKnowledgeDetailItem(url)){

                            let query = queryString.parse(url.substring(index + 1, url.length));

                            if(query.goodsId && query.relationId && query.type){
                                let data = {
                                    id: query.goodsId,
                                    itemId: query.relationId,
                                    type: query.type,
                                };
                                if(query.sourceType){
                                    data.sourceType = query.sourceType;
                                }
                                if(query.sourceCode){//付费内容二期增加的字段
                                    data.sourceCode = query.sourceCode;
                                }else{//兼容老版本链接
                                    data.sourceCode = !query.sourceType ? 1 : query.sourceType == 'audio' ? 2 : query.sourceType == 'video' ? 3 : 1;
                                }

                                if(query.channelCode){
                                    data.channelCode = query.channelCode;
                                }

                                NGJsBridge.goKnowledgeDetail(data)

                            }else{
                                NGJsBridge.NT_goUrl(url);
                            }

                        }else{

                            let result = /\/knowledge\/detail\/(\d+)/.exec(url),
                                id, data;

                            if(result){
                                id = result[1];

                                let query = queryString.parse(url.substring(index + 1, url.length));

                                if(query.type){
                                    let data = {
                                        id: id,
                                        type: query.type,
                                    };

                                    if(query.sourceType){
                                        data.sourceType = query.sourceType;
                                    }
                                    if(query.sourceCode){//付费内容二期增加的字段
                                        data.sourceCode = query.sourceCode;
                                    }else{//兼容老版本链接
                                        if(query.type == 1){
                                            data.sourceCode = !query.sourceType ? 1 : query.sourceType == 'audio' ? 2 : query.sourceType == 'video' ? 3 : 1;
                                        }
                                    }

                                    if(query.channelCode){
                                        data.channelCode = query.channelCode;
                                    }

                                    NGJsBridge.goKnowledgeDetail(data)
                                }else{
                                    NGJsBridge.NT_goUrl(url);
                                }
                            }else{
                                NGJsBridge.NT_goUrl(url);
                            }
                        }
                    }
                }else if(isAppPostShare(url)){//帖子详情
                    goNative.goNativePostShare(url);
                }else if(isAppTopiclist(url)){//话题页
                    goNative.goNativeTopiclist(url);
                }else if(isAppCollegeIndex(url)){//学院首页
                    goNative.goNativeCollegeIndex(url);
                }else if(isAppCommunityIndex(url)){//社区首页
                    goNative.goNativeCommunityIndex(url);
                }else if(isAppRequiredParenting(url)){//养娃必读列表页
                    goNative.goNativeRequiredParenting();
                }else if(isAppAllBabyKnowledgeHome(url)){//全部知识列表页
                    goNative.goNativeAllBabyKnowledgeHome();
                }else if(isAppZJIndex(url)){//早教主页
                    if (system.getAppVersion() >= "4.3.0") { //早教线上版本
                        goNative.goNativeZaojiaoAuditionIndex();
                    }else{ // 没有升级app时，早教转跳这个
                        if(API_ENV == 'pro'){
                            NGJsBridge.NT_goUrl('https://m.ngmm365.com/page/1187');
                        }else{
                            NGJsBridge.NT_goUrl('http://m.ngmm001.com/page/309');
                        }
                    }
                }else if(isAppZJBuy(url)){
                    if (system.getAppVersion() >= "4.3.0") { //早教线上版本
                        goNative.goNativeZaojiaoBuy();
                    }else{ // 没有升级app时，早教转跳这个
                        if(API_ENV == 'pro'){
                            NGJsBridge.NT_goUrl({url: 'https://m.ngmm365.com/page/1187'});
                        }else{
                            NGJsBridge.NT_goUrl({url: 'http://m.ngmm001.com/page/309'});
                        }
                    }
                }else if(isAppMallIndex(url)){
                    NGJsBridge.goHomePage();
                }else{
                    NGJsBridge.NT_goUrl(url);
                }
            }else{
                NGJsBridge.NT_goUrl(url);
            }
        },
        NT_goUrl(url){
            //只有没有特殊原生页面的url才会进到这个方法
            let fullUrl = url.indexOf('http') == 0,
                isInIndex = false;
            let { href } = location;

            //商城首页 | 学院首页 |
            if(isAppMallIndex(href) || href.indexOf('?isCollege=true') > -1 || href.indexOf('/app_index') > -1 ||href.indexOf('/app_college_index') > -1 || href.indexOf('/app_main_index') > -1){
                isInIndex = true;
            }

            if(system.isApp()){
                url = (fullUrl ? '' : window.location.origin) + url;
                NGJsBridge.goNative({url});
            }else{
                _goUrl();
            }
            function _goUrl(){
                url = (fullUrl ? '' : window.location.origin) + url;
                locationHref(url);
            }
        },
        NT_sendWebViewHeight(){//传递WebView高度
            let data = {
                height: document.body.scrollHeight
            }
            NGJsBridge.getWebViewHeight(data);
        },
    }


    //暴露给h5的jsbridge接口列表
    var methods = [
        'showLoading', //显示loading
        'hideLoading', //隐藏loading
        'showToast', //显示toast
        'goNative', //跳转原生界面
        'openLink',//app打开一个链接
        'systemInfo', //获取系统信息
        'getUserInfo',//提取用户信息，app会回调登录
        'initInfo',//提取用户信息，app不会回调登录
        'android_share',
        'android_dataCenter',
        'android_content_option',//订阅,点赞后成功后
        'canShare',
        'cacheInfo', //获取缓存信息
        'networkInfo', //获取网络信息
        'wxLogin', //微信登录
        'clearCache', //清除缓存
        'pingPay', //ping++支付
        'pingPayMulti', //多店铺拆单

        'showTitleBar', //显示标题栏
        'hideTitleBar', //隐藏标题栏
        'showNavBar', //显示导航栏
        'hideNavBar', //隐藏导航栏

        'dataCenter', //数据统计ios
        'shareWechat', //分享到微信朋友圈或微信好友
        'uploadImage', //图片上传功能
        'userLogout', //用户退出登录
        'atHomePage', //告知app页面当前在首页
        'showLoginConfirm', //显示登陆确认框
        'pullDown', //确认是否要app端拥有下拉功能

        'showDownloadImage',//调用app保存按钮。下载图片
        'showToolBar',//设置显示工具栏图标
        'showBigImage',//显示要下载的图片
        'goHomePage',//前往首页－商城
        'goAppHomePage', //前往首页－app
        'goKnowledgeDetail',//前往知识付费单品和专栏
        'goBack',//返回到指定页面
        'startPlay',//告知apph5的视频或者音频开始播放了
        'setH5Info',//给予原生h5信息
        'closeRefresh',//关闭下拉刷新
        'openRefresh',//开启下拉刷新

        'goUserIndex',//前往个人中心
        'goTopicDetail',//前往话题列表
        'goPostDetail',//前往笔记详情

        'getWebViewHeight',//发送笔记详情页高度
        'goNativeFissionPoster',//裂变活动打开客户端海报
        'goNativePage',//前往原生页面参数地址：http://10.86.10.254:8090/index.php?s=/7&page_id=59

        'atEvaluationIntroduce',   //告诉客户端在成长测评介绍页我点击了按钮
    ];

    for (var i = 0; i < methods.length; i++) {
        var method = methods[i];

        (function(method) {
            NGJsBridge[method] = function(...args) {
                var option ;
                var callback ;
                if(arguments[0] instanceof Function){
                    option = {};
                    callback = arguments[0]
                }else if(arguments[0] instanceof Object){
                    option = arguments[0];
                    callback = arguments[1];
                }
                NGJsBridge._call(method,option,callback)
            }
        })(method)
    }

    win.NGJsBridge = NGJsBridge;
})(window);
