<template>
  <div class="user">
    <div class="auserinfo">
      <img :src="user.avatar_url" alt="" class="auserinfo-avatar">
      <p class="auserinfo-nickname">{{user.loginname}}</p>
      <div class="auserinfo-cell">
        <p class="time">注册时间: {{user.create_at | formatDate}}</p>
        <p class="score">积分：{{user.score}}</p>
      </div>
    </div>

    <ul class="tab-nav">
      <li :class="{on: tabIndex == 0}" @click="tabIndex = 0">回复</li>
      <li :class="{on: tabIndex == 1}" @click="tabIndex = 1">主题</li>
    </ul>
    <div class="auser-artlist" v-show="tabIndex == 0">
      <div class="artitem" v-for="(item, index) in user.recent_replies" :key="index">
        <div class="ai-userimg">
          <router-link :to="{name: 'user',params:{loginname:item.author.loginname}}">
            <img :src="item.author.avavtar_url" alt="">
          </router-link>
        </div>
        <div class="ai-message">
          <router-link :to="{name: 'detail', parems:{if:item.id}}">
            <p class="ai-mcell">
              <span>{{item.author.loginname}}</span>
              <span>{{item.last_reply_at | formatDate}}</span>
            </p>
            <p class="ai-title nowrap-flex">
              {{item.title}}
            </p>
          </router-link>
        </div>
      </div>
    </div>
    <div class="auser-atrlist" v-show="tabIndex == 1">
      <div class="atritem" v-for="(item,index) in user.recent_topics" :key="index">
        <div class="ai-userimg">
          <router-link :to="{name:'user',prams:{loginname:item.author.loginname}}">
            <img :src="item.author.avatar_url" alt="">
          </router-link>
        </div>
        <div class="ai-message">
          <router-link :to="{name:'detail',parmas:{id:item.id}}">
            <p class="ai-mecll">
              <span>{{item.author.loginname}}</span>
              <span>{{item.lat_reply_at | formatDate}}</span>
            </p>
            <p class="ai-title nowrap-flex">
              {{item.title}}
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

export default class User extends Vue {
  private tabIndex: Number = 0
  get user () {
    return this.$store.getters.getUserData
  }
  set user (val) {
  }
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.user = {}
      vm.userData(vm)
    })
  }
  userData(el) {
    let name = el.$route.params.loginname
    el.$store.dispatch('getUserData', name)
  }
}
</script>

<style scoped>
.user{
  height: 100%;
  margin-top:43px;
}
.top-box{
  position:static;
}
.auserinfo{
  position: relative;
  width: 100%;
  height: 150px;
  background: #444;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.auserinfo-avatar {
  display: block;
  width: 80px;
  height: 80px;
  margin: 10px;
  margin-top: 10px;
  border-radius: 50%;
  background: #fff;
}
.auserinfo-nickname {
  color: #fff;
  font-size: 14px;
}
.auserinfo-cell{
   width: 100%;
   overflow: hidden;
}
.auserinfo-cell >p{
  float:left;
  width:50%;
  padding: 5px 15px;
  color: #f5f5f5;
  font-size: 13px;
}
.auserinfo-cell >.score{
  text-align:right;
}
.auser-artlist{
  overflow:hidden;
}
.auser-artlist .artitem{
   display:flex;
   -webkit-box-align: center;
  align-items: center;
  padding: 5px 10px;
  border-bottom: 1px solid #eee;
}
.artitem .ai-userimg{
   width:45px;
   height:45px;
}
.artitem .ai-userimg img{
  width:35px;
  margin:5px auto;
  border-radius:50%;
  background:#fff;
}
.artitem .ai-userimg a{
  display:block;
}
.artitem .ai-message{
   flex:1;
   margin-left:5px;
}
.artitem .ai-message .ai-mcell span{
   display:inline-block;
   width:50%;
   font-size:12px;
   color:#666;
}
.artitem .ai-message .ai-mcell span:nth-child(2){
   text-align:right;
}
.artitem .ai-message .ai-title{
   margin-top:3px;
   font-size:13px;
   color:#333;
}
.tab-nav{
    display:flex;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    background: #fff;
}
.tab-nav li.on {
    color: #80bd01;
}
.tab-nav li {
    flex:1;
    line-height: 38px;
    text-align: center;
    border-right: 1px solid #eee;
    font-size: 14px;
}
</style>