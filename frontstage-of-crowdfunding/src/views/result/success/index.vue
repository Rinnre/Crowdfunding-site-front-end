<template>
  <div class="pay_content">
    <navigation></navigation>
    <div class="pay_step_back">
      <div class="pay_step">
        <el-steps :active="active" finish-status="success">
          <el-step title="步骤 1 " description="提交订单"></el-step>
          <el-step title="步骤 2 " description="确认支付"></el-step>
          <el-step title="步骤 3 " description="支付成功"></el-step>
        </el-steps>
      </div>
    </div>
    <div v-if="active == 2">
      <div class="su">
          <el-result
            icon="success"
            title="支付成功！"
            subTitle="感谢您对本项目的大力支持"
          >
            <template slot="extra">
              <el-button type="primary" size="medium" @click="backHome()">返回项目详情</el-button>
            </template>
          </el-result>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "@/components/header/navigation";

export default {
  name: "paySuccess",
  components: {
    navigation: navigation,
  },
  data() {
    return {
      radio: "1",
      rewardId: "",
      active: 0,
      prjectId:"",
    };
  },
  created() {
    this.projectId=this.$route.query.projectId;
    // console.log(this.$route.query.projectId);
     this.paySuccess();
  },
 
  methods: {
    // 支付成功回调
    paySuccess() {
      this.$message.success("支付成功！");
      this.active=2;
    },
    backHome(){
      this.$router.replace("/project/detail/"+ this.projectId);
      // this.$router.replace("/#/");
    }
  },
};
</script>

<style scoped>
/* step */
.pay_content .pay_step_back {
  height: 140px;
  width: 100%;
  min-width: 1040px;
  position: relative;
  background-color: #fff;
  -webkit-box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.1);
}
.pay_content .pay_step_back .pay_step {
  width: 576px;
  margin: auto;
  overflow: hidden;
  padding-top: 38px;
  position: relative;
}

/* pay_body */
.pay_body {
  width: 940px;
  background: #fff;
  border-radius: 6px;
  -webkit-box-shadow: 0px 2px 8px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0px 2px 8px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  margin: 30px auto;
  position: relative;
}

/* address */
.pay_content .address {
  padding: 40px;
  position: relative;
}

/* address title */
.pay_body .address_title,
.order_info .order_title {
  font-size: 18px;
  font-weight: bold;
  color: #223318;
  line-height: 18px;
  margin-bottom: 40px;
}

.send {
  float: left;
  font-size: 14px;
  line-height: 14px;
  color: #223318;
  width: 144px;
  font-weight: bold;
}

/* address_filed */
.pay_body .addrress .address_field {
  line-height: 34px;
}

.addrress .address_field {
  width: 736px;
}

.address_filed .add_chosen span:nth-child(-n + 2) {
  padding-right: 18px;
}

.address_filed .add_chosen span {
  font-size: 14px;
  color: #223317;
  line-height: 14px;
}

.address_filed .add_chosen .change_address {
  color: #37cb58;
  cursor: pointer;
}
/* modify_address */
.pay_body .modify_address {
  width: 700px;
  margin-top: 28px;
  border: 1px solid #e5e5e5;
  margin: 0, auto;
  margin-left: 93px;
  display: inline-block;
}

/* order_info */
.pay_body .order_info {
  position: relative;
  padding-bottom: 20px;
}
.order_info .order_title {
  margin: 30px 0 40px;
}
.pay_body .order_info {
  overflow: hidden;
}

/* order_left */
.order_info .order_info_left {
  margin-bottom: 0;
  padding-bottom: 0;
}

.order_info_left .le,
.order_info_left .ri {
  line-height: 53px !important;
}

.order_info .order_info_left {
  float: left;
  width: 676px;
  margin: 0 30px;
  padding-bottom: 3000px;
  margin-bottom: -3000px;
}

/* order_left_list */
.order_info .order_info_left .order_left_list {
  line-height: 53px;
  margin: 0;
}

.order_info .order_info_left .order_left_list {
  margin-bottom: 22px;
  overflow: hidden;
}

.order_info .order_info_left .order_left_list .le {
  width: 144px;
  font-size: 14px;
  line-height: 24px;
  color: #223318;
  font-weight: bold;
}

.order_info .order_info_left .order_left_list .ri {
  width: 532px;
  font-size: 14px;
  color: #223317;
  line-height: 24px;
  outline: none;
}
.le {
  float: left;
}
.ri {
  float: right;
}

/* pay_type */
.pay_body .pay_type {
  width: 880px;
  padding: 30px;
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  overflow: hidden;
  border-radius: 6px;
}
/* title */
.pay_body .pay_type .pay_type_title {
  width: 130px;
  font-size: 18px;
  line-height: 26px;
  color: #223318;
  font-weight: bold;
  margin-right: 18px;
  height: 26px;
  float: left;
}
/* radio */

.pay_type_list /deep/ .el-radio__input.is-checked .el-radio__inner {
  border-color: #37cb58;
  background: #37cb58;
}

.pay_type_list /deep/ .el-radio__input.is-checked + .el-radio__label {
  color: #37cb58;
}

/* risk_warning */
.pay_body .risk_warning {
  padding: 30px 30px 30px 174px;
  overflow: hidden;
}
/* left */
.pay_body .risk_warning .left {
  width: 144px;
  padding-left: 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  /* margin-left: -100%; */
  position: relative;
  left: -174px;
  font-size: 18px;
  color: #223318;
  font-weight: bold;
}
.pay_body .risk_warning > div {
  float: left;
}

/*right  */
.pay_body .risk_warning .right {
  /* width: 100%; */
  font-size: 14px;
  margin-top: -17px;
}

/* pay_button */
.npay-submit {
  border-top: 1px solid #d1d1d1;
  background: #ffffff2b;
  width: 100%;
  padding-bottom: 15px;
}
.npay-submit.fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
}

.new_paywid {
  width: 940px;
  margin: 0 auto;
  font-size: 0;
}

.order-pay .new_paywid .backbtn {
  font-size: 16px;
  font-weight: normal;
}

.backbtn,
.subbtnbig,
.btn_org {
  cursor: pointer;
  display: inline-block;
  width: 160px;
  height: 36px;
  background: #37cb58;
  font-size: 18px;
  color: #fff;
  text-align: center;
  line-height: 36px;
  margin-top: 15px;
  border-radius: 3px;
  outline: none;
  border: none;
  font-weight: bold;
  font-family: "Microsoft YaHei";
}
.edit_margleft {
  margin-left: 20px;
}
.edit_color_txt {
  font-size: 14px;
  color: #223317;
}

.wechat_pay .fl {
  font-size: 20px;
  font-weight: bold;
  color: #223317;
  width: 636px;
  line-height: 30px;
  float: left;
}

.edit_order_info .order_info_fr p:first-child,
.wechat_pay .fr p:first-child {
  font-size: 20px;
  line-height: 24px;
  font-weight: bold;
  color: #223318;
}
.edit_order_info .order_info_fr p:last-child,
.wechat_pay .fr p:last-child {
  font-size: 14px;
  line-height: 20px;
  color: #223318;
  margin-top: 4px;
}
.wechat_pay .fr {
  width: 206px;
  text-align: center;
  margin-right: -30px;
  border-left: 1px solid #e5e5e5;
  float: right;
}

.pay_body .shopping_addrress {
  padding: 40px;
  position: relative;
}
</style>