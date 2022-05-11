<template>
  <div class="header-user">
    <section class="user_center_box">
      <div class="clearfix user_center_sidebar">
        <a href="#" target="_blank">
          <img
            src="@/assets/md-logo@2x.png"
            height="100%"
            title="摩点 - 文化创意众筹社区"
        /></a>
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
          <ul id="userNav" class="no-login fl">
            <li>
              <div
                class="btn account_publish"
                style="
                  width: 120px;
                  height: 40px;
                  background: #00c4a1;
                  text-align: center;
                  color: #fff;
                  cursor: pointer;
                  font-size: 16px;
                  line-height: 38px;
                  margin-top: -5px;
                "
              >
                <a
                  href="https://account.modian.com/initiate/"
                  target="_blank"
                  style="color: #fff"
                >
                  <span>发起项目</span>
                </a>
              </div>
            </li>

            <li class="pro_search" id="searchDiv" style="margin-left: 40px">
              <span class="icon" id="searchIcon"
                ><i class="iconfont icon-search"></i
              ></span>
              <div class="inpt" style="display: none">
                <input
                  value=""
                  type="text"
                  id="search_input"
                  autocomplete="off"
                  style="max-width: 236px; min-width: 120px; width: 46px"
                />
              </div>
              <div class="search_result" style="max-height: 598px"></div>
            </li>
            <li class="line"><span></span></li>
            <!--登录方式-->
            <li v-if="!userInfo" class="nologin-entra">
              <a class="thrLogin m_ga_all_sign" href="#" id="wechat">
                <i class="iconfont icon-wechat"></i>
              </a>
              <span class="m_ga_all_sign" @click="login" id="loginBtn">
                <i class="iconfont icon-phone"></i>
              </span>
            </li>
            <!--通知-->
            <li class="wdxx_right_posit">
              <a class="lookMail setOn" href="javascript:;"
                ><i class="iconfont icon-notice"></i
              ></a>
            </li>
            <!--用户头像-->
            <li v-if="userInfo" class="userInfo">
              <router-link to="/user_index">
                <el-popover placement="top-start" width="280px" trigger="hover">
                  <el-avatar
                    class="icon_pic"
                    slot="reference"
                    :src="userInfo.avatar"
                    alt="avatar"
                    style="width: 32px; height: 32px"
                    onerror="javascript:this.src='https://s.moimg.net/new/images/headPic.png'"
                  ></el-avatar>

                  <user-info-bubble
                    @refreshAndClose="refreshAndClose"
                  ></user-info-bubble>
                </el-popover>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <!--添加表单-->
    <el-dialog
      width="570px"
      top="5vh"
      :show-close="false"
      center
      :visible.sync="loginFormVisible"
      @closed="refreshAndClose"
    >
      <login @refreshAndClose="refreshAndClose"></login>
    </el-dialog>
  </div>
</template>

<script>
import login from "@/views/home/components/login";
import store from "@/store";
import userInfoBubble from "@/views/home/components/userInfo-bubble";

export default {
  name: "Header",
  components: {
    login: login,
    userInfoBubble: userInfoBubble,
  },
  inject: ["reload"],
  data() {
    return {
      userInfo: "",
      loginFormVisible: false, // 登录弹框可见性
    };
  },
  created() {
    this.userInfo = store.state.user;
    // console.log(this.userInfo);
  },
  methods: {
    refreshAndClose() {
      this.loginFormVisible = false;
      this.userInfo = store.state.user;
      // console.log(this.userInfo);
      this.reload();
    },
    login() {
      this.loginFormVisible = true;
    },
  },
};
</script>

<style scoped>
.header-user .no-login {
  height: 30px;
  width: 100%;
}

.header-user .no-login li {
  float: left;
}

.header-user .no-login .nologin-entra {
  float: right;
}

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

#userNav > li {
  margin-left: 40px;
  position: relative;
  cursor: pointer;
}

.primary-nav .header-user .user-nav li {
  float: left;
}

#userNav .userInfo .avatar {
  display: block;
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}
#userNav a {
  color: #7a8087;
  font-size: 16px;
  transition: all 0.2s;
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
}
#userNav .userInfo .avatar img {
  width: 100% !important;
  height: 100% !important;
  border-radius: 50%;
  border: 1px solid #dee0e1;
  box-sizing: border-box;
}
img {
  max-width: 100%;
}
#userNav > li:first-child {
  margin-left: 0;
}
#userNav a {
  color: #7a8087;
  font-size: 16px;
  transition: all 0.2s;
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
}
a {
  text-decoration: none;
  outline: 0;
  color: #425eb2;
}
</style>