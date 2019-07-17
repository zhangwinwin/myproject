export default {
  path: '/post',
  name: 'Post',
  component: () => import(/* webpackChunkName: 'Post' */ './Post.vue')
}
