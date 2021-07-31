<template>
  <div class="login">
    <header class="header">
      <section>登录</section>
      <img class="close" @click="close" src="@/assets/icon/close.png" alt="">
    </header>
    <section class="con">
      <section class="uname item">
        <section class="wrap overflowHide">
          <img class="leftIcon" src="@/assets/icon/user.png" alt="">
          <input type="text" v-model="inputData.uname" placeholder="账号">
          <img class="rightIcon" @click="clear('uname')" :class="{'showIcon': inputData.uname !== ''}" src="@/assets/icon/close_G.png" alt="">
        </section>
      </section>
      <section class="psw item">
        <section class="wrap overflowHide">
          <img class="leftIcon" src="@/assets/icon/psw.png" alt="">
          <input :type="hidePSW? `password` : `text`" v-model="inputData.pwd" placeholder="密码">
          <span class="rightIcon" :class="{'showIcon': inputData.pwd !== ''}" @click="showPSW">
            <img v-if="hidePSW" src="@/assets/icon/eye.png" alt="">
            <img v-else src="@/assets/icon/eye_ac.png" alt="">
          </span>
        </section>
      </section>
      <section class="code item">
        <section class="wrap">
          <input class="codeInput" type="text" v-model="inputData.scode" placeholder="验证码">
          <img class="codeImg" :src="codeImg" alt="" @click="changeCode">
        </section>
      </section>
      <section class="error" v-if="errorShow">{{errorMsg}}</section>
    </section>
    <footer class="foot">
      <section class="btn" :class="{'loadingBtn': loading}" @click="ToLogin">
        <span class="btn__load"><img v-if="loading" src="@/assets/icon/load_W.png" alt=""></span>
        <span>登录</span>
      </section>
    </footer>
  </div>
</template>

<script>
import { _login } from '@/api/redPacket'
import { getTimestamp, setCookie } from '@/utils/redPacket/tools'
export default {
  name: 'login',
  props: {
    successCallback: {
      type: Function,
      default: () => {}
    },
    closeCallback: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      inputData: {
        uname: '',
        pwd: '',
        scode: ''
      },
      hidePSW: true,
      loading: false,
      errorShow: false,
      errorMsg: '',
      loginClickTimer: null,

      codeAddress: '/vcode/_vcode',
      t: getTimestamp()
    }
  },
  computed: {
    // 图片验证码
    codeImg () {
      return `//u-api.${window.location.hostname}${this.codeAddress}?t=${this.t}`
    }
  },
  methods: {
    ToLogin () {
      clearTimeout(this.loginClickTimer)
      this.loginClickTimer = setTimeout(() => {
        if (this.inputData.uname === '' || this.inputData.pwd === '' || this.inputData.scode === '') {
          this.errorMsg = '请填写完整'
          this.errorShow = true
          return
        }
        if (!navigator.onLine) {
          this.$rpToast.show({msg: '网络连接失败'})
          return
        }
        this.loading = true
        const params = this.inputData
        _login(params)
          .then(res => {
            if (parseInt(res.state) === 1) {
              this.clearRoleCookie()
              this.successCallback()
              this.loading = false
              this.errorShow = false
            } else {
              this.changeCode()
              this.errorMsg = res.msg
              this.errorShow = true
              this.loading = false
            }
          })
          .catch(errD => {
            this.changeCode()
            this.$rpToast.show({msg: errD})
            this.loading = false
          })
      }, 300)
    },
    changeCode () {
      this.t = getTimestamp()
    },
    clear (data) {
      this.inputData[data] = ''
    },
    showPSW () {
      this.hidePSW = !this.hidePSW
    },
    close () {
      this.closeCallback()
      // this.$rpPopup.close()
    },
    getRoleCookie () {
      let arr = []
      if (document.cookie.length > 0) {
        let cookieArr = document.cookie.split(';')
        for (let i = 0; i < cookieArr.length; i++) {
          let itemArr = cookieArr[i].split('=')
          if (itemArr[0].trim().indexOf('role|') !== -1) {
            arr.push(itemArr[0].trim())
          }
        }
      }
      return arr
    },
    clearRoleCookie () {
      let arr = this.getRoleCookie()
      if (arr.length === 0) return
      arr.forEach(i => {
        setCookie(i, '', -1)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 6.3rem;
  height: 6.66rem;
  border-radius: 0.1rem;
  background: #fff;
  .header {
    position: relative;
    width: 100%;
    height: 0.78rem;
    text-align: center;
    line-height: 1rem;
    color: #333;
    background: white;
    font-size: 0.36rem;
    font-weight: bold;
    letter-spacing: 1px;
    .close {
      position: absolute;
      top: 0.3rem;
      right: 0.3rem;
      width: 0.4rem;
      object-fit: contain;
    }
    .close:active {
      opacity: 0.8;
    }
  }
  .con {
    width: 100%;
    height: 4.5rem;
    .item {
      position: relative;
      width: 5.7rem;
      height: 1.35rem;
      border-bottom: #e5e5e5 1px solid;
      margin-left: 0.3rem;
      color: #ccc;
      font-size: 0.32rem;
      .wrap {
        position: absolute;
        left: 0;
        bottom: 0.23rem;
        width: 100%;
        height: 0.45rem;
        input {
          margin-left: 0.5rem;
          width: 4rem;
          outline: 0;
          border: none;
          font-size: 0.32rem;
          color: #333;
        }
        .codeInput {
          width: 2.85rem;
          height: 100%;
          margin-left: 0;
          margin-right: 0.3rem;
        }
        .leftIcon {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translate(0, -50%);
        }
        .rightIcon {
          position: absolute;
          top: 200%;
          right: 0.3rem;
          transform: translate(0, -50%);
          transition: all 1s;
        }
        .showIcon {
          top: 50%;
        }
        .rightIcon:active {
          opacity: .7;
        }
        img {
          width: 0.32rem;
          object-fit: contain;
        }
        .codeImg {
          position: absolute;
          bottom: -0.23rem;
          right: 0.3rem;
          width: 2.25rem;
          height: 1.06rem;
          img {
            width: 100% !important;
            height: 100% !important;
          }
        }
      }
      .overflowHide {
        overflow: hidden;
      }
    }
    .error {
      width: 100%;
      text-align: center;
      font-size: 0.28rem;
      color: #ED4858;
      margin-top: 0.15rem;
    }
  }
  .foot {
    position: relative;
    width: 100%;
    height: 1.46rem;
    // background-color: brown;
    .btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 5.7rem;
      height: 0.8rem;
      border-radius: 0.1rem;
      background-color: #FFA915;
      text-align: center;
      line-height: 0.8rem;
      color: #fff;
      font-size: 0.28rem;
      &__load {
        position: absolute;
        top: 50%;
        left: 1.93rem;
        transform: translate(0, -50%);
        width: 0.44rem;
        height: 0.44rem;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          animation: whirl 2s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
      }
    }
    .loadingBtn {
      background-color: rgb(221, 221, 221);
    }
    .btn:active {
      opacity: 0.8;
    }
  }
}
@keyframes whirl
{
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}
</style>
