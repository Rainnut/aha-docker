<template>
  <section class="toast" :class="{'show': visible}">
    <section class="text multi-line">{{opt.msg}}</section>
  </section>
</template>

<script>
import toastMixins from '@/components/redPacket/mixin/toast'
export default {
  name: 'toast',
  mixins: [toastMixins]
}
</script>

<style lang="less" scoped>
  .toast {
    position: fixed;
    top: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    min-width: 2.56rem;
    padding: 0.1rem 0.2rem;
    background-color: rgb(48, 49, 50);
    color: #fff;
    border-radius: 0.1rem;
    z-index: 1200;
    transition: all .5s;
    display: flex;
    align-items: center;
    opacity: 0;
    font-size: 0.28rem;
    .text {
      width: 100%;
      text-align: center;
      letter-spacing: 1px;
    }
  }
  .show {
    top: 1.98rem;
    opacity: 0.8;
  }
</style>
