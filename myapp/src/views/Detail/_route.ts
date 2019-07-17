export default {
  path: '/detail/:id',
  name: 'detail',
  component: () => import(/* wepackChunkName: 'detail */ './Detail.vue')
}
