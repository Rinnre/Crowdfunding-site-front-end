<template>
  <div class='header-user'>
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
          <ul class="no-login fl">
            <li>
              <div class="btn account_publish"
                style="width: 120px;height: 40px;background: #00C4A1;text-align:center;color:#fff;cursor:pointer;font-size:16px;line-height:38px;margin-top:-5px;">
                <a href="https://account.modian.com/initiate/" target="_blank" style="color:#fff;">
                  <span>发起项目</span>
                </a>
              </div>
            </li>

            <li class="pro_search" id="searchDiv" style="margin-left: 40px;">
              <span class="icon" id="searchIcon"><i class="iconfont icon-search"></i></span>
              <div class="inpt" style="display:none;">
                <input value="" type="text" id="search_input" autocomplete="off"
                  style="max-width: 236px; min-width: 120px; width: 46px;">
              </div>
              <div class="search_result" style="max-height: 598px;"></div>
            </li>
            <li class="line"><span></span></li>
            <li class="nologin-entra">
              <a class="thrLogin m_ga_all_sign" href="#" id="wechat">
                <i class="iconfont icon-wechat"></i>
              </a>
              <span class="m_ga_all_sign" @click="login" id="loginBtn">
                <i class="iconfont icon-phone"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <!--添加表单-->
    <el-dialog width="570px" :show-close="false" center :visible.sync="loginFormVisible"
      @closed="refreshAndClose">
      <login @refreshAndClose="refreshAndClose"></login>
    </el-dialog>
  </div>
</template>

<script>
import login from '@/views/home/components/login'

export default {
  name: 'Header',
  components: {
    login: login,
  },
  data() {
    return {
      loginFormVisible: false, // 登录弹框可见性
    }
  },
  methods: {
    refreshAndClose() {
      this.loginFormVisible = false;
    },
    login() {
      this.loginFormVisible = true;
    }
  }
}
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


</style>