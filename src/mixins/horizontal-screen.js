import emitter from './emitter.js';
import _e from '@/tools/event.js';

export default {
    mixins: [emitter],
	directives: {
        'horizontal-screen': {
            bind(el, binding, vnode){
                let self = vnode.context;
                
                function reset(init){
                    
                    let width = document.documentElement.clientWidth,
                        height = document.documentElement.clientHeight;

                    if(window.orientation == null || window.orientation === 180 || window.orientation === 0){//竖屏状态
                        el.style.webkitTransform = el.style.transform = `rotate(90deg)`;
                        el.style.width = `${height}px`;
                        el.style.height = `${width}px`;
                        el.style.webkitTransformOrigin = el.style.transformOrigin = `${width / 2}px center`;
                    }else if(window.orientation === 90 || window.orientation === -90){//横屏状态
                        el.style.webkitTransform = el.style.transform = `rotate(0)`;
                        el.style.width = `${width}px`;
                        el.style.height = `${height}px`;
                    }

                    if(!init){
                        self.broadcast('iscroll', 'iscroll-resize');
                    }
                }
                reset(true);

                let timer = null;
                el.fn = function(e) {
                    clearTimeout(timer);
                    timer = setTimeout(reset, 300);
                }
                _e.event_bind(window, 'resize', el.fn);

                if("onorientationchange" in window){
                    _e.event_bind(window, 'orientationchange', el.fn);
                }
            },
            unbind(el, binding, vnode){
                _e.event_unbind(window, 'resize', el.fn);
                _e.event_unbind(window, 'orientationchange', el.fn);
            }
        },
    }
}