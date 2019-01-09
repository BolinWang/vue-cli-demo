/* eslint-disable no-cond-assign */
// 获取滚动条距离顶部的距离
function getScrollTop () {
  let scrollPos = 0
  if (window.pageYOffset) {
    scrollPos = window.pageYOffset
  } else if (document.compatMode && document.compatMode !== 'BackCompat') {
    scrollPos = document.documentElement.scrollTop
  } else if (document.body) {
    scrollPos = document.body.scrollTop
  }
  return scrollPos
}
// 获取元素距离页面顶部距离
function getElmTop (e) {
  let y = e.offsetTop || 0
  while (e = e.offsetParent) {
    y += e.offsetTop
  }
  return y
}
function getStyle (dom, attr) {
  return dom.currentStyle ? dom.currentStyle[attr] : getComputedStyle(dom, false)[attr]
}

function getWindowHeight () {
  return document.body.clientHeight
}

function getWindowWidth () {
  return document.body.clientWidth
}

function getScrollHeight () {
  return document.documentElement.scrollHeight || document.body.scrollHeight
}

function hasClass (ele, cls) {
  return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}
function addClass (ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}
function removeClass (ele, cls) {
  if (hasClass(ele, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}
function toggleClass (ele, cls) {
  if (hasClass(ele, cls)) {
    removeClass(ele, cls)
  } else { addClass(ele, cls) }
}
function changeClass (ele, oldcls, newcls) {
  if (!hasClass(ele, newcls)) {
    if (hasClass(ele, oldcls)) {
      removeClass(ele, oldcls)
    }
    addClass(ele, newcls)
  }
}

function getOffsetLeft (elem, scale) {
  scale = scale || 1
  let left = elem.offsetLeft * scale
  while (elem = elem.offsetParent) {
    left += elem.offsetLeft * scale
  }
  return left
}

export default {
  getScrollTop,
  getElmTop,
  getStyle,
  getWindowHeight,
  getWindowWidth,
  getScrollHeight,
  addClass,
  removeClass,
  toggleClass,
  changeClass,
  getOffsetLeft
}
