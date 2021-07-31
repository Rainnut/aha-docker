import Vue from 'vue'

/**
 * @function device
 * @desc 解析设备
 */
const device = () => {
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
    pc: !(/Android|webOS|iPhone|iPod|BlackBerry|iPad/i.test(u)),
    Safari: u.indexOf('Safari') > -1 && navigator.vendor.indexOf('Apple') > -1,
    weixin: u.indexOf('MicroMessenger') > -1,
    qq: u.match(/\sQQ/i) === ' qq' //
  }
}

/**
 * @function getTimestamp
 * @desc 获取当前时间戳（除以100）
 * @return {int}
 */
const getTimestamp = () => {
  let timestamp = parseInt((new Date().getTime()) / 1000)
  return timestamp
}

// 获得微信openid
const getWXOpenid = (pid, gid) => {
  if (pid) {
    const openid = getCookie(`oauthOpenid_${pid}${gid ? '_' + gid : ''}`)
    return openid
  } else {
    return ''
  }
}
// 判断是否登录
const isLogin = () => {
  let cookieArr = document.cookie.split(';')
  let flag = false
  for (let i = 0; i < cookieArr.length; i++) {
    let itemArr = cookieArr[i].split('=')
    if (itemArr[0].trim() === 'MLOGIN') {
      flag = true
    }
  }
  return flag
}

/**
 * @function getCookie
 * @desc 获取对应cookie
 * @return {string}
 */
const getCookie = (cname) => {
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
}

/**
 * @function setCookie
 * @desc 设置cookie
 */
const setCookie = (cname, cvalue, exdays = 30, path = '/') => {
  var d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + '; ' + expires + `; path=${path};`
}

/* 获取url 链接参数 不进行转义 */
const parseUrlnotDecode = () => {
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
}

// md5 加密
const md5Sort = (params, pkey) => {
  let newparam = []
  let $i = 0
  for (let k in params) {
    newparam[$i] = k
    $i += 1
  }
  newparam = newparam.sort()
  var item = ''
  for (var i = 0; i < newparam.length; i++) {
    item = item + newparam[i] + '=' + params[newparam[i]]
  }
  var sign = (Vue.prototype.$md5(item + pkey)).toLowerCase()
  return sign
}
const md5Sort1 = (params, key, order = [], needKey = false) => {
  let str = ''
  if (order !== []) {
    order.forEach(i => {
      needKey ? str += (i + '=' + params[i]) : str += params[i]
    })
    str += key
  } else {
    let keys = Object.keys(params).sort()
    for (let i = 0; i < keys.length; i++) {
      needKey ? str += (keys[i] + '=' + params[keys[i]]) : str += params[keys[i]]
    }
    str += key
  }
  return (Vue.prototype.$md5(str)).toLowerCase()
}

/**
 * @function dateFormat
 * @return {string} 返回字符串
 * @desc 时间格式
*/
const dateFormat = (date, fmt) => {
  date = new Date(date)
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + ''))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
// dateFormat(data, 'yy-MM-dd hh:mm:ss')

// 深拷贝
const deepCopy = (arr) => {
  let obj = arr instanceof Array ? [] : {}
  for (let i in arr) {
    if (typeof arr[i] === 'object' && arr[i] !== undefined) {
      obj[i] = deepCopy(arr[i])
    } else if (typeof arr[i] === 'object' && arr[i] === undefined) {
      obj[i] = null
    } else {
      obj[i] = arr[i]
    }
  }
  return obj
}

export { device, getWXOpenid, getTimestamp, parseUrlnotDecode, md5Sort, md5Sort1, getCookie, setCookie, dateFormat, isLogin, deepCopy }
