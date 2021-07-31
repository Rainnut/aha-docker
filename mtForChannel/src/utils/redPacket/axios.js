import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 5000 // 响应时间
axios.defaults.baseURL = '' // 配置接口地址

axios.interceptors.request.use((config) => { // 在发送请求之前做某件事
  if (config.method === 'post') {
    if (config.url.indexOf('Accountra/_upload') === -1) {
      config.data = qs.stringify(config.data)
    }
  }
  return config
}, (error) => {
  console.log('错误的传参')
  return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  // 对响应数据做些事
  if (!res.data.success) {
    return Promise.resolve(res)
  }
  return res
}, (error) => {
  console.log('网络异常')
  return Promise.reject(error)
})

// 返回一个Promise(发送post请求)
export function fetchPost (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.defaults.withCredentials = true
    if (url.indexOf('Accountra/_upload') === -1) {
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    } else {
      axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
    }
    axios.post(url, params)
      .then(res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        throw new Error(error)
      })
  })
}
// 返回一个Promise(发送get请求)
export function fetchGet (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params})
      .then(res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        throw new Error(error)
      })
  })
}

export default { fetchPost, fetchGet }
