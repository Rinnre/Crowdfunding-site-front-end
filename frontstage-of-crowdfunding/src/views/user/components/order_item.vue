<template>
  <div id="order_item" class="order_mian">
    <!-- 项目图片 -->
    <div class="order_left">
      <img
        :src="order.rewardVo.pictureVos[0].picturePath"
      />
    </div>
    <!-- 订单信息 -->
    <div class="order_middle">
      <p class="project_title">
        <a :href="'/#/project/detail/' + order.projctId">{{ description }}</a>
      </p>
      <p class="reward">
        回报档标题：<span>{{ order.rewardVo.title }}</span>
        <!-- 订单详情 -->
        <a
          class="order_detail"
          v-if="order.orderStatus != 0"
          @click="dialogTableVisible = true"
          >订单详情</a
        >
        <el-dialog
          width="550px"
          title="订单详情"
          v-if="order.orderStatus != 0"
          :visible.sync="dialogTableVisible"
        >
          <el-divider></el-divider>
          <!-- 收货地址 -->
          <div class="address">
            <h4>收货信息</h4>
            <div class="content">
              <p>
                <span>收件人</span
                ><span> {{ order.address.consigneePhone }}</span>
              </p>
              <p>
                <span>收货地址</span
                ><span>{{ order.address.consigneeAddress }}</span>
              </p>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="reward_info">
            <h4>回报档信息</h4>
            <div class="content">
              <p>
                <span>项目名称</span><span> {{ order.projectName }}</span>
              </p>
              <p class="reward_style">
                <span>回报档</span>
                <span class="reward_detail">
                  <span>
                    ¥{{ order.rewardVo.supportMoney }}（{{
                      order.rewardVo.title
                    }}）
                    <span class="pick number">
                      <i>{{ order.rewardCount }} 份</i>
                    </span>
                  </span>
                </span>
              </p>
              <p>
                <span>承诺回报时间</span
                ><span style="text-align: right"
                  >众筹成功后{{ order.rewardVo.shipmentsDay }}个月内</span
                >
              </p>
              <p>
                <span>实付金额</span
                ><span
                  style="text-align: right; font-size: 20px; font-weight: 700"
                  >￥{{ order.orderAmount }}</span
                >
              </p>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="address">
            <h4>订单信息</h4>
            <div class="content">
              <p>
                <span>订单号</span><span>{{ order.id }}</span>
              </p>
              <p>
                <span>支付流水号</span><span>{{ order.payNum }}</span>
              </p>
              <p>
                <span>下单时间</span><span>{{ order.createTime }}</span>
              </p>
              <p>
                <span>付款时间</span><span>{{ order.payTime }}</span>
              </p>
            </div>
          </div>
        </el-dialog>
      </p>
      <p class="reward_count">
        回报档：<span>￥{{ order.rewardVo.supportMoney }}</span
        ><span> * {{ order.rewardCount }}份</span>
      </p>
      <p class="order_amount">
        实际支付的金额：<span>￥{{ order.orderAmount }}</span>
      </p>
    </div>
    <!-- 订单状态 -->
    <div class="order_right">
      <div class="inner_text">
        <p>{{ orderStatus }}</p>
      </div>
      <div class="" style="margin-left:50px" v-if="order.orderStatus==1">
        <el-button size="mini" round @click="toPay()">去支付</el-button>
      </div>
      <div class="operation_btn" v-if="false">
        <el-button size="mini" round>改手机号</el-button>
        <el-button size="mini" type="danger" round>取消订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import pay from "@/api/pay";
