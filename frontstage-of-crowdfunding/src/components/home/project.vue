<template>
  <div class="project_mian">
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <router-link :to="'/project/detail/'+project.id">
        <img :src="project.headPicture" class="image" />
      </router-link>
      <div style="padding: 14px">
        <router-link :to="'/project/detail/'+project.id">
          <h3 class="pro_title">
            {{ project.title }}
          </h3>
        </router-link>
        <div class="author">
          <div
            class="au_logo"
            :style="{
              background:
                'url(' +
                project.simpleUserVo.avatar +
                ') no-repeat center center',
              'background-size': 'cover',
            }"
          ></div>
          <p>{{ project.simpleUserVo.nickName }}</p>
        </div>
        <div class="progress_bar">
          <el-progress
            :text-inside="true"
            :stroke-width="20"
            :percentage="project.percentage"
            status="exception"
          ></el-progress>
        </div>
        <div class="pro_bottom">
          <div class="left">
            <p class="status_title">
              ¥<span>{{ project.supportMoney }}</span>
            </p>
          </div>
          <div class="right">
            <p class="gray_ex">
              <span backer_count="120136">{{ project.supporterNumber }}</span>
              支持者
            </p>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    project: {
      type: Object,
      default: {},
    },
  },
  created() {
    console.log(this.project);
  },
  data() {
    return {
      currentDate: new Date(),
    };
  },
};
</script>

<style scoped>
.project_mian {
  margin-top: 10px;
}

.image {
  width: 100%;
  display: block;
}
.pro_title {
  overflow: hidden;
  height: 48px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  margin: 16px 0;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: #222c37;
}

.author .au_logo {
  width: 20px;
  height: 20px;
  border: 1px solid #dee0e1;
  border-radius: 50%;
  margin-right: 4px;
  float: left;
}

.author p {
  height: 22px;
  width: 10em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 22px;
  color: #7a8087;
}

.progress_bar {
  height: 20px;
  margin-top: 10px;
  position: relative;
  overflow: hidden;
}
.pro_bottom {
  padding-top: 10px;
  line-height: 21px;
  height: 42px;
}
.pro_bottom .left {
  float: left;
}

.pro_bottom .status_title {
  font-size: 16px;
  line-height: 16px;
  margin-top: 10px;
  color: #21b6c7;
  font-weight: 700;
  float: left;
}
.pro_bottom .gray_ex {
  padding-top: 8px;
  font-size: 14px;
  line-height: 21px;
  color: #72b8c7;
  overflow: hidden;
  height: 42px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
}
</style>