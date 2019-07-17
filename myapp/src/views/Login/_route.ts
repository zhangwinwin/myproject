export default {
  path: '/login',
  name: 'Login',
  component: () => import(/* webpackChunkName: 'login' */ './login.vue')
}
