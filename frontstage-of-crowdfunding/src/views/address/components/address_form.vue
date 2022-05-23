<template>
  <div class="">
    <el-form
      :model="addAdminInfo"
      :rules="rules"
      ref="addAdminInfo"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="登录账号" prop="loginAcct">
        <el-input
          v-model="addAdminInfo.loginAcct"
          :disabled="disabled"
        ></el-input>
      </el-form-item>

      <el-form-item label="用户昵称" prop="nickName">
        <el-input v-model="addAdminInfo.nickName"></el-input>
      </el-form-item>

      <el-form-item
        label="登录密码"
        prop="password"
        v-if="null == addAdminInfo.id"
      >
        <el-input
          type="password"
          v-model="addAdminInfo.password"
          auto-complete="off"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="确认密码"
        prop="checkPassword"
        v-if="null == addAdminInfo.id"
      >
        <el-input
          type="password"
          v-model="addAdminInfo.checkPassword"
          auto-complete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="addAdminInfo.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('addAdminInfo')"
          v-if="null == addAdminInfo.id"
          >创建</el-button
        >
        <el-button
          type="danger"
          @click="resetForm('addAdminInfo')"
          v-if="null == addAdminInfo.id"
          >重置</el-button
        >
        <el-button
          type="primary"
          @click="saveForm('addAdminInfo')"
          v-if="null != addAdminInfo.id"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    adminInfo: {
      type: Object,
      default: {},
    },
  },
  date() {
    return {};
  },
};
</script>

<style scoped>
</style>