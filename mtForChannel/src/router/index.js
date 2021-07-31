import Vue from 'vue'
import Router from 'vue-router'
import VueJsonp from 'vue-jsonp'
Vue.use(Router)
Vue.use(VueJsonp)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: '斗罗大陆',
      component: () =>
        import(/* webpackChunkName: 'dldlh5' */ '@/pages/pf/activity/dldlh5-210601/index'),
      meta: {
        title: '斗罗大陆穿越模拟器'
      }
    },
    {
      path: '/dldlTip',
      name: '斗罗大陆pc',
      component: r =>
        require.ensure(
          [],
          () => r(require('@/pages/pf/activity/dldlh5-210601/indexB')),
          'dldlH5Pc'
        ),
      meta: {
        title: '斗罗大陆穿越模拟器'
      }
    }
  ]
})
