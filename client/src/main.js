// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

import '@/components/_globals.js'

import { getCookie } from '@/plugins/util'

Vue.use(ElementUI, { size: 'mini' })
Vue.use(iView)

Vue.config.productionTip = false

iView.LoadingBar.config({
  color: '#17bd82'
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面meta */
  if (to.meta.content) {
    let head = document.getElementsByTagName('head')
    let meta = document.createElement('meta')
    meta.content = to.meta.content
    head[0].appendChild(meta)
  }
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    let str = ''
    let len = to.matched.length
    if (len > 1) {
      str = to.matched[0].meta.title + '-' + to.matched[1].meta.title
    } else {
      str = to.matched[0].meta.title
    }
    document.title = str
  }
  if (to.meta.requireAuth) {
    if (getCookie('token')) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
