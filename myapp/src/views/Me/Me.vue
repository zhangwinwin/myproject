<template>
  <div class="me">
    <div class="auserinfo">
      <img :src="userInfo.avatar_url" v-if="userInfo.avatar_url" alt="" class="auserinfo-avatar">
      <img v-else src="../assets/timg.jpg" alt="" class="auserinfo-avatar">
      <p class="auserinfo-nickname">{{userInfo.loginname}}</p>
    </div>
    <div class="me-item">
      <mt-cell title="我的消息" is-link :to="{ name: 'message' }">
        <i slot="icon" class="iconfont icon-xiaoxi"></i>
      </mt-cell>

      <mt-cell title="发布主题" is-link :to="{ name: 'post' }">
        <i slot="icon" class="iconfont icon-fabu"></i>
      </mt-cell>

      <mt-cell title="关于" is-link :to="{ name: 'about' }">
        <i slot="icon" class="iconfont icon-about2"></i>
      </mt-cell>
    </div>
  </div>
</template>

<script lang='ts'>
import MtCell from '../components/Cell.vue'
import { Vue, Component } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component({
  components: {
    MtCell
  }
})
export default class Me extends Vue {
  @State(state => state.user.userInfo) userInfo
}
</script>

<style lang="scss" scoped>
.me{
  width: 100%;
  height: 100%;
  background: #eee;
  position: absolute;
  top: 0;
  left: 0;
}
.auserinfo{
  margin-top: 43px;
  position: relative;
  width: 100%;
  height: 150px;
  background: #444;
  color: #fff;
  display: flex;
  flex-direction: columns;
  align-items: center;
}
.auserinfo-avatar{
  display: block;
  width: 80px;
  height: 80px;
  margin: 10px;
  margin-top: 25px;
  border-radius: 50%;
}
.auserinfo-nickname{
  color: #fff;
  font-size: 14px;
}
.me-item{
  .iconfont{
    font-size: 22px;
    color: #80db01;
    vertical-align: middle;
  }
}
</style>