function isIOS() {
	const u = navigator.userAgent
	return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}
function Enum(vals){
	let result = {};
	vals.forEach((val, i)=>{
		result[val] = val;
	});
	return result;
}
function getRem(val) {
	if(val == null) val = 1;
    let { width, height } = document.documentElement.getBoundingClientRect();

    if(window.orientation === 90 || window.orientation === -90){
        width = height;
    }

    if (width > 750) {
        width = 750;
    }
    return Number(width / 3.75).toFixed(0) * val;
}

function isReverse(){
    if("onorientationchange" in window){
        if(window.orientation === 90 || window.orientation === -90){//横屏状态
            return false;
        }
    }
    return true;
}

function getClientHeight(){
    if("onorientationchange" in window){
        if(window.orientation == null || window.orientation === 180 || window.orientation === 0){//竖屏状态
            return document.documentElement.clientHeight;
        }else if(window.orientation === 90 || window.orientation === -90){//横屏状态
            return document.documentElement.clientWidth;
        }
    }
    return document.documentElement.clientHeight;
}

export default {
	isIOS, Enum, getRem, isReverse, getClientHeight
}
export { isIOS, Enum, getRem, isReverse, getClientHeight }