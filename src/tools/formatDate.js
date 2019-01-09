/**
 * Created by josh on 16/11/8.
 */
Date.prototype.format = function(format){
    var o = {
        "M+": this.getMonth() + 1,  //month
        "d+": this.getDate(),     //day
        "h+": this.getHours(),    //hour
        "m+": this.getMinutes(),  //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    }
    var week=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(w+)/.test(format)){
        format = format.replace(RegExp.$1, week[this.getDay()]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

/**
 * js时间对象的格式化
 * eg:format="yyyy-MM-dd hh:mm:ss";
 * eg:format="yyyy-MM-dd w";
 */
export function formatDate(format, pattern) {
    const Format = format ? new Date(format) : new Date(),
          Pattern = pattern || 'yyyy-MM-dd hh:mm:ss'
    
    return  Format.format(Pattern)
}

export function formatNow(pattern) {
    const Pattern = pattern || 'yyyy-MM-dd hh:mm:ss'
    return  new Date().format(Pattern)
}

