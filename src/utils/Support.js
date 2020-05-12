const USER_AGENT = navigator.userAgent.toLowerCase()

// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md

/* let SUPPORT_PASSIVE = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    get: function() { SUPPORT_PASSIVE = true }
  })
  window.addEventListener("test", null, opts)
} catch (e) {} */


class Support
{
    constructor()
    {
        // this.passive = SUPPORT_PASSIVE

        this.touch = ('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)
        this.android = USER_AGENT.indexOf('android') > -1
        this.ios = /iPad|iPhone|iPod|ipad|iphone|ipod/.test(USER_AGENT) && !window.MSStream
        this.ie = document.documentMode || /Edge/.test(USER_AGENT) || window.navigator.userAgent.indexOf("Edge") > -1
    }
}

export default new Support()