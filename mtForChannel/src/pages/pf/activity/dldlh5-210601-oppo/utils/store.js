// store.js
import Vue from 'vue'
import ReportSender from '@/utils/report.js'
let __refs = null

export const store = Vue.observable({
  oppoId: 123456,
  pageIndex: 0,
  bookInviteCode: '',
  moduleName: '',
  reportSender: null,
  answerData: [],
  score: 0,
  fontSize: 0,
  preloadLinkSrc: [
    './image/loading-grayBg.png',
    `./image/answer/ans1_css_sprites.png`,
    `./image/answer/ans2_css_sprites.png`,
    `./image/answer/ans3_css_sprites.png`,
    `./image/answer/ans4_css_sprites.png`,
    `./image/answer/ans5_css_sprites.png`,
    `./image/answer/ans6_css_sprites.png`,
    `./image/answer/ans7_css_sprites.png`,
    `./media/ans1.mp3`,
    `./media/ans2.mp3`,
    `./media/ans3.mp3`,
    `./media/ans4.mp3`,
    `./media/ans5.mp3`,
    `./media/ans6.mp3`,
    `./media/ans7.mp3`,
    `./media/share.mp3`
  ]
})
export const mutations = {
  setVm (refs) {
    __refs = refs
    store.fontSize = parseInt(document.getElementsByTagName('html')[0].style.fontSize)
  },
  setGenerateImgShow (show) {
    __refs.generateImgWrapper.style.display = show ? 'flex' : 'none'
  },
  setBookInvitecode (code) {
    store.bookInviteCode = code
  },
  initAnswerPage () {
    // __refs.answerPage.init()
  },
  updateSharePage () {
    mutations.setPageIndex(2)
    setTimeout(() => {
      mutations.playBookAudio()
      __refs.sharePage.initSharePic()
    }, 500)
  },
  closeBookAudio () {
    __refs.shareAudio && __refs.shareAudio.pause()
  },
  playBookAudio () {
    __refs.shareAudio && __refs.shareAudio.play()
  },
  setAnswerOption (opsIndex) {
    store.answerData.push(opsIndex)
  },
  setBookShareBg (img) {
    document.getElementById('bookShareBg').src = img
  },
  setBookShareImg (img) {
    __refs.bookSaveImg.src = img
  },
  showBookShare () {
    __refs.bookShareWrapper.style.display = 'block'
  },
  closeBookShare () {
    __refs.bookShareWrapper.style.display = 'none'
  },
  calScore (answerData) {
    store.answerData = answerData
    let score = 0
    if (answerData[1] < 3) {
      score = score + 40
    }
    if (answerData[2] === 2) {
      score = score + 10
    }
    if (answerData[3] === 0) {
      score = score + 10
    }
    if (answerData[4] < 3) {
      score = score + 40
    }
    store.score = score
    __refs.sharePage.setLevelImg()
  },
  setPageIndex (pageIndex) {
    store.pageIndex = pageIndex
  },
  initReportSender (ops, type) {
    store.moduleName = ops.module
    store.reportSender = new ReportSender(ops, type)
  },
  sendTrack (event, type, label) {
    store.reportSender && store.reportSender.send(store.moduleName, event, type, label)
  }
}
