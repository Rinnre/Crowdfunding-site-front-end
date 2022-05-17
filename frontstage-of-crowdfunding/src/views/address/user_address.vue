<template>
  <div class="address_list">
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column property="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column property="address" label="地址" width="120">
      </el-table-column>
      <el-table-column property="phone" label="手机号"> </el-table-column>
      <el-table-column property="email" label="电子邮箱"> </el-table-column>
      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <span
            @click="editAdmin(scope.row.id)"
            style="margin-right: 10px; color: #37cb58; cursor: pointer"
            >编辑</span
          >
          <span
            @click="confrim_delete(scope.row.id, scope.row.loginAcct)"
            style="margin-right: 10px; color: #37cb58; cursor: pointer"
            >删除</span
          >
        </template>
      </el-table-column>
    </el-table>

    <el-button
      @click="addFormVisible = true"
      style="float: right; margin: 20px"
      size="small"
      >设为默认地址</el-button
    >
    <el-button
      @click="addFormVisible = true"
      style="float: right; margin: 20px"
      size="small"
      >新增地址</el-button
    >
  </div>
</template>

<script>
export default {
  name: "UserAddress",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      currentRow: null,
    };
  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
  },
};
</script>

<style scoped>
</style>