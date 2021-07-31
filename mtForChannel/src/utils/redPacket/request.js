import Vue from 'vue'

const jsonp = (url, params = {}, timeout = 10000) => {
  return Vue.jsonp(url, params, timeout)
    .then(res => {
      return res
    })
    .catch(errD => {
      console.log(errD)
      throw new Error(errD) // 异常抛出错误
    })
}

export { jsonp }
