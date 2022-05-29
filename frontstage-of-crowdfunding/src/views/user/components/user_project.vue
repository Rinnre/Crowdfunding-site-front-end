<template>
  <div class="project_main">
    <div class="header">
      <p>
        我发起的项目<span>共 {{ projectList.length }} 个项目</span>
      </p>
    </div>
    <div class="project_field">
      <div class="no_pro" style="margin-left: 305px;" v-if="projectList.length <= 0">
        <img
          src="https://s.moimg.net/activity/images/empty_project.png"
          alt=""
        />
        <a target="_self" href="#/launch/project">
          <p class="go_create">发起项目</p>
        </a>
      </div>
      <div class="has_pro" v-for="(project, index) in projectList" :key="index">
        <ul>
          <li>
            <div>
              <div class="pro_detail">
                <a href="#" target="_blank">
                  <img :src="project.headPicture" alt="" />
                </a>
                <div>
                  <a href="#" target="_blank">
                    <p class="pro_name">{{ project.title }}</p>
                  </a>
                </div>
              </div>
              <div class="pro_status_wrap">
                <span class="pro_status">{{project.projectStatus}}</span>
                <span class="pro_status_line"></span>
                <span class="pro_type">类型：{{ project.type }}</span>
                <div class="opt">
                  <span>编辑</span>
                  <span @click="confirmDeleta(project.id)">删除</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import user from "@/api/user";
export default {
  name: "",
  data() {
    return {
      projectList: [],
    };
  },
  created() {
    this.initProjectList();
  },
  methods: {
    initProjectList() {
      user.getUserProject().then((res) => {
        this.projectList = res.data;
        this.projectList.forEach((item) => {
          if (item.status == 0) {
            item.projectStatus = "审核中";
          } else if (item.status == 1) {
            item.projectStatus = "待上线";
          } else if (item.status == 2) {
            item.projectStatus = "众筹中";
          } else if (item == 3) {
            item.projectStatus = "众筹成功！";
          } else if (item == -1) {
            item.projectStatus = "众筹失败";
          }else{
            item.projectStatus='准备中'
          }
        });
        // console.log(res.data)
      });
    },
    confirmDeleta(id){
      this.$confirm("此操作将永久删除该项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() =>{
        user.removeUserProject(id)
          .then((res) =>{
            this.$message.success(res.message);
            this.initProjectList();
          })
      })
    }
  },
};
</script>

<style scoped>
.project_main .header {
  overflow: hidden;
  border-bottom: solid 1px #dee0e1;
  margin-bottom: 35px;
}

.project_main .header p:first-child {
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: #222c37;
  float: left;
  margin: 0;
  cursor: pointer;
}

.project_main .header p span {
  font-size: 16px;
  padding-left: 40px;
  color: #7a8087;
  font-weight: normal;
}

.project_main .project_field .no_pro img {
  width: 130px;
  margin-bottom: 20px;
}

.project_main .project_field .no_pro .go_create {
  width: 118px;
  height: 38px;
  background-color: #ffffff;
  border: solid 1px #bcbfc3;
  color: #7a8087;
  text-align: center;
  line-height: 38px;
  margin-left: 5px;
}

ul,
ol {
  list-style: none;
}

.project_main .project_field li .pro_detail {
  width: 100%;
  margin-bottom: 10px;
  overflow: hidden;
  cursor: pointer;
}
a {
  text-decoration: none;
  outline: none;
  color: #425eb2;
}

.project_main .project_field li .pro_detail img {
  width: 116px;
  height: 70px;
  float: left;
  margin-right: 20px;
}

.project_main .project_field li .pro_detail > div .pro_name {
  height: 50px;
  font-size: 18px;
  font-weight: 700;
  line-height: 50px;
  text-align: left;
  color: #222c37;
  margin-bottom: 4px;
}

.project_main .project_field li .pro_status_wrap {
  width: 100%;
  height: 60px;
  line-height: 60px;
  overflow: hidden;
  background-color: #f8f8f9;
}

.project_main .project_field li .pro_status_wrap .pro_status {
  font-size: 18px;
  font-weight: 700;
  text-align: left;
  color: #222c37;
  margin: 0 20px 0 20px;
}

.project_main .project_field li .pro_status_wrap .pro_status_line {
  display: inline-block;
  height: 14px;
  width: 1px;
  border-left: 1px solid #dee0e1;
  margin-right: 20px;
}

.project_main .project_field li .pro_status_wrap .pro_type {
  font-size: 16px;
  text-align: left;
  color: #222c37;
}

.project_main .project_field li .pro_status_wrap .opt {
  float: right;
  line-height: 0;
  margin-right: 4px;
}

.project_main .project_field li .pro_status_wrap .opt span {
  display: inline-block;
  min-width: 90px;
  height: 40px;
  font-size: 16px;
  line-height: 38px;
  text-align: center;
  border: solid 1px #bcbfc3;
  color: #7a8087;
  margin-right: 8px;
  margin-top: 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0 10px;
  cursor: pointer;
}
</style>