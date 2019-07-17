<template>
  <div class="page login">
    <div class="login-item">
      <img src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="" class="login-item-img">
      <div class="login-item-section">
        <input type="text" placeholder="请输入Token" v-model="accesstoken" class="login-item-input"/>
      </div>
      <div class="login-item-button">
        <button class="login-button" @click="isLogin">登录</button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { login } from '../../api/api'
import tool from '../../util/tool'
export default class Login extends Vue {
  private accesstoken: string = ''
  @Action('setUserInfo') setUserInfo
  //用户登录
  async isLogin(){
    if(!this.accesstoken){
      return tool.toast('Token不能为空')
    }
    let { data } = await login(this.accesstoken)
    if(data.success){
      let userInfo = Object.assign({ accesstoken: this.accesstoken }, data)
      this.setUserInfo(userInfo)
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.login{
    overflow: hidden;
    width: 100%;
    height: 100%;
    min-height: calc(100vh);
    /* position: absolute; */
    /* top:0; */
    /* let:0; */
    background: #444;
}
.login-item{
  text-align: center;
}
.login-item-img{
  width:  250px;
  margin-top: 60px;
  margin-bottom:15px;
}
.login-item-section{
  width:  250px;
  margin: 20px auto;
  padding: 5px 10px;
  border-bottom: 1px solid rgba(136, 136, 136, 0.6);
  background: rgba(136, 136, 136, 0.6);
}
.login-item-section .login-item-input{
  width:100%;
  color: #fff;
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0);
}
.login-item-button{
  display:block;
  width:250px;
  margin: 25px auto 10px auto;
}
.login-button{
  width:100%;
  padding:8px;
  font-size: 14px;
  border:1px solid #80bd01;
  background: #80bd01;
  border-radius:3px;
  color:#fff;
}
.error-msg{
  color: red;
}
</style>
