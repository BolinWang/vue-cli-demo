import SwiperComponent from './swiper.vue';
import SlideComponent from './slide.vue';

var swiper = {
  install: function(Vue) {
    Vue.component(SwiperComponent.name, SwiperComponent)
    Vue.component(SlideComponent.name, SlideComponent)
  }
}

export default swiper
export { swiper }
