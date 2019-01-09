import Vue from 'vue';
import videoVue from './video.vue';

var VideoConstructor = Vue.extend(videoVue);

var VideoC = function(options) {
  let { src, el, uniqueId } = options;
  let instance = new VideoConstructor({ 
    propsData: {
    	src,
    	uniqueId
    },
    el: el.appendChild(document.createElement('div'))
  });
  return instance;
};

export default VideoC;
export { VideoC };
