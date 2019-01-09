const FullscreenApi = {}

// browser API methods
const apiMap = [
  [
    'requestFullscreen',
    'exitFullscreen',
    'fullscreenElement',
    'fullscreenEnabled',
    'fullscreenchange',
    'fullscreenerror'
  ],
  // WebKit
  [
    'webkitRequestFullscreen',
    'webkitExitFullscreen',
    'webkitFullscreenElement',
    'webkitFullscreenEnabled',
    'webkitfullscreenchange',
    'webkitfullscreenerror'
  ],
  // Old WebKit (Safari 5.1)
  [
    'webkitRequestFullScreen',
    'webkitCancelFullScreen',
    'webkitCurrentFullScreenElement',
    'webkitCancelFullScreen',
    'webkitfullscreenchange',
    'webkitfullscreenerror'
  ],
  // Mozilla
  [
    'mozRequestFullScreen',
    'mozCancelFullScreen',
    'mozFullScreenElement',
    'mozFullScreenEnabled',
    'mozfullscreenchange',
    'mozfullscreenerror'
  ],
  // Microsoft
  [
    'msRequestFullscreen',
    'msExitFullscreen',
    'msFullscreenElement',
    'msFullscreenEnabled',
    'MSFullscreenChange',
    'MSFullscreenError'
  ]
]

const specApi = apiMap[0]
let browserApi

// determine the supported set of functions
for (let i = 0; i < apiMap.length; i++) {
  // check for exitFullscreen function
  if (apiMap[i][1] in document) {
    browserApi = apiMap[i]
    break
  }
}

// map the browser API names to the spec API names
if (browserApi) {
  for (let i = 0; i < browserApi.length; i++) {
    FullscreenApi[specApi[i]] = browserApi[i]
  }
}

function supportsFullScreen (oVideo) {
  if (typeof oVideo.webkitEnterFullScreen === 'function') {
    const userAgent = window.navigator && window.navigator.userAgent || ''

    // Seems to be broken in Chromium/Chrome && Safari in Leopard
    if ((/Android/).test(userAgent) || !(/Chrome|Mac OS X 10.5/).test(userAgent)) {
      return true
    }
  }
  return false
}

function enterFullScreen (oVideo) {
  if (oVideo.paused && oVideo.networkState <= oVideo.HAVE_METADATA) {
    // attempt to prime the video element for programmatic access
    // this isn't necessary on the desktop but shouldn't hurt
    oVideo.play()

    // playing and pausing synchronously during the transition to fullscreen
    // can get iOS ~6.1 devices into a play/pause loop
    this.setTimeout(function () {
      oVideo.pause()
      oVideo.webkitEnterFullScreen()
    }, 0)
  } else {
    oVideo.webkitEnterFullScreen()
  }
}

function requestFullscreen (oVideo) {
  if (FullscreenApi.requestFullscreen) {
    oVideo[FullscreenApi.requestFullscreen]()
  } else if (supportsFullScreen(oVideo)) {
    enterFullScreen(oVideo)
  } else {
    console.error('requestFullscreen-error')
  }
}

export default {
  FullscreenApi, requestFullscreen
}
export { FullscreenApi, requestFullscreen }
