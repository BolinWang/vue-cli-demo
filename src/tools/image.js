/**
 * 注意：aliyun质量变换只支持原图是jpg/webp的情况，其他格式转换成jpg/webp再叠加质量变幻，并不会符合预期。
 */
function imageAli (url, w) {
  if (!url || /^\s+$/.test(url)) {
    return ''
  }
  // 如果图片链接中已经包含了过滤参数，则直接跳过
  if (/x-oss-process=/.test(url)) {
    return url
  }

  var dpr = parseInt(window.document.documentElement.getAttribute('data-dpr'), 10)

  // dpr不能小于2，否则图片会太模糊
  dpr = Math.max(dpr, 2)

  var webp = parseInt(window.document.documentElement.getAttribute('data-webp'), 10)

  var standarnDesignWidth = 375
  var imageWidth = w || standarnDesignWidth

  var screenWidth = window.screen.width || standarnDesignWidth
  // var imageRealWidth = imageWidth * screenWidth / standarnDesignWidth
  var imageRealWidth = imageWidth

  let imageUrl = url

  if (imageUrl.indexOf('?') > -1) {
    imageUrl += '&'
  } else {
    imageUrl += '?'
  }

  // if (webp == 1) {
  if (false) {
    imageUrl += 'x-oss-process=image/format,webp,image/resize,w_' + parseInt((imageRealWidth * dpr))
  } else {
    // gif
    if (/\.gif/i.test(imageUrl)) {
      imageUrl += 'x-oss-process=image/resize,w_' + parseInt((imageRealWidth * dpr))
    } else if (/\.png/i.test(imageUrl)) {
      imageUrl += 'x-oss-process=image/format,png/interlace,1,image/resize,w_' + parseInt((imageRealWidth * dpr))
    } else {
      imageUrl += 'x-oss-process=image/format,jpg/interlace,1,image/resize,w_' + parseInt((imageRealWidth * dpr))
    }
    // 新增sharpen锐化参数，减少图片缩放后的模糊效果
    imageUrl += '/quality,Q_60/sharpen,90'
  }
  return imageUrl
}

export { imageAli }
export default imageAli
