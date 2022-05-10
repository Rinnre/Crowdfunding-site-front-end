<template>
  <div class="home">
    <navigation></navigation>
    <div class="login_field">
      <h3 v-if="mode == 'code'">
        验证码登录
        <span @click="mode = 'account'"><i class="iconfont icon-phone"></i>账号密码登录</span>
      </h3>
      <h3 v-if="mode == 'account'">
        账号登录
        <span @click="mode = 'code'"><i class="iconfont icon-phone"></i>验证码登录</span>
      </h3>
      <h3 v-if="mode == 'wx'">登录</h3>
      <div v-if="mode == 'wx'" class="op_field">
        <div class="tips">
          <p>第三方合作网站登录</p>
        </div>
        <a class="btn wechat hover">微信登录</a>
      </div>
      <div v-else class="op_field">
        <div class="top_input">
          <div class="input_area">
            <div class="phone">
              <input type="text" v-model="user.phone" placeholder="请输入您的手机号" />
            </div>
          </div>
        </div>
        <div v-if="mode == 'code'" class="bottom_input">
          <div class="vcode">
            <input type="text" v-model="user.code" placeholder="请输入短信验证码" />
          </div>
          <div class="getCode hover">免费获取短信验证码</div>
        </div>
        <div v-if="mode == 'account'" class="bottom_input other_input">
          <div class="password">
            <input type="password" v-model="user.password" placeholder="请输入您的密码" />
          </div>
        </div>
        <div :class="{ other_input: mode === 'account', 'loginBtn hover': true }" @click="submit_login_info()">
          登录
        </div>
        <p v-if="mode == 'code'" class="agreement">
          点击"登录"即表明您已阅读并同意
          <a href="#" target="_blank">《用户协议》</a>
        </p>
      </div>
      <div v-if="mode != 'wx'" class="login_bottom">
        <span @click="mode = 'wx'">第三方合作网站登录</span>
      </div>
      <div v-else class="login_bottom">
        使用手机号
        <span @click="mode = 'code'">注册新账号或登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from "@/api/user";
import navigation from '@/components/header/navigation';

export default {
  name: "Login",
  components: {
    navigation: navigation
  },
  data() {
    return {
      mode: "code",
      user: {
        phone: "",
        code: "",
        password: "",
      },
    };
  },
  watch: {},
  created() { },
  methods: {
    submit_login_info() {
      if (
        this.user.phone != "" &&
        this.user.password != "" &&
        this.code === "account"
      ) {
        userApi
          .login_password(this.user)
          .then((res) => {
            console.log(res.data);
            this.message.success(res.message);
          })
          .catch((err) => {
            this.message.success(err.message);
          });
      }

      if (
        this.user.phone != "" &&
        this.user.code != "" &&
        this.code === "code"
      ) {
        userApi
          .login_code(this.user)
          .then((res) => {
            console.log(res.data);
            this.message.success(res.message);
          })
          .catch((err) => {
            this.message.success(err.message);
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  -moz-user-select: none;
  /*火狐*/

  -webkit-user-select: none;
  /*webkit浏览器*/

  -ms-user-select: none;
  /*IE10*/

  -khtml-user-select: none;
  /*早期浏览器*/

  user-select: none;
}



.home .login_field {
  margin: 30px auto 124px;
  width: 539px;
  -webkit-box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12),
    0 1px 6px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12), 0 1px 6px 0 rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  background: #fff;
  display: table;
}

.home .login_field h3 {
  height: 80px;
  line-height: 80px;
  font-size: 34px;
  padding-left: 100px;
  border-bottom: 1px solid #ccc;
  position: relative;
}

.home .login_field h3 span {
  color: #37cb58;
  font-size: 14px;
  line-height: 14px;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 100px;
  cursor: pointer;
}

.home .login_field .op_field {
  padding: 40px 100px 0 100px;
}

.home .login_field .op_field .top_input {
  padding-bottom: 4px;
}

.home .login_field .op_field .top_input .input_area {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  -webkit-box-pack: justify;
  justify-content: space-between;
}

.home .login_field .op_field .top_input .input_area .area {
  width: 118px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
}

.home .login_field .op_field .top_input .input_area .area input {
  width: 103px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: transparent;
  cursor: pointer;
}

.home .login_field .op_field .top_input .input_area .phone {
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
}

.home .login_field .op_field .top_input .input_area .phone input {
  width: 100%;
}

.home .login_field .op_field .tips {
  height: 21px;
  position: relative;
}

.home .login_field .op_field .tips p {
  background: #fff;
  padding: 0 10px;
  line-height: 21px;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}

.home .login_field .op_field .btn.wechat {
  background: #60c84d;
  margin-bottom: 20px;
}

.home .login_field .op_field .btn {
  display: inline-block;
  width: 340px;
  height: 50px;
  background: #f1451d;
  color: #fff;
  line-height: 50px;
  font-size: 16px;
  border-radius: 2px;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  margin-top: 20px;
  text-align: center;
  position: relative;
}

.home .login_field .op_field .bottom_input {
  position: relative;
  padding: 40px 0 5px 0;
}

.home .login_field .op_field .bottom_input .vcode {
  width: 180px;
  border-bottom: 1px solid #e0e0e0;
}

.home .login_field .op_field .bottom_input .vcode input {
  width: 100%;
}

.home .login_field .op_field .bottom_input .getCode {
  position: absolute;
  top: 40px;
  right: 0;
  width: 143px;
  height: 36px;
  background-color: #37cb58;
  border-radius: 3px;
  cursor: pointer;
  color: #fff;
  line-height: 36px;
  text-align: center;
}

.home .login_field .op_field .bottom_input.other_input {
  padding: 20px 0 0 0;
}

.home .login_field .op_field .bottom_input.other_input .password {
  border-bottom: 1px solid #e0e0e0;
}

.home .login_field .op_field .bottom_input.other_input .password {
  border-bottom: 1px solid #e0e0e0;
}

.home .login_field .op_field .loginBtn {
  width: 100%;
  height: 50px;
  background-color: #37cb58;
  font-size: 18px;
  line-height: 50px;
  color: #fff;
  border-radius: 3px;
  margin-top: 20px;
  cursor: pointer;
  text-align: center;
}

.home .login_field .op_field .loginBtn.other_input {
  margin-bottom: 40px;
}

.home .login_field .op_field .agreement {
  margin: 20px 0 40px 0;
}

.home .login_field .op_field .agreement a {
  color: #43a4fc;
  text-decoration: underline;
}

.home .login_field .login_bottom {
  height: 54px;
  line-height: 54px;
  background-color: #f6f9f9;
  border-top: 1px solid #ccc;
  text-align: center;
}

.home .login_field .login_bottom span {
  cursor: pointer;
  font-size: 14px;
  color: #43a4fc;
  text-indent: 0;
  text-decoration: underline;
}
</style>
