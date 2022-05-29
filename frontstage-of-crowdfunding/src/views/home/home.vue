<template>
  <div class="index-page">
    <div class="common-header">
      <navigation></navigation>
    </div>
    <div class="banner">
      <banner></banner>
    </div>
    <!-- 24小时榜单 
    <div class="hot-24">
      <div class="hot-left">
        <h3 class="title">24小时金额榜</h3>
        <div class="line"></div>
      </div>
      <div class="hot-right">
        <h3 class="title">24小时创意榜</h3>
      </div>
    </div> -->
    <div class="pro_field">
      <div class="pro_field_wrap clearfix">
        <div class="pro_nav clearfix">
          <h3>在线项目</h3>
          <ul class="nav_lists"></ul>
          <a target="_blank" href="#/project/list" class="more"
            >查看更多 <i class="iconfont icon-nestmore"></i
          ></a>
        </div>
        <!--项目卡-->
        <ul class="pro_ul clearfix">
          <li v-for="project in projectList" :key="project.id">
            <project :project="project"></project>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
import banner from "@/views/home/components/banner";
import navigation from "@/components/header/navigation";
import project from "@/components/home/project";
import projectApi from "@/api/project";

export default {
  name: "Home",
  components: {
    banner: banner,
    navigation: navigation,
    project: project,
  },
  data() {
    return {
      projectList: [],
      page: 1,
      size:8,
    };
  },
  created() {
    this.initProjectList();
  },
  methods: {
    initProjectList() {
      projectApi.getSimpleProjectList(this.page,this.size).then((response) => {
        this.projectList = response.data.records;
        console.log(this.projectList);
      });
    },
  },
};
</script>

<style scoped>
body.index-page {
  background: #fff;
}
.banner {
  width: 100%;
  height: 330px;
  position: relative;
  overflow: hidden;
}
/* .hot-24 {
  width: 1080px;
  overflow: hidden;
  margin: 40px auto;
}
.hot-24 .hot-left {
  width: 740px;
  margin-right: 40px;
}
.hot-24 .title {
  height: 64px;
  line-height: 64px;
  font-size: 24px;
  font-weight: 700;
}
.hot-24 .line {
  width: 738px;
  height: 1px;
  background-image: linear-gradient(90deg, #fff, #dee0e1);
  background-image: -o-linear-gradient(to right, #fff, #dee0e1);
}
.hot-24 .hot-right {
  width: 300px;
}
.hot-24 > div {
  float: left;
}
.hot-24 .title {
  height: 64px;
  line-height: 64px;
  font-size: 24px;
  font-weight: 700;
} */

.pro_field {
  width: 100%;
  display: inline-block;
  background: #f8f8f9;
  padding: 0 0 40px;
}
.pro_field_wrap {
  width: 1080px;
  margin: 0 auto;
}
.pro_nav {
  height: 24px;
  padding: 40px 0 30px;
  border-bottom: 1px solid #dee0e1;
}
.pro_ul {
  width: 100%;
}
.clearfix {
  zoom: 1;
}
ol,
ul {
  list-style: none;
}

.pro_nav h3 {
  float: left;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  margin-right: 37px;
}
.pro_nav .nav_lists {
  float: left;
  line-height: 16px;
  margin-top: 8px;
}
.pro_nav .more {
  float: right;
  font-size: 16px;
  font-weight: 400;
  margin-top: 5px;
}

.pro_ul li {
  float: left;
  width: 255px;
  height: 480px;
  background-color: #fff;
  margin: 10px 0 0 10px;
  overflow: hidden;
  transition: all 0.2s linear;
}
</style>