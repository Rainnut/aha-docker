export default {
  data () {
    return {
      options: [], // 每次调用时的配置
      visible: false // 弹窗是否可见
    }
  },
  computed: {
    opt () {
      return Object.assign({}, this.curOptions)
    },
    curOptions () {
      return this.options[this.options.length - 1]
    }
  },
  methods: {
    // 打开弹窗
    show (options) {
      this.options.push(options)
      this.visible = true
    },
    // 关闭弹窗
    close () {
      this.visible = false
    }
  },
  watch: {
    visible: {
      handler (newV, oldV) {
        if (newV) {
          setTimeout(() => {
            this.visible = false
          }, 1500)
        }
      },
      immediate: true
    }
  }
}
