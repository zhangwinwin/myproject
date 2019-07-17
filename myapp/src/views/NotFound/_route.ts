export default {
  path: '/notfound',
  name: 'NotFound',
  component: () => import(/* webpackChunkName: 'notFound' */ './NotFound.vue')
}
