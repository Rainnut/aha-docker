import Vue from 'vue'
export default {
  /**
   * @function parseUrl
   * @return {Object} 返回对象
   * @desc 解析 url 所带的参数
   */
  parseUrl () {
    let args = {}
    let str = location.search.substring(1)
    let pairs = str.split('&')
    for (let i = 0; i < pairs.length; i++) {
      var pos = pairs[i].indexOf('=')
      if (pos === -1) {
        continue
      }
      let name = pairs[i].substring(0, pos)
      let val = pairs[i].substring(pos + 1)
      val = decodeURIComponent(val)
      args[name] = val
    }
    return args
  },
  /**
   * @function getUrlparam
   * @param {string} id 为字符串，需要获取的的url的参数的键名
   * @return {String} 返回 键名为 id 的 的 url 的参数值
   * @desc 输入url 的参数名，获取对应参数名的参数值
   */
  getUrlparam (id) {
    return decodeURIComponent(this.parseUrl()[id] || '')
  },
  /**
   * @function device
   * @desc 解析设备
   */
  device () {
    var u = navigator.userAgent
    return {
      trident: u.indexOf('Trident') > -1,
      presto: u.indexOf('Presto') > -1,
      webKit: u.indexOf('AppleWebKit') > -1,
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
      iPhone: u.indexOf('iPhone') > -1,
      iPad: u.indexOf('iPad') > -1, //
      webApp: u.indexOf('Safari') === -1,
      pc: !/Android|webOS|iPhone|iPod|BlackBerry|iPad/i.test(u),
      Safari:
        u.indexOf('Safari') > -1 && navigator.vendor.indexOf('Apple') > -1,
      weixin: u.indexOf('MicroMessenger') > -1,
      qq: u.match(/\sQQ/i) === ' qq' //
    }
  },
  /**
   * @function system
   * @desc 返回安卓/iOS设备
   * @return {String} 'ios'/'android'
   */
  systemType () {
    let devicetype = this.device()
    if (devicetype.android === true) {
      return 'android'
    }
    if (devicetype.ios === true) {
      return 'ios'
    }
  },
  /**
   * @function isWeixin
   * @desc 判断是否为微信浏览器
   * @return {Boolean}
   */
  isWeixin () {
    let devicetype = this.device()
    if (devicetype.weixin) {
      return true
    } else {
      return false
    }
  },
  /**
   * @function getCookie
   * @desc 获取对应cookie
   * @return {string}
   */
  getCookie (cname) {
    var cstart = ''
    var cend = ''
    if (document.cookie.length > 0) {
      cstart = document.cookie.indexOf(cname + '=')
      if (cstart !== -1) {
        cstart = cstart + cname.length + 1
        cend = document.cookie.indexOf(';', cstart)
        if (cend === -1) cend = document.cookie.length
        return unescape(document.cookie.substring(cstart, cend))
      }
    }
    return ''
  },
  /**
   * @function setCookie
   * @desc 设置cookie
   */
  setCookie (cname, cvalue, exdays = 30) {
    var d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    var expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + '; ' + expires
  },
  /**
   * @function getTimestamp
   * @desc 获取当前时间戳（除以100）
   * @return {int}
   */
  getTimestamp () {
    let timestamp = parseInt(new Date().getTime() / 100)
    return timestamp
  },
  /**
   * @function checkPhone
   * @param {string} str 为字符串，需要校验的手机号码
   * @desc 校验手机号码
   * @return {boolean}
   */
  checkPhone: function (str) {
    var exp = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/
    return exp.test(str)
  },

  /* 获取url 链接参数 不进行转义 */
  parseUrlnotDecode () {
    let args = {}
    let str = location.search.substring(1)
    let pairs = str.split('&')
    for (let i = 0; i < pairs.length; i++) {
      var pos = pairs[i].indexOf('=')
      if (pos === -1) {
        continue
      }
      let name = pairs[i].substring(0, pos)
      let val = pairs[i].substring(pos + 1)
      args[name] = val
    }
    return args
  },
  // md5 加密
  md5Sort (params, key) {
    let newparam = []
    let $i = 0
    for (let key in params) {
      newparam[$i] = key
      $i += 1
    }
    newparam = newparam.sort()
    var item = ''
    for (var i = 0; i < newparam.length; i++) {
      item = item + newparam[i] + '=' + params[newparam[i]]
    }
    var sign = Vue.prototype.$md5(item + key).toLowerCase()
    return sign
  },
  /**
   * SDK 关闭页面
   */
  closeWebview () {
    if (this.device().ios) {
      const msg = ''
      window.location.href = 'helpClose://0?msg=' + msg
    } else if (this.device().android && window.fee) {
      window.fee['enClose']()
    }
  },

  /**
   * SDK 分享微信、朋友圈
   *  type: 分享类型。（1：图片，2：H5）
   *  way: 允许分享方式。（wechat：微信，moments：朋友圈，qq：QQ）
   *  title: 标题
   *  desc: 副标题
   *  landingPageUrl: 落地页地址
   *  img: 图片链接
   */
  sdkShare (ops) {
    if (this.device().ios) {
      let arr = []
      for (let i in ops) {
        if (ops.hasOwnProperty(i)) {
          arr.push(`${i}=${ops[i]}`)
        }
      }
      // alert('ios分享：' + `share://?${arr.join('&')}`)
      window.location.href = `share://?${arr.join('&')}`
    } else if (this.device().android && window.fee) {
      // alert('安卓分享：' + JSON.stringify(ops))
      window.fee['share'](JSON.stringify(ops))
    }
  },
  /**
   * h5调起指定app
   */
  openApp (ops, downOps) {
    const diffTime = 1000
    const delay = 2000
    let prevDate = new Date().getTime()
    let download = ''
    let jumpDirectly = false // 是否尝试直接跳转下载
    if (this.device().ios) {
      download = downOps.ios
      // downOps.ios的链接为universal link的话，发起的是https跳转链接，由它跳转的页面去做重定向到落地页
      // 不会触发触发后续setTimeout的是否跳转成功兼容流程
      // alert('ios唤醒：' + ops.ios)
      window.location.href = ops.ios
    } else if (this.device().android) {
      download = downOps.android
      // alert('安卓唤醒：' + 'sq://' + ops.android)
      window.location.href = 'sq://' + ops.android
    }
    jumpDirectly = !!download
    setTimeout(() => {
      let curDate = new Date().getTime()
      if (curDate - prevDate < delay) {
        window.location.href = jumpDirectly ? download : downOps.ldy
        if (!jumpDirectly) return
        setTimeout(() => {
          let ldyDate = new Date().getTime()
          if (ldyDate - curDate < delay) {
            window.location.href = downOps.ldy
          }
        }, diffTime)
      }
    }, diffTime)
  },
  // 获得微信openid
  getWXOpenid (pid, gid) {
    if (pid) {
      const openid = this.getCookie(
        `oauthOpenid_${pid}${gid ? '_' + gid : ''}`
      )
      return openid
    } else {
      return ''
    }
  },
  // 判断是否登录
  isLogin () {
    let cookieArr = document.cookie.split(';')
    let flag = false
    for (let i = 0; i < cookieArr.length; i++) {
      let itemArr = cookieArr[i].split('=')
      if (itemArr[0].trim() === 'MLOGIN') {
        flag = true
      }
    }
    return flag
  },
  // 深拷贝
  deepCopy (arr) {
    let obj = arr instanceof Array ? [] : {}
    for (let i in arr) {
      if (typeof arr[i] === 'object' && arr[i] !== undefined) {
        obj[i] = this.deepCopy(arr[i])
      } else if (typeof arr[i] === 'object' && arr[i] === undefined) {
        obj[i] = null
      } else {
        obj[i] = arr[i]
      }
    }
    return obj
  }
}
