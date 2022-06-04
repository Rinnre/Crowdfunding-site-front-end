<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchProjectVo.keywords" placeholder="查询条件" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="initOrderList()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!-- banner列表 -->
    <el-table
      v-loading="listLoading"
      :data="projectList"
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
      <el-table-column prop="id" label="项目id" />
      <el-table-column prop="payNum" label="项目头图">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.headPicture"
            fit="contain"
          ></el-image>
        </template>
      </el-table-column>

      <el-table-column prop="title" label="项目标题" />
      <el-table-column prop="percentage" label="众筹进度" />
      <el-table-column prop="supportMoney" label="已筹金额" />

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
      title="项目详细信息"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form ref="project" :model="project" label-width="100px">
        <el-form-item label="项目名称">
          <el-input v-model="project.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="已筹金额">
          <el-input v-model="project.supportMoney" readonly></el-input>
        </el-form-item>
        <el-form-item label="目标金额">
          <el-input v-model="project.targetMoney" readonly></el-input>
        </el-form-item>
        <el-form-item label="项目状态">
          <el-input v-model="project.status" readonly></el-input>
        </el-form-item>
        <el-form-item label="项目图片">
          <span
            class="project_detail"
            style="margin-left: 20px"
            v-for="picture in project.projectDetails"
            :key="picture.id"
          >
            <el-image
              style="width: 50px; height: 100px"
              :src="picture.picturePath"
              :preview-src-list="srcList"
              :z-index="9999"
            ></el-image>
          </span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="error()">不通过</el-button>
        <el-button type="primary" @click="ok()">通 过</el-button>
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
      @current-change="initOrderList"
      @size-change="changeSize"
    />
  </div>
</template>

<script>
import projectApi from "@/api/project";
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
      projectList: [],
      project: {},
      dialogVisible: false,
      ordeStatusrList: [
        { id: 0, name: "审核中" },
        { id: 1, name: "众筹中" },
        { id: 2, name: "众筹结束" },
        { id: 3, name: "准备中" },
      ],
      srcList: [],
      searchProjectVo: {
        status: "0",
        type: null,
        keywords: null,
      },
    };
  },
  created() {
    this.initOrderList();
  },
  methods: {
    initOrderList(page = 1) {
      this.page = page;
      projectApi
        .getAllProject(this.page, this.limit, this.searchProjectVo)
        .then((res) => {
          console.log(res.data);
          this.total = res.data.total;
          this.projectList = res.data.records;
          this.listLoading = false;
        });
    },
    viewOrderInfo(project) {
      projectApi.getProjectByProjectId(project.id).then((res) => {
        this.project = res.data;
        if (this.project.status == 0) {
          this.project.status = "审核中";
        } else if (this.project.status == 1) {
          this.project.status = "众筹中";
        } else if (this.project.status == 2) {
          this.project.status = "众筹结束";
        } else if (this.project.status == 3) {
          this.project.status = "准备中";
        }
        this.project.projectDetails.forEach((item) => {
          this.srcList.push(item.picturePath);
        });
        console.log(this.project.projectDetails.length);
        this.dialogVisible = true;
      });
    },
    projectStatusChanged() {
      this.initOrderList();
    },
    handleClose() {
      this.project = {};
      this.dialogVisible = false;
    },
    // 当页码发生改变的时候
    changeSize(size) {
      this.limit = size;
      this.initOrderList();
    },
    ok() {
      projectApi
        .modifyProjectStatus(this.project.id, this.ordeStatusrList[2].id)
        .then((response) => {
          this.$message.success(response.message);
          this.initOrderList();
          this.dialogVisible = false;
        });
    },
    error() {
      projectApi
        .modifyProjectStatus(this.project.id, this.ordeStatusrList[3].id)
        .then((response) => {
          this.$message.success(response.message);
          this.initOrderList();
          this.dialogVisible = false;
        });
    },
  },
};
</script>

<style scoped>
</style>