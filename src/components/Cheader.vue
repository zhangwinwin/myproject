<template>
  <div class="header">
    <div class="head-box" :class="{ 'is-fixed': fixed }">
      <header class="head-logo clearfix">
        <div class="head-logo-menu iconfont icon-fenlei1" v-if="icon" @click="showMenuSlide">
          <div class="line l1"></div>
          <div class="line l2"></div>
          <div class="line l3"></div>
          <div class="line l4"></div>
        </div>
        <div class="head-logo-back iconfont icon-fanhui" v-if="!icon" @click="goHistory">
          <div class="line l5"></div>
          <div class="line l6"></div>
          <div class="line l7"></div>
          <div class="line l8"></div>
        </div>
        <img src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" class="logo-img" @click="backToTop">
      </header>
    </div>
    <menu-slide :show="leftNavStatus" @hideMenuSlide="hideMenuSlide"></menu-slide>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MenuSlide from './Menu.vue'
export default {
  props: {
    fixed: Boolean,
    icon: Boolean
  },
  computed: mapState({
    leftNavStatus: state => state.com.leftNavStatus
  }),
  methods: {
    ...mapActions({ setNavState: 'setNavState' }),

    // 显示MenuSlide
    showMenuSlide() {
      this.setNavState(true)
    },
    // 隐藏MenuSlide
    hideMenuSlide() {
       this.setNavState(false)
    },
    // 返回上一页
    goHistory() {
      this.$router.go(-1)
    },
    backToTop(){
      window.scroll(0, 0)
    }
  },
  components: {
    MenuSlide
  }
}

</script>

<style lang="css" scoped>
.is-fixed{
  position: fixed;
}
.head-box{
  width:100%;
  top:0;
  z-index:1;
}
.head-logo{
  height: 43px;
  line-height:43px;
  background: #444;
  text-align:center;
  position: relative;
}
.head-logo .head-logo-icon{
  font-size:28px;
  color: #80bd01;
}


.head-logo .head-logo-menu{
  position: relative;
  top: 5px;
  right: 25px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  text-align: right;
  float: right;
  transform: rotate(180deg);
  transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}

.head-logo .head-logo-menu .line{
  height: 3px;
  width: 100%;
  margin-bottom: 4px;
  background: #ffffff;
  transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}

.head-logo .head-logo-menu .line.l1{
  width: 95%;
}

.head-logo .head-logo-menu .line.l2{
  width: 80%;
}

.head-logo .head-logo-menu .line.l3{
  width: 70%;
}

.head-logo .head-logo-menu .line.l4{
  width: 100%;
}

.head-logo .logo-img{
  position: relative;
  left: 15px;
  width:120px;
  vertical-align: middle;
}
</style>