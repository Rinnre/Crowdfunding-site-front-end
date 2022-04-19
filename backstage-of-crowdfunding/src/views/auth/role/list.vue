<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="keywords" placeholder="查询条件" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="loadRoleList()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>

      <el-button type="danger" @click="dialogFormAdd()" style="float: right">批量删除</el-button>
      <el-button
        type="success"
        @click="addFormVisible = true"
        style="float: right"
        >新增角色</el-button
      >
    </el-form>

    <!--添加表单-->
    <el-dialog
      title="新增角色"
      width="598px"
      :visible.sync="addFormVisible"
      @closed="refreshAndClose"
      center
    >
      <roleForm
        :roleInfo="roleInfo"
        @refreshAndClose="refreshAndClose"
      ></roleForm>
    </el-dialog>

     <!--修改表单-->
    <el-dialog
      title="角色详情"
      width="598px"
      :visible.sync="editFormVisible"
      @closed="refreshAndClose"
      center
    >
      <roleForm
        :roleInfo="roleInfo"
        @refreshAndClose="refreshAndClose"
      ></roleForm>
    </el-dialog>

    <!-- banner列表 -->
    <el-table
      v-loading="listLoading"
      :data="roleList"
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

      <el-table-column prop="name" label="角色" />
      <el-table-column prop="description" label="角色描述" />

      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="edit_role(scope.row.id)"
          ></el-button>
          <el-button type="info" size="mini" icon="el-icon-plus"></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="confrim_delete(scope.row.id, scope.row.name)"
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
      @current-change="loadRoleList"
      @size-change="changeSize"
    />
  </div>
</template>

<script>
import role from '@/api/role'
import roleForm from '@/views/auth/role/componets/roleForm'
export default {
  name: "roleList",
  components: {
      roleForm: roleForm,
  },
  data() {
    return {
      listLoading: true, // 数据是否正在加载
      roleList: null, // 账号列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      currentPage: 1, //当前页码
      limit: 10, // 每页记录数
      keywords: "", // 查询表单对象
      addFormVisible: false, // 添加表单是否显示
      editFormVisible:false,// 修改表单是否显示
      multipleTable:[],// 选中的数据
      roleInfo: {},
    };
  },
  created() {
    this.loadRoleList();
  },
  methods: {

    loadRoleList(page = 1) {
      this.page = page;
      // console.log(this.page, this.limit);
      role
        .getRolePages(this.page, this.limit, this.keywords)
        .then((res) => {
          this.roleList = res.data.records;
          //  console.log(this.adminList);
          this.total = res.data.total;
          this.currentPage = res.data.current;
          this.listLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    refreshAndClose() {
      // 清空弹出层数据
      this.roleInfo = {};
      //  console.log("!!!")
      // 关闭弹出层
      this.addFormVisible = false;
      this.editFormVisible = false;

      // 刷新页面
      this.loadRoleList(this.currentPage);
    },


    // 当页码发生改变的时候
    changeSize(size) {
      this.limit = size;
      this.loadRoleList();
    },

    // 重置查询表单
    resetData() {
      console.log("重置查询表单");
      this.keywords = "";
      this.loadRoleList();
    },
    // 确认删除
    confrim_delete(id, name) {
      this.$confirm("此操作将删除角色:" + name + ", 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          role
            .removeRoleById(id)
            .then((res) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.loadRoleList();
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
      this.multipleTable = val;               //  this.multipleTable 选中的值
      // console.log(val);
    },
    dialogFormAdd() {
      var idList = [];
      for (var i = 0; i < this.multipleTable.length; i++) {
        var info = this.multipleTable[i];
        // console.log(halo);
        idList.push(info.id);
      }
      // console.log(idList);
      role.removeRoleByIdList(idList)
        .then((res) =>{
            // 提示成功
            this.$message.success(res.message);
            // 刷新页面
            this.loadRoleList(this.currentPage);
        }).catch((err) =>{
          this.$message.error(err.message);
        })
    },
    edit_role(id) {
      // 查询账号信息
      role.getRoleById(id)
         .then((res) =>{
            this.roleInfo = res.data;
            // console.log(this.adminInfo);
         }).catch((err) =>{
            this.$message.error(err.message);
         })
      // 开启弹出层
      this.editFormVisible = true;

    },
    
  },
};
</script>

<style scoped>
</style>