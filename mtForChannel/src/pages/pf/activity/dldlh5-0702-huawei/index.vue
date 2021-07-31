<template>
  <div id="dldlh5-210601" ref="main">
    <div v-show="pageIndex === 0" class="loading-page">
      <div class="loading-bar"></div>
      <div class="loading-text">{{progress}}%</div>
    </div>
    <answer-page ref="answerPage" v-show="pageIndex === 1"></answer-page>
    <share-page ref="sharePage" v-show="pageIndex === 2"></share-page>
    <div ref="bookShareWrapper" class="book-page-share-wrapper">
      <div class="btn-close" @click.stop="closeBookShare()"></div>
      <div id="bookShare">
        <img id="bookShareBg" alt="">
        <div class="ewm-wrap">
          <div class="book-invite-tips1">专属邀请码:</div>
          <div class="book-invite-code">{{bookInviteCode}}</div>
          <div class="ewm" id="dldlBookShareEwm"></div>
          <div class="book-invite-tips2">扫码进入斗罗穿越模拟器</div>
        </div>
      </div>
      <img ref="bookSaveImg" alt="分享图片" class="save-share-image"/>
      <div class="tips">长按保存图片</div>
    </div>
    <div ref="generateImgWrapper" class="generate-img-wrapper">正在生成分享页</div>
    <audio id="shareAudio" ref="shareAudio" loop></audio>
    <div class="qr" v-show="weixinShow">
      <p>更好的体验，请通过游戏中心浏览</p>
    </div>
  </div>
</template>

<script>
import mixins from './utils/mixins'
import rem from './utils/rem.js'
import Vue from 'vue'
import toast from '../../../../components/redPacket/toast/toast'
import answerPage from './answer'
import sharePage from './share'
export default {
  name: 'dldlh5-210601',
  mixins: [mixins],
  components: {
    answerPage,
    sharePage
  },
  data () {
    return {
      preload: null,
      mask: true,
      progress: 0,
      moduleName: 'com.sy.dldlhsdj.nearme.gamecenter',
      condition: {},
      mobile: true,
      weixinShow: false
    }
  },
  created: function () {
    let ua = navigator.userAgent.toLowerCase()
    this.mobile = /mobile/gi.test(ua)
    if (!this.mobile || !this.canHack()) {
      this.weixinShow = true
    } else {
      const root = this.$root
      toast.install(Vue, { data: {}, parent: root })
      // const self = this
      window.onresize = this.resize
      rem.rePositionHorizon(750)
      this.preloadSrc()
    }
  },
  mounted () {
    if (!this.mobile || !this.canHack()) {
      document.getElementsByTagName('html')[0].style.height = '100%'
      document.getElementsByTagName('html')[0].style.backgroundColor = '#000'
      document.querySelector('body').setAttribute('style', 'background-color: #000 !important; height:100% !important')
      document.querySelector('.loading-page').style.display = 'none'
    } else {
      document.getElementsByTagName('html')[0].style.background = '#000'
      this.$refs.shareAudio.src = './media/share.mp3'
      const self = this
      // 初始化上报功能
      const reportOps = JSON.parse(JSON.stringify(self.condition))
      reportOps.module = this.moduleName
      this.initReportSender(reportOps, 'oppo')
      this.sendTrack(this.moduleName, 1, '页面浏览量')
      this.sendTrack('loading_pv', 5, '页面浏览量')
      this.setVm(this.$refs)
      this.visibilitychange()
    }
  },
  methods: {
    resize: function () {
      rem.rePositionHorizon(750)
    },
    preloadSrc () {
      // 预加载资源
      const mainfest = [
        { src: './image/loading-grayBg.png' },
        { src: './image/answer/ans1_css_sprites.png' },
        { src: './image/answer/ans2_css_sprites.png' },
        { src: './image/answer/ans3_css_sprites.png' },
        { src: './image/answer/ans4_css_sprites.png' },
        { src: './image/answer/ans5_css_sprites.png' },
        { src: './image/answer/ans6_css_sprites.png' },
        { src: './image/answer/ans7_css_sprites.png' }
      ]
      if (this.mustHack()) {
        console.log('兼容安卓preload')
        // mainfest.push({ src: require('./media/answer-sm.mp4') })
      }

      // eslint-disable-next-line no-undef
      this.preload = new createjs.LoadQueue(true)
      this.preload.setMaxConnections(1)
      this.preload.loadManifest(mainfest)
      this.preload.on('progress', this.handleFileProgress)
      this.preload.on('complete', this.loadComplete)
    },
    handleFileProgress () {
      this.progress = parseInt(this.preload.progress * 100)
    },
    loadComplete () {
      this.progress = 100
      this.setPageIndex(1)
      this.initAnswerPage()
    }
  }
}

