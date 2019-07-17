import Vue from "vue";
import Router, { RouteConfig } from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

let isDev = process.env.NODE_ENV = 'development'
let routes: Array<RouteConfig> = []
let match: RouteConfig
interface IRouteConfig extends RouteConfig {
  private: boolean
}

//@ts-ignore
let registerRouter = require.context('./views', true, /_router\.ts$/i)
registerRouter.keys().forEach((fileName: string) => {
  let file: IRouteConfig = registerRouter(fileName).default
  // 如果是开发环境不就打包本地路由
  if (file.private && !isDev) {
    return false
  }
  if (file.path === '*') {
    match = file
    return false
  }
  routes.push (file)
})
// 如果是通配 确保在最后
match! && routes.push(match!)

// export default new Router({
//   routes
// })
const router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  let { auth = false } = to.meta
  // true用户已登录， false用户未登录
  let isLogin = Boolean(localStorage.getItem('loginStatus'))
  if (auth && !isLogin && to.path !== './login') {
    return next({path: './login'})
  }
})
export default router
// export default new Router({
//   routes: [
//     {
//       path: "/",
//       name: "home",
//       component: Home
//     },
//     {
//       path: "/about",
//       name: "about",
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () =>
//         import(/* webpackChunkName: "about" */ "./views/About.vue")
//     }
//   ]
// });
