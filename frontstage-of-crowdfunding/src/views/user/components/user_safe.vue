<template>
  <div class="safe_main">
    <div class="header">
      <p>账户安全</p>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisible"
      @closed="reset"
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          v-if="type == 'password'"
          label="旧密码"
          prop="oldPassword"
        >
          <el-input
            type="password"
            v-model="ruleForm.oldPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="type == 'password'||type == 'phone2'"
          label="新密码"
          prop="newPassword"
        >
          <el-input
            type="password"
            v-model="ruleForm.newPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="type == 'password' || type == 'phone2'"
          label="确认密码"
          prop="checkPass"
        >
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="type == 'phone1'" readonly label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item v-if="type == 'phone1'" label="验证码" prop="code">
          <span class="code_input">
            <el-input v-model="ruleForm.code"> </el-input>
          </span>
          <el-button
            style="float: right"
            type="warning"
            @click="getCodeFun()"
            >{{ codeTest }}</el-button
          >
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
      </div>
    </el-dialog>
    <div class="box safe_body">
      <dl class="item">
        <dt>密码登录<b>已设置</b></dt>
        <dd>
          <a
            href="javascript:;"
            class="lnk_change_pwd"
            @click="
              dialogFormVisible = true;
              type = 'password';
            "
            >修改密码</a
          >
          <p>
            安全性高的密码可以使账号更安全，建议您定期更换密码，且设置一个包含数字和字母，并长度超过6位以上的密码。
          </p>
        </dd>
      </dl>
      <dl class="item">
        <dt>手机绑定<b>已设置</b></dt>
        <dd>
          <a
            href="javascript:;"
            class="lnk_change_pwd"
            @click="
              dialogFormVisible = true;
              type = 'phone1';
            "
            >修改密码</a
          >
          <p>
            绑定手机后，您即可享受摩点丰富的手机服务，如手机登录、手机找回密码等。
          </p>
        </dd>
      </dl>
    </div>
    <div class="box safe_body">
      <dl class="item">
        <dt :class="{ 'not-set': this.userInfo.authStatus != 1 }">
          账号认证<b>{{ userAuthStatus }}</b>
        </dt>
        <dd>
          <a
            href="#/user/auth"
            v-if="this.userInfo.authStatus == 0"
            class="lnk_change_pwd"
            >立刻认证</a
          >
          <a href="#/user/auth" v-else class="lnk_change_pwd">立刻查看</a>
          <p>
            提交账号认证可保护您的账号安全，避免账号被盗，花1分钟填写一下吧！
          </p>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import user from "@/api/user";
export default {
  name: "UserSafe",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码最小长度为6"));
      } else if (value == this.ruleForm.oldPassword) {
        callback(new Error("新密码不得与旧密码相同"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码最小长度为6"));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      userInfo: this.$store.state.user,
      dialogFormVisible: false,
      type: "password",
      form: {},
      second:10,
      ruleForm: {
        newPassword: "",
        checkPass: "",
        phone:this.$store.state.phone
      },
      codeTest: "获取验证码",
      rules: {
        oldPassword: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          { min: 6, message: "密码长度最小为6位", trigger: "blur" },
        ],
        newPassword: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    userAuthStatus() {
      if (this.userInfo.authStatus == 0) {
        return "未认证";
      } else if (this.userInfo.authStatus == 1) {
        return "已认证";
      } else {
        return "认证中";
      }
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type == "password") {
            user.modifyPassword(this.ruleForm).then((res) => {
              this.$message.success(res.message);
              this.dialogFormVisible = false;
              this.resetForm("ruleForm");
            });
          }
          if(this.type == 'phone1'){
            user.confirm_code(this.ruleForm)
                .then((res) =>{
                  this.$message.success("验证成功！")
                  this.type = 'phone2';
                  this.resetForm("ruleForm");
                })
          }

          if(this.type == 'phone2'){
              user.modifyPasswordByPhone(this.ruleForm)
                  .then((res) =>{
                    this.$message.success("修改成功！");
                    this.dialogFormVisible = false;
                    this.resetForm("ruleForm");
                  })
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    reset() {
      this.resetForm("ruleForm");
    },
    getCodeFun() {
      this.disabled = true;
      this.timer();
      user
        .send_code(this.ruleForm.phone, "modify")
        .then((res) => {
          this.$message.success(res.message);
        })
        .catch((err) => {
          this.disabled = false;
        });
    },
    timer() {
      this.codeTest = this.second
      const result = setInterval(() => {
        --this.second
        this.codeTest = this.second
        if (this.second < 1) {
          clearInterval(result)
          this.disabled = false
          this.second = 10
          this.codeTest = "重新发送"
        }
      }, 1000)
    },
  },
};
</script>

<style scoped>
.safe_main .header {
  overflow: hidden;
  padding-bottom: 15px;
  border-bottom: solid 1px #dee0e1;
}

.safe_main .header p:first-child {
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: #222c37;
  float: left;
  margin: 0;
  cursor: pointer;
}
/*  */
.safe_main .box {
  background: #fff;
  border-radius: 6px;
  -webkit-box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12),
    0 1px 6px 0 rgba(0, 0, 0, 0.12);
  -moz-box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12),
    0 1px 6px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12), 0 1px 6px 0 rgba(0, 0, 0, 0.12);
  /* border: 1px solid #e0e0e0; */
  display: block;
  margin-top: 30px;
  padding-bottom: 30px;
  overflow: hidden;
}

.safe_main .box.safe_body {
  padding-bottom: 40px;
}

/*  */
.safe_main dl.item {
  padding-top: 40px;
  padding-left: 30px;
  padding-right: 30px;
  /* padding: 30px; */
}

.safe_main dl.item dt {
  width: 143px;
  float: left;
  color: #3e4d34;
  font-weight: bolder;
}

.safe_main .safe_body .item dt {
  height: 35px;
  text-indent: 45px;
  background: url("../../../assets/img/space_account_safety_setup_ico_34x34.png")
    no-repeat left center;
}

.safe_main .item dt b {
  display: block;
  font-size: 14px;
  color: #37cb58;
}
.safe_main .safe_body dl.item dd {
  color: #223317;
  font-size: 14px;
  margin-left: -65px;
}
.safe_main .safe_body .item dd p {
  width: 578px;
}

.safe_main .safe_body .item dd a {
  width: 120px;
  height: 36px;
  line-height: 36px;
  color: #223318 !important;
  text-align: center;
  border-radius: 4px;
  border: #d3d2d2 solid 1px;
}

.safe_main .safe_body dl.item dd a {
  float: right;
  font-size: 14px;
  color: #37cb58;
}

.safe_main .safe_body .item dt.not-set {
  background: url("../../../assets/img/space_account_safety_noset_ico_34x34.png")
    no-repeat left center;
}
.code_input /deep/ .el-input {
  width: 250px;
}
</style>