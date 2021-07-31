/**
 * @description 接口存储
 */
export const api = {
  // 官网活动相关文档
  websiteActivity: {
    // 推广活动
    promotionActivity: {
      ipFrequency: '//act-api.37.com.cn/Pt/IpFrequency' // IP频率限制
    },
    // 平台抽奖
    platformLottery: {
      activityLottery: '//act.api.37.com.cn/theme/PtLotteryProbability', // 活动抽奖
      getUserLotteryRecord: '//act.api.37.com.cn/theme/PtLotteryLog ' // 活动获取用户中奖记录
    },
    // 登录兑换奖品活动
    loginToExchangePrize: {
      getPrize: '//act.api.37.com.cn/Pt/loginConvertLottery', // 登录兑换奖品
      getParticipation: '//act.api.37.com.cn/Pt/loginConvertCompleted' // 获取参与情况
    },
    // 特权礼包（OPPO/VIVO）
    privilege: {
      GetrecvstateOppo: '//act-api.37.com.cn/privilege/Getrecvstate', // 用户活动领取礼品 oppo使用
      GetAccessOppo: '//act-api.37.com.cn/privilege/GetAccessOppo', // 用户活动获取领取资格 oppo使用
      GetVipLevel: '//act-api.37.com.cn/privilege/getviplevel', // 获取活动用户 VIP 等级
      GetAccessVivo: '//act.api.37.com.cn/privilege/queryreceivepermission', // 查询是否具备领取资格
      GetPrizeVivo: '//act.api.37.com.cn/privilege/notifycptodeliver' // 通知CP 发货
    }
  },
  // 官网用户相关文档
  websiteAccount: {
    // 用户相关
    user: {
      logout: '//u.api.37.com.cn/account/_logout', // 退出登录
      userInfo: '//u.api.37.com.cn/account/_info' // 获取登录状态
    }
  },
  // 新版帐号修复 API - 20190326
  accountFix (type = 1) {
    // 0 为主包，1 为多包
    const domain = (type === 0 ? '//us-api.37.com.cn' : '//us-api.37.com.cn')
    return {
      upload: domain + '/upload/pic', // 上传图片
      apply: domain + '/accountFix/apply', // 帐号申请
      isDevNormal: domain + '/accountFix/isDevNormal', // 判断设备
      isBind: domain + '/accountFix/isBind', // 获取绑定
      getPhoneCode: domain + '/accountFix/getPhoneCode', // 获取手机验证码
      validatePhone: domain + '/accountFix/validatePhone', // 校验手机验证码
      getEmailCode: domain + '/accountFix/getEmailCode', // 获取邮箱验证码
      validateEmail: domain + '/accountFix/validateEmail', // 检验邮箱验证码
      validateQuestion: domain + '/accountFix/validateQuestion', // 检验密保
      resetPasswd: domain + '/accountFix/resetPasswd', // 重置密码
      getResetPhoneCode: domain + '/accountFix/getResetPhoneCode', // 重置密码时获取手机验证码
      getQuestion: domain + '/accountFix/getQuestion', // 获取密保问题
      bindMibao: domain + '/accountFix/bindMibao', // 绑定密保
      getResetEmailCode: domain + '/accountFix/getResetEmailCode', // 获取绑定邮箱码
      bindEmail: domain + '/accountFix/bindEmail', // 绑定邮箱
      isRecharge: domain + '/accountFix/isRecharge', // 验证是否有充值记录
      submitRecharge: domain + '/accountFix/submitRecharge', // 提交充值信息
      getConnPhoneCode: domain + '/accountFix/getConnPhoneCode', // 帐号申诉提交基本信息时获取联系手机验证码
      submitDetailInfo: domain + '/accountFix/submitDetailInfo', // 帐号申诉提交详细信息
      searchServerid: domain + '/accountFix/searchServerid', // 查询申诉结果
      bindPhone: domain + '/accountFix/bindPhone', // 绑定手机
      // 找回帐号
      getVcode: domain + '/accountFind/getVcode', // 用户手机/邮箱获取验证码
      validateVcode: domain + '/accountFind/validateVcode', // 验证密保手机验证码
      getUnameByDev: domain + '/accountFind/getUnameByDev', // 设备号查询账号
      searchOrder: domain + '/accountFind/searchOrder', // 查询商户订单号
      getConnPhoneCode2: domain + '/accountFind/getConnPhoneCode', // 获取联系手机验证码
      submitDetailInfo2: domain + '/accountFind/submitDetailInfo' // 提交详细信息
    }
  }
}
