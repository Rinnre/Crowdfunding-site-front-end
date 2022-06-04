<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select
          v-model="authStatus"
          placeholder="请选择认证状态"
          @change="authStatusChanged"
        >
          <el-option
            v-for="item in authList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
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
      <el-table-column prop="authStatus" label="认证状态" />

      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-view"
            @click="viewUserInfo(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="用户认证信息"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form ref="user" :model="user" label-width="100px">
        <el-form-item label="真实姓名">
          <el-input v-model="user.realName" readonly></el-input>
        </el-form-item>
        <el-form-item label="认证类型">
          <el-input v-model="user.authType" readonly></el-input>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input v-model="user.idNumber" readonly></el-input>
        </el-form-item>
        <el-form-item label="认证状态">
          <el-input v-model="user.authStatus" readonly></el-input>
        </el-form-item>
        <el-form-item label="认证图片">
          <el-image
            style="width: 100px; height: 100px"
            :src="user.frontIdPicture"
            fit="contain"
          ></el-image>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          v-if="user.authStatus == '已认证'"
          type="primary"
          @click="dialogVisible = false"
          >确 定</el-button
        >
        <el-button
          v-if="user.authStatus == '认证中'"
          type="primary"
          @click="authUser()"
          >通过</el-button
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
      authList: [
        { id: 0, name: "未认证" },
        { id: 1, name: "已认证" },
        { id: 2, name: "认证中" },
      ],
      authStatus: "",
    };
  },
  created() {
    this.initUserList();
  },
  methods: {
    initUserList() {
      user
        .getUserPages(this.page, this.limit, this.keywords, this.authStatus)
        .then((res) => {
          // console.log(res.data);
          this.userList = res.data.records;
          this.userList.forEach((user) => {
            if (user.authStatus == 0) {
              user.authStatus = "未认证";
            } else if (user.authStatus == 1) {
              user.authStatus = "已认证";
            } else {
              user.authStatus = "认证中";
            }
          });
          this.listLoading = false;
        });
    },
    viewUserInfo(user) {
      this.user = user;
      this.dialogVisible = true;
      console.log(user);
    },
    authStatusChanged() {
      this.initUserList();
    },
    authUser() {
      user.authUser(this.user.uid,this.authList[1].id).then((res) => {
        this.$message.success(res.message);
        this.initUserList();
        this.dialogVisible = false;
      });
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