<template>
  <div class="app-container">
    <el-tree
      :data="permissionsTree"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      @check="check"
      :props="defaultProps"
    >
    </el-tree>
  </div>
</template>

<script>
import role from "@/api/role";
export default {
  name: "assignPermissions",
  props: {
    roleId: {
      type: String,
      default: "",
    },
  },
  created() {
    // console.log(this.roleId)
    this.loadPermissionsTree();
  },
  watch: {
    roleId: {
      handler(val) {
        // console.log(val)
        // 清空上一次选中数据
        this.$refs.tree.setCheckedKeys([]);
        this.loadPermissionsTree();
      },
      deep: true,
    },
  },
  data() {
    return {
      permissionsTree: [],
      assignedPermissions: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    // 加载权限树
    loadPermissionsTree() {
      role
        .getPermissionsTree()
        .then((res) => {
          this.permissionsTree = res.data;
          this.setCheckedKeys();
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    // 设置选中权限
    setCheckedKeys() {
      role
        .getAssignedPermissions(this.roleId)
        .then((res) => {
          this.assignedPermissions = [];
          res.data.forEach((item) => {
            this.assignedPermissions.push(item.id);
          });
          // console.log(this.assignedPermissions)
          this.$refs.tree.setCheckedKeys(this.assignedPermissions);
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    // 权限分配和取消分配
    check(checkedNodes, NodesStatus) {
      // console.log(checkedNodes);
      // console.log(NodesStatus);
      // 判断是分配还是、取消分配（false:取消分配，true:分配）
      let flag = false;
      NodesStatus.checkedKeys.forEach((item) => {
        // debugger;

        if (item == checkedNodes.id) {
          flag = true;
        }
      });
      // 数据处理、对批量操作和单个操作分别处理
      let permissionsId = [];
      if (checkedNodes.children == null || checkedNodes.children.length <= 0) {
        permissionsId.push(checkedNodes.id);
      } else {
        if (flag) {
          checkedNodes.children.forEach((checkedNode) => {
            if (!this.assignedPermissions.includes(checkedNode.id))
              permissionsId.push(checkedNode.id);
          });
        } else {
          checkedNodes.children.forEach((checkedNode) => {
            permissionsId.push(checkedNode.id);
          });
        }
      }
      // 分配权限
      if (flag) {
        role
          .assignPermission(this.roleId, permissionsId)
          .then((res) => {
            this.$message.success(res.message);
            this.loadPermissionsTree();
          })
          .catch((err) => {
            this.$message.error(err.message);
          });
      }
      // 取消分配权限
      if (!flag) {
        role
          .unAssignPermission(this.roleId, permissionsId)
          .then((res) => {
            this.$message.success(res.message);
            this.loadPermissionsTree();
          })
          .catch((err) => {
            this.$message.error(err.message);
          });
      }
    },
  },
};
</script>

<style scoped>
</style>