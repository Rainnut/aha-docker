import { store, mutations } from './store'
import { device } from '@/utils/redPacket/tools'
// import QRCode from 'qrcode'
export default {
  data () {
    return {
      store: store
    }
  },
  computed: {
    oppoId () {
      return this.store.oppoId
    },
    fontSize () {
      return this.store.fontSize
    },
    score () {
      return this.store.score
    },
    pageIndex () {
      return this.store.pageIndex
    },
    answerData () {
      return this.store.answerData
    },
    reportSender () {
      return this.store.reportSender
    },
    bookInviteCode () {
      return this.store.bookInviteCode
    },
    preloadLinkSrc () {
      return this.store.preloadLinkSrc
    },
    generateImg () {
      return this.store.generateImg
    }
  },
  methods: {
    visibilitychange () {
      document.addEventListener('visibilitychange', () => {
        const shareAudio = document.getElementById('shareAudio')
        if (document.hidden) {
          shareAudio.pause()
        } else {
          shareAudio.play()
        }
      })
    },
    canHack () {
      const ua = navigator.userAgent.toLowerCase()
      // oppo: "oppobrowser", "heytapbrowser"
      const blackList = ['oppobrowser', 'heytapbrowser', 'vivo']
      if (blackList.some(key => ua.indexOf(key) > -1)) {
        console.log('无法兼容，跳转引导页', ua)
        return false
      }
      return true
    },
    mustHack () {
      const ua = navigator.userAgent.toLowerCase()
      // const reg = new RegExp(/android\s(\d{1,})\.*\d*/)
      // const reg = new RegExp(/vivobrowser|xiaomi\/miuibrowser/)
      console.log('useragent', ua)
      if (!device().weixin && !device().qq && device().android && this.canHack() && ua.indexOf('huawei') === -1) {
        return true
      }
      return false
    },
    isPreloadSupported () {
      const link = document.createElement('link')
      const relList = link.relList

      if (!relList || !relList.supports) {
        return false
      }

      return relList.supports('preload')
    },
    preloadLink (href, as) {
      if (this.isPreloadSupported()) {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = as
        link.href = href
        link.crossorigin = 'crossorigin'
        document.head.appendChild(link)
      }
    },
    importScript (src, callback, before) {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        callback && callback()
      }
      if (before) {
        document.head.appendChild(script)
      } else {
        script.async = 'async'
        document.body.appendChild(script)
      }
    },
    async createQrcode (id, text, option) {
      console.log('createQrcode', text)
      const QRCode = window.QRCode
      const exmEl = document.getElementById(id)
      exmEl.innerHTML = ''
      const ops = { text: text, width: option.width * this.fontSize, height: option.height * this.fontSize, colorDark: '#000000', colorLight: '#fff9ea', correctLevel: QRCode.CorrectLevel.H }
      // eslint-disable-next-line no-new
      await new QRCode(exmEl, ops)
    },
    randomInt (min, max) {
      return parseInt(Math.random() * (max - min + 1) + min, 10)
    },
    ...mutations
  }
}
