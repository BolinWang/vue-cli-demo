import common from '@/common'
import defaultShareImg from '../../static/applogo.png'
import browser from '@/tools/browser'
import system from '@/tools/system'
import {
    mapActions
} from 'vuex'
import ImageTool from '@/tools/image.js'

const jsApiList = [
  'checkJsApi',
  'chooseWXPay',
  'onMenuShareTimeline',
  'onMenuShareAppMessage',
  'onMenuShareQQ',
  'onMenuShareWeibo',
  'onMenuShareQZone',
  'hideMenuItems',
  'showMenuItems',
  'chooseImage',
  'previewImage',
  'uploadImage',
  'downloadImage',
],
defaultShareParams = {
    title: "抓住数学启蒙关键期", // 分享标题
    desc: "免费试学！专为2-6岁宝宝研发，科学有趣，玩转数学～", // 分享描述
    // link: location.origin + '/?from=singlemessage&isappinstalled=0&_safari_back_err_fix=1', // 默认分享首页
    link: location.href,
    imgUrl: 'https://staticimg.ngmm365.com/5ca8495e7f596c5bc0af6c0ae7fdb763-w229_h227.png', // 分享图标
};

let wxShare = {
    methods: {
        //{apiList, shareParams, hideShareMenu, callback, errorCallback}
        wxSetShareSign(opt){
            if(!system.isWechat()){//不是微信浏览器中访问 不执行任何操作
                console.log('不是微信浏览器');
                return;
            }

            defaultShareParams.link = location.href;

            opt = opt ? opt : {};

            if(typeof opt === 'function'){
                opt = { callback : opt };
            }
            
            let self = this,
                appId = common.config.appId_yx,
                apiList = opt.apiList || jsApiList,
                shareParams = opt.shareParams ? Object.assign({}, defaultShareParams, opt.shareParams) : defaultShareParams,
                callback = opt.callback || null,
                errorCallback = opt.errorCallback || null,
                hideShareMenu = opt.hideShareMenu || false,
                signUrl = browser.isIphone /*&& system.getWechatVersion() < '6.5.2'*/ ? localStorage.getItem('wechatCurPage') : location.href,
                shareAppMessageSuccess = opt.shareAppMessageSuccess || null,
                shareTimelineSuccess = opt.shareTimelineSuccess || null;

            httpPost('/account/signature', {
                appId: appId,
                url: signUrl,
            }, function(obj) {
                if (obj.code == 10000) {

                    wx.config({
                        debug: false,
                        appId: obj.data.appId,
                        timestamp: obj.data.timestamp,
                        nonceStr: obj.data.nonceStr,
                        signature: obj.data.signature,
                        jsApiList: apiList
                    });

                    wx.error(function(res){
                        console.log("wx.config:error");
                        console.log(res);
                        errorCallback && errorCallback(res);
                    });

                    if(hideShareMenu){
                        self.wxHideAllMenu();
                    }else{
                        if(callback){
                            wx.ready(()=>{
                                callback();
                            })
                        }else{
                            self.wxSetShareInfo(shareParams, shareAppMessageSuccess, shareTimelineSuccess);
                        }
                    }

                }else{
                    self.actionVuexMessageShow(obj.desc || "分享参数配置失败");
                }
            });
        },
        wxSetShareInfo(shareParams,shareAppMessageSuccess,shareTimelineSuccess){
            let self = this;
            wx.ready(function() {

                wx.onMenuShareAppMessage({
                    title: shareParams.title, // 分享标题
                    desc: shareParams.desc, // 分享描述
                    link: shareParams.link, // 分享链接
                    imgUrl: shareParams.imgUrl, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () { 
                        shareAppMessageSuccess && shareAppMessageSuccess();
                        self.actionVuexMessageShow("分享成功了!");
                        console.log("分享成功了");
                    },
                    cancel: function () {
                        console.log("取消了");
                    }
                });

                wx.onMenuShareTimeline({                    
                    title: shareParams.title, // 分享标题
                    desc: shareParams.desc, // 分享描述
                    link: shareParams.link, // 分享链接
                    imgUrl: shareParams.imgUrl, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () { 
                        shareTimelineSuccess && shareTimelineSuccess();
                        self.actionVuexMessageShow("分享成功了!");
                        console.log("分享成功了");
                    },
                    cancel: function () { 
                        console.log("取消了");
                    }
                });

                wx.hideMenuItems({
                  menuList: [                  
                    'menuItem:share:qq', // 分享到QQ
                    'menuItem:share:QZone' // 分享到QQ
                  ],
                  success: function (res) {
                    console.log('已隐藏');
                  },
                  fail: function (res) {
                    console.log(JSON.stringify(res));
                  }
                });

                wx.showMenuItems({
                    menuList: [
                        "menuItem:share:appMessage",
                        "menuItem:share:timeline",
                        "menuItem:favorite",
                        "menuItem:openWithQQBrowser",
                        "menuItem:copyUrl",
                    ], // 要显示的菜单项，所有menu项见附录3
                    success: function (res) {
                        console.log('已显示');
                    },
                    fail: function (res) {
                        console.log(JSON.stringify(res));
                    }

                });

            });
        },
        wxHideAllMenu(){
            if(this.isApp){
                NGJsBridge.showToolBar({ cart: false, share: false });
                return;
            }
            wx.ready(function() {
                wx.hideMenuItems({
                    menuList: [
                        "menuItem:exposeArticle",
                        "menuItem:setFont",
                        "menuItem:dayMode",
                        "menuItem:nightMode",
                        "menuItem:refresh",
                        "menuItem:profile",
                        "menuItem:addContact",
                        "menuItem:share:appMessage",
                        "menuItem:share:timeline",
                        "menuItem:share:qq",
                        "menuItem:share:weiboApp",
                        "menuItem:favorite",
                        "menuItem:share:facebook",
                        "menuItem:share:QZone",
                        "menuItem:editTag",
                        "menuItem:delete",
                        "menuItem:copyUrl",
                        "menuItem:originPage",
                        "menuItem:readMode",
                        "menuItem:openWithQQBrowser",
                        "menuItem:openWithSafari",
                        "menuItem:share:email",
                        "menuItem:share:brand",
                    ],
                    fail: function(res) {
                        console.log(JSON.stringify(res));
                    }
                });
            });
        },
    }
}
export default wxShare;