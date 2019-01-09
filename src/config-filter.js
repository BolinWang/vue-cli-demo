import imageAli from '@/tools/image.js'

function registerFilter (Vue) {
  // 图片裁剪
  Vue.filter('ali', imageAli)
}

export default registerFilter
export { registerFilter }
