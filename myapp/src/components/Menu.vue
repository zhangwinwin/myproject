<template>
  <div class="meun">
    <div class="slide" :class="{'showMeun' : show}">
      <div class="mheader-logo clearfix">
        <img src="../assets/timg.jpg">
        <h2>Cnode社区</h2>
      </div>
      <div class="mnav-box clearfix">
        <ul>
          <li>
            <router-link to="/" exact>
              <i class="iconfont icon-shouye"></i>
              <span>首页</span> 
            </router-link>
          </li>
          <li>
            <router-link to="/post">
              <i class="iconfont icon-fabu"></i>
              <span>发布</span> 
            </router-link>
          </li>
          <li>
            <router-link to="/me">
              <i class="iconfont icon-wode1"></i>
              <span>个人</span> 
            </router-link>
          </li>
          <li>
            <router-link to="/map">
              <i class="iconfont icon-about2"></i>
              <span>地图</span> 
            </router-link>
          </li>
          <li>
            <router-link to="/about">
              <i class="iconfont icon-about2"></i>
              <span>关于</span> 
            </router-link>
          </li>
          <li v-if="!loginStatus">
            <router-link to="/login">
              <i class="iconfont icon-rightArrow"></i>
              <span>登录</span> 
            </router-link>
          </li>
          <li v-if="loginStatus" @click="singOut">
            <a>
              <i class="iconfont icon-rightArrow"></i>
              <span>退出</span> 
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="mask" v-show="show" @click="hideMenu"></div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
export default class Menu extends Vue {
  @Prop() private show!: boolean
  @State(state => state.user.loginStatus) loginStatus
  @Action('setSignOut') setSignOut
  hideMenu () {
    this.$emit('hideMenuSlide')
  }
  signOut () {
    this.$emit('hideMenuSlide')
    this.setSignOut()
    this.$router.push({ name: 'home '})
  }
}
</script>

<style lang="scss" scoped>
.app-active{
  position: relative;
  background:#666;
    
  &:before {
    content: "";
    border-left: 4px solid #80bd01;
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
  }
} 
.slide{
  position: fixed;
  top:0;
  left:-200px;
  z-index:100;
  width: 200px;
  height: 100%;
  transition: all .25s ease;
  will-change: transform;
  background:#444;
  color:#fff;
  .mheader-logo{
    width:100%;
    height:auto;
    margin-top:30px;
    background: #444;
    text-align: center;
    img{
      width: 80px;
      height: 80px;
      margin: 5px auto;
      border-radius: 50%;
      border: 1px solid #fff;
      background: #fff;
    }
  }
  .mnav-box{
    ul{
      overflow:hidden;
      margin-top:20px;
      li{  
        a{
          display:block;
          font-size: 15px;
          padding:12px 10px;
          padding-left: 40px;
        }
        i{
          font-size:18px;
          margin-right:5px;
        }
      }
    }
  }
}
.mask {
  position: fixed;
  top: 0;
  left:0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
.showMeun {
  transform: translateX(200px);
}
</style>
