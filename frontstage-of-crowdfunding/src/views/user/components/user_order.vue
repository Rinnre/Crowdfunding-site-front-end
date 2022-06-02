<template>
  <div id="main" class="mian">
    <div class="header">
      <h1>
        <p>我的订单</p>
        <div v-if="false" class="order_search">
          <el-input  placeholder="请输入内容" v-model="keyword">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <span class="btn">搜索</span>
        </div>
      </h1>
      <div class="nav">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部订单" name="-1">
            <div class="content">
              <ul class="order_list">
                <li v-for="order in orderList" :key="order.id">
                  <orderItem :order="order"></orderItem>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="待付款" name="1">
            <div class="content">
              <ul class="order_list">
                <li v-for="order in orderList" :key="order.id">
                  <orderItem :order="order"></orderItem>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="待发货" name="2">
            <div class="content">
              <ul class="order_list">
                <li v-for="order in orderList" :key="order.id">
                  <orderItem :order="order"></orderItem>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="待收货" name="-2">
            <div class="content">
              <ul class="order_list">
                <li v-for="order in orderList" :key="order.id">
                  <orderItem :order="order"></orderItem>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="已收货" name="-3">
            <div class="content">
              <ul class="order_list">
                <li v-for="order in orderList" :key="order.id">
                  <orderItem :order="order"></orderItem>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="已取消" name="0">
            <div class="content">
              <ul class="order_list">
                <li v-for="order in orderList" :key="order.id">
                  <orderItem :order="order"></orderItem>
                </li>
              </ul>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import orderItem from "@/views/user/components/order_item";
import user from "@/api/user";

export default {
  name: "UserOrder",
  components: {
    orderItem: orderItem,
  },
  data() {
    return {
      keyword: "",
      activeName: "-1",
      orderList: [],
    };
  },
  created() {
    this.initOrderList();
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
      this.initOrderList();
    },
    initOrderList() {
      this.orderList=[];
      let state = null;
      if (this.activeName != -1) {
        state = this.activeName;
      }
      user.getUserOrderInfo(state).then((res) => {
        this.orderList = res.data;
      });
    },
  },
};
</script>

<style scoped>
/* main */
#main {
  margin: 0 auto;
  padding-top: 5px;
  padding-bottom: 84px;
}

#main .header {
  width: 100%;
}
/* header h1 */

#main .header h1 {
  position: relative;
}

#main .header h1 {
  font-size: 34px;
  color: #38ca5b;
  line-height: 114px;
  font-weight: normal;
  text-align: left;
}

#main .header h1 > p {
  float: left;
}

#main .header h1 > .order_search {
  float: right;
  cursor: pointer;
  position: relative;
}
#main .header h1 > .order_search /deep/ .el-input {
  width: 230px;
}
#main .header h1 > .order_search /deep/ .el-input__inner {
  display: inline-block;
  width: 222px;
  height: 39px;
  font-size: 16px;
  color: #bcbfc3;
  line-height: 39px;
  padding-left: 37px;
  border: 1px solid #dee0e1;
  position: relative;
}
#main .header h1 > .order_search span.btn {
  display: inline-block;
  width: 90px;
  height: 40px;
  background: #00cba6;
  color: #fff;
  font-size: 16px;
  line-height: 40px;
  text-align: center;
}
/* nav */
#main .header .nav {
  width: 100%;
  height: 60px;

  display: inline-block;
}

#main .header .nav /deep/.el-tabs__item {
  font-size: 16px !important;
  padding-top: 20px;
  height: 70px;
  color: #7a8087;
}

#main .header .nav /deep/ .el-tabs__active-bar {
  background-color: #222c37;
  margin-left: -1px;
}

#main .header .nav /deep/ .el-tabs__nav {
  margin-left: 120px;
}

#main .header .nav /deep/ .el-tabs__header {
  background: #fff;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  -moz-box-shadow: 0px 2px 8px 0 rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0px 2px 8px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0px 2px 8px 0 rgba(0, 0, 0, 0.1);
}

#main .content ul li {
  -moz-box-shadow: 0px 2px 8px 0 rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0px 2px 8px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0px 2px 8px 0 rgba(0, 0, 0, 0.1);
  /* height: 236px; */
  background: #fff;
  margin-bottom: 30px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
}
</style>