<template>
  <div class="">
    <el-form
      :model="shoppingAddress"
      :rules="rules"
      ref="shoppingAddress"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="收货人姓名" prop="consigneeName">
        <el-input v-model="shoppingAddress.consigneeName"></el-input>
      </el-form-item>

      <el-form-item label="收货人手机号" prop="consigneePhone">
        <el-input
          v-model="shoppingAddress.consigneePhone"
        ></el-input>
      </el-form-item>

      <el-form-item label="收货地址" prop="consigneeAddress">
        <el-input
          v-model="shoppingAddress.consigneeAddress"
          auto-complete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="电子邮箱" prop="consigneeEmail">
        <el-input v-model="shoppingAddress.consigneeEmail"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('shoppingAddress')"
          v-if="null == address.id"
          >创建</el-button
        >
        <el-button
          type="danger"
          @click="resetForm('shoppingAddress')"
          v-if="null == address.id"
          >重置</el-button
        >
        <el-button
          type="primary"
          @click="saveForm('shoppingAddress')"
          v-if="null != address.id"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import user from "@/api/user";
export default {
  name: "AddressForm",
  props: {
    address: {
      type: Object,
      default: {},
    },
  },
  watch: {
    address(val) {
      if(this.address!=null){

        this.shoppingAddress = this.address;
      }
    },
  },
  data() {
    var validatePhone = (rule, value, callback) => {
      var reg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
      console.log(value);
      if (value === "" || value == null) {
        callback(new Error("请输入手机号"));
      } else if (!reg.test(value)) {
        callback(new Error("非法的手机号"));
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
      shoppingAddress: this.address,
      rules: {
        consigneeName: [
          { required: true, message: "请输入收货人姓名", trigger: "blur" },
        ],
        consigneePhone: [
          { required: true, validator: validatePhone, trigger: "blur" },
        ],
        consigneeAddress: [
          { required: true, message: "请输入收货地址", trigger: "blur" },
        ],
        consigneeEmail: [
          { required: true, validator: validateEmail, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          user.saveUserAddress(this.shoppingAddress).then((res) => {
            this.$message.success("添加成功！");
            // 关闭弹出层，更新数据
            this.$emit("handleClose");
            this.shoppingAddress = {};
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
    saveForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          user.modifyUserAddress(this.shoppingAddress).then((res) => {
            this.$message.success("保存成功！");
            // 关闭弹出层，更新数据
            this.$emit("handleClose");
            this.shoppingAddress = {};
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
</style>