/*
 * 全局注册的组件
 */
let components = [{
    prefix: "t-",
    path: "t",
    list: [
        'check',
        'theader',
        'back',
        'icon',
    ]
}, {
    prefix: "vuex-",
    path: "vuex",
    list: [
        'message',
        'loading',
    ]
}];

let registerComponents = function(Vue) {
    components.forEach((component, index) => {
        component.list && component.list.length && component.list.forEach((name, i) => {
            let ui = null;
            try {
                ui = require('./components/' + component.path + '/' + name + '.vue').default
            } catch (e) {
                console.log('config-components:', e);
            }
            ui && Vue.component(component.prefix + name, ui);
        })
    });
}

export default registerComponents
export { registerComponents }
