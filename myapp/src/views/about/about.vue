<template>
  <div class="about">
    <div class="auserinfo">
      <img src="../assets/zjh.jpg" alt="" class="auserinfo-avatar">
      <p class="auserinfo-nickname">ZhangJinHui</p>
    </div>

    <div class="about-box">
      <div class="about-item">
        <p class="about-item-title">关于项目</p>
        <p class="about-item-content">社区是基于vue-cli3.0、TS开发，使用webpack构建工具编译打包项目</p>
        <p class="about-item-content">e2772727-76e0-4c93-b16f-21b29f4e864c</p>
      </div>

      <div class="about-item">
        <p class="about-item-title">当前版本</p>
        <p class="about-item-content">v2.0.0</p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
export default {
  
}
</script>


<style scoped>
.about{
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
  margin-top: 25px;
  border-radius: 50%;
}
.auserinfo-nickname {
  color: #fff;
  font-size: 14px;
}
.ausermotto{
  margin-top: 5px;
}
.about-item{
  padding:5px 15px;
}
.about-item-title{
  display: block;
  font-size: 14px;
  line-height: 30px;
}
.about-item-content{
  margin-top: 5px;
  display: block;
  text-indent: 20px;
  color: #333;
  font-size: 13px;
}
.about-item-content a{
    text-decoration: underline;
    color: #80bd01;
}
.link{
  color: #80bd01;
  text-decoration: underline;
}
</style>