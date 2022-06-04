<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select
          v-model="orderStatus"
          placeholder="请选择订单状态"
          @change="orderStatusChanged"
        >
          <el-option
            v-for="item in ordeStatusrList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="keywords" placeholder="查询条件" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="initProjectList()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!-- banner列表 -->
    <el-table
      v-loading="listLoading"
      :data="orderList"
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
      <el-table-column prop="id" label="订单号" />
      <el-table-column prop="payNum" label="支付流水号"> </el-table-column>

      <el-table-column prop="projectName" label="项目名称" />
      <el-table-column prop="orderStatus" label="订单状态" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="payTime" label="支付时间" />

      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-view"
            @click="viewOrderInfo(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="订单详细信息"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form ref="order" :model="order" label-width="100px">
        <el-form-item label="回报标题">
          <el-input v-model="order.title" readonly></el-input>
        </el-form-item>
        <el-form-item label="回报内容">
          <el-input
            type="textarea"
            autosize
            v-model="order.description"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="回报金额">
          <el-input v-model="order.supportMoney" readonly></el-input>
        </el-form-item>
        <el-form-item label="是否包邮">
          <el-input v-model="order.postage" readonly></el-input>
        </el-form-item>
        <el-form-item label="回报图片">
          <span v-for="picture in order.pictureVos" :key="picture.id">
            <el-image
              style="width: 100px; height: 100px"
              :src="picture.picturePath"
              fit="contain"
            ></el-image>
          </span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center"
      layout="sizes, prev, pager, next, jumper, ->, total, slot"
      @current-change="initProjectList"
      @size-change="changeSize"
    />
  </div>
</template>

<script>
import order from "@/api/order";
export default {
  name: "",
  data() {
    return {
      listLoading: true, // 数据是否正在加载
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      total: 0,
      currentPage: 1, //当前页码
      limit: 10, // 每页记录数
      keywords: "", // 查询表单对象
      orderList: [],
      order: {},
      dialogVisible: false,
      ordeStatusrList: [
        { id: 0, name: "已取消" },
        { id: 1, name: "未支付" },
        { id: 2, name: "已支付" },
        { id: 3, name: "待发货" },
      ],
      orderStatus: "",
    };
  },
  created() {
    this.initProjectList();
  },
  methods: {
    initProjectList(page = 1) {
      this.page = page;
      order
        .getAllOrders(this.page, this.limit, this.keywords, this.orderStatus)
        .then((res) => {
          console.log(res.data);
          this.total = res.data.total;
          this.orderList = res.data.records;
          this.orderList.forEach((order) => {
            if (order.orderStatus == 0) {
              order.orderStatus = "已取消";
            } else if (order.orderStatus == 1) {
              order.orderStatus = "未支付";
            } else {
              order.orderStatus = "已支付";
            }
            order.createTime = order.createTime.replace("T", " ");
            if (order.payTime != null) {
              order.payTime = order.payTime.replace("T", " ");
            }
          });
          this.listLoading = false;
        });
    },
    viewOrderInfo(order) {
      this.order = order.rewardVo;
      if ((this.order.postage = 1)) {
        this.order.postage = "包邮";
      } else {
        this.order.postage = "不包邮";
      }
      this.dialogVisible = true;
      console.log(order);
    },
    orderStatusChanged() {
      this.initProjectList();
    },
    handleClose() {
      this.order = {};
      this.dialogVisible = false;
    },
    // 当页码发生改变的时候
    changeSize(size) {
      this.limit = size;
      this.initProjectList();
    },
  },
};
</script>

<style scoped>
</style>