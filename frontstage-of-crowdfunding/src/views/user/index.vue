<template>
  <div class="maim">
    <navigation></navigation>
    <div class="main-wrap clearfix">
      <div class="nav-side">
        <el-menu
          default-active="/user/index"
          class="el-menu-vertical-demo"
          text-color="#7a8087"
          active-text-color="#222c37"
          :default-openeds="['1', '2', '3', '4','5']"
          router
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="/user/index">
            <div slot="title">
              <!-- <router-link to="user_index"> -->
                <el-avatar
                  :size="30"
                  :src="userInfo.avatar"
                ></el-avatar>

                <span
                  style="
                    margin-left: 15px;
                    font-size: 16px;
                    font-weight: normal;
                    color: #7a8087;
                  "
                  >{{userInfo.nickName}}</span
                >
              <!-- </router-link>  -->
            </div>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <span>我的动态和消息</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/user/dynamic">发布动态</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

           <el-submenu index="2">
            <template slot="title">
              <span>我的项目</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/user/order">发起的项目</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <span>我的订单</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/user/order">订单信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <span>我的关注</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/user/pro_optimistic">看好的项目</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <span>我的设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/user/info">个人资料</el-menu-item>
              <el-menu-item index="/user/auth">账号认证</el-menu-item>
              <el-menu-item index="/user/address">管理地址薄</el-menu-item>
              <el-menu-item index="4-5">账户与安全</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="main_right self">
          <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "@/components/header/navigation";
import store from "@/store";
export default {
  name: "User",
  components: {
    navigation: navigation,
  },
  data() {
    return {
      userInfo: "",
    };
  },
   created() {
    this.userInfo = store.state.user;
    // console.log(this.userInfo);
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
/* mian */
.main-wrap {
  padding: 0 !important;
  width: 1080px;
  margin: 60px auto 40px;
}
.main-wrap {
  padding: 0 !important;
  width: 1080px;
  margin: 60px auto 40px;
}
.clearfix {
  zoom: 1;
}
/* 侧边栏 */
.nav-side {
  width: 300px;
  background: #f8f8f9;
  float: left;
  text-indent: 20px;
  margin-right: 40px;
}
/* 主页面内容 */
.main_right.self {
  float: left;
  position: relative;
}
.main_right {
  width: 740px;
  height: auto;
}
</style>