export default {
  path: '/me',
  name: 'Me',
  component: () => import(/* webpackChunkName: 'me.vue */ './Me.vue'),
  meta: { auth: true }
}
