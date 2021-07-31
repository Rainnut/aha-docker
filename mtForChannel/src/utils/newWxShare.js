'use strict'
import { getTimestamp, md5Sort } from '@/utils/redPacket/tools'
import { fetchPost } from '@/utils/redPacket/axios'
const shareApi = `//us-api.37.com.cn/oauth/fetch_jsapi_ticket`

export const share = function (setData, authParams) {
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

    var successSF = setData.successSF || function () {} // 分享给朋友：设置成功回调
    var successF = setData.successF || function () {} // 分享给朋友：用户确认分享后执行的回调函数
    var successSP = setData.successSP || function () {} // 分享朋友圈：设置成功回调
    var successP = setData.successP || function () {} // 分享朋友圈：用户确认分享后执行的回调函数

    var wx = window.wx

    window.wx.ready(function () {
      // 设置分享好友
      var setShareFData = {
        title: title,
        desc: desc,
        link: slink,
        imgUrl: purl,
        success: successSF,
        cancel: function () {}
      }
      // 分享给好友;
      var shareFData = {
        title: title,
        desc: desc,
        link: slink,
        imgUrl: purl,
        success: successF,
        cancel: function () {}
      }

      // 设置分享朋友圈
      var setSharePData = {
        title: title,
        desc: desc,
        link: slink,
        imgUrl: purl,
        success: successSP,
        cancel: function () {}
      }
      // 分享朋友圈;
      var sharePData = {
        title: title,
        desc: desc,
        link: slink,
        imgUrl: purl,
        success: successP,
        cancel: function () {}
      }

      // wx.ready后  wx变量全局存在
      wx.updateAppMessageShareData(setShareFData) // 发送好友，新推荐
      wx.updateTimelineShareData(setSharePData) // 朋友圈，新推荐
      wx.onMenuShareAppMessage(shareFData) // 发送好友，即将废弃
      wx.onMenuShareTimeline(sharePData) // 发送朋友圈，即将废弃
    })
  }

  s.onload = s.onreadystatechange = function () {
    authParams.time = getTimestamp()
    authParams.scene = 'gzh'
    authParams.locale = 'zh-cn'
    authParams.sign = md5Sort(authParams, '!/DIzcJLYE)@X7UC~b9Pn]}<eAr?|Wlw')
    fetchPost(shareApi, authParams).then(res => {
      window.wx && window.wx.config({
        debug: false,
        appId: res.data.appId,
        timestamp: res.data.timestamp,
        nonceStr: res.data.nonceStr,
        signature: res.data.signature,
        jsApiList: [
          'checkJsApi',
          'updateAppMessageShareData',
          'updateTimelineShareData',
          'onMenuShareTimeline',
          'onMenuShareAppMessage'
        ]
      })
      _share(setData)
    }).catch(err => {
      console.error(`微信分享（${shareApi}）:${err}`)
      // return ''
    })
  }
}
