<template>
  <div class="answer-page">
    <div class="tips" :class="{'show': showChuizi && !startFlag && videoState === 'pause'}"></div>
    <div class="finger" :class="{'show': showChuizi && !startFlag && videoState === 'pause'}"></div>
    <div class="bo" :class="{'show': showChuizi && !startFlag && videoState === 'pause'}" ></div>
    <div class="btn-skip" v-show="startFlag && showSkip && curSection && nextFlag < 8" @click.stop="skipVideo()"></div>
    <div v-show="showHackBg && cssHackVideo"  class="css-hack-video" :style="hackVideoStyle"></div>
    <video
      id="bgVideo"
      ref="bgVideo"
      width="100%"
      height="100%"
      preload="auto"
      controlslist="nodownload nofullscreen noremoteplayback"
      x5-video-player-type="h5"
      x5-video-player-fullscreen="true"
      x5-video-orientation="portraint"
      playsinline="true"
      x-webkit-airplay="true"
      webkit-playsinline="true"
      onplaying="this.controls=false"
      >
      <source src="https://imgcs.s98s2.com/image/webSite/article/1624617736000/answer-sm.mp4" />
      <source src="https://imgcs.s98s2.com/image/webSite/article/1624617742000/answer-sm.ogv" />
      <source src="https://imgcs.s98s2.com/image/webSite/article/1624617749000/answer-sm.webm" />
    </video>
    <!-- <canvas :height="canvasOption.height" :width="canvasOption.width"  id="videoCanvas" ref="videoCanvas" @click.stop="startAnswer(true, true)"></canvas> -->
    <!-- <audio id="answerAudio" ref="audio"></audio> -->
    <div class="hack-chuizi" v-show="showChuizi && !startFlag && videoState === 'pause' && firstNoPlay"></div>
    <div
      :class="{'show-question': startFlag && videoState === 'pause'}"
      class="question-bg"
      :style="questionBgStyle"
      @click="startAnswer()"
    >
      <!-- 第2题目自定义(需要实现过渡效果，不适合放在同个div做切换) -->
      <div class="second-question" :class="{'show': curSection && curSection.num === 2}" :style="secondTitleStyle"></div>
      <!-- 第3题目自定义 -->
      <div class="third-question" :class="{'show': curSection && curSection.num === 3}" :style="thirdTitleStyle"></div>
      <!-- 选项 -->
      <div v-for="(ops, oIdx) in curSection.options" :key="oIdx" class="option-btn" :class="{'show': optionShow, 'rotate-card': curSection && curSection.num === 5 && selectIdx === oIdx}" :style="ops" @click.stop="selectOps(oIdx)">
        <!-- 第5题翻牌 -->
        <img class="first-img" :class="{'show': curSection && curSection.num === 5}" :src="curSection && curSection.rotateImgs && curSection.rotateImgs[oIdx] && curSection.rotateImgs[oIdx][0]" alt="">
        <img class="second-img" :class="{'show': curSection && curSection.num === 5}" :src="curSection && curSection.rotateImgs && curSection.rotateImgs[oIdx] && curSection.rotateImgs[oIdx][1]" alt="">
      </div>
      <div :class="{'answer-show': !optionShow}" class="op-answer" :style="opAnswerStyle"></div>
    </div>
    <div class="enter-wrapper" @click.stop="init()" v-show="initShow">
      <div class="page-start"></div>
    </div>
    <!-- <div id="bgVideo"></div> -->
  </div>
</template>

<script>
import mixins from './utils/mixins'
import { device } from '@/utils/redPacket/tools'
import { imgMapper } from './utils/spritesMapper'
// import Player from 'xgplayer'
export default {
  mixins: [mixins],
  name: 'dldlh5-answer',
  data () {
    return {
      appid: '30458895',
      canvasOption: {
        height: 1334,
        width: 750
      },
      firstNoPlay: false,
      lock: false,
      initShow: true,
      startFlag: false,
      showChuizi: false,
      showQuestion: false,
      startVideoEnd: 3.17,
      videoState: 'playing',
      showSkip: false,
      videoPlayer: null,
      audioPlayer: null,
      questionOps: null,
      optionShow: false,
      selectIdx: null,
      selectLock: true,
      curSection: {
        options: []
      },
      currentTime: 0,
      nextFlag: 0,
      specQus: [2, 5],
      secondTitleStyle: {
        background: ''
      },
      thirdTitleStyle: {
        background: ''
      },
      prevEnd: null,
      sectionArr: [{
        end: 14.02
      }, {
        end: 19.87
      }, {
        end: 24.02
      }, {
        end: 28.3
      }, {
        end: 31.9
      }, {
        end: 36.9 // 37.01
      }, {
        end: 41.6
      }],
      nextQuestionTimer: null,
      questionBgStyle: {
        background: imgMapper['1'].bg
      },
      immediately: false,
      cssHackVideo: false,
      showHackBg: false,
      hackVideoStyle: {
        backgroundImage: `url("./image/vidPic/0.jpg")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center'
      },
      opAnswerStyle: {
        height: '',
        background: ''
      }
    }
  },
  created: function () {
    for (let sec in this.sectionArr) {
      const num = parseInt(sec) + 1
      const imgMap = imgMapper[num]
      this.sectionArr[sec].num = num
      this.sectionArr[sec].audioUrl = `./media/ans${num}.mp3`
      this.sectionArr[sec].questionBg = imgMap.bg
      this.sectionArr[sec].options = []
      this.sectionArr[sec].rotateImgs = []
      for (let i = 0; i < 4; i++) {
        let ops, ratatePic
        if (parseInt(sec) <= 3) {
          const mapper = [
            { top: '10.16rem', left: '0.7rem' },
            { top: '10.16rem', left: '4.38rem' },
            { top: '11.59rem', left: '0.7rem' },
            { top: '11.59rem', left: '4.38rem' }
          ]
          ops = mapper[i]
          ops.position = 'absolute'
          ops.width = '2.45rem'
          ops.height = '0.71rem'
          ops.background = imgMap.option[i]
        } else if (parseInt(sec) >= 5) {
          const mapper = [
            { top: '9.96rem', left: '0.38rem' },
            { top: '9.96rem', left: '4.1rem' },
            { top: '11.19rem', left: '0.38rem' },
            { top: '11.19rem', left: '4.1rem' }
          ]
          ops = mapper[i]
          ops.position = 'absolute'
          ops.width = '3.11rem'
          ops.height = '0.93rem'
          ops.background = imgMap.option[i]
        } else if (parseInt(sec) === 4) {
          const mapper = [
            { top: '10.16rem', left: '0.56rem' },
            { top: '10.16rem', left: '2.2rem' },
            { top: '10.16rem', left: '3.85rem' },
            { top: '10.16rem', left: '5.55rem' }
          ]
          ops = mapper[i]
          ops.perspective = '400px'
          ops.position = 'absolute'
          ops.width = '1.41rem'
          ops.height = '1.97rem'
          // ops.background = `url("${require(`./image/ans5-card.jpg`)}") no-repeat center/contain`
          ratatePic = [
            `./image/ans5-card.jpg`,
            `./image/ans5-card-fan.jpg`
          ]
        }
        if (this.sectionArr[sec].num === 5) this.sectionArr[sec].rotateImgs.push(ratatePic)
        ops.width = imgMap.optionWidth || ops.width
        this.sectionArr[sec].options.push(ops)
      }
      // 2、5有选项答案
      if (this.specQus.some(key => key === num)) {
        this.sectionArr[sec].answers = imgMapper[num].answer
      }
    }
    // console.log('sectionArr', this.sectionArr)
  },
  mounted () {
    const self = this
    this.audioPlayer = document.getElementById('shareAudio')
    this.questionOps = this.$refs.questionOps
    this.videoPlayer = this.$refs.bgVideo
    this.videoPlayer.style.display = 'block'
    // this.videoPlayer.οntimeupdate = self.timeUpdateHandler
    this.videoPlayer.addEventListener('timeupdate', function () {
      self.timeUpdateHandler()
    }, false)
    this.videoPlayer.addEventListener('ended', function () {
      self.showSharePage()
    }, false)
    this.videoPlayer.addEventListener('error', function (e) {
      console.log('视频出错了')
      // alert(e)
    })
    if (this.mustHack()) {
      console.log('采用兼容方案')
      /* 采用视频缩放适配 */
      this.cssHackVideo = true
      this.videoPlayer.playbackRate = 2.5
      this.videoPlayer.muted = true
      this.videoPlayer.play()
      this.videoPlayer.style.opacity = 0
      this.videoPlayer.classList.add('answer-video-hack')
      for (let i = 0; i <= 7; i++) {
        this.preloadLinkSrc.push(`./image/vidPic/${i}.jpg`)
      }
    }
    for (const s of this.preloadLinkSrc) {
      if (s.endsWith('mp4')) {
        this.preloadLink(s, 'video')
      } else if (s.endsWith('mp3')) {
        this.preloadLink(s, 'audio')
      } else {
        this.preloadLink(s, 'image')
      }
    }
  },
  methods: {
    setAnswerStyle () {
      let ops = {
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        backgroundPosition: 'top',
        backgroundImage: ''
      }
      const curSect = this.curSection || {
        options: []
      }
      if (curSect.answers) {
        const len = this.answerData.length
        if (this.specQus.some(key => key === len)) {
          // ops.backgroundImage = curSect.answers[this.answerData[len - 1]] || ''
          ops = curSect.answers[this.answerData[len - 1]]
        }
      }
      this.$set(this, 'opAnswerStyle', ops)
    },
    hackVideoShow (show, init) {
      if (this.cssHackVideo) {
        this.videoPlayer.style.opacity = 1
        this.videoPlayer.playbackRate = 1
        this.videoPlayer.style.display = show ? 'block' : 'none'
        if (init) {
          // console.log('init.audio.load')
          this.videoPlayer.muted = false
          // 安卓兼容初始化后，需要load一遍，否则视频音频错乱对不上ß
          this.videoPlayer.load()
        }
        // console.log('init.audio', this.videoPlayer.playbackRate, this.videoPlayer.muted)
      }
      // if (init) {
      //   // console.log('init.audioPlayer.play')
      //   this.audioPlayer.muted = false
      //   this.audioPlayer.play()
      // }
    },
    timeUpdateHandler () {
      const self = this
      // ios 里出现重新播放问题，需要记录
      self.currentTime = self.videoPlayer.currentTime
      if (self.nextFlag === 0 && self.startVideoEnd && self.videoPlayer.currentTime >= self.startVideoEnd) {
        self.enterState()
      } else if (self.curSection && self.videoPlayer.currentTime >= self.curSection.end) {
        self.nextFlag = self.curSection.num + 1
        if (self.nextFlag === 1) self.videoState = 'playing'
        self.showSectionQuestion()
      }
      if (self.videoPlayer.ended) {
        self.showSharePage()
      }
    },
    nextQuestion () {
      const num = this.specQus.find(n => n === this.nextFlag - 1)
      if (num && this.answerData.length === num) {
        clearTimeout(this.nextQuestionTimer)
        this.hideSectionQuestion()
      }
    },
    playVideo () {
      const self = this
      this.audioPlayer.pause()
      this.hackVideoShow(true)
      // video load() 后会导致视频重新播放，currentTime=0
      // this.videoPlayer.load()
      // this.videoPlayer.play()

      // 重置一遍timeupdate监听时间点不准问题(点击跳过是准确的，nextFlag全程只有timeupdate更新)
      this.resetCurrentTime()
      if (this.immediately) {
        this.videoPlayer.play()
      } else {
        setTimeout(() => {
          // self.videoPlayer.currentTime = self.currentTime
          // console.log('playVideo', self.videoPlayer.currentTime)
          // self.videoPlayer.play()
          self.videoPlayer.play()
        }, 0)
      }
    },
    playAudio (url) {
      const self = this
      this.videoPlayer.pause()
      this.audioPlayer.src = url
      this.audioPlayer.load()
      // this.audioPlayer.play()
      setTimeout(() => {
        self.audioPlayer.play()
      }, 0)
      setTimeout(() => {
        self.videoState = 'pause'
        self.showSkip = false
        // self.videoPlayer.currentTime = self.curSection.end
        self.hackVideoShow(false)
      }, 300)
    },
    init () {
      const self = this
      this.initShow = false
      this.videoState = 'playing'
      if (this.cssHackVideo) {
        this.videoPlayer.style.transform = 'scale(1.2929)'
        // console.log('INIT。audio')
        this.hackVideoShow(true, true)
      }
      // console.log('init.audioPlayer.play')
      this.audioPlayer.muted = false
      this.audioPlayer.play()
      this.nextFlag = 0
      self.$nextTick(() => {
        self.videoPlayer.currentTime = 0
        self.playVideo()
        // 判断视频是否自动播放，被限制了则直接进入游戏环节
        setTimeout(() => {
          // console.log('判断视频是否自动播放，被限制了则直接进入游戏环节')
          // console.log('self.videoPlayer.currentTime', self.videoPlayer.currentTime)
          if (self.videoPlayer.currentTime === 0) {
            if (device().ios) {
              // console.log('ios设置canplay')
              // IOS需要进入canplay状态才能设置currentTime，视频play()后才触发canplay事件
              self.videoPlayer.addEventListener('canplay', self.canplayHandler)
            } else {
              // console.log('init.enterState')
              self.enterState()
            }
            self.firstNoPlay = true
          } else {
            self.showChuizi = true
          }
        }, 1500)
      })
    },
    canplayHandler () {
      // console.log('ios触发canplay')
      // console.log('self.videoPlayer.currentTime', this.videoPlayer.currentTime)
      this.enterState()
      this.videoPlayer.removeEventListener('canplay', this.canplayHandler)
    },
    enterState () {
      this.sendTrack('ready_pv', 5, '锤子页浏览量')
      this.nextFlag = 1
      this.curSection = this.sectionArr[this.nextFlag - 1]
      // this.videoPlayer.currentTime = this.startVideoEnd
      this.startFlag = false
      this.videoState = 'pause'
      this.showSkip = false
      this.showChuizi = true
      this.videoPlayer.pause()
      this.showHackBg = true
      this.hackVideoShow(false)
    },
    startAnswer () {
      if (!this.showChuizi || !this.videoPlayer.paused) return
      if (this.nextFlag === 1) {
        this.videoState = 'playing'
        this.startFlag = true
        this.playVideo()
      } else {
        this.nextQuestion()
      }
    },
    skipVideo () {
      clearTimeout(this.nextQuestionTimer)
      this.curSection.end && (this.videoPlayer.currentTime = parseFloat(this.curSection.end) + 0.01)
      // console.log('skipVideo', this.curSection.num, this.curSection.end)
      this.sendTrack(`skip_to_question${this.curSection.num}`, 5, `跳过至第${this.curSection.num}题`)
      this.showSectionQuestion()
    },
    resetCurrentTime () {
      if (this.nextFlag > 1) {
        const prevSection = this.sectionArr[this.nextFlag - 2]
        // 保证翻页效果
        prevSection.end && (this.videoPlayer.currentTime = parseFloat(prevSection.end) + 0.01)
      }
    },
    showSectionQuestion () {
      if (this.cssHackVideo) {
        this.hackVideoStyle.backgroundImage = `url("./image/vidPic/${this.curSection.num}.jpg")`
      }

      const curSect = this.curSection || {
        options: []
      }
      this.questionBgStyle.background = curSect.questionBg || ''
      this.$nextTick(() => {
        // 视频播放时，延迟更换底图，避免切图闪烁，过渡题目动画
        this.optionShow = true
      })
      this.selectLock = false
      this.playAudio(this.curSection.audioUrl)
    },
    hideSectionQuestion () {
      const self = this
      // 这个字段控制过渡，非video状态同步会有延迟，用于背景过渡
      this.videoState = 'playing'
      setTimeout(() => {
        self.curSection = self.sectionArr[self.nextFlag - 1] || {
          options: []
        }
        self.showSkip = true
        self.playVideo()
      }, 1000)
    },
    selectOps (index) {
      if ((this.videoPlayer && !this.videoPlayer.paused) || this.selectLock) return
      this.selectLock = true
      this.sendTrack(`question${this.curSection.num}_pv`, 5, `第${this.curSection.num}题浏览量`)
      const self = this
      // 第5题要随机给答案
      if (this.curSection.num === 5) {
        this.selectIdx = index
        const randIndex = this.randomInt(0, 3)
        this.answerData.push(randIndex)
      } else {
        this.answerData.push(index)
      }
      if (this.specQus.some(num => num === this.curSection.num)) {
        setTimeout(() => {
          self.optionShow = false
        }, 1000)
      } else {
        this.optionShow = false
      }
      // 第2题要对应第1题选项
      if (this.curSection.num === 1) {
        this.secondTitleStyle = {
          background: imgMapper['2'].question[this.answerData[0] || 0]
        }
      } else if (this.curSection.num === 2) {
        const imgMap3 = imgMapper['3']
        this.thirdTitleStyle = {
          background: this.answerData[1] < 3 ? imgMap3.question[0] : imgMap3.question[1]
        }
      }
      this.setAnswerStyle()
      const timeout = this.curSection.answers ? (this.curSection.num === 2 ? 5500 : 6000) : 0
      this.nextQuestionTimer = setTimeout(() => {
        // if (self.answerData.length < 2) {
        //   self.hideSectionQuestion()
        // }
        self.hideSectionQuestion()
      }, timeout)
    },
    showSharePage () {
      // console.log('答案', this.answerData)
      if (!this.lock) {
        this.calScore(this.answerData)
        this.updateSharePage()
        this.hackVideoShow(false)
        this.lock = true
      }
    }
  }
}

</script>
<style lang="less" scoped>
html {
background: #0004f;
}
* {
touch-action: pan-y;
}
// video样式配置
/*video默认全屏按钮*/
video::-webkit-media-controls-fullscreen-button {
display: none !important;
}
/*video默认aduio音量按钮*/
video::-webkit-media-controls-mute-button {
display: none !important;
}
/*video默认setting按钮*/
video::-internal-media-controls-overflow-button {
display: none !important;
}
/*禁用video的controls（要慎重！不要轻易隐藏掉，会导致点击视频不能播放）*/
video::-webkit-media-controls {
display: none !important;
}
video::-webkit-media-controls-play-button {
display: none !important;
}
.IIV::-webkit-media-controls-play-button,
video::-webkit-media-controls-play-button,
video::-webkit-media-controls-start-playback-button {
opacity: 0 !important;
pointer-events: none !important;
width: 5px !important;
}
video::-webkit-media-controls-volume-slider {
display: none !important;
}
video::-webkit-media-controls-timeline {
display: none !important;
}
video::-webkit-media-controls-current-time-display {
display: none !important;
}
// video样式配置 end
.answer-page,
#bgVideo,
.question-bg,
#videoCanvas,
.css-hack-video,
.hack-chuizi {
width: 7.5rem !important;
height: 13.35rem !important;
}
.css-hack-video {
position: absolute;
z-index: 1;
top: 0;
left: 0;
transform: scale(1.2929);
}
.answer-page {
overflow: hidden;
// background: url('./image/enterPage-bg.jpg') no-repeat center/contain;
}
#bgVideo {
position: absolute;
top: 0;
left: 0;
z-index: 2;
object-fit: fill;
pointer-events: none;
display: none;
}
.answer-video-hack {
transform: scale(1.2929) translateX(9rem);
}
#videoCanvas {
z-index: 2;
pointer-events: none;
display: none;
}
.tips {
z-index: 3;
position: absolute;
top: 10.37rem;
left: 1.5rem;
width: 4.32rem;
height: 1.38rem;
pointer-events: none;
background: url("./image/enterPage-text.png") no-repeat center/contain;
visibility: hidden;
opacity: 0;
}
.btn-start {
z-index: 6;
position: absolute;
top: 2.1rem;
left: 2.5rem;
width: 3.3rem;
height: 4rem;
}
.btn-skip {
z-index: 6;
position: absolute;
top: 1.18rem;
left: 5.91rem;
width: 1.38rem;
height: .51rem;
background: url("./image/btn-skip.png") no-repeat center/contain;
}
.hack-chuizi {
position: absolute;
z-index: 3;
top: 0;
left: 0;
background: url("./image/vidPic/0.jpg") no-repeat center/contain;
}
// 答题样式
.question-bg {
position: absolute;
z-index: 4;
top: 0;
left: 0;
opacity: 0;
transition: opacity 1s;
}
.show {
pointer-events: unset !important;
opacity: 1 !important;
}
.option-btn {
pointer-events: none;
opacity: 0;
}
.second-question {
position: absolute;
top: 7.42rem;
left: .61rem;
width: 6.26rem;
height: 1.62rem;
opacity: 0;
pointer-events: none;
}
.third-question {
position: absolute;
top: 7.62rem;
left: .61rem;
width: 6.29rem;
height: 1.12rem;
opacity: 0;
pointer-events: none;
}
.op-answer {
position: absolute;
pointer-events: none;
z-index: 5;
top: 10.22rem;
left: .57rem;
width: 6.3rem;
height: .94rem;
visibility: hidden;
transition: opacity 1s;
opacity: 0;
pointer-events: none;
}
.answer-show {
visibility: visible;
opacity: 1;
}
.first-img,
.second-img {
backface-visibility: hidden;
transform-style: preserve-3d;
// transform-origin: center;
transition: .8s ease-in-out ;
position: absolute;
top: 0;
left: 0;
width: 1.41rem;
height: 1.97rem;
pointer-events: none;
user-select: none;
opacity: 0;
}
.first-img {
transform: rotateY(0);
z-index: 3;
}
.second-img {
transform: rotateY(180deg);
z-index: 2;
}
.rotate-card .first-img {
transform: rotateY(-180deg);
}
.rotate-card .second-img {
transform: rotateY(0deg);
}
.enter-wrapper {
z-index: 6;
// background-color: rgba(0, 0, 0, 0.6);
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: url("./image/loading-grayBg.png") no-repeat center/7.5rem 13.35rem;
}
@keyframes downloadJump {
0% {
transform: scale(1,1);
}
50% {
transform: scale(1.1, 1.1);
}
100% {
transform: scale(1, 1);
}
}
.page-start {
position: absolute;
top: 5.27rem;
left: 2.54rem;
width: 3.44rem;
height: 2.47rem;
animation: downloadJump 1.6s linear 0s infinite alternate forwards;
background: url("./image/enterBtn.png") no-repeat center/contain;
transition: all .3s ease .3s;
}

.question-bg.show-question {
opacity: 1;
}
@keyframes boshow {
0% {
transform: scale(1, 1);
opacity: 1;
}
50% {
transform: scale(.8, .8);
opacity: .7;
}
100% {
transform: scale(1, 1);
opacity: 1;
}
}
.bo {
z-index: 6;
position: absolute;
left: 2.62rem;
top: 2.07rem;
width: 1.11rem;
height: 1.11rem;
background: url("./image/enterPage-bo.png") no-repeat center/contain;
visibility: hidden;
opacity: 0;
pointer-events: none;
animation: boshow 1s linear 0s infinite alternate forwards;
}
@keyframes fingermove {
0% {
transform: translate(0, 0);
opacity: 1;
}
50% {
transform: translate(-.2rem, .2rem) scale(1.2, 1.2);
opacity: .5;
}
100% {
transform: translate(0, 0);
opacity: 1;
}
}
.finger {
z-index: 3;
position: absolute;
left: 1.9rem;
top: 2.37rem;
width: 1.32rem;
height: 1.09rem;
background: url("./image/enterPage-finger.png") no-repeat center/contain;
visibility: hidden;
opacity: 0;
pointer-events: none;
animation: fingermove 1.6s linear 0s infinite alternate forwards;
}

.finger.show,
.bo.show,
.tips.show {
opacity: 1;
visibility: visible;
transition: all 3s;
}
// @media only screen and (min-device-width : 768px) and (max-device-width : 1024px){
//   .page-start{
//     left: 3.44rem;
//   }
// }
</style>
