<template>
  <div class="">
    <navigation></navigation>
    <div class="main">
      <div class="main_left">
        <div style="height: 300px">
          <userDynamic></userDynamic>
        </div>
        <div class="dynamic_list">
          <div class="title" style="height: 60px">
            <p class="">创作者动态</p>
          </div>
          <el-divider></el-divider>

          <div class="dynamic_list_body">
            <div
              class="info_list"
              v-for="dynamic in dynamicList"
              :key="dynamic.id"
            >
              <dynamic :dynamic="dynamic" ></dynamic>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userDynamic from "@/views/user/components/user_dynamic";
import dynamic from "@/components/dynamic/index";
import navigation from "@/components/header/navigation";
import dynamicApi from "@/api/dynamic";

export default {
  name: "",
  components: {
    userDynamic: userDynamic,
    dynamic: dynamic,
    navigation: navigation,
  },
  data() {
    return {
      dynamicList: [],
    };
  },
  created() {
    this.initDynamicList();
  },
  methods: {
    initDynamicList() {
      dynamicApi.getAllDynamic().then((response) => {
        this.dynamicList = response.data;
        console.log(response.data);
      });
    },
  },
};
</script>

<style scoped>
.main {
  max-width: 1080px;
  margin: 0 auto;
  width: 1080px;
  height: auto;
  padding-top: 60px;
  padding-bottom: 40px;
  overflow: hidden;
}
.main_left {
  float: left;
  width: 740px;
  margin-right: 40px;
}

.dynamic_list .title {
  width: 100%;
}

.dynamic_list .title p {
  color: #222c37;
  font-size: 24px;
  line-height: 70px;
  margin-right: 40px;
  float: left;
  font-weight: 700;
  cursor: pointer;
}

.dynamic_list .info_list {
  overflow: hidden;
  margin-bottom: 19px;
}
</style>