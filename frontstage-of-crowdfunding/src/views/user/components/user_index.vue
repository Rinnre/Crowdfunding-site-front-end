<template>
  <div class="main_right">
    <!--个人信息-->
    <div class="banner">
      <div class="userId">UID {{ userInfo.uid }}</div>
      <div
        class="bg"
        :style="{
          backgroundImage: 'url(' + userInfo.avatar + ')',
          backgroundRepeat: 'no-repeat',
          'background-size': 'cover',
        }"
      ></div>
      <div class="bg meng"></div>
      <img
        :src="userInfo.avatar"
        onerror="javascript:this.src='https://s.moimg.net/new/images/headPic.png';"
        class="logo"
      />

      <div class="cont">
        <p>
          <span class="title">{{ userInfo.nickName }}</span>
        </p>
        <p>
          <span class="go_span" data-href="/u/fans_user">0<em> 粉丝</em></span>
          <span class="go_span" data-href="/u/favor_user">0<em> 关注</em></span>
          <span id="ALL"> <span>0</span><em> 被赞</em></span>
        </p>
      </div>
      <div class="edit-btn">
        <router-link to="/user/info">
          <i class="iconfont icon-editperson"></i>
          编辑
        </router-link>
      </div>
    </div>
    <!-- 认证警告 -->
    <div class="jzb_make_up" v-if="userInfo.authStatus == 0">
      <i class="iconfont icon-warning"></i>
      因国家监管要求，您的收款账户须升级认证，否则可能无法使用提现等功能
      <a id="jzb_make_up_a" href="#/user/auth">立即升级认证</a>
    </div>
    <!-- 众筹信息 -->
    <div class="mask" style="display: black">
      <div class="item">
        <p>{{projectInfo.totalMoney}} 元</p>
        <p>筹款总额</p>
        <p><i class="iconfont icon-funds"></i></p>
      </div>
      <div class="item">
        <p>{{projectInfo.totalSupporter}} 人</p>
        <p>参与总人次</p>
        <p><i class="iconfont icon-fans"></i></p>
      </div>
      <div class="item">
        <p>{{projectInfo.totalNumber}} 个</p>
        <p>项目数</p>
        <p><i class="iconfont icon-fundraising"></i></p>
      </div>
    </div>
    <!-- 个人简介 -->
    <div class="column">
      <p>个人简介</p>
    </div>
    <p class="introduction" v-if="userInfo.biography==''||userInfo.biography==undefined">这个人很懒,什么都没有留下...</p>
    <p class="introduction" v-else>{{userInfo.biography}}</p>
    <!--动态-->
    <div class="column info">
      <p>我的动态</p>
      <p>
        <router-link to="/user/dynamic"
          ><i class="iconfont icon-edit"></i>发布动态</router-link
        >
      </p>
    </div>
    <div class="tab_cont">
      <div
        class="info_list"
        v-for="dynamicItem in dynamicList"
        :key="dynamicItem.id"
      >
        <dynamic
          :dynamic="dynamicItem"
          @deleteDynamic="deleteDynamic"
        ></dynamic>
      </div>
    </div>
  </div>
</template>

<script>
import dynamic from "@/components/dynamic/index";
import user from "@/api/user";

export default {
  name: "UserIndex",
  components: {
    dynamic: dynamic,
  },
  data() {
    return {
      userInfo: "",
      projectInfo:{
        totalMoney:0,
        totalNumber:0,
        totalSupporter:0
      },
      dynamicList: [],
    };
  },
  created() {
    this.loadUserProjectSimpleInfo();
    this.loadDynamicList();
  },
  methods: {
    // 加载用户项目数据和个人简介
    loadUserProjectSimpleInfo() {
      user.getUserSimpleProjectInfo().then((response) => {
        this.userInfo = response.data.userInfo;
        this.projectInfo.totalMoney  =response.data.TOTAL_PROJECT_MONEY;
        this.projectInfo.totalNumber  =response.data.TOTAL_PROJECT_NUMBER;
        this.projectInfo.totalSupporter  =response.data.TOTAL_PROJECT_SUPPORTER;
          console.log(response.data);
      });
    },
    // 加载动态数据
    loadDynamicList() {
      user.getDynamicList().then((res) => {
        this.dynamicList = res.data;
      });
    },
    // 删除动态
    deleteDynamic(dynamicId) {
      user.removeDynamic(dynamicId).then((res) => {
        this.$message.success("删除成功");
        this.loadDynamicList();
      });
    },
  },
};
</script>

<style scoped>
/* banner */
.main_right .banner {
  height: 140px;
  position: relative;
  margin-bottom: 40px;
  overflow: hidden;
}
.main_right .banner .userId {
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 3;
  color: #fff;
  opacity: 0.6;
  font-size: 14px;
  line-height: 14px;
}
.main_right .banner .bg {
  position: absolute;
  width: 800px;
  height: 200px;
  left: -30px;
  top: -30px;
  z-index: 1;
  -webkit-filter: blur(20px);
  filter: blur(20px);
}

.main_right .banner .bg.meng {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.3);
}
.main_right .banner .logo {
  position: absolute;
  bottom: 15px;
  left: 37px;
  width: 100px;
  height: 100px;
  border: solid 3px #fff;
  overflow: hidden;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  z-index: 3;
}
.main_right .banner .cont {
  position: absolute;
  z-index: 3;
  left: 160px;
  top: 29px;
}
.main_right .banner .cont p:first-child {
  padding-bottom: 9px;
  margin-right: 10px;
  width: 560px;
  overflow: hidden;
}
.main_right .banner .cont p:first-child span.title {
  font-size: 34px;
  line-height: 48px;
  color: #fff;
  font-weight: 700;
  float: left;
  max-width: 460px;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  padding: 0 10px 0 0;
}
.main_right .banner .cont p:last-child {
  font-size: 16px;
  color: #fff;
  line-height: 16px;
}
.main_right .banner .cont p:last-child > span {
  margin-right: 20px;
}
.main_right .banner .cont p span {
  cursor: pointer;
}

.main_right .banner .edit-btn,
.main_right .banner .add-focus {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 3;
  width: 90px;
  height: 40px;
  font-size: 16px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  border: solid 1px #ffffff;
}
.main_right .banner .edit-btn a {
  color: #fff;
}

/* 认证警告 */
.jzb_make_up {
  margin: -20px 0 40px 0;
  width: 740px;
  padding: 14px 0;
  text-align: center;
  background: rgba(245, 133, 0, 0.1);
  color: #f58500;
  font-size: 16px;
  line-height: 18px;
}
.jzb_make_up a {
  color: #425eb2;
  text-decoration: underline;
}
/* 众筹信息 */
.main_right .mask {
  width: 100%;
  overflow: hidden;
  margin-bottom: 35px;
}

.mask .item i {
  font-size: 40px;
}
.main_right .mask .item:first-child {
  margin-left: 0;
}
.main_right .mask .item p:first-child {
  font-size: 16px;
  line-height: 22px;
  color: #222c37;
  font-weight: 600;
  padding: 28px 0 4px 0;
}
.main_right .mask .item p:nth-child(2) {
  color: #7a8087;
  font-size: 14px;
  line-height: 20px;
}
.main_right .mask .item p:nth-child(3) {
  color: #7a8087;
  font-size: 40px;
  position: absolute;
  right: 20px;
  top: 28px;
}
.main_right .mask .item {
  padding: 0 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  width: 233px;
  height: 100px;
  background: #f6f3f3;
  margin-left: 20px;
  float: left;
  position: relative;
}
/* 个人简介 */
.main_right .column {
  /* overflow: hidden; */
  padding-bottom: 43px;
  margin-bottom: 20px;
  border-bottom: solid 1px #dee0e1;
}
.main_right .column p:first-child {
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: #222c37;
  float: left;
  margin: 0;
}
p.introduction {
  padding: 16px 0 52px 0;
  font-size: 16px;
  line-height: 22px;
  color: #222c37;
}

/* 动态 */
.main_right .column p {
  font-size: 16px;
  line-height: 20px;
  margin-top: 9px;
  color: #425eb2;
  margin-left: 36px;
  float: right;
  cursor: pointer;
}

.main_right .info_list,
.main_right .pro_list {
  overflow: hidden;
  margin-bottom: 19px;
}
.main_right .info_item {
  overflow: hidden;
  margin-top: 40px;
}
</style>