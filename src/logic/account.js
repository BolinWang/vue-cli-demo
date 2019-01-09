import common from '@/common'
import Cookie from 'js-cookie'
import systemTool from '@/tools/system'
// import { MessageBox } from 'mint-ui'
import { locationHref, locationReplace } from '@/tools/logic.js'

export default {
    getAccessToken() {
        return Cookie.get('access_token') || "";
    },
    getTerminal() {
        return Cookie.get("client_token") || localStorage.getItem("client_token") || ""
    },
    getClientToken() {
        return this.getTerminal();
    },
    getOpenId() {
        return Cookie.get('open_id') || "";
    },
    getUserId() {
        let app_id = Cookie.get('app_id') || "";
        let platform = Cookie.get("platform") ? Cookie.get("platform").toLowerCase() : "";
        //有appid就认为是微信授权登录
        if (app_id) {
            // 比较app_id和当前配置的appid是否一致
            // if (app_id == common.config.appId) {
                return Cookie.get('user_id') || 0;
            // } else {
                // return 0;
            // }
        } else if (platform == 'ios' || platform == 'android') {
            //判断platform是iOS和android的，认为是app登录。
            return Cookie.get('user_id') || 0;
        } else {
            //模拟登录和其他情况
            return Cookie.get('user_id') || 0;
        }
    },
    /**
     * 构建请求头参数
     * @return {[type]} [description]
     */
    buildHttpHeaders() {
        let userId = Cookie.get("user_id") || localStorage.getItem("user_id") || ""
        let accessToken = Cookie.get("access_token") || localStorage.getItem("access_token") || ""
        let platform = Cookie.get("platform") || localStorage.getItem("platform") || ""

        let clientToken = Cookie.get("client_token") || localStorage.getItem("client_token") || ""

        // 异常情况处理。
        if (!clientToken || clientToken == '123') {
            clientToken = this.getUUID()
            localStorage.setItem('client_token', clientToken);
        }

        let systemVersion = Cookie.get("system_version") || localStorage.getItem("system_version") || ""
        let clientVersion = Cookie.get("client_version") || localStorage.getItem("client_version") || ""
        let methodVersion = Cookie.get("method_version") || localStorage.getItem("method_version") || ""
        let networkType = Cookie.get("network_type") || localStorage.getItem("network_type") || ""

        if(platform.indexOf('wechat')>=0 && localStorage.getItem("_ngpf")){
            platform = 'wechat_' + localStorage.getItem("_ngpf");
        }

        return {
            "x-user-id": userId,
            "x-access-token": accessToken,
            "x-platform": platform,
            "x-client-token": clientToken,
            "x-system-version": systemVersion,
            "x-client-version": clientVersion,
            "x-method-version": methodVersion,
            "x-network-type": networkType,
        }
    },
    /**
     * 清除登录相关的信息
     * @return {[type]} [description]
     */
    cleanContext() {
        let keys = [
            "user_id",
            "access_token"
        ]

        keys.forEach((key, index) => {
            Cookie.remove(key);
            localStorage.removeItem(key);
        })

        //兼容老的判断，localStorage里面也存放一份。
        let compatibility_keys = [
            "userId",
            "accessToken",
        ]

        compatibility_keys.forEach((key, index) => {
            localStorage.removeItem(key)
        })

    },
    // 生成uuid
    getUUID() {
        let d = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
            function(c) {
                let r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        return uuid;
    },
    //初始化cookie
    initCookieForApp(info) {
        let keys = [
            "user_id",
            "access_token",
            "client_token",
            "client_version",
            "login_type",
            "method_version",
            "network_type",
            "platform", //app登录时传ios|android
            "system_version",
        ]

        keys.forEach((key, index) => {
            Cookie.set(key, info[key])
        })

        //兼容老的判断，localStorage里面也存放一份。
        let compatibility_keys = [
            "userId",
            "accessToken",
        ]
        compatibility_keys.forEach((key, index) => {
            localStorage.setItem(key, info[key])
        })
    },
    // 初始化 环境
    initContext() {
        let platform = Cookie.get("platform") ? Cookie.get("platform").toLowerCase() : "";

        //
        /**
         * 微信授权登录返回4个字段在cookie中
         */
        if (Cookie.get('app_id')) {
            // app_id
            // user_id
            // access_token
            // open_id

            // client_token用openID代替，部分cookie中没有的字段放在localstorage，避免每次请求都传输。

            localStorage.setItem('client_token', Cookie.get('open_id') || this.getUUID())
            localStorage.setItem('network_type', navigator.connection && navigator.connection.type || "3g")
            localStorage.setItem('platform', "wechat")
            localStorage.setItem('method_version', "1.0")
            localStorage.setItem('system_version', "10.1.1")
            localStorage.setItem('client_version', "2.0.1")
            localStorage.setItem('login_type', "wechat")

        } else if (platform == "ios" || platform == "android") {
            /*
             * app需要返回这8个cookie字段，新增一个login_type字段。
             */

            // user_id
            // access_token
            // platform
            // client_token
            // system_version
            // client_version
            // method_version
            // network_type

            // login_type   @todo 增加一个字段标识，登录类型4种：app_mobile（app中手机号）,app_wechat（app中微信）,wechat,h5_mock


            //app环境，什么都不用做。
        } else {
            //模拟登录环境

            //模拟环境，cookie存的是mock_app_id，用于区分微信授权登录的情况
            localStorage.setItem('login_type', "h5_mock")
            if (!localStorage.getItem('client_token') || localStorage.getItem('client_token') == '123') {
                localStorage.setItem('client_token', Cookie.get('open_id') || this.getUUID())
            }
            localStorage.setItem('network_type', navigator.connection && navigator.connection.type || "3g")
            localStorage.setItem('platform', "wechat")
            localStorage.setItem('method_version', "1.0")
            localStorage.setItem('system_version', "10.1.1")
            localStorage.setItem('client_version', "2.0.1")
        }
    },

    /**
     * 微信授权登录
     * @param  {[type]} backUrl 授权成功后跳转的完整地址。
     * @return {[type]}         [description]
     */
    login(backUrl) {
        if (systemTool.isApp()) {
            let showLoging = sessionStorage.getItem('isLoging');
            if (!showLoging) {
                sessionStorage.setItem('isLoging', true);
                NGJsBridge.showLoginConfirm();
            }
        } else if (systemTool.isDev()) { // 本地环境，跳转到模拟登录页面
            // MessageBox.alert("当前为本地环境", "提示").then(function() {
            //     window.location.href = "/login";
            // });
            return;
        } else if (systemTool.isTest()) { // 测试环境，跳转到模拟登录页面
            // MessageBox.alert("当前为测试环境", "提示").then(function() {
            //     window.location.href = "/login";
            // });
            return;
        } else if (!systemTool.isWechat()) {
            // 不是微信浏览器，则跳转首页
            // MessageBox.alert("请在微信中操作", "提示").then(function() {
            //     window.location.href = "/";
            // });
            return;
        } else {
            let currentUrl = backUrl || window.location.href;
            let appId = common.config.appId;

            let redirect_uri = common.config.loginCallbackUrl + "?app_id=" + appId + "&terminal=terminal&success_url=" + encodeURIComponent(currentUrl) + "&scope=snsapi_userinfo";

            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=' + encodeURIComponent(redirect_uri) + '&response_type=code&scope=snsapi_userinfo&state=state#wechat_redirect';

        }
    },

    /**
     * 微信授权(不登录)，用于服务端获取openid,unionid
     * @param  {[type]} appId   [description]
     * @param  {[type]} backUrl [description]
     * @return {[type]}         [description]
     */
    authorize(appId, backUrl, state) {
        if (systemTool.isDev()) { // 本地环境，跳转到模拟登录页面
            // MessageBox.alert("当前为本地环境", "提示").then(function() {
            //     window.location.href = backUrl;
            // });
            return;
        } else if (systemTool.isTest()) { // 测试环境，跳转到模拟登录页面
            // MessageBox.alert("当前为测试环境", "提示").then(function() {
            //     window.location.href = backUrl;
            // });
            return;
        } else if (!systemTool.isWechat()) {
            // 不是微信浏览器，则跳转首页
            // MessageBox.alert("请在微信中操作", "提示").then(function() {
            //     window.location.href = backUrl;
            // });
            return;
        } else {
            let app_id = appId || common.config.appId;
            let currentUrl = backUrl || window.location.href;
            state = state || 'state';
            let redirect_uri = common.config.authorizeCallbackUrl + "?app_id=" + app_id + "&terminal=terminal&success_url=" + encodeURIComponent(currentUrl) + "&scope=snsapi_userinfo";

            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + app_id + '&redirect_uri=' + encodeURIComponent(redirect_uri) + '&response_type=code&scope=snsapi_userinfo&state=' + state + '#wechat_redirect';
        }
    },
    checkOpenId(option) { //判断是否授权
        let { appId, url, isReplace } = option;
        let userId = this.getUserId(),
            key = appId + '_' + userId + 'openId',
            openId = localStorage.getItem(key),
            self = this;
        if (openId) {
            if(isReplace){
                locationReplace(url)
            }else{
                locationHref(url);
            }
        } else {
            httpPost('/account/checkOpenIdExist', {
                "appId": appId,
                "userId": userId,
            }, function(obj) {
                if (obj && obj.code === 10000) {
                    if (obj.data) {
                        localStorage.setItem(key, obj.data);
                        if(isReplace){
                            locationReplace(url)
                        }else{
                            locationHref(url);
                        }
                    }
                } else {
                    self.authorize(appId, url, 'kuajing');
                }
            });
        }
    },
}
