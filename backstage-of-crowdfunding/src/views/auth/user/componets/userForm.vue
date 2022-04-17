<template>
  <div class="form-container">
    <!--添加表单-->

    <el-form
      :model="adminInfo"
      :rules="rules"
      ref="adminInfo"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="登录账号" prop="loginAcct">
        <el-input v-model="adminInfo.loginAcct"></el-input>
      </el-form-item>

      <el-form-item label="用户昵称" prop="nickName">
        <el-input v-model="adminInfo.nickName"></el-input>
      </el-form-item>

      <el-form-item label="登录密码" prop="password">
        <el-input
          type="password"
          v-model="adminInfo.password"
          auto-complete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPassword">
        <el-input
          type="password"
          v-model="adminInfo.checkPassword"
          auto-complete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="adminInfo.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('adminInfo')"
          >创建</el-button
        >
        <el-button type="danger" @click="resetForm('adminInfo')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "userForm",
  props: ['adminInfo'],
  data() {
    // 自定义密码校验规则
    var validatePass = (rule, value, callback) => {
      if (value === "" || null == value) {
        callback(new Error("请输入密码"));
      } else {
        if (
          this.adminInfo.checkPassword !== "" ||
          null == this.adminInfo.checkPassword
        ) {
          this.$refs.adminInfo.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      
      if (value === "" || null == value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.adminInfo.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    // 自定义邮箱验证规则
    var validateEmail = (rule, value, callback) => {
      var reg =
        /[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      //  console.log(reg.test(value))
      if (value === "" || null == value) {
        callback(new Error("请输入邮箱"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入正确格式的邮箱,例如xxxxx@xx.com"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        loginAcct: [
          { required: true, message: "请输入登录账号", trigger: "blur" },
          {
            min: 3,
            max: 11,
            message: "长度在 3 到 11 个字符",
            trigger: "blur",
          },
        ],
        nickName: [
          { required: false, message: "请输入用户昵称", trigger: "blur" },
          { min: 0, max: 11, message: "长度在 11个字符以内", trigger: "blur" },
        ],
        password: [
          { validator: validatePass, required: true, trigger: "blur" },
          {
            min: 6,
            max: 11,
            message: "长度在 6 到 11 个字符",
            trigger: "blur",
          },
        ],
        checkPassword: [
          { validator: validatePass2, required: true, trigger: "blur" },
          {
            min: 6,
            max: 11,
            message: "长度在 3 到 11 个字符",
            trigger: "blur",
          },
        ],
        email: [{ validator: validateEmail, required: true, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 添加账号
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //  console.log(this.adminInfo)
          admin
            .addAdmin(this.adminInfo)
            .then((res) => {
              // 弹框提示添加成功
              this.$message.success(res.message);

              // 关闭添加弹出层
              this.addFormVisible = false;
              // 重新加载数据
              this.loadAdminList(this.currentPage);
            })
            .catch((err) => {
              // 弹出错误信息
              this.$message.error(err.message);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
</style>