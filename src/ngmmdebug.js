import ConfigUrls from "@/config-urls"
import Cookie from 'js-cookie'
import Account from '@/logic/account'

const API_ENV = process.env.API_ENV;

let ngmmdebugConfig = {
    Vue: null,
    //项目名称
    entryName: 'entryName',
    //脚本版本
    scriptVersion: '1.0',
    // 灰度等级。百分制。
    sampleRate: 1,
    // 环境
    releaseStage: API_ENV,
    //如果您不需要收集开发环境中的错误，则可以将silentDev属性设为true
    silentDev: true
}

// 一种hashcode算法
function hashCode(s) {
    var h = 0,
        l = s.length,
        i = 0;
    if (l > 0)
        while (i < l)
            h = (h << 5) - h + s.charCodeAt(i++) | 0;
    return h;
}

// 灰度判定。
function grayCheck(s) {
    // let { sampleRate } = ngmmdebugConfig;
    // let hc = hashCode(Cookie.get("client_token") || localStorage.getItem("client_token") || "");
    // return hc % 100 < sampleRate;
    // let userId = Cookie.get('user_id') || 0;
    return true;
}

// 日志上报
function _logReport({ type, severity, error, metaData, message, lineNumber, columnNumber, fileName }) {
    message = message || error && error.message || null;

    //过滤掉WeixinJSBridge错误
    if(typeof message === 'string' && /WeixinJSBridge/.test(message)){
        return;
    }

    let { silentDev, Vue } = ngmmdebugConfig;
    //只有pro环境或者silentDev设置为false时才执行
    if (API_ENV == "pro" && location.href.indexOf('https://distribution.ngmm365.com') === 0) {
        if (grayCheck()) {

            let { entryName, releaseStage, severity, scriptVersion } = ngmmdebugConfig,
                name = error && error.name || 'error',
                stacktrace = error && error.stack || null,
                time = Date.now(),
                title = document.title,
                url = window.location.href,
                client = {
                    userAgent: window.navigator.userAgent,
                    height: window.screen.height,
                    width: window.screen.width,
                    referrer: window.document.referrer
                },
                pageLevel = 'p4',//分销系统都是一些展示数据的页面，pageLevel统一设置成p4
                serviceLevel = 'p4';

            Vue.http.post(ConfigUrls.logReportUrl, {
                entryName,
                scriptVersion,
                message,
                metaData,
                name,
                releaseStage,
                severity,
                stacktrace,
                time,
                title,
                type,
                url,
                client,
                lineNumber,
                columnNumber,
                fileName,
                pageLevel,//页面等级
                serviceLevel//业务等级
            });

        }
    } else {
        if (severity == "error") {
            console.error(message)
        } else {
            console.warn(message)
        }
    }
}

let ngmmdebug = {
    notifyWarn({ message, metaData }) {
        let type = 'caught',
            severity = 'warn';
        
        _logReport({ type, severity, message, metaData });
    },
    notifyError({ type = 'caught', error, message, metaData, lineNumber, columnNumber, fileName }){
        let severity = 'error';

        _logReport({ type, severity, error, metaData, message, lineNumber, columnNumber, fileName });
    }
}

export default function(Vue, option = {}){
    let { scriptVersion } = option;
    if(!scriptVersion){
        //初始化脚本版本
        let src = document.querySelector("body script").getAttribute("src");
        option.scriptVersion = src.match(/\d+/) && src.match(/\d+/)[0] || "1.0"
    }

    ngmmdebugConfig = Object.assign(ngmmdebugConfig, { Vue, ...option });
    
    if (API_ENV == "pro" && location.href.indexOf('https://distribution.ngmm365.com') === 0) {
    
        function formatComponentName(vm) {
            if (vm.$root === vm) return 'root';
            var name = vm._isVue
                ? (vm.$options && vm.$options.name) ||
                (vm.$options && vm.$options._componentTag)
                : vm.name;
            return (
                (name ? 'component <' + name + '>' : 'anonymous component') +
                (vm._isVue && vm.$options && vm.$options.__file
                    ? ' at ' + (vm.$options && vm.$options.__file)
                    : '')
            );
        }

        Vue.config.errorHandler = function(err, vm, info) {
            if (vm) {
                var componentName = formatComponentName(vm);
                var propsData = vm.$options && vm.$options.propsData;
                ngmmdebug.notifyError({
                    error: err,
                    metaData: {
                        componentName: componentName,
                        propsData: propsData,
                        info: info,
                        userToken: Account.buildHttpHeaders()
                    }
                });
            } else {
                ngmmdebug.notifyError({
                    error: err,
                    metaData: {
                        userToken: Account.buildHttpHeaders()
                    }
                });
            }
        };
        
        window.onerror = function(msg, url, lineNo, columnNo, error) {
            let message = msg;
            // //当跨域时，只能捕捉到简单的错误信息
            if (msg.toLowerCase().indexOf("script error") > -1) {
                message = "Script Error: See Browser Console for Detail";
            }
        
            ngmmdebug.notifyError({
                type: 'uncaught', 
                error, 
                metaData: {
                    userToken: Account.buildHttpHeaders()
                }, 
                message, 
                lineNumber: lineNo, 
                columnNumber: columnNo, 
                fileName: url
            });
        }

    }
    
    // console.error = (func => { 
    //     return (...args) => {
    //         // 在这里就可以收集到console.error的错误 
    //         let message = '';
    //         try{
    //             message = args;
    //         }catch(e){};
    
    //         ngmmdebug.notifyError({
    //             type: 'consoleError', 
    //             metaData: {
    //                 userToken: Account.buildHttpHeaders()
    //             }, 
    //             message
    //         });
    
    //         func.apply(console, args); 
    //     }
    // })(console.error);

}

export { ngmmdebug }