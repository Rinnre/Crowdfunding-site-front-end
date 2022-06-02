<template>
  <div class="project_list">
    <navigation></navigation>
    <div class="project_list_mian">
      <div class="project_head">
        <div class="left">
          <h1>众筹项目</h1>
          <span>共 {{projectList.length}} 个众筹项目</span>
        </div>
        <div class="right">
          <ul class="sort_list">
            <li>
              <el-dropdown @command="handleType">
                <span class="el-dropdown-link">
                  {{ filtration.type
                  }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="all:全部">全部</el-dropdown-item>
                  <el-dropdown-item command="game:游戏">游戏</el-dropdown-item>
                  <el-dropdown-item command="anime:动漫">动漫</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
            <li>
              <el-dropdown @command="handleStatus">
                <span class="el-dropdown-link">
                  {{ filtration.status
                  }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="all:全部">全部</el-dropdown-item>
                  <el-dropdown-item command="Ongoing:众筹中"
                    >众筹中</el-dropdown-item
                  >
                  <el-dropdown-item command="success:众筹结束"
                    >众筹结束</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </li>
            <li>
              <el-dropdown @command="handleSortWord">
                <span class="el-dropdown-link">
                  {{ filtration.sortMethods
                  }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="time:最近上线"
                    >最近上线</el-dropdown-item
                  >
                  <el-dropdown-item command="money:金额最高"
                    >金额最高</el-dropdown-item
                  >
                  <el-dropdown-item command="person:评论最多"
                    >评论最多</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </div>
      </div>
      <div class="project_filed">
        <ul class="pro_ul clearfix">
          <li v-for="project in projectList" :key="project.id">
            <project :project="project"></project>
          </li>
        </ul>
        <div class="page">
          <el-pagination
            :background="true"
            layout="prev, pager, next"
            :total="total"
            @current-change="initProjectList"
            :page-size="size"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "@/components/header/navigation";
import project from "@/components/home/project";
import projectApi from "@/api/project";

export default {
  name: "Project",
  components: {
    navigation: navigation,
    project: project,
  },
  data() {
    return {
      filtration: {
        type: "全部",
        status: "众筹中",
        sortMethods: "最近上线",
      },
      total: 0,
      projectList: [],
      page: 1,
      size: 8,
    };
  },
  created() {
    this.initProjectList();
  },
  methods: {
    initProjectList(page) {
      if (page !=""&&page!=null&&page!=undefined){
        this.page = page;
      }
      console.log(11);
      projectApi.getSimpleProjectList(this.page, this.size,this.filtration).then((response) => {
        this.projectList = response.data.records;
        this.total = response.data.total;
      });
    },
    
    handleType(command) {
      let type = command.split(":")[1];
      this.filtration.type = type;
      this.initProjectList();
    },
    handleStatus(command) {
      let status = command.split(":")[1];
      this.filtration.status = status;
      this.initProjectList();
    },
    handleSortWord(command) {
      let sortWord = command.split(":")[1];
      this.filtration.sortMethods = sortWord;
      this.initProjectList();
    },
  },
};
</script>

<style scoped>
/* main */
.project_list_mian {
  max-width: 1080px;
  margin: 0 auto;
  width: 1080px;
  height: auto;
  padding-top: 60px;
}
/* head */
.project_head {
  padding-bottom: 20px;
  height: 34px;
  width: 100%;
  border-bottom: 1px solid #dee0e1;
}

.project_head .left,
.project_head .left h1 {
  height: 100%;
  font-size: 24px;
  font-weight: 700;
  color: #222c37;
  line-height: 24px;
  display: inline-block;
}

.project_head .left span {
  padding-left: 40px;
  font-size: 16px;
  line-height: 24px;
  font-weight: normal;
  color: #7a8087;
}

/* order by */
.sort_list > li {
  float: left;
  margin-right: 40px;
  font-size: 16px;
  height: 24px;
  line-height: 24px;
  color: #7a8087;
  cursor: pointer;
}

.el-dropdown-link {
  cursor: pointer;
  color: #7a8087;
}
.el-icon-arrow-down {
  font-size: 12px;
}
/* body */

.project_filed {
  width: 100%;
  background: #f8f8f9;
  padding: 0 0 40px;
}

.pro_ul li {
  float: left;
  width: 255px;
  height: 480px;
  background-color: #fff;
  margin: 10px 0 0 10px;
  overflow: hidden;
  transition: all 0.2s linear;
}
/* page */
.page {
  margin-top: 40px;
  height: 34px;
  width: 100%;
  display: inline-block;
  text-align: center;
}
/* select */
.page /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #fff;
  color: #222c37;
}
</style>