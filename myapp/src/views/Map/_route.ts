export default {
  path: '/map',
  name: 'Map',
  component: () => import(/* webpackChunkName: 'Map' */ './Map.vue')
}
