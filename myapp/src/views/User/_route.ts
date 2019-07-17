export default {
  path: '/user',
  name: 'User',
  component: () => import(/* webpackChunkName: 'user' */ './User.vue')
}