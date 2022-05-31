<template>
  <div id="userInfo-bubble" class="bubble">
    <div class="bubbleArrow">
      <span class="bubbleTop"></span><span class="bubbleBottom"></span>
    </div>
    <div class="bubbleBox">
      <div class="bubbleCon">
        <div id="userInfoBox" class="userInfoBox" style="height: 380px">
          <router-link id="personalInfo" to="/user/index">
            <span class="infoImg"
              ><img
                :src="userInfo.avatar"
                style="width: 90px; height: 90px"
                onerror="javascript:this.src='https://s.moimg.net/new/images/headPic.png'"
            /></span>
            <h3 class="personalId">{{ userInfo.nickName }}</h3>
          </router-link>
          <div class="userProject"></div>
          <div class="userVote"></div>
          <div class="state-set clearfix">
            <div class="userState fl">
              <h3>个人动态</h3>
              <a
                class="proList ga_fav_pro"
                href="#/user/pro_optimistic"
                >关注的项目</a
              ><a
                class="proList ga_my_order"
                href="#/user/order"
                >我的订单</a
              ><a
                class="proList ga_launch_pro"
                href="#/user/project"
                >发起的项目</a
              >
            </div>
            <div class="user-set fl">
              <h3>我的设置</h3>
              <a
                class="proList ga_manage_per_infor"
                href="#/user/info"
                >管理个人信息</a
              ><a
                class="proList ga_manage_address"
                href="#/user/address"
                >管理地址薄</a
              ><a
                class="proList last"
                href="#/user/safe"
                >账户安全</a
              >
            </div>
          </div>
        </div>
        <a class="logOff" @click="logout()"
          ><i class="iconfont icon-quit"></i>退出登录</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "userInfoBubble",
  data() {
    return {
      userInfo: "",
    };
  },
  watch: {
    userInfo(val) {
      this.userInfo = val;
      //   console.log(val)
    },
  },
  created() {
    this.userInfo = store.state.user;
    // console.log(this.userInfo);
  },
  methods: {
    logout() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.commit("setUser", null);
        this.$message({
          type: "success",
          message: "退出登录成功!",
        });
        this.$router.replace('/#/');
        this.$emit("refreshAndClose");
      });
    },
  },
};
</script>

<style scoped>
#personalInfo .infoImg img {
  border-radius: 45px;
  margin-top: 0;
}
#personalInfo .infoImg {
  display: block;
  margin: 0 auto;
  width: 90px;
  height: 90px;
  position: relative;
}
#userInfo-bubble .state-set h3 {
  height: 20px;
  font-size: 20px;
  line-height: 20px;
  padding-bottom: 19px;
  border-bottom: 1px solid #dee0e1;
  box-sizing: content-box;
}
#userInfo-bubble .userInfo .bubble {
  width: 300px;
  height: auto;
  background: #fff;
  left: -236px;
}

#userInfo-bubble .userState {
  width: 120px;
}
.fl {
  float: left;
}

#personalInfo .personalId {
  width: 100%;
  line-height: 16px;
  text-align: center;
  color: #222c37;
  font-weight: 600;
  font-size: 16px;
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-top: 11px;
}
#userInfo-bubble .user-set {
  width: 120px;
  margin-left: 20px;
  box-sizing: content-box;
}

#userInfo-bubble .bubbleBox {
  position: static;
  width: 260px;
  background: #fff;
}

#userInfo-bubble .state-set a.last,
#userInfo-bubble .state-set a.proList {
  height: 16px;
  padding: 20px 0 0;
  line-height: 16px;
  text-align: left;
  display: block;
  font-weight: 400;
}

#userInfo-bubble .bubble a,
#userInfo-bubble .userInfo-bubble a {
  display: block;
  padding: 0 20px;
  height: 57px;
  box-sizing: initial;
  -moz-box-sizing: initial;
  -webkit-box-sizing: initial;
}

#userInfo-bubble a {
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

#userInfo-bubble .userProject,
#userInfo-bubble .userVote {
  width: 100%;
  height: auto;
  padding-top: 20px;
  border-left: none;
}

#userInfo-bubble a.logOff {
  display: block;
  height: 56px;
  line-height: 56px;
  color: #7a8087;
  background: #f8f8f9;
  margin-top: 0;
  text-indent: 20px;
  transition: all 0.2s;
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  padding: 0;
}
</style>