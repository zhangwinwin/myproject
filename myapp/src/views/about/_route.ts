export default {
  path: '/about',
  name: 'about',
  component: () => import(/* webpackChunkName: 'about */ './about.vue')
}
