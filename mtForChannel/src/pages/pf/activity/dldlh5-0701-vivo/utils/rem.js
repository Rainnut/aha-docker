function createScaleElement () {
  // 创建1rem宽度的不可见元素
  let scaleDom = document.createElement('div')

  scaleDom.style.cssText =
    'width:1rem;height:0;overflow:hidden;position:absolute;z-index:-2;visibility:hidden;'
  document.body.appendChild(scaleDom)
  return scaleDom
}

let scaleDom = createScaleElement()

function getOriginalHtmlFontSize () {
  let rootDom = document.querySelector('html')
  let fontSize = rootDom.style.fontSize || 16

  return fontSize
}

function toNum (fontSize) {
  if (typeof fontSize === 'string') {
    fontSize = fontSize.replace('px', '')
    return Number(fontSize)
  }

  return fontSize
}

function toScale () {
  let htmlFontSize = getOriginalHtmlFontSize()
  let instanceWidth = scaleDom.offsetWidth
  let scale = 1

  if (window.getComputedStyle) {
    instanceWidth = window.getComputedStyle(scaleDom).width
  }

  htmlFontSize = toNum(htmlFontSize)
  instanceWidth = toNum(instanceWidth)

  if (
    typeof htmlFontSize === 'number' &&
    htmlFontSize !== 0 &&
    (typeof instanceWidth === 'number' && instanceWidth !== 0)
  ) {
    if (Math.abs(htmlFontSize - instanceWidth) < 0.1) {
      // 忽略细微的变化
      return 1
    }

    scale = htmlFontSize / instanceWidth // 计算缩放比例
  }

  return scale
}

// document.addEventListener('DOMContentLoaded', setFont, false)
// window.addEventListener('resize', setFont, false)
// window.addEventListener('load', setFont, false)

module.exports = {
  /**
   * @description 宽度自适应
   * @param {Number} psdWidth
   */
  rePositionHorizon (psdWidth = 750) {
    let scale = toScale()
    let width =
      document.documentElement.clientWidth || document.body.clientWidth
    let ratio = width / psdWidth
    document.getElementsByTagName('html')[0].style.fontSize =
      100 * ratio * scale + 'px'
  },
  /**
   * @description 高度自适应
   * @param {Number} psdHeight
   */
  rePositionVertical (psdHeight = 1334) {
    let height =
      document.documentElement.clientHeight || document.body.clientHeight
    let ratio = height / psdHeight
    document.getElementsByTagName('html')[0].style.fontSize =
      100 * ratio + 'px'
  }
}