export default {
  name: "OrderItem",
  props: {
    order: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      dialogTableVisible: false,
      description: "",
      orderStatus: "",
    };
  },
  created() {
    this.description = this.order.rewardVo.description;
    if (this.description.length > 42) {
      this.description = this.description.substring(0, 42);
      this.description = this.description + "...";
    }
    if (this.order.orderStatus == 0) {
      this.orderStatus = "订单取消";
    } else if (this.order.orderStatus == 1) {
      this.orderStatus = "等待支付";
    } else if (this.order.orderStatus == 2) {
      this.orderStatus = "已支付";
    }
    console.log(this.order);
  },
  methods: {
    toPay() {
      pay.sendRequestToAliPay(this.order.id).then((res) => {
        // 添加之前先删除一下，如果单页面，页面不刷新，添加进去的内容会一直保留在页面中，二次调用form表单会出错
        const divForm = document.getElementsByTagName("div");
        if (divForm.length) {
          document.body.removeChild(divForm[0]);
        }
        const div = document.createElement("div");
        div.innerHTML = res.data; // data就是接口返回的form 表单字符串
        document.body.appendChild(div);
        document.forms[0].setAttribute("target", "_self"); // 新开窗口跳转
        document.forms[0].submit();
      });
    },
  },
};
</script>

<style scoped>
.order_mian .order_left img {
  width: 180px;
  float: left;
}

.order_mian .order_middle {
  width: 350px;
  float: left;
  border-right: 1px solid #cccccc;
  margin-top: 5px;
  padding: 0 20px;
}

.order_mian .order_middle p.project_title {
  height: 54px;
  line-height: 24px;
}

.order_mian .order_middle p {
  font-size: 14px;
  line-height: 22px;
  color: #223318;
  font-weight: bold;
}

.order_mian .order_middle p.project_title a {
  color: #223318;
}

.order_mian .order_middle p.reward {
  height: 55px;
  line-height: 28px;
  word-break: break-all;
}

.order_mian .order_middle p span {
  color: #4e5c46;
  font-weight: normal;
}

.order_mian .order_middle p.reward a {
  float: right;
  font-weight: normal;
}

.order_mian .order_middle p.reward_count {
  line-height: 30px;
}

.order_mian .order_middle p.order_amount span {
  float: right;
  color: #223318;
  font-size: 24px;
  font-weight: bold;
}

.order_mian .order_right {
  position: relative;
  margin-top: 5px;
  padding: 0 15px;
  float: left;
  width: 200px;
}

.order_mian .order_right .inner_text {
  margin: 60px auto;
  /* margin-bottom: 0px; */
  /* height: 68px; */
}
.order_mian .order_right p:first-child {
  font-weight: bold;
  font-size: 18px;
}

.order_mian .order_right p {
  line-height: 25px;
  text-align: center;
}

/* order_detail */
.reward h4 {
  font-size: 20px;
  font-weight: 700;
  color: #222c37;
  line-height: normal;
  margin: auto;
  padding: 0 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.reward .content {
  box-sizing: border-box;
  padding: 15px 30px 0px 30px;
  overflow: hidden;
}

.reward .content p {
  width: 360px;
  margin-bottom: 12px;
  overflow: hidden;
}

.reward /deep/ .el-dialog__header {
  padding: 20px 217px 0px;
}

.reward /deep/ .el-dialog__body {
  padding: 10px 35px;
}

.reward .content p span:nth-of-type(1) {
  width: 100px;
  float: left;
}

.reward .content p span:nth-of-type(1) {
  font-size: 16px;
}
.reward .content p span:nth-of-type(2) {
  float: left;
  width: 260px;
  font-size: 16px;
  line-height: 1.5;
  color: #222c37;
}

.reward .content .reward_style .reward_detail > span:nth-of-type(1) {
  width: 100%;
  display: inline-block;
  margin-bottom: 20px;
}

.reward .content .reward_style .reward_detail .number {
  border: none;
  width: 60px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  float: right;
  font-size: 12px;
}

.reward .content .reward_style .reward_detail .number i {
  display: inline-block;
  width: 40px;
  height: 20px;
  border-radius: 100px;
  font-size: 14px;
  background: #bcbfc3;
  color: #ffffff;
  margin-top: 5px;
}

i,
em {
  font-style: normal;
}
</style>