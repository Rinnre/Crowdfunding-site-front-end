<template>
  <div class='home'>
    <section class="user_center_box">
      <div class="clearfix user_center_sidebar">
        <a href="#" target="_blank">
          <img src="@/assets/md-logo@2x.png" height="100%" title="摩点 - 文化创意众筹社区" /></a>
        <ul class="site-nav">
          <li class="ga_find">
            <a target="_blank" href="#">发现项目</a>
          </li>
          <li class="ga_dongtai">
            <a target="_blank" href="#">创作者动态</a>
          </li>
          <li class="ga_release">
            <a target="_blank" href="#">发布项目</a>
          </li>
        </ul>
        <div class="user-center right">
          <div>
            <i class="iconfont icon-wechat"></i>
            <i class="iconfont icon-phone"></i>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
    }
  }
}
</script>

<style scoped>
.user_center_box {
  border-bottom: 1px solid #dee0e1;
}

.user_center_sidebar {
  height: 70px;
  line-height: 30px;
  padding: 20px 40px;
  background-color: #fff;
}

.user_center_sidebar .site-nav {
  padding-left: 40px;
  display: inline-block;
}

.user_center_sidebar .site-nav li {
  display: inline-block;
  position: relative;
  margin-right: 30px;
}

.user_center_sidebar .site-nav a {
  font-size: 14px;
  color: #7a8087;
}

.user_center_sidebar .user-center i {
  margin-left: 24px;
  float: left;
  line-height: 30px;
  width: 17px;
  font-size: 18px;
  padding-left: 6px;
  color: #7a8087;
  cursor: pointer;
}
</style>