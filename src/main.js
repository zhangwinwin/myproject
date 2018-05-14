// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import './assets/css/reset.css'
import './assets/css/common.css'
import '../node_modules/github-markdown-css/github-markdown.css'
import 'iview/dist/styles/iview.css'
import '../node_modules/font-awesome/css/font-awesome.css'
import '../node_modules/simplemde/debug/simplemde.css'

import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import router from './router'
import * as filters from './util/filter'
import iView from 'iview'

Vue.use(iView)
Vue.config.productionTip = false

Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) //注册过滤器

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  //把store对象提供给“store”选项，这可以把store的实例注入所有的子组件
  store,
  ...App
  // components: { App },
  // template: '<App/>'
})
