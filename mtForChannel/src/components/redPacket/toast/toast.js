import Vue from 'vue'
import toast from './index'

const ToastBox = Vue.extend(toast)

let instaceToast

const Toast = (data, parent) => {
  if (!instaceToast) {
    instaceToast = new ToastBox({
      parent,
      data () {
        return {
          data
        }
      }
    })
    instaceToast.vm = instaceToast.$mount()
    document.body.appendChild(instaceToast.vm.$el)
  }
  return instaceToast.vm
}

export default {
  install: (Vue, {data, parent}) => {
    Vue.prototype.$rpToast = Toast(data, parent)
  }
}
