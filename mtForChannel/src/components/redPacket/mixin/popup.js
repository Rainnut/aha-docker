export default {
  data () {
    return {
      options: [], // 每次调用时的配置，可覆盖全局配置
      globalOptions: {}, // 全局配置
      visible: false, // 弹窗是否可见
      bodyProps: {}
    }
  },
  computed: {
    Body () {
      return this.opt.Body
    },
    opt () {
      return Object.assign({}, this.globalOptions, this.curOptions)
    },
    curOptions () {
      return this.options[this.options.length - 1]
    }
  },
  watch: {
    visible (val) {
      // 关闭后初始化各种配置参数
      if (!val) {
        this.options = []
        this.keepAliveNames = []
        document.body.style.height = 'auto'
        document.body.style.touchAction = 'auto'
      } else {
        document.body.style.height = '100vh'
        document.body.style.touchAction = 'none'
      }
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
    },
    // 底部按钮事件
    btnClick (index) {
      this.opt[`btnClick${index}`] ? this.opt[`btnClick${index}`]() : this.close()
    }
  }
}