</script>
<style lang="less">
// #dldlH5SharePageEwm img, #dldlBookShareEwm img {
//   width: 100%;
//   height: 100%;
// }
</style>
<style lang="less" scoped>
* {
touch-action: pan-y;
}
@keyframes rotate {
0% {
transform: rotate(0);
}
  100% {
transform: rotate(360deg);
}
}
html {
background: #0004f;
}
#dldlh5-210601 {
width: 7.5rem;
height: 13.35rem;
background: url("./image/loadPage-bg.jpg") no-repeat center/contain;
position: fixed;
left: 0;
right: 0;
top: 0;
bottom: 0;
margin: auto;
overflow: hidden;
  .loading-page {
z-index: 2;
background-color: rgba(0, 0, 0, .6);
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
    .loading-bar {
z-index: 3;
position: absolute;
left: 2rem;
top: 5rem;
width: 4rem;
height: 4rem;
background: url("./image/loading-bar.png") no-repeat center/contain;
transition: .5s;
transform-origin: 2rem 2rem;
animation: rotate 4s linear infinite normal;  /*开始动画后无限循环，用来控制rotate*/
}
    .loading-text {
z-index: 3;
position: absolute;
width: 1.5rem;
text-align: center;
left: 3.25rem;
top: 6.7rem;
font-size: .5rem;
color: #eee;
}
}
}
.book-page-share-wrapper,
.generate-img-wrapper {
display: none;
position: fixed;
z-index: 99;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(15, 15, 15, .699);
}
.generate-img-wrapper {
font-size: .35rem;
color: rgb(247, 152, 29);
display: none;
justify-content: center;
align-items: center;
}
.btn-close {
position: absolute;
top: .8rem;
right: .5rem;
width: .6rem;
height: .6rem;
background: url("./image/book/close.png") no-repeat center/contain;
}
#bookShare {
position: absolute;
top: 1.5rem;
left: 1rem;
width: 5.5rem;
height: 9.79rem;
opacity: 1;
}
.save-share-image {
position: absolute;
top: 1.5rem;
left: 1rem;
z-index: 8;
opacity: 0;
width: 5.5rem;
height: 9.79rem;
}
#bookShareBg {
position: absolute;
top: 0rem;
left: 0rem;
width: 5.5rem;
height: 9.79rem;
}
.ewm-wrap {
position: absolute;
top: 6.06rem;
left: .26rem;
width: 1.53rem;
height: 2.28rem;
pointer-events: none;
user-select: none;
background: url("./image/share/ewm-bg-book.png") no-repeat top center/contain;
  .ewm {
position: absolute;
top: .68rem;
left: .1rem;
width: 1.34rem;
height: 1.34rem;
overflow: hidden;
}
  .book-invite-tips1 {
position: absolute;
top: .01rem;
left: .1rem;
font-size: .18rem;
font-weight: bold;
color: #fff;
}
  .book-invite-tips2 {
position: absolute;
width: 4rem;
transform-origin: left;
transform: scale(.64);
text-align: left;
top: 2.14rem;
left: .05rem;
font-size: .18rem;
font-weight: bold;
color: #fff;
}
}
// #dldlBookShareEwm img {
//   width: 1.34rem;
//   height: 1.34rem;
// }
.tips {
position: absolute;
top: 11.8rem;
left: 2.7rem;
font-size: .4rem;
color: #fff;
font-weight: bold;
}
.book-invite-code {
position: absolute;
top: .24rem;
left: .1rem;
font-size: .25rem;
letter-spacing: 0rem;
color: #ffe119;
}
// @media only screen and (min-device-width : 768px) and (max-device-width : 1024px){
//   .loading-bar {
//     left: 3rem !important;
//   }
//   .loading-text {
//     left: 4.25rem !important;
//   }
// }

// 微信提示
.qr {
position: absolute;
z-index: 9;
width: 300px;
height: 300px;
top: 40%;
left: 50%;
margin-top: -100px;
margin-left: -150px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
font-size: 14px;
color: #fff;
  .wx-icon {
width: 40px;
height: auto;
max-width: 100%;
max-height: 100%;
pointer-events: none;
}
  p {
margin-top: 30px;
margin-bottom: 30px;
}
}
</style>
