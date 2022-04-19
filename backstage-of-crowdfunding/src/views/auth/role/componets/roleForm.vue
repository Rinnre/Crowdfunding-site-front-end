<template>
  <div class="form-container">
    <!--添加表单-->

    <el-form
      :model="roleInfoDetail"
      :rules="rules"
      ref="roleInfoDetail"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="roleInfoDetail.name"></el-input>
      </el-form-item>

      <el-form-item label="角色描述" prop="description">
        <el-input v-model="roleInfoDetail.description"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('roleInfoDetail')"
          v-if="null == roleInfoDetail.id"
          >创建</el-button
        >
        <el-button
          type="danger"
          @click="resetForm('roleInfoDetail')"
          v-if="null == roleInfoDetail.id"
          >重置</el-button
        >
        <el-button
          type="primary"
          @click="saveForm('roleInfoDetail')"
          v-if="null != roleInfoDetail.id"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import role from "@/api/role";
export default {
  name: "roleForm",
  props: {
    roleInfo: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      roleInfoDetail: this.roleInfo,
      disabled: false,
      rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 3,
            max: 7,
            message: "长度在 3 到 7 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    roleInfo: {
      handler(val) {
        // console.log(val);
        this.disabled = true;
        this.roleInfoDetail = val;
      },
      deep: true,
    },
  },
  methods: {
    // 添加账号
    submitForm(formName) {
      // console.log(formName);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //  console.log(this.roleInfoDetail)
          role
            .addRole(this.roleInfoDetail)
            .then((res) => {
              this.$message.success(res.message);
              this.$emit("refreshAndClose");
            })
            .catch((err) => {
              this.$message.error(res.message);
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
    saveForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //  console.log(this.adminInfo)
          role
            .modifyRoleById(this.roleInfoDetail.id, this.roleInfoDetail)
            .then((res) => {
              // 弹框提示添加成功
              this.$message.success(res.message);

              // 关闭添加弹出层
              // 重新加载数据
              // debugger;
              this.$emit("refreshAndClose");
            })
            .catch((err) => {
              console.log(err);
              // 弹出错误信息
              this.$message.error(err.message);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
</style>