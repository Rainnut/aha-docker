'use strict'
const Vue = require('vue')
const jsonp = Vue.default.jsonp
const shareApi = '//api.m.37.com/zbh5/fenxiang'

export const share = function (setData, shareUrl) {
  const s = document.createElement('script')
  s.type = 'text/javascript'
  s.src = 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js'
  document.body.appendChild(s)
  setData = setData || {}
  var _share = function (setData) {
    var desc = setData.desc || document.title // 分享描述;
    var purl = setData.picUrl || '' // 分享图标;
    var title = setData.title || '' // 分享标题;
    var slink = setData.url || '' // 分享链接;
    var successA = setData.successA || function () {} // 分享给朋友：用户确认分享后执行的回调函数
    var successT = setData.successT || function () {} // 分享朋友圈：用户确认分享后执行的回调函数
    var wx = window.wx

    window.wx.ready(function () {
      // 分享给朋友;
      var shareData = {
        title: title,
        desc: desc,
        link: slink,
        imgUrl: purl,
        success: successA,
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      }
      // 朋友圈;
      var shareData1 = {
        title: title,
        desc: desc,
        link: slink,
        imgUrl: purl,
        success: successT,
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      }
      // wx.ready后  wx变量全局存在
      wx.onMenuShareTimeline(shareData) // 发送好友，即将废弃
      wx.onMenuShareAppMessage(shareData1) // 朋友圈，即将废弃
      wx.updateAppMessageShareData(shareData) // 发送好友，新推荐
      wx.updateTimelineShareData(shareData1) // 朋友圈，新推荐
    })
  }

  jsonp(shareUrl || shareApi, {
    url: location.href
  }).then(res => {
    window.wx && window.wx.config({
      debug: false,
      appId: res.data.appId,
      timestamp: res.data.timestamp,
      nonceStr: res.data.nonceStr,
      signature: res.data.signature,
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'updateAppMessageShareData',
        'updateTimelineShareData'
      ]
    })
    _share(setData)
  }).catch(err => {
    console.error(err)
    // return ''
  })
}
