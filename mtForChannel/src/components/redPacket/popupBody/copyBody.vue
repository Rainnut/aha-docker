<template>
  <section class="copy">
    <section class="title">提示</section>
    <section class="con">请关注微信公众号“<span class="gzhName">{{gzhName}}</span>”后领取礼包</section>
    <section class="copy-text"
      v-clipboard:copy="gzhName"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError">复制公众号</section>
  </section>
</template>

<script>
export default {
  name: 'copyBody',
  props: {
    gzhName: {
      type: String,
      required: true
    },
    successCallback: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    con () {
      return `请关注微信公众号"<span class="gzhName">${this.gzhName}</span>"后领取礼包`
    }
  },
  methods: {
    onCopy () {
      console.log('clipboard:success')
      this.$rpToast.show({msg: '复制成功'})
      this.successCallback()
    },
    onError () {
      console.log('clipboard:onError')
      this.$rpToast.show({msg: '该浏览器不支持自动复制,请长按礼包码复制'})
    }
  }
}
</script>

<style lang="less" scoped>
  .copy {
    width: 6rem;
    height: 3.2rem;
    border-radius: .1rem;
    background-color: #fff;
    color: #333;
    font-size: 0.32rem;
    .title {
      width: 100%;
      padding: 0.3rem 0 0.15rem 0;
      text-align: center;
      font-weight: bold;
      font-size: 0.36rem;
      color: #333;
    }
    .con {
      width: 90%;
      margin-left: 5%;
      margin-top: 0.2rem;
      text-align: center;
      height: 1.2rem;
      line-height: .5rem;
      .gzhName {
        color: #FF7700;
      }
    }
    .copy-text {
      width: 100%;
      height: .89rem;
      border-top: #eee 1px solid;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.32rem;
      color: #FF7700;
    }
    .copy-text:active {
      opacity: .7;
    }
  }
</style>
