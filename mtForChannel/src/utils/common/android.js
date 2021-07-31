export default {
  close: function () {
    window.fee['enClose']()
  },
  /* 前往 vivo 游戏中心 */
  toGamecenter: function () {
    window.fee['enJumpVivoGameCenter']()
  },
  enJumpOppoGameCenter: function () {
    window.fee['enJumpOppoGameCenter']()
  },
  /**
   * @method
   * @param {string} msg 弹窗提示信息
   * @desc 弹窗
   */
  alert: function (msg) {
    window.fee['enAlert'](msg)
  }
}
