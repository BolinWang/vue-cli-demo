import IScroll from '@/lib/iscroll.js'
import _e from '@/tools/event.js'
import { isReverse } from '@/tools/util.js'

function iScrollClick(){
    if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
    if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
    if (/Silk/i.test(navigator.userAgent)) return false;
    if (/Android/i.test(navigator.userAgent)) {
       var s = navigator.userAgent.substr(navigator.userAgent.indexOf('Android') + 8, 3);
       return parseFloat(s[0]+s[3]) < 44 ? false : true
    }
}

export default {
    componentName: 'iscroll',
	directives: {
        'reverse-iscroll': {
            inserted(el, binding, vnode){
                let self = vnode.context;
                let option = binding.value;

                let _defaultOption = {
                    scrollY: false,
                    scrollX: true,
                    isReverse: isReverse(),
                    bounce: false,
                    click: iScrollClick()
                }

                console.log(isReverse());

                el.myScroll = new IScroll(el, Object.assign({}, _defaultOption, option));

                let timer = null;
                _e.event_bind(window, 'resize', el.resizeFn = function() {
                    clearTimeout(timer);
                    timer = setTimeout(function(){
                        el.myScroll.refresh();
                    }, 300);
                });

                if("onorientationchange" in window){
                    _e.event_bind(window, 'orientationchange', el.orientationchangeFn = function() {
                        el.myScroll.options.isReverse = isReverse();
                    });
                }

                self.$on('iscroll-resize', function () {
                    el.myScroll.refresh();
                });
            },
            update(el){
                el.myScroll.refresh();
            },
            componentUpdated(el){
                el.myScroll.refresh();
            },
            unbind(el){
                el.myScroll.destroy();
                el.myScroll = null;
                _e.event_unbind(window, 'resize', el.resizeFn);
                _e.event_unbind(window, 'orientationchange', el.orientationchangeFn);
            }
        },
    }
}