module.exports = {
  /**
   * @description 宽度自适应
   * @param {Number} psdWidth
   */
  rePositionHorizon (psdWidth = 750) {
    let width = document.documentElement.clientWidth || document.body.clientWidth
    let ratio = width / psdWidth
    document.getElementsByTagName('html')[0].style.fontSize = 100 * ratio + 'px'
  },
  /**
   * @description 高度自适应
   * @param {Number} psdHeight
   */
  rePositionVertical (psdHeight = 1334) {
    let height = document.documentElement.clientHeight || document.body.clientHeight
    let ratio = height / psdHeight
    document.getElementsByTagName('html')[0].style.fontSize = 100 * ratio + 'px'
  }
}
