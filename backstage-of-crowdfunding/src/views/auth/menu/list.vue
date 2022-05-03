<template>
  <div class="app-container">
    <!--添加表单-->
    <el-dialog
      title="新增菜单"
      width="598px"
      :visible.sync="addFormVisible"
      @closed="refreshAndClose"
      center
    >
      <menuForm
        :menuInfo="menuInfo"
        @refreshAndClose="refreshAndClose"
      ></menuForm>
    </el-dialog>

    <!--修改表单-->
    <el-dialog
      title="菜单详情"
      width="598px"
      :visible.sync="editFormVisible"
      @closed="refreshAndClose"
      center
    >
      <menuForm
        :menuInfo="menuInfo"
        @refreshAndClose="refreshAndClose"
      ></menuForm>
    </el-dialog>

     <!--菜单权限-->
    <el-dialog
      title="菜单权限"
      width="690px"
      :visible.sync="permissionVisible"
      @closed="refreshAndClose"
      center
    >
      <assignedPermissions
        :menuId="menuInfo.id"
        @refreshAndClose="refreshAndClose"
      ></assignedPermissions>
    </el-dialog>


    <el-table
      :data="menuList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="name" label="菜单名称" width="180">
      </el-table-column>
      <el-table-column prop="permissionValue" label="所需权限" width="180">
        <template slot-scope="scope">
          <span
            v-for="permission in scope.row.permissionValue"
            :key="permission.id"
          >
            {{ permission.permissionName }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="path" label="访问路径"> </el-table-column>
      <el-table-column prop="component" label="组件路径"> </el-table-column>
      <el-table-column prop="icon" label="图标"> </el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            v-if="scope.row.id!=1"
            @click="editMenu(scope.row)"
          ></el-button>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-plus"
            v-if="scope.row.type === 0"
            @click="addMenu(scope.row.id)"
          ></el-button>
          <el-button
            type="info"
            size="mini"
            icon="el-icon-sort"
            v-if="scope.row.type === 1"
            @click="assigneMenu(scope.row.id)"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            v-if="scope.row.id!=1"
            @click="confrim_delete(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import menu from "@/api/menu.js";
import menuForm from "@/views/auth/menu/componets/menuForm";
import assignedPermissions from "@/views/auth/menu/componets/assignPermissions";

export default {
  name: "menuList",
  components: {
    menuForm: menuForm,
    assignedPermissions: assignedPermissions
  },
  data() {
    return {
      menuList: [], // 菜单树
      menuInfo: {}, // 添加和修改菜单节点对象
      addFormVisible: false, // 添加表单是否显示
      editFormVisible: false, // 修改表单是否显示
      permissionVisible: false, // 修改表单是否显示
    };
  },
  created() {
    this.initMenuList();
  },
  methods: {
    // 初始化数据
    initMenuList() {
      menu
        .getMenuTree()
        .then((res) => {
          this.menuList = [];
          this.menuList.push(res.data);
          // console.log(this.menuList);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 供子组件关闭弹出层使用
    refreshAndClose() {
      //  console.log("!!!")
      // 关闭弹出层
      this.addFormVisible = false;
      this.editFormVisible = false;
      this.permissionVisible = false;

      // 刷新页面
      this.initMenuList();
    },

    // 开启添加弹出层
    addMenu(id) {
      // 清除上一次的数据
      this.menuInfo = {};
      this.menuInfo.pid = id;
      this.addFormVisible = true;
    },
    // 开启权限弹出层
    assigneMenu(id){
      this.menuInfo = {};
      this.menuInfo.id = id;
      // console.log(this.menuInfo.id);
      this.permissionVisible = true;
    },
    // 开启修改弹出层
    editMenu(menu) {
      // 清除上一次的数据
      this.menuInfo = {};
      // 获取回显数据
      this.menuInfo = menu;
      // console.log(this.menuInfo);
      this.editFormVisible = true;
    },
    // 确认删除
    confrim_delete(menuInfo) {
      if (menuInfo.children != null && menuInfo.children.length > 0) {
        this.$message({
          type: "error",
          message: "存在子节点删除失败",
        });
        return;
      }
      this.$confirm(
        "此操作将删除菜单:" + menuInfo.name + ", 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        }
      )
        .then(() => {
          menu
            .removeMenu(menuInfo.id)
            .then((res) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.initMenuList();
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
  },
};
</script>

<style scoped>
</style>