<template>
  <div class="app-container">
    <el-transfer
      filterable
      :filter-method="filterMethod"
      filter-placeholder="请输入角色名称"
      v-model="assignedPermissions"
      :data="permissions"
      :titles="['未分配权限', '已分配权限']"
      @change="handleChange"
    >
    </el-transfer>
  </div>
</template>

<script>
import menu from "@/api/menu";

export default {
  name: "assignRole",
  props: {
    menuId: {
      type: String,
      default: "",
    },
  },
  created() {
    this.loadPermissionsData();
  },
  watch: {
    menuId: {
      handler(val) {
        if(val!="1"){
          this.loadPermissionsData();
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      permissions: [],
      assignedPermissions: [],
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      },
    };
  },
 
  methods: {
    loadPermissionsData() {
      // 数据清空
      this.permissions = [];
      this.assignedPermissions = [];

      // 加载已经分配角色
      menu
        .getAssignedPermissions(this.menuId)
        .then((res) => {
          // debugger
          res.data.forEach((item) => {
            this.assignedPermissions.push(item.id);
          });
        })
        .catch((err) => {
          this.$message.error(err.message);
        });

      // 加载全部权限()
      menu
        .getPermissions(this.menuId)
        .then((res) => {

          res.data.forEach((item) => {
            // console.log(item)
            this.permissions.push({
              label: item.permissionName,
              key: item.id,
            });
          });
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    handleChange(value, direction, movedKeys) {
      // console.log(direction, movedKeys);
      // debugger;
      //分配角色
      if (direction == "right") {
        menu
          .assignPermission(this.menuId, movedKeys)
          .then((res) => {
            // 提示成功
            this.$message.success(res.message);
            // 重新加载数据
          })
          .catch((err) => {
            this.$message.error(err.message);
          });
      }
      if (direction == "left") {
        menu
          .unAssignPermission(this.menuId, movedKeys)
          .then((res) => {
            // 提示成功
            this.$message.success(res.message);
            // 重新加载数据
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