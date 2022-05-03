<template>
  <div class="form-container">
    <!--添加表单-->

    <el-form
      :model="menuInfoDetail"
      :rules="rules"
      ref="menuInfoDetail"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="menuInfoDetail.name"></el-input>
      </el-form-item>

      <el-form-item label="类型" prop="type">
        <div>
          <el-radio v-model="menuInfoDetail.type" label="0" border>菜单</el-radio>
          <el-radio v-model="menuInfoDetail.type" label="1" border>页面</el-radio>
        </div>
      </el-form-item>

      <el-form-item label="访问路径" prop="path">
        <el-input v-model="menuInfoDetail.path"></el-input>
      </el-form-item>

      <el-form-item label="组件路径" prop="component">
        <el-input v-model="menuInfoDetail.component"></el-input>
      </el-form-item>

      <el-form-item label="图标" prop="icon">
        <el-input v-model="menuInfoDetail.icon"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('menuInfoDetail')"
          v-if="null == menuInfoDetail.id"
          >创建</el-button
        >
        <el-button
          type="danger"
          @click="resetForm('menuInfoDetail')"
          v-if="null == menuInfoDetail.id"
          >重置</el-button
        >
        <el-button
          type="primary"
          @click="saveForm('menuInfoDetail')"
          v-if="null != menuInfoDetail.id"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import menu from "@/api/menu";
export default {
  name: "menuForm",
  props: {
    menuInfo: {
      type: Object,
    },
  },
  data() {
    return {
      menuInfoDetail: this.menuInfo,
      rules: {
        name: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
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
    menuInfo: {
      handler(val) {
        this.menuInfoDetail = val;
        // console.log(this.menuInfoDetail)
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
          //  console.log(this.menuInfoDetail)
          menu
            .addMenu(this.menuInfoDetail)
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
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 保存表单
    saveForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //  console.log(this.adminInfo)
          menu
            .modifyMenu(this.menuInfoDetail)
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