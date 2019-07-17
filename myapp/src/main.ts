import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import './assets/css/reset.css'
import './assets/css/common.css'
import '../node_modules/github-markdown-css/github-markdown.css'
import 'iview/dist/styles/iview.css'
import '../node_modules/font-awesome/css/font-awesome.css'
import '../node_modules/simplemde/debug/simplemde.css'

import * as filters from './util/filter'
import iView from 'iview'

Vue.config.productionTip = false;
Vue.use(iView)

Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) //注册过滤器

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");


