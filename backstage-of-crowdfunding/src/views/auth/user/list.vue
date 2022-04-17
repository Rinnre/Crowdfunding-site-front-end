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

      <el-button type="danger" style="float: right">批量删除</el-button>
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
      center
    >
    <userForm adminInfo = adminInfo></userForm>
      <!-- <el-form
        :model="adminInfo"
        :rules="rules"
        ref="adminInfo"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="登录账号" prop="loginAcct">
          <el-input v-model="adminInfo.loginAcct"></el-input>
        </el-form-item>

        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="adminInfo.nickName"></el-input>
        </el-form-item>

        <el-form-item label="登录密码" prop="password">
          <el-input
            type="password"
            v-model="adminInfo.password"
            auto-complete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPassword">
          <el-input
            type="password"
            v-model="adminInfo.checkPassword"
            auto-complete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="adminInfo.email"></el-input>
        </el-form-item>
        <el-form-item >
            <el-button type="primary" @click="submitForm('adminInfo')"
              >创建</el-button
            >
            <el-button type="danger" @click="resetForm('adminInfo')">重置</el-button>
        </el-form-item>
      </el-form> -->
    </el-dialog>

    <!-- banner列表 -->
    <el-table
      v-loading="listLoading"
      :data="adminList"
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

      <el-table-column prop="loginAcct" label="账号" />
      <el-table-column prop="nickName" label="昵称" />
      <el-table-column prop="email" label="邮箱地址" />

      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          <el-button type="info" size="mini" icon="el-icon-plus"></el-button>
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
import userForm from "@/views/auth/user/componets/userForm"
export default {
  name: "adminList",
  components: {
     'userForm':userForm
  },
  data() {
    // 自定义密码校验规则
    var validatePass = (rule, value, callback) => {
      if (value === "" || null == value) {
        callback(new Error("请输入密码"));
      } else {
        if (
          this.adminInfo.checkPassword !== "" ||
          null == this.adminInfo.checkPassword
        ) {
          this.$refs.adminInfo.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "" || null == value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.adminInfo.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    // 自定义邮箱验证规则
    var validateEmail = (rule, value, callback) => {
      var reg =
        /[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      //  console.log(reg.test(value))
      if (value === "" || null == value) {
        callback(new Error("请输入邮箱"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入正确格式的邮箱,例如xxxxx@xx.com"));
      } else {
        callback();
      }
    };

    return {
      listLoading: true, // 数据是否正在加载
      adminList: null, // 账号列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      currentPage: 1, //当前页码
      limit: 10, // 每页记录数
      keywords: "", // 查询表单对象
      addFormVisible: false, // 添加表单是否显示
      adminInfo: {},
      rules: {
        loginAcct: [
          { required: true, message: "请输入登录账号", trigger: "blur" },
          {
            min: 3,
            max: 11,
            message: "长度在 3 到 11 个字符",
            trigger: "blur",
          },
        ],
        nickName: [
          { required: false, message: "请输入用户昵称", trigger: "blur" },
          { min: 0, max: 11, message: "长度在 11个字符以内", trigger: "blur" },
        ],
        password: [
          { validator: validatePass, required: true, trigger: "blur" },
          {
            min: 6,
            max: 11,
            message: "长度在 6 到 11 个字符",
            trigger: "blur",
          },
        ],
        checkPassword: [
          { validator: validatePass2, required: true, trigger: "blur" },
          {
            min: 6,
            max: 11,
            message: "长度在 3 到 11 个字符",
            trigger: "blur",
          },
        ],
        email: [{ validator: validateEmail, required: true, trigger: "blur" }],
      },
    };
  },
  created() {
    this.loadAdminList();
  },
  methods: {
     refreshAndClose() {
        this.addFormVisible=false;
        this.loadAdminList(this.currentPage);
     },
    loadAdminList(page = 1) {
      this.page = page;
      admin
        .getAdminPageList(this.page, this.limit, this.keywords)
        .then((res) => {
          this.adminList = res.data.records;
          // console.log(this.adminList);
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

    // 添加账号
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //  console.log(this.adminInfo)
          admin
            .addAdmin(this.adminInfo)
            .then((res) => {
              // 弹框提示添加成功
              this.$message.success(res.message);

              // 关闭添加弹出层
              this.addFormVisible = false;
              // 重新加载数据
              this.loadAdminList(this.currentPage);
            })
            .catch((err) => {
              // 弹出错误信息
              this.$message.error(err.message);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },

  toggleSelection(rows) {
    if (rows) {
      rows.forEach((row) => {
        this.$refs.multipleTable.toggleRowSelection(row);
      });
    } else {
      this.$refs.multipleTable.clearSelection();
    }
  },
  handleSelectionChange(val) {
    this.multipleSelection = val;
  },
};
</script>

<style scoped>
</style>