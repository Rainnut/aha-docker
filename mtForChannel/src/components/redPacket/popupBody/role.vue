<template>
  <div class="role">
    <header class="header">
      <section>选择角色</section>
      <img class="close" @click="close" src="@/assets/icon/close.png" alt="">
    </header>
    <section class="con" v-if="hasContent">
      <section class="wrap">
        <section class="item" v-for="(item, index) of roleData" :key="index" @click="handleChoose(index)">
          <section class="selete">
            <img v-if="chooseIndex === index" src="@/assets/icon/sel_ac.png" alt="">
            <img v-else src="@/assets/icon/sel.png" alt="">
          </section>
          <section class="content">
            <section class="content__top">
              <span class="name">{{item.drname}}</span>
              <span class="label" v-if="index === 0" :class="{'hasChoose': hasChoose}">{{hasChoose? '上次' : '最近'}}</span>
              <span class="grade">{{item.drlevel}}级</span>
            </section>
            <section class="content__bottom">
              <span class="area">{{item.dsname}}</span>
            </section>
          </section>
        </section>
      </section>
    </section>
    <section class="otherCon" v-else>
      <section class="wrap" :class="{'wrapMore': otherIndex === 2}">
        <section class="icon"><img :class="{'loading': otherIndex === 0}" :src="otherCon.icon" alt=""></section>
        <section class="text">{{otherCon.text}}</section>
        <section class="bnt" v-if="otherIndex === 2" @click="getRole">重新加载</section>
      </section>
    </section>
    <footer class="foot">
      <section class="switch" @click="switchAc">切换账号</section>
      <section class="btn" @click="ToGetGift">确认</section>
    </footer>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { _roleSolect, _receive } from '@/api/redPacket'
import { setCookie, deepCopy } from '@/utils/redPacket/tools'
const LOADING = require('@/assets/icon/load_G.png')
const FACE = require('@/assets/icon/face.png')
const WIFI = require('@/assets/icon/wifi.png')
export default {
  name: 'role',
  props: {
    propsInfo: {
      type: Object,
      default: function () {
        return {}
      }
    },
    successCallback: {
      type: Function,
      default: function () {}
    },
    switchAccout: {
      type: Function,
      default: function () {}
    },
    emptyRole: {
      type: Function,
      default: function () {}
    }
  },
  data () {
    return {
      chooseIndex: 0,
      hasContent: false,
      roleData: [],
      otherIndex: 0, // 默认加载中
      otherConArr: [
        {
          icon: LOADING,
          text: '加载中...'
        }, {
          icon: FACE,
          text: '没有找到符合条件的角色'
        }, {
          icon: WIFI,
          text: '网络好像开小差啦~'
        }
      ],
      hasChoose: false,
      getGiftBtnTimer: null
    }
  },
  mounted () {
    this.getRole()
  },
  computed: {
    // 其他情况显示
    otherCon () {
      return this.otherConArr[this.otherIndex]
    },
    rolePid () {
      return this.propsInfo.pid ? `${this.propsInfo.pid}` : `1,46`
    }
  },
  methods: {
    // 获取角色列表
    getRole () {
      const params = { gid: this.propsInfo.gid, pid: this.rolePid }
      if (!navigator.onLine) {
        this.hasContent = false
        this.otherIndex = 2
        return
      }
      _roleSolect(params)
        .then(res => {
          if (parseInt(res.state) === 1) {
            if (res.data.length === 0) {
              this.hasContent = false
              this.otherIndex = 1
              // this.emptyRole()
              return
            }
            this.roleData = this.chooseRoleCo(this.getRoleCookie(), deepCopy(res.data))
            this.hasContent = true
          } else {
            this.hasContent = false
            this.otherIndex = 1
            this.$rpToast.show({msg: res.msg})
          }
        })
        .catch(errD => {
          this.hasContent = false
          this.otherIndex = 1
        })
    },
    // 切换账号
    switchAc () {
      this.switchAccout()
    },
    // 选择角色参与领取
    ToGetGift () {
      if (this.roleData.length === 0) {
        this.close()
        return
      }
      const that = this
      clearTimeout(this.getGiftBtnTimer)
      that.getGiftBtnTimer = setTimeout(() => {
        if (that.chooseIndex === 999) {
          that.$rpToast.show({msg: '请选择角色'})
          return
        }

        const type = that.propsInfo.type // 奖励类型：1，红包；2，礼包
        const params = {
          page_id: that.propsInfo.page_id,
          gid: that.propsInfo.officialGid,
          pid: that.propsInfo.officialPid,
          user_gid: that.roleData[that.chooseIndex].gid,
          user_pid: that.roleData[that.chooseIndex].pid,
          drname: that.roleData[that.chooseIndex].drname,
          drid: that.roleData[that.chooseIndex].drid,
          dsid: that.roleData[that.chooseIndex].dsid
        }
        Indicator.open({
          text: '请稍等...',
          spinnerType: 'fading-circle'
        })
        _receive(params, type)
          .then(res => {
            Indicator.close()
            if (parseInt(res.state) === 1 || parseInt(res.state) === 0) {
              if (parseInt(res.state) === 1) {
                setTimeout(() => {
                  window.SDKReport && window.SDKReport.send({ event: type === 1 ? 'wxhb_success_hb' : 'wxhb_success_prize', dev: this.propsInfo.openid })
                }, 0)
              } else {
                // setTimeout(() => {
                //   window.SDKReport && window.SDKReport.send({ event: 'gift_fail' })
                // }, 0)
              }
              if (res.data === 'dialog') {
                that.$rpPopup.show({
                  showHeader: true,
                  title: '提示',
                  content: res.msg,
                  buttons: [
                    {text: '确定'}
                  ],
                  btnClick0: () => {
                    if (parseInt(res.state) === 1) {
                      setCookie(`role|${that.propsInfo.openid}_${that.propsInfo.officialGid}`, that.roleData[that.chooseIndex].drid)
                      that.successCallback()
                    } else {
                      that.$rpPopup.close()
                    }
                  }
                })
              } else {
                that.$rpToast.show({msg: res.msg})
              }
            } else {
              that.$rpToast.show({msg: res.msg})
            }
          }).catch(() => {
            Indicator.close()
          })
      }, 300)
    },
    // 选择角色
    handleChoose (index) {
      this.chooseIndex = index
    },
    // 关闭
    close () {
      this.$rpPopup.close()
    },
    getRoleCookie () {
      if (document.cookie.length > 0) {
        let arr = []
        let cookieArr = document.cookie.split(';')
        for (let i = 0; i < cookieArr.length; i++) {
          let itemArr = cookieArr[i].split('=')
          if (itemArr[0].trim().indexOf('role|') !== -1) {
            arr.push(`${itemArr[0]}|${itemArr[1]}`)
          }
        }
        return arr
      }
      return ''
    },
    chooseRoleCo (cookieArr, roleArr) {
      let arr = []
      let Rindex = -1
      cookieArr.forEach(i => {
        if (i.split('|')[1] === `${this.propsInfo.openid}_${this.propsInfo.officialGid}`) {
          roleArr.forEach((j, index) => {
            if (j.drid === i.split('|')[2]) {
              Rindex = index
            }
          })
        }
      })
      console.log('上次角色：', cookieArr)
      if (Rindex === -1) {
        this.hasChoose = false
        arr = roleArr
      } else {
        this.hasChoose = true
        arr.push(...roleArr.slice(0, Rindex))
        arr.push(...roleArr.slice(Rindex + 1))
        arr.unshift(roleArr[Rindex])
      }
      return arr
    }
  }
}
</script>
<style lang="less">
.mint-indicator-wrapper {
  z-index: 9999;
}
</style>
<style lang="less" scoped>
.role {
  position: relative;
  width: 6.3rem;
  height: 6.42rem;
  border-radius: 0.1rem;
  background-color: #fff;
  .header {
    position: relative;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
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
    margin-left: 0.3rem;
    width: 5.7rem;
    height: 3.51rem;
    // background-color: rosybrown;
    overflow: hidden;
    .wrap {
      width: 6rem;
      height: 100%;
      overflow: scroll;
      .item {
        position: relative;
        width: 5.7rem;
        height: 1.4rem;
        border-bottom: #e5e5e5 1px solid;
        font-size: 0.32rem;
        .selete {
          position: absolute;
          left: 0;
          top: 0;
          width: 0.4rem;
          height: 100%;
          display: inline-block;
          img {
            position: absolute;
            top: 0.3rem;
            left: 0;
            width: 0.4rem;
            object-fit: contain;
          }
        }
        .content {
          position: absolute;
          right: 0;
          top: 0;
          width: 4.9rem;
          height: 100%;
          margin-left: 0.3rem;
          &__top {
            position: absolute;
            width: 100%;
            top: 0.2rem;
            font-size: 0.32rem;
            color: #333;
            .name {
              display: inline-block;
              max-width: 3.1rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              // vertical-align: middle;
            }
            .label {
              display: inline-block;
              width: 0.55rem;
              height: 0.28rem;
              line-height: 0.28rem;
              text-align: center;
              background-color: rgb(204, 204, 204);
              color: #fff;
              font-size: 0.19rem;
              margin-left: 0.12rem;
              vertical-align: text-top;
            }
            .hasChoose {
              background-color: rgb(255, 169, 21);
            }
            .grade {
              display: inline-block;
              position: absolute;
              right: 0;
              top: 0;
              max-width: 1.7rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              vertical-align: middle;
              color: #999;
            }
          }
          &__bottom {
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 0.3rem;
            font-size: 0.24rem;
            color: #999;
          }
        }
      }
    }
  }
  .otherCon {
    position: relative;
    width: 5.7rem;
    height: 3.51rem;
    margin-left: 0.3rem;
    .wrap {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 1.12rem;
      text-align: center;
      font-size: 0.27rem;
      color: #ccc;
      .icon {
        width: 100%;
        text-align: center;
        margin-bottom: 0.3rem;
        .loading {
          animation: whirl 2s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        img {
          width: 0.44rem;
          object-fit: contain;
        }
      }
      .text {
        width: 100%;
        text-align: center;
      }
      .bnt {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
        width: 2.36rem;
        height: 0.58rem;
        border: #ccc 1px solid;
        border-radius: 0.1rem;
        text-align: center;
        line-height: 0.6rem;
      }
      .bnt:active {
        opacity: 0.7;
      }
    }
    .wrapMore {
      height: 2.12rem;
    }
  }
  .foot {
    width: 100%;
    height: 1.91rem;
    text-align: center;
    padding-top: 0.25rem;
    .switch {
      color: #999;
      font-size: 0.28rem;
      margin-bottom: 0.15rem;
    }
    .switch:active {
      opacity: 0.8;
    }
    .btn {
      width: 5.7rem;
      height: 0.8rem;
      border-radius: 0.1rem;
      background-color: #FFA915;
      text-align: center;
      line-height: 0.8rem;
      margin-left: 0.3rem;
      color: #fff;
      font-size: 0.28rem;
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
