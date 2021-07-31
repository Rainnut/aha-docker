/**
 * @description 斗罗裂变H5
 */
import tools from '@/utils/tools.js'
const Vue = require('vue')
const jsonp = Vue.default.jsonp
const md5 = require('js-md5')
/* 金明 */
// 生成邀请码、获取邀请人数接口密钥：f9a4b25d11b72ae7637f2fa1aa729e66
// 生成短信验证码，预约接口密钥：ARdDsdfSWasdasdf2
// 获取预约人数接口密钥：be76f5eea3ae9bfa5b08ae2527ae571a
const signKey1 = 'f9a4b25d11b72ae7637f2fa1aa729e66'
const signKey2 = 'ARdDsdfSWasdasdf2'
const signKey3 = 'be76f5eea3ae9bfa5b08ae2527ae571a'
// 后端的短信验证码和预约公用一个后端接口
const api = {
  getInviteCode: `//act-api.37nqy.com/invite/generatecode`,
  getInviteNum: `//act-api.37nqy.com/invite/invitenum`,
  getVerifyCode: `//act-api.37nqy.com/reserve/reserveSms`,
  getBookNum: `//act-api.37nqy.com/reserve/GetSubscribeNum`
}

export default {
  // 生成邀请码
  getInviteCode (params) {
    params.time = tools.getTimestamp()
    params.sign = this.md5Sort(params, signKey1)
    return jsonp(api.getInviteCode, params)
      .then(res => {
        return res
      })
      .catch(err => {
        console.log(err)
        return err
      })
  },
  // 获取邀请人数
  getInviteNum (params) {
    params.time = tools.getTimestamp()
    params.sign = this.md5Sort(params, signKey1)
    return jsonp(api.getInviteNum, params)
      .then(res => {
        return res
      })
      .catch(err => {
        console.log(err)
        return err
      })
  },
  // 获取短信验证码
  getVerifyCode (params) {
    params.time = tools.getTimestamp()
    params.sign = this.md5Sort(params, signKey2)
    return jsonp(api.getVerifyCode, params)
      .then(res => {
        return res
      })
      .catch(err => {
        console.log(err)
        return err
      })
  },
  bookGame (params) {
    params.time = tools.getTimestamp()
    params.sign = this.md5Sort(params, signKey2)
    return jsonp(api.getVerifyCode, params)
      .then(res => {
        return res
      })
      .catch(err => {
        console.log(err)
        return err
      })
  },
  getBookNum (params) {
    params.time = tools.getTimestamp()
    params.sign = this.md5Sort(params, signKey3)
    return jsonp(api.getBookNum, params)
      .then(res => {
        return res
      })
      .catch(err => {
        console.log(err)
        return err
      })
  },
  // 签名
  md5Sort (params, key) {
    var str = ''
    var keys = Object.keys(params).sort()
    for (var i = 0; i < keys.length; i++) {
      str += keys[i] + '=' + params[keys[i]]
    }
    str += key
    return md5(str).toLowerCase()
  }
}
