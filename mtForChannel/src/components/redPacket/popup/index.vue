<template>
  <section class="popup" v-if="visible">
    <section class="popup__content">
      <header class="popup__content--header" v-if="opt.showHeader">
        <section class="header__title textOverflow">{{opt.title}}</section>
        <section v-if="opt.showClose" class="header__img" @click="close"><img src="@/assets/icon/close.png" alt=""></section>
      </header>
      <section class="popup__content--body" v-if="Body">
        <component v-bind="opt.bodyProps" :is="Body"></component>
      </section>
      <section class="popup__content--body1" v-else>
        <section class="text multi-line">{{opt.content}}</section>
      </section>
      <footer class="popup__content--footer" v-if="opt.buttons && opt.buttons.length > 0">
        <section class="footer__btn">
          <section class="btn" :class="{'noBorder': index === opt.buttons.length - 1, 'oneBtn': opt.buttons.length === 1}" v-for="(item, index) of opt.buttons" :key="index" @click="btnClick(index)">{{item.text}}</section>
        </section>
      </footer>
    </section>
  </section>
</template>

<script>
import popupMixin from '../mixin/popup'
export default {
  name: 'popup',
  mixins: [
    popupMixin
  ]
}
</script>

<style scoped lang="less">
.popup {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 7.5rem;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 6.3rem;
    height: auto;
    background-color: #fff;
    border-radius: 0.2rem;
    &--header{
      background: white;
      position: relative;
      padding: 0.45rem 0 0 0;
      border-top-left-radius: 0.2rem;
      border-top-right-radius: 0.2rem;
      .header__title {
        margin-left: 5%;
        width: 90%;
        color: #333;
        font-family: PingFang SC;
        font-size: 0.32rem;
        text-align: center;
        font-weight: bold;
      }
      .header__img {
        position: absolute;
        top: -0.3rem;
        right: 0.15rem;
        img {
          width: 0.25rem;
        }
      }
    }
    &--body1 {
      position: relative;
      width: 6.3rem;
      height: 1.93rem;
      background-color: #fff;
      border-top-left-radius: 0.2rem;
      border-top-right-radius: 0.2rem;
      font-family: PingFang SC;
      font-size: 0.32rem;
      font-weight: 400;
      color: #666666;
      // border-top: #eee 1px solid;
      border-bottom: #eee 1px solid;
      .text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        text-align: center;
      }
    }
    &--footer {
      position: relative;
      width: 100%;
      height: 0.79rem;
      background-color: #fff;
      font-family: PingFang SC;
      font-size: 0.32rem;
      border-bottom-left-radius: 0.2rem;
      border-bottom-right-radius: 0.2rem;
      .footer__btn {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(0, -50%);
        width: 100%;
        height: 0.45rem;
        .btn {
          width: 49.5%;
          height: 0.45rem;
          border-right: #eee 1px solid;
          display: inline-block;
          text-align: center;
          line-height: 0.32rem;
          color: #666;
        }
        .btn:active {
          opacity: 0.7;
        }
        .noBorder {
          border: none !important;
          color: #FF7700;
        }
        .oneBtn {
          width: 100%;
        }
      }
    }
  }
}
</style>
