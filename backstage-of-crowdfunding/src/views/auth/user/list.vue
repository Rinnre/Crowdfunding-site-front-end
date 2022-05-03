<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="keywords" placeholder="查询条件" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="loadAdminList()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>

      <el-button type="danger" @click="removeAdminBatch()" style="float: right"
        >批量删除</el-button
      >
      <el-button
        type="success"
        @click="addFormVisible = true"
        style="float: right"
        >新增账号</el-button
      >
    </el-form>

    <!--添加表单-->
    <el-dialog
      title="新增账号"
      width="598px"
      :visible.sync="addFormVisible"
      @closed="refreshAndClose"
      center
    >
      <userForm
        :adminInfo="adminInfo"
        @refreshAndClose="refreshAndClose"
      ></userForm>
    </el-dialog>

    <!--修改表单-->
    <el-dialog
      title="账号详情"
      width="598px"
      :visible.sync="editFormVisible"
      @closed="refreshAndClose"
      center
    >
      <userForm
        :adminInfo="adminInfo"
        @refreshAndClose="refreshAndClose"
      ></userForm>
    </el-dialog>

    <!--分配角色-->
    <el-dialog
      title="分配角色"
      width="690px"
      :visible.sync="assignRoleVisible"
      @closed="refreshAndClose"
      center
    >
      <assignRole
        :adminId="adminId"
        @refreshAndClose="refreshAndClose"
      ></assignRole>
    </el-dialog>

    <!-- banner列表 -->
    <el-table
      v-loading="listLoading"
      :data="adminList"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="loginAcct" label="账号" />
      <el-table-column prop="nickName" label="昵称" />
      <el-table-column prop="email" label="邮箱地址" />

      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="editAdmin(scope.row.id)"
          ></el-button>
          <el-button
            type="info"
            size="mini"
            icon="el-icon-sort"
            @click="assginRole(scope.row.id)"
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

    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center"
      layout="sizes, prev, pager, next, jumper, ->, total, slot"
      @current-change="loadAdminList"
      @size-change="changeSize"
    />
  </div>
</template>

<script>
import admin from "@/api/admin";
import userForm from "@/views/auth/user/componets/userForm";
import assignRole from "@/views/auth/user/componets/assignRole";
export default {
  name: "adminList",
  components: {
    userForm: userForm,
    assignRole: assignRole,
  },
  data() {
    return {
      listLoading: true, // 数据是否正在加载
      adminList: null, // 账号列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      currentPage: 1, //当前页码
      limit: 10, // 每页记录数
      keywords: "", // 查询表单对象
      addFormVisible: false, // 添加表单是否显示
      editFormVisible: false, // 修改表单是否显示
      assignRoleVisible: false, // 角色分配表单是否显示
      multipleTable: [], // 选中的数据
      adminInfo: {}, // 用于账号的添加和修改
      adminId: "", //当前行账号的Id
    };
  },
  created() {
    this.loadAdminList();
  },
  methods: {
    refreshAndClose() {
      //  console.log("!!!")
      // 关闭弹出层
      this.addFormVisible = false;
      this.editFormVisible = false;
      this.assignRoleVisible = false;

      // 刷新页面
      this.loadAdminList(this.currentPage);
    },
    loadAdminList(page = 1) {
      this.page = page;
      // console.log(this.page, this.limit);
      admin
        .getAdminPageList(this.page, this.limit, this.keywords)
        .then((res) => {
          this.adminList = res.data.records;
          //  console.log(this.adminList);
          this.total = res.data.total;
          this.currentPage = res.data.current;
          this.listLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 当页码发生改变的时候
    changeSize(size) {
      this.limit = size;
      this.loadAdminList();
    },

    // 重置查询表单
    resetData() {
      console.log("重置查询表单");
      this.keywords = "";
      this.loadAdminList();
    },
    // 确认删除
    confrim_delete(id, loginAcct) {
      this.$confirm("此操作将删除账号:" + loginAcct + ", 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          admin
            .removeAdminById(id)
            .then((res) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.loadAdminList();
            })
            .catch((err) => {
              this.$message.error(err.message);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSelectionChange(val) {
      this.multipleTable = val; //  this.multipleTable 选中的值
      // console.log(val);
    },
    // 获取选中所有行
    removeAdminBatch() {
      var idList = [];
      for (var i = 0; i < this.multipleTable.length; i++) {
        var info = this.multipleTable[i];
        // console.log(halo);
        idList.push(info.id);
      }
      if (idList.length == 0 || idList == null) {
        this.$message.error("未选中任何账号！");
        return;
      }
      // console.log(idList);
      //确认删除
      this.$confirm("此操作将删除所有选中账号\n是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          admin
            .removeAdminByIdList(idList)
            .then((res) => {
              // 提示成功
              this.$message.success(res.message);
              // 刷新页面
              this.loadAdminList(this.currentPage);
            })
            .catch((err) => {
              this.$message.error(err.message);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 开启添加弹框
    addAdmin() {
      this.adminInfo = {};
      this.addFormVisible = true;
    },
    // 开启分配角色弹框
    assginRole(id) {
      // 获取该账号已经分配的角色
          this.adminId = id;
          this.assignRoleVisible = true;
    
    },
    editAdmin(id) {
      // 查询账号信息
      admin
        .getAdminById(id)
        .then((res) => {
          this.adminInfo = res.data;
          // console.log(this.adminInfo);
          // 开启弹出层
          this.editFormVisible = true;
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
  },
};
</script>

<style scoped>
</style>