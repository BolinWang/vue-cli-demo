var u = navigator.userAgent

export default {
    //是否为iPhone
    isIphone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
     //是否为Android移动设备
    isAndroid:u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, 
    //是否移动端
    isMobile: !!/mobile/i.test(u),
    //是否为QQ浏览器
    isQQBrowser: u.indexOf('MQQBrowser') > -1,
}
