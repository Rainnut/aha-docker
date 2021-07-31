// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import layer from 'vue-layer'
import VueJsonp from 'vue-jsonp'
import md5 from 'js-md5'
import FastClick from 'fastclick'
// import VConsole from 'vconsole'
// // eslint-disable-next-line no-new
// new VConsole()
FastClick.attach(document.body)
FastClick.prototype.focus = function (targetElement) {
  var length
  if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length
    targetElement.focus()
    targetElement.setSelectionRange(length, length)
  } else {
    targetElement.focus()
  }
}
Vue.prototype.$layer = layer(Vue)
Vue.prototype.$md5 = md5
Vue.config.productionTip = false
Vue.use(VueJsonp)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
