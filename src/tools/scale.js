const DesignWidth = 375
const DesignHeight = 667
const DesignRatio = DesignWidth / DesignHeight

function getScale () {
  let width = document.documentElement.clientWidth

  let height = document.documentElement.clientHeight

  if (window.orientation == null || window.orientation === 180 || window.orientation === 0) { // 竖屏状态

  } else {
    [width, height] = [height, width]
  }

  let ratio = width / height

  let scale

  if (ratio > DesignRatio) {
    scale = height / (width / DesignRatio)
  } else if (ratio < DesignRatio) {
    scale = width / (height * DesignRatio)
  } else {
    scale = 1
  }
  console.log('scale=', scale)

  return scale
}

export default {
  getScale
}
export { getScale }
