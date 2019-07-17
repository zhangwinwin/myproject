<template>
  <div class="post">
    <div class="title">
      <label class="iconfont icon-biaoti1"></label>标题
      <input type="text" placeholder="请输入标题" v-model="form.title">
    </div>
    <div class="select">
      <label class="iconfont icon-fenlei"></label>分类
      <select v-model="form.tab">
        <option value="">请选择</option>
        <option value="share">分享</option>
        <option value="ask">问答</option>
        <option value="job">招聘</option>
      </select>
    </div>
    <div class="con">
      <label class="iconfont icon-biaoti"></label>内容
      <textarea flex-box="1" placeholder="请输入内容" v-model="form.content" id="markdown-editor"></textarea>
    </div>

    <button class="submit" @click="submit()">发布</button>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { post } from '../../api/api'
import tool from '../../util/tool'
import SimpleMDE from 'simplemde'
interface form {
  topic_id: number
  accesstoken: string
  title: string
  tab: string
  content: string
}
export default class Post extends Vue {
  private form: form = {
    topic_id: 0,
    accesstoken: '',
    title: '',
    tab: '',
    content: ''
  }
  @State(state => state.user.userInfo.accesstoken) accesstoken
  initMarkdownEditor(){
    this.simplemde = new SimpleMDE({
      element: document.getElementById('markdown-editor'),
      spellChecker: false,
      autoDownloadFontAwesome: false
    })
  }
  async submit(){
    if(!this.accesstoken) return this.$router.push({ path: '/login' })
    this.form.accesstoken = this.accesstoken
    if(!this.form.title){
      return tool.toast('标题不能为空')
    } else if(!this.form.tab){
      return tool.toast('选项不能为空')
    } else if(!this.form.content){
      return tool.toast('内容不能为空')
    }
    let {data} = await post(`accesstoken=${this.form.accesstoken}&title=${this.form.title}&tab=${this.form.tab}&content=${this.form.content}topic_id=''`)
    if(data.success){
      this.$router.push({ path: `/topic/${data.topic_id}` })
    } else {
      tool.toast(data.error_msg)
    }
  }
  mounted(){
    this.initMarkdownEditor()
  }
}
</script>

<style scoped>
.post{
	height: 100%;
}
.iconfont{
    font-size:18px;
    color:#80bd01;
    margin-right:5px;
}
.title{
    margin-top:43px;
	padding: 10px 10px;
}
.select{
	padding: 10px 10px;
	border-top: 1px solid #ddd;
	border-bottom: 1px solid #ddd;
}
.select select{
	padding: 0;
}
.con{
	padding: 5px 10px
}
.con textarea{
	line-height: 24px
}
textarea {
    margin-top:10px;
    min-height:300px;
    padding: 10px !important;
}
input,select,textarea{
    background: #eee;
	box-sizing: border-box;
	width: 100%;
	height: 32px;
	padding: 10px;
	line-height: 28px;
	border: none;
	font-size: 14px;
	resize: none;
    border-radius: 5px;
    margin-top:5px;
}
.submit{
    display: block;
    width:250px;
    padding:10px 15px;
    margin:auto;
    margin-top:20px;
    text-align:center;
    background:#80bd01;
    color:#fff;
    border-radius: 5px;
}
</style>