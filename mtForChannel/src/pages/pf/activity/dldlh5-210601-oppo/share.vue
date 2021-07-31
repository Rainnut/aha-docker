<template>
<div class="share-container">
  <div id="shareEwmPage">
    <div id="sharePage" :style="bgStyle">
      <div class="level">
        <div :style="firstNumStyle" class="first-num"></div>
        <div :style="secondNumStyle" class="second-num"></div>
        <div :style="unitStyle" class="unit"></div>
      </div>
      <div class="title" :style="titleStyle"></div>
      <div class="main-desc">
        <div class="main-text">{{mainDesc}}</div>
      </div>
      <div class="second-desc">
        <div class="sd-text">{{secondDesc}}</div>
      </div>
      <div class="label-container">
        <div class="label" v-for="(label, idx) in labelArr" :key="idx">{{label}}</div>
      </div>
      <img ref="saveImg" alt="分享图片" class="save-share-image"/>
    </div>
  </div>
  <!-- <div ref="tips" class="tips">长按保存图片</div> -->
</div>
</template>

<script>
import mixins from './utils/mixins'
import {bgMapper, descArr, scoreMapper, levelMapper} from './utils/score'
// import html2canvas from 'html2canvas'
export default {
  mixins: [mixins],
  components: {},
  name: 'share-page',
  data () {
    return {
      cookieKey: 'lb-dldlh5-210601',
      ewmId: 'dldlH5SharePageEwm',
      ewmShow: true,
      unitStyle: levelMapper.ji,
      firstNumStyle: levelMapper[0],
      secondNumStyle: levelMapper[0],
      timeOutEvent: 0
    }
  },
  created: function () {
    // bgMapper
    // scoreArr
    // scoreMapper
  },
  computed: {
    bgStyle () {
      const bg = this.answerData && this.answerData.length >= 6 ? bgMapper[`${this.answerData[0]}${this.answerData[5]}`] : 'ts'
      return {
        background: `url("./image/share/${bg}.jpg") no-repeat center/contain`
      }
    },
    option () {
      const that = this
      let result = scoreMapper[0]
      for (let i in scoreMapper) {
        if (scoreMapper[i].ids.some(id => id === that.score)) {
          result = scoreMapper[i]
          break
        }
      }
      return result
    },
    descOption () {
      const randIdx = this.randomInt(0, this.option.arr.length - 1)
      console.log('score', this.score)
      console.log('descOption', this.option.arr, randIdx)
      return this.option.arr[randIdx]
    },
    level () {
      const scope = this.descOption.scope
      return this.randomInt(scope[0], scope[1])
    },
    title () {
      console.log('title', this.descOption.title)
      return this.descOption.title
    },
    titleStyle () {
      console.log('titleStyle', this.descOption.style)
      return this.descOption.style
    },
    labelArr () {
      let arr = []
      const tags = descArr[this.descOption.index].tag
      for (let i = 0; i < 3; i++) {
        const deleteIdx = this.randomInt(0, tags.length - 1)
        arr.push(...tags.splice(deleteIdx, 1))
      }
      return arr
    },
    randomDescIndex () {
      const idx = this.randomInt(0, this.descOption.choose.length - 1)
      return this.descOption.choose[idx]
    },
    mainDesc () {
      return descArr[this.descOption.index].main[this.randomDescIndex].replace('xxxx', this.title)
    },
    secondDesc () {
      return descArr[this.descOption.index].second[this.randomDescIndex]
    }
  },
  mounted () {
    // this.$refs.btnToBook.style.display = 'block'
    this.$refs.tips.style.display = 'block'
  },
  methods: {
    setLevelImg () {
      let levelArr
      if (this.level.length === 1) {
        levelArr = [0, this.level]
      } else {
        levelArr = [parseInt(this.level / 10, 10), this.level % 10]
      }
      this.firstNumStyle = levelMapper[levelArr[0]]
      this.secondNumStyle = levelMapper[levelArr[1]]
    },
    createShareBgPic () {
      const that = this
      return new Promise(function (resolve) {
        const shareBg = document.getElementById('sharePage')
        const rect = shareBg.getBoundingClientRect()
        // console.log('createShareBgPic', rect)
        // eslint-disable-next-line no-undef
        html2canvas(shareBg, {
          allowTaint: true,
          backgroundColor: null,
          useCORS: true,
          width: rect.width - 2,
          height: rect.height - 2
        })
          .then(function (canvas) {
            const shareBg = canvas.toDataURL('image/png')
            that.setBookShareBg(shareBg)
            that.ewmShow = true
            resolve(true)
          })
          .catch(function (e) {
            resolve(true)
          })
      })
    },
    createSharePic () {
      const that = this
      return new Promise(function (resolve) {
        const shareBg = document.getElementById('shareEwmPage')
        const rect = shareBg.getBoundingClientRect()
        // eslint-disable-next-line no-undef
        html2canvas(shareBg, {
          allowTaint: true,
          useCORS: true,
          width: rect.width - 2,
          height: rect.height - 2
        })
          .then(function (canvas) {
            const shareImg = canvas.toDataURL('image/png')
            that.$refs.saveImg.src = shareImg
            resolve(true)
          })
          .catch(function (e) {
            resolve(true)
          })
      })
    },
    initSharePic () {
      const that = this
      // this.setGenerateImgShow(true)
      // 这里字体设置有个延迟，用nextTick未设置完成
      that.$nextTick(function () {
      // setTimeout(function () {
        that.createSharePic().then(() => {
          // that.setGenerateImgShow(false)
          // that.$refs.btnToBook.style.display = 'block'
          // that.$refs.tips.style.display = 'block'
        })
      })
      // }, 500)
    }
  }
}

</script>
<style lang="less" scoped>
.share-container, #shareEwmPage,#sharePage {
  position: relative;
  width: 7.5rem;
  height: 13.35rem;
  text-align: left;
  overflow: hidden;
}
.save-share-image {
  position: absolute;
  z-index: 8;
  opacity: 0;
  top: 0;
  left: 0;
  width: 7.5rem;
  height: 13.35rem;
}
.level {
  font-weight: bold;
  position: absolute;
  top: 0.68rem;
  left: 0.48rem;
  font-size: 1.46rem;
  color: #b4e7ff;
  width: 3.24rem;
  // color: #ffffff;
  .first-num {
    position: absolute;
    top: 0rem;
    left: 0rem;
    width: 0.8rem;
    height: 1.11rem;
  }
  .second-num {
    position: absolute;
    top: 0rem;
    left: 0.89rem;
    width: 0.8rem;
    height: 1.11rem;
  }
  .unit {
    position: absolute;
    top: 0rem;
    left: 1.72rem;
    width: 1.52rem;
    height: 1.4rem;
  }
}
.title {
  position: absolute;
  top: 2.28rem;
  left: 0.38rem;
  height: 0.72rem;
}
.main-desc {
  position: absolute;
  top: 3.2rem;
  left: 0.4rem;
  width: 3.8rem;
  height: 1.6rem;
  background: url('./image/share/m-desc-bg.png') no-repeat left/100% 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .main-text {
    margin-top: 0.1rem;
    text-align: left;
    font-size: 0.22rem;
    line-height: 0.33rem;
    letter-spacing: 0.01rem;
    color: #ffffff;
  }
}
.second-desc {
  position: absolute;
  top: 12.23rem;
  left: 0rem;
  width: 7.5rem;
}
.sd-text {
  position: absolute;
  width: 6rem;
  word-break: keep-all;
  font-size: 0.26rem;
  line-height: 0.35rem;
  letter-spacing: 0rem;
  color: #ffffff;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
}
.label-container {
  position: absolute;
  top: 5.2rem;
  left: 0.35rem;
  width: 5rem;
  height: 1.45rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .label {
    padding-left: 0.13rem;
    font-size: 0.3rem;
    line-height: 0.26rem;
    letter-spacing: 0rem;
    color: #ffffff;
    background: url('./image/share/label-bg.png') no-repeat left/contain;
  }
}
.ewm-wrap {
  opacity: 1;
  position: absolute;
  top: 9.1rem;
  left: 0.29rem;
  width: 2.13rem;
  height: 2.79rem;
  background: url('./image/share/ewm-bg-normal.png') no-repeat top center/contain;
  pointer-events: none;
  user-select: none;
  .ewm {
    position: absolute;
    top: 0.18rem;
    left: 0.18rem;
    width: 1.78rem;
    height: 1.78rem;
    background: url('./image/share/narmal-qr.png') no-repeat center/contain;
    overflow: hidden;
  }
}
.tips {
  position: absolute;
  top: 11.3rem;
  left: 0.33rem;
  width: 2.05rem;
  height: 0.54rem;
  text-align: center;
  line-height: 0.54rem;
  font-size: 0.3rem;
  font-weight: bold;
  color: #fff;
  background: url('./image/share/ewm-tips-bg.png') no-repeat center/contain;
}
.ewm-wrap.ewm-show {
  opacity: 1;
}
.btn-to-book {
  z-index: 9;
  position: absolute;
  display: none;
  top: 9.84rem;
  left: 3.16rem;
  width: 4.04rem;
  height: 1.66rem;
  background: url('./image/share/btn-invite.png') no-repeat center/contain;
  user-select: none;
}
@keyframes rotate{
  0%{
    transform: rotate(0);
  }
  100%{
    transform:rotate(360deg);
  }
}
</style>
