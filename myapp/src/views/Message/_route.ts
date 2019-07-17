export default {
  path: '/message',
  name: 'Message',
  component: () => import(/* webpackChunkName: 'message */ './Message.vue'),
  meta: { auth: true }
}
