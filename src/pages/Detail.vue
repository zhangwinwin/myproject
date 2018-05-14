<template>
  <div class="detail">
    <!-- <div class="top-box">
      <header class="head-logo clearfix">
        <i class="head-logo-menu iconfont icon-fenlei1"></i>
        <i class="head-logo-icon iconfont icon-logo"></i>
      </header>
    </div> -->
    <div class="loading-dox" v-show="loading">
      <loading :size='50'></loading>
    </div>
    <div class="detail-post" v-show="!loading">
      <div class="detail-post-meta">
        <div class="detail-post-avatar">
          <router-link :to="{name:'user', params:{loginname:detail.author.loginname}}" v-if="detail.author">
            <img class="detail-post-avatar-img" v-if="detail.author" :src="detail.author.avatar_url"/>
          </router-link>
        </div>
        <div class="detail-post-info">
          <div class="detail-post-author-name">
            <router-link :to="{name:'user',params:{loginname:detail.author.loginname}}" v-if="detail.author">
              <p>{{ detail.author.loginname }}</p>
            </router-link>
            <p class="detail-type-item">
              <span class="detail-type-item-font" v-if="detail.tab === 'good'">#精华</span>
              <span class="detail-type-item-font" v-else-if="detail.tab === 'share'">#分享</span>
              <span class="detail-type-item-font" v-else-if="detail.tab === 'ask'">#问答</span>
              <span class="detail-type-item-font" v-else-if="detail.tab === 'job'">#招聘</span>
            </p>
          </div>
          <div class="detail-post-time"><span> • 发布于{{detail.create_at | formatDate}}</span><span> • {{detail.visit_count}}次浏览 • 最后一次编辑是{{detail.last_reply_at | formatDate}}</span></div>
        </div>
        <div class="detail-collect-item" v-if="loginStatus">
          <button @click="collectionBtn">{{detail.is_collect ? '取消收藏' : '收藏'}}</button>
        </div>
      </div>

      <div class="detail-post-header">
        <div class="detali-post-title">
          <span class="detail-posts-tag hot" v-if="detail.top === true">置顶</span>
          <span class="detail-posts-tag" v-else-if="detail.good === true">置顶</span>{{ detail.title }}
        </div>
      </div>

      <div class="detail-post-content">
        <div class="content-info markdown-body" v-html="detail.content"></div>
      </div>

      <div class="detail-post-comment">
        <h2 class="detail-post-comment-title">{{detail.reply_count}}评论</h2>
        <div class="detail-post-comment-list">
          <div class="detail-post-comment-item" v-if="detail.replies" v-for="(item, index) in detail.replies" :key="index">
            <div class="detail-post-comment-avatar">
              <img :src="item.author.avatar_url" class="detail-post-comment-avatar-img"/>
            </div>
            <div class="detail-post-comment-cell">
              <div class="detail-post-comment-info">
                <div class="detail-post-comment-info-cell">
                  <p class="detail-post-comment-author-name">
                    <strong>{{item.author.loginname}}</strong>
                  </p>
                  <p class="detail-post-comment-time">
                    {{index + 1}}楼 。发表于{{item.create_at | formatDate}}
                  </p>
                </div>
                <div class="detail-post-comment-info-cell" style="text-align:right">
                  <!-- <img src="../assets/icon/zan.png" mode='scaleToFill'  class="detail-post-zan" @click.native="likeBtn(item.id, item.author, index)"/> -->
                  <Icon :type="item.is_uped ? 'ios-heart' : 'ios-heart-outline'" @click.native="likeBtn(item.id, index)"/>
                  <span class="detail-post-zan-num" v-if="item.zanNum > 0">{{item.zanNum}}</span>
                  <div @click="replyOthers(item.author.loginname)" v-if="loginStatus">
                    <Icon type="reply"></Icon>
                  </div>
                </div>
              </div> 
                <div class="detail-comment-content">
                <p class="detail-comment-text" v-html="item.content"></p>
               </div>
            </div>
          </div>
          <div class="detail-post-comment-null" v-if="detail.replies == ''">
            <img src="../assets/icon/null.png" mode="scaleToFill" alt="" class="imgnull">
            <p class="textnull">暂无评论</p>
          </div>
        </div>
      </div>
      <!-- 新建评论 -->
      <div class="insert-reply" :class="{hidden: !loginStatus}">
        <div class="tip">添加回复</div>
        <textarea id="markdown-editor"></textarea>
        <div class="reply-btn">
          <button type="button" class="huifu" @click="insertReply">{{insertBtnText}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde'
import axios from 'axios'
import Loading from '../components/Loading.vue'
import { mapGetters,mapState } from 'vuex'
import api from '../fetch/api'

export default {
  data(){
    return {
      insertBtnText: '回复',
      simplemde: null,
      xurl: 'https://cnodejs.org/api/v1/topic/',
      rurl: 'https://cnodejs.org/api/v1/reply/',
      curl: 'https://cnodejs.org/api/v1/topic_collect/collect',
      ccurl: 'https://cnodejs.org/api/v1/topic_collect/de_collect'
    }
  },

  components: {
    Loading
  },

  beforeRouteEnter(to, from, next){
    next((vm) => {
      vm.detail = {}
      vm.getDetailDate(vm)
    })
  },

  computed: {
    ...mapGetters({
      loading: 'loading'
    }),
    ...mapState({ 
      loginStatus: state => state.user.loginStatus,
      accesstoken: state => state.user.userInfo.accesstoken
    }),
    detail: {
      get: function(){
        return this.$store.getters.getDetail
      },
      set: function(){
      }
    }
  },

  methods: {
    initMarkdownEditor(){
      this.simplemde = new SimpleMDE({
        element: document.getElementById('markdown-editor'),
        spellChecker: false, //启用拼写检查，会有背景颜色
        autoDownloadFontAwesome: false //是否需要下载字体图标
      })
    },
    getDetailDate(el){
      window.scroll(0,0)
      let id = el.$route.params.id
      el.$store.dispatch('getDetail', id)
    },

    //收藏 && 取消收藏
    collectionBtn(){
      let c_id = this.detail.is_collect ? this.ccurl : this.curl
      axios.post(c_id, {
        topic_id: this.detail.id,
        accesstoken: this.accesstoken
      }).then(res => {
        if(res.data.success){
          this.detail.is_collect = !this.detail.is_collect
           this.$Message.success('收藏成功!');
        }
      }).catch(e => e)
    },

    //插入评论
    insertReply(){
      //避免多次点击按钮
      if(this.insertBtnText === '发送中...') return
      let val = this.simplemde.value()
      if(!val) return this.$Message.warning('内容不能为空')
      this.insertBtnText = '发送中...'
      axios.post(`${this.xurl}${this.detail.id}/replies`,
      {
        content: val,
        accesstoken: this.accesstoken
      }).then(res => {
        if(res.data.success){
          this.simplemde.value('')
          this.$Message.success('发送成功')
          this.insertBtnText = '回复'
        }
      })
    },

    replyOthers(loginname){
      let top = document.querySelector('.insert-reply').offsetTop
      window.scrollTo(0, top - 80)
      this.simplemde.value(`@${loginname}`)
    },

    likeBtn(id, index){
      try{
        if(!this.loginStatus) throw new Error('你未登录')
      } catch(e){
        return this.$Message.warning(e.message)
      }
      axios.post(`${this.rurl}${id}/ups`,{
        'accesstoken': this.accesstoken
      }).then(res => {
        if(res.data.success){
          //取消赞
          if(res.action === 'down'){
            this.detail.replies[index].is_uped = false
            this.detail.replies[index].ups.pop()
          } else{
            this.detail.replies[index].is_uped = true
            this.detail.replies[index].ups.push(Date.now())
          }
        }
      }).catch(e => e)
    }
  },

  mounted(){
    this.initMarkdownEditor();
  }
}
</script>

<style scoped>
.detail{
  margin-top: 43px;
}
.loading-dox{
  margin:50px auto;
  text-align:center;
}
.loading-dox div{
  margin:auto;
}
.detail-post-meta{
  margin-top:23px;
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.detail-post-avatar{
  margin-right: 10px;
}

.detail-post-time{
  color: #888;
  font-size: 12px;
}

.detail-post-avatar-img{
  width: 44px;
  height: 44px;
  border-radius: 50%;
}
.detail-post-info{
  flex: 1;
}


.detail-collect-item button{
  width: 50px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  background: #80bd01;
  border-radius: 3px;
  margin-left: 10px;
  cursor: pointer;
  color: white;
}
.detail-type-item{
  display: inline-block;
}

.detail-type-item-icon{
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}
.detail-type-item-font{
  display: inline-block;
  vertical-align: middle;
  margin-left: 5px;
  color: #80bd01;
  font-size: 14px;
}
.hot{
  border: 1px solid red !important;
  color: red !important;
}

.detail-post-header{
  display: flex;
  padding: 14px;
}
.detail-posts-tag{
  display: inline-block;
  width: 40px;
  height: 21px;
  text-align: center;
  line-height: 21px;
  margin-right: 5px;
  font-size: 12px;
  color: #80bd01;
  border: 1px solid #80bd01;
}
.detail-post-title{
  flex: 1;
  font-size: 15px;
}

.detail-post-content{
  overflow-x: hidden;
  padding: 15px;
}
.detail-post-content img{
  width:100%;
}
.content-info {
  color: #6c6c6c;
  word-wrap: break-word;
}


.detail-post-comment{
  overflow: hidden;
  border-top: 10px solid #eee;
}

.detail-post-comment-item{
  display: flex;
}
.detail-post-comment-title{
  position: relative;
  line-height: 40px;
  padding: 0 15px;
  font-size: 15px;
  border-bottom: 1px #eee solid;
}

.detail-post-comment-avatar-img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.detail-post-comment-cell{
  overflow: hidden;
  flex: 1;
  margin-left: 10px;
}
.detail-post-comment {
  background-color: #fff;
}
.detail-post-comment-item {
  padding: 15px 0;
  margin: 0 15px;
  background: #fff;
  border-bottom: 1px #eee solid;
}
.detail-post-comment-item:last-child{
  border-bottom: none;
}

.detail-post-comment-info{
  display: flex;
}
.detail-post-comment-info-cell{
  flex: 1;
}
.detail-post-zan{
  width: 16px;
  height: 16px;
  display: inline-block;
}
.detail-post-zan-num{
  display: inline-block;
  margin-left: 5px;
  color: #888;
}

.detail-post-comment-time{
  font-size: 12px;
  color: #666;
}
.detail-comment-text {
  overflow: hidden;
  display: block;
  margin: 10px 0;
  font-size: 14px;
  word-wrap: break-word;
}
.detail-comment-text img{
  max-width:100%;
  width:100%;
  
}

.detail-post-comment-null{
  margin: 25px auto;
  text-align: center;
}
.detail-post-comment-null .imgnull{
  margin: 2px auto;
  width: 100px;
  height: 100px;
}
.detail-post-comment-null .textnull{
  display: block;
  color: #80bd01;
}
.insert-reply{
  margin: 0 5px;
}
.tip{
  font-size: 15px;
  border-top: 1px #eee solid;
  text-align: center;
}
.reply-btn{
  text-align: center;
}
.huifu{
  width: 50px;
  height: 28px;
  line-height: 28px;
  background: #80bd01;
  border-radius: 3px;
  cursor: pointer;
  color: white;
  margin-top: -30px;
}
</style>
