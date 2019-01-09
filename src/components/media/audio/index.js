import Vue from 'vue';
import audioVue from './audio.vue';

var AudioConstructor = Vue.extend(audioVue);

var AudioC = function(options) {
  let { src, el, uniqueId, isReverse, scale, loop, theme } = options;
  let instance = new AudioConstructor({ 
    propsData: {
    	src,
    	uniqueId,
    	isReverse,
      scale,
      loop,
      theme
    },
    el: el.appendChild(document.createElement('div'))
  });
  return instance;
};

export default AudioC;
export { AudioC };
