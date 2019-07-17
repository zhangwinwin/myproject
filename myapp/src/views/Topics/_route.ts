export default {
  path: '/topics',
  name: 'Topics',
  component: () => import(/* webpackChunkName: 'topic' */ './Topics.vue')
}
