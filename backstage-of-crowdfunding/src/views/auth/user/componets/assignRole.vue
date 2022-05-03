<template>
  <div class="app-container">
    <el-transfer
      filterable
      :filter-method="filterMethod"
      filter-placeholder="请输入角色名称"
      v-model="assignedRoles"
      :data="roles"
      :titles="['未分配角色', '已分配角色']"
      @change="handleChange"
    >
    </el-transfer>
  </div>
</template>

<script>
import role from "@/api/role";
import admin from "@/api/admin";

export default {
  name: "assignRole",
  props: {
    adminId: {
      type: String,
      default: {},
    },
  },
  watch: {
    adminId:{
      handler(val){
        // 数据清空
        this.roles = [];
        this.assignedRoles = [];
        this.loadRoleData();
      },
      deep: true
    }
  },
  data() {
    return {
      roles: [],
      assignedRoles: [],
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      },
    };
  },
  created() {
    this.loadRoleData();
  },
  methods: {
    loadRoleData() {
      // 加载已经分配角色
      admin
        .getAssignedRoles(this.adminId)
        .then((res) => {
          // this.assginedRoles = res.data;
          res.data.forEach((item) => {
            this.assignedRoles.push(item.id)
          });
          // console.log(this.assignedRoles);
        })
        .catch((err) => {
          this.$message.error(err.message);
        });

      // 加载未分配角色()
      role
        .getRoles()
        .then((res) => {
          // this.roles = res.data;
          res.data.forEach((item) => {

            this.roles.push({
              label: item.name,
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
        admin
          .assignRoles(this.adminId, movedKeys)
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
        admin
          .unAssignRole(this.adminId, movedKeys)
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