<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="keywords" placeholder="查询条件" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="initUserList()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!-- banner列表 -->
    <el-table
      v-loading="listLoading"
      :data="userList"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="uid" label="UID" />
      <el-table-column label="头像" width="100">
        <template slot-scope="scope">
          <el-avatar :size="50" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>

      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="nickName" label="昵称" />

      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-view"
            @click="viewUserInfo(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="confrim_delete(scope.row.id, scope.row.loginAcct)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="用户信息"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form ref="user" :model="user" label-width="100px">
        <el-form-item label="用户头像">
          <el-avatar :size="50" :src="user.avatar"></el-avatar>
        </el-form-item>
        <el-form-item label="用户UID">
          <el-input v-model="user.uid" readonly></el-input>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input v-model="user.nickName" readonly></el-input>
        </el-form-item>
        <el-form-item label="用户手机号">
          <el-input v-model="user.phone" readonly></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-input v-model="user.gender" readonly></el-input>
        </el-form-item>
        <el-form-item label="用户生日">
          <el-input v-model="user.birthday" readonly></el-input>
        </el-form-item>
        <el-form-item label="用户简介">
          <el-input v-model="user.biography" readonly></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import user from "@/api/user";
export default {
  name: "",
  data() {
    return {
      listLoading: true, // 数据是否正在加载
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      currentPage: 1, //当前页码
      limit: 10, // 每页记录数
      keywords: "", // 查询表单对象
      userList: [],
      user: {},
      dialogVisible: false,
    };
  },
  created() {
    this.initUserList();
  },
  methods: {
    initUserList() {
      user.getUserPages(this.page, this.limit, this.keywords).then((res) => {
        console.log(res.data);
        console.log(this.data);
        this.userList = res.data.records;
        this.userList.forEach((user) => {
          if (user.gender == 0) {
            user.gender = "女";
          } else if (user.gender == 1) {
            user.gender = "男";
          } else {
            user.gender = "保密";
          }
          user.birthday = user.birthday.split("T")[0];
          //  user.birthday = new Date(user.birthday);
          //  user.birthday = user.birthday.format("yyyy-MM-dd");
        });
        this.listLoading = false;
      });
    },
    viewUserInfo(user) {
      this.user = user;
      this.dialogVisible = true;
      console.log(user);
    },
    handleClose() {
      this.user = {};
      this.dialogVisible = false;
    },
  },
};
</script>

<style scoped>
</style>