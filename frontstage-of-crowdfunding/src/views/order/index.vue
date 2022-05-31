<template>
  <div class="pay_content">
    <navigation></navigation>
    <div class="pay_step_back">
      <div class="pay_step">
        <el-steps :active="0" finish-status="success">
          <el-step title="步骤 1 " description="提交订单"></el-step>
          <el-step title="步骤 2 " description="确认支付"></el-step>
          <el-step title="步骤 3 " description="支付成功"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="pay_body">
      <!-- 收货地址 -->
      <div class="address">
        <p class="address_title">填写收货地址：</p>
        <!-- <div class="address_card_list"></div> -->
        <div class="send" style="line-height: 34px">寄送至</div>
        <div class="address_filed" style="margin-top: 70px">
          <div class="add_chosen">
            <span class="add_name">{{ order.address.consigneeName }}</span
            ><span class="add_address">{{
              order.address.consigneeAddress
            }}</span
            ><span class="add_phone">{{ order.address.consigneePhone }}</span>

            <span
              class="change_address fr"
              @click="dialogTableVisible = !dialogTableVisible"
              style="margin-left: 101px"
              >修改地址</span
            >
          </div>
        </div>
        <div v-if="dialogTableVisible" class="modify_address">
          <addressInfo
            :type="'order'"
            :userAddressList="orderInfo.userAddress"
            @modifyUserAddress="modifyUserAddress"
          ></addressInfo>
        </div>
      </div>
    </div>
    <div class="pay_body">
      <!-- 确认订单信息 -->
      <div class="order_info">
        <div class="order_info_left">
          <p class="order_title">确认订单信息:</p>
          <div class="order_left_list order_price">
            <div class="le">回报档</div>
            <div class="ri">
              ￥{{ orderInfo.reward.supportMoney }} ({{
                orderInfo.reward.title
              }})
            </div>
          </div>
          <div class="order_left_list order_count">
            <div class="le">购买数量</div>
            <div class="ri">
              <div>
                <span
                  :class="{ left: true, active: order.rewardCount > 1 }"
                  @click="order.rewardCount--"
                ></span>
                <span class="center"
                  ><input type="text" v-model="order.rewardCount"
                /></span>
                <span
                  :class="{
                    right: true,
                    active:
                      order.rewardCount < orderInfo.reward.inventoryNumber,
                  }"
                  @click="order.rewardCount++"
                ></span>
              </div>
            </div>
          </div>
          <div class="order_left_list">
            <div class="le">运费</div>
            <div class="ri postage_money">
              {{ orderInfo.reward.extendMoney }}
            </div>
          </div>
          <div class="order_left_list">
            <div class="le">档位内容</div>
            <div class="ri">
              <p>
                {{ orderInfo.reward.description }}
              </p>
            </div>
          </div>
        </div>
        <div class="order_info_right">
          <div>
            <p>{{ order.orderAmount }}</p>
            <p>实际支付金额</p>
          </div>
        </div>
      </div>
    </div>
    <div class="pay_body">
      <!-- 支付方式 -->
      <div class="pay_type">
        <div class="pay_type_title">选择支付方式：</div>
        <div class="pay_type_list">
          <el-radio v-model="radio" label="1">支付宝</el-radio>
          <el-radio v-if="false" v-model="radio" label="2">其他</el-radio>
        </div>
      </div>
    </div>
    <div class="pay_body">
      <!-- 免责声明 -->
      <div class="risk_warning">
        <div class="left">免责声明：</div>
        <div class="right">
          <p style="margin-bottom: 24px">
            1.点击“确认支付”，即表明您已阅读并同意
            <a target="_blank" href="">《支持者协议》</a>
            及<a href="" target="_blank">《隐私权政策》</a
            >，并自愿承担众筹相应风险。
          </p>
          <p style="margin-bottom: 24px">
            2.您参与众筹是支持将创意变为现实的过程，而不是直接的商品交易，因此存在一定风险。请您根据自己的判断选择、支持众筹项目。众筹存在于发起人与支持者之间，网站作为第三方平台，只提供网络空间、技术支持等服务。众筹的回报产品和承诺由发起人提供和作出，发起者和支持者应依法承担使用摩点产品产生的法律后果。
          </p>
          <p style="margin-bottom: 24px">
            3.众筹项目的回报发放及其他后续服务事项均由发起人负责。如果发生发起人无法发放回报、延迟发放回报、不提供回报后续服务等情形，您需要直接和发起人协商解决。
          </p>
          <p>
            4.由于发起人能力和经验不足、市场风险、法律风险等各种因素，众筹可能失败。对于在众筹期限届满前失败的项目，您支持项目的款项会全部原路退还给您；对于众筹成功的项目，支持者不能通过平台申请退款，若此时支持者因任何原因希望退款，需直接与发起者协商，若发
            起者同意退款，需直接向支持者退回款项，本网站不会从可结算款项中扣除该部分退款金额。您对项目发起人的无偿支持以及额外打赏，一旦众筹成功将不予退款，但众筹失败的情况除外。
          </p>
        </div>
      </div>
    </div>
    <div
      class="npay-submit order-pay fixed"
      style="box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 23px 1px"
    >
      <div class="new_paywid">
        <input
          type="button"
          :value="'提交订单 ' + order.orderAmount"
          @click="submitOrder()"
          class="backbtn"
        />
        <span class="edit_color_txt edit_margleft"
          >请在下单后10分钟内支付，过期将失效</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "@/components/header/navigation";
import addressInfo from "@/views/address/user_address";
import order from "@/api/order";

export default {
  name: "Order",
  components: {
    navigation: navigation,
    addressInfo: addressInfo,
  },
  data() {
    return {
      dialogTableVisible: false,
      purchaseCount: 1,
      radio: "1",
      rewardId: "",
      orderInfo: {},
      order: {
        orderAmount: "",
        rewardCount: 1,
        address: {},
        rewardVo: {},
      },
      amount: "",
    };
  },
  created() {
    this.rewardId = this.$route.params.rewordId;
    this.initOrderInfo();
  },
  watch: {
    "order.rewardCount"(newVal, oldVal) {
      if (newVal <= 0) {
        this.$message.error("购买个数不能为零！");
        this.order.rewardCount = oldVal;
      }
      if (newVal > this.orderInfo.reward.inventoryNumber) {
        this.$message.error("回报份数不足");
        newVal = oldVal;
        this.order.rewardCount = oldVal;
      }
      this.order.orderAmount = this.orderInfo.reward.supportMoney * newVal;
    },
  },
  methods: {
    // 初始化订单信息
    initOrderInfo() {
      order.getOrderConfirmInfo(this.rewardId).then((res) => {
        this.orderInfo = res.data;
        if (this.orderInfo.reward.postage == 1) {
          this.orderInfo.reward.extendMoney = "包邮";
        } else {
          this.orderInfo.reward.extendMoney = "部分地区不包邮";
        }
        this.order.orderAmount = res.data.reward.supportMoney;
        this.order.address = res.data.userAddress[0];
        this.order.rewardVo = res.data.reward;
        console.log(this.orderInfo);
      });
    },
    // 更改收货地址
    modifyUserAddress(address) {
      this.order.address = address;
      this.dialogTableVisible = false;
    },
    // 生成订单
    submitOrder() {
      order.saveOrderInfo(this.order)
          .then((res) =>{
            this.$message({
              type: "success",
              message:'成功！',
              duration: 3000
            })
            console.log(res.data)
          })
    },
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
/* count */
.order_left_list.order_count .ri .left {
  background: url("../../assets/left-grey.png") center center no-repeat;
}

.order_left_list.order_count .ri .left.active {
  background: url("../../assets/left-dark.png") center center no-repeat;
}
.order_left_list.order_count .ri span {
  width: 34px;
  height: 34px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  float: left;
}
.order_left_list.order_count .ri .center {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.order_left_list.order_count .ri .center input {
  float: left;
  width: 34px;
  height: 32px;
  line-height: 32px;
  text-align: center;
}

.order_left_list.order_count .ri .right.active {
  background: url("../../assets/right-dark.png") center center no-repeat;
}

.order_left_list.order_count .ri .right {
  background: url("../../assets/right-grey.png") center center no-repeat;
}
/* order_right */

.order_info .order_info_right {
  float: none;
  padding-top: 0;
  margin-bottom: 0;
  padding-bottom: 0;
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
}

.order_info .order_info_right {
  float: right;
  width: 202px;
  border-left: 1px solid #e5e5e5;
  text-align: center;
  padding-top: 96px;
  /* padding-bottom: 3000px; */
  /* margin-bottom: -3000px; */
}

.order_info .order_info_right > div {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.order_info .order_info_right p:first-child,
.wechat_pay .fr p:first-child {
  font-size: 20px;
  line-height: 24px;
  font-weight: bold;
  color: #223318;
}

.order_info .order_info_right p:last-child,
.wechat_pay .fr p:last-child {
  font-size: 14px;
  line-height: 20px;
  color: #223318;
  margin-top: 4px;
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
</style>