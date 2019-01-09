export default function (Vue) {
  (function () {
    let maxWidthRem = 3.75
    function px2rem ({ width, height, column }) {
      let ratio = width / height

      width = 3.75 / column
      height = width / ratio

      return {
        width, height
      }
    }
    let srcReg = /(-w)(\d+)(_h)(\d+)/
    Vue.directive('deal-image', {
      bind (el, binding) {
        let { column, src, isTable, trSrcs, tdIndex } = binding.value || {}
        // 获取src
        if (!src) {
          src = el.src
        }
        if (!src) return

        let result, width, height
        // 获取列数
        if (!column) {
          if (isTable) {
            let sumWidth = 0; let tdWidth = 0
            for (let i = 0, trSrcsLen = trSrcs.length; i < trSrcsLen; i++) {
              if (trSrcs[i].data && trSrcs[i].data.length) {
                let tdSrc = trSrcs[i].data[0].image
                result = srcReg.exec(tdSrc) || []
                width = parseInt(result[2] || 0)
                height = parseInt(result[4] || 0)
                if (!width || !height) return// 其中有一个图片没有宽度和高度参数就直接返回
                sumWidth += width
                if (tdIndex == i) tdWidth = width
              }
            }
            column = sumWidth / tdWidth
          } else {
            column = 1
          }
        }
        result = srcReg.exec(src) || []
        width = parseInt(result[2] || 0)
        height = parseInt(result[4] || 0)

        if (!width || !height) return

        result = px2rem({
          width, height, column
        })

        el.style.width = result.width + 'rem'
        el.style.height = result.height + 'rem'
      }
    })
  })()

  Vue.directive('focus', {
    inserted: function (el) {
      el.focus()
    }
  })
}
