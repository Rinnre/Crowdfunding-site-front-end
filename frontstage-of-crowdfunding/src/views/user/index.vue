<template>
  <div class="item header">
    <el-row class="tac">
      <el-col :span="12">
        <h5>默认颜色</h5>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">
            <template slot="title">
              <span>我的动态和消息</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">发布动态</el-menu-item>
              <el-menu-item index="1-2">动态管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <span>我的订单</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">订单信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <span>我的关注</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">看好的项目</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <span>我的设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">个人资料</el-menu-item>
              <el-menu-item index="4-2">账号认证</el-menu-item>
              <el-menu-item index="4-3">收款账户</el-menu-item>
              <el-menu-item index="4-4">管理地址薄</el-menu-item>
              <el-menu-item index="4-5">账户与安全</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "UserIndex",
  data() {
    return {};
  },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
};
</script>

<style scoped>
</style>