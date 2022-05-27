<template>
  <div class="address_list">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <address-form :address="address" @handleClose="handleClose"></address-form>
    </el-dialog>

    <el-table
      ref="singleTable"
      :data="shoppingAddress"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column property="consigneeName" label="姓名" width="120">
      </el-table-column>
      <el-table-column property="consigneeAddress" label="地址" width="120">
      </el-table-column>
      <el-table-column property="consigneePhone" label="手机号">
      </el-table-column>
      <el-table-column property="consigneeEmail" label="电子邮箱">
      </el-table-column>
      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <span
            @click="editAddress(scope.row)"
            style="margin-right: 10px; color: #37cb58; cursor: pointer"
            >编辑</span
          >
          <span
            @click="confrim_delete(scope.row.id)"
            style="margin-right: 10px; color: #37cb58; cursor: pointer"
            >删除</span
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- <el-button
      @click="addFormVisible = true"
      style="float: right; margin: 20px"
      size="small"
      >设为默认地址</el-button
    > -->
    <el-button
      @click="address = {};dialogVisible = true"
      style="float: right; margin: 20px"
      size="small"
      >新增地址</el-button
    >
  </div>
</template>

<script>
import addressForm from "@/views/address/components/address_form";
import user from "@/api/user"
export default {
  name: "UserAddress",
  props: {
    userAddressList: {
      type: Array,
      default: [],
    },
  },
  components: {
    addressForm: addressForm,
  },
  created() {
    // console.log(this.shoppingAddress);
  },
  watch: {
    userAddressList(val) {
      this.shoppingAddress = val;
    },
  },
  data() {
    return {
      shoppingAddress: this.userAddressList,
      currentRow: null,
      dialogVisible: false,
      address: {},
    };
  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    // 更新数据
    handleClose() {
      this.dialogVisible = false;
      this.$emit('initAddress');
    },
    // 编辑地址
    editAddress(row) {
      this.address = {};
      this.address = row;
      this.dialogVisible = true;
    },
    // 删除地址
    confrim_delete(id) {
      this.$confirm("此操作将永久删除该地址, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        user
          .removeUserAddress(id)
          .then((res) => {
            this.$message.success(res.message);
            // 更新数据
            this.$emit('initAddress');
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      });
    },
  },
};
</script>

<style scoped>
</style>