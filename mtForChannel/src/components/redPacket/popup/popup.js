import Vue from 'vue'
import popup from './index'

const PopupBox = Vue.extend(popup)

let instace

const Popup = (globalOptions = {}, parent) => {
  if (!instace) {
    instace = new PopupBox({
      parent,
      data () {
        return {
          globalOptions
        }
      }
    })
    instace.vm = instace.$mount()
    document.body.appendChild(instace.vm.$el)
  }
  return instace.vm
}

export default {
  install: (Vue, {globalOptions, parent}) => {
    Vue.prototype.$rpPopup = Popup(globalOptions, parent)
  }
}
