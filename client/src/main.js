// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/components/_globals.js'
Vue.use(ElementUI, { size: 'small' })
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面meta */
  if (to.meta.content) {
    let head = document.getElementsByTagName('head')
    let meta = document.createElement('meta')
    meta.content = to.meta.content
    head[0].appendChild(meta)
  }
  console.log(to)
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    var str = ''
    for (let i = 0; i < to.matched.length; i++) {
      const item = to.matched[i]
      str += item.meta.title + '-'
    }
    var len = str.length
    document.title = str.slice(0, len - 1)
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
