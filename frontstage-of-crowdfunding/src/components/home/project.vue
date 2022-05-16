<template>
  <div class="project_mian">
 
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px">
            <a
              href="https://zhongchou.modian.com/item/120136.html"
              target="_blank"
              ><h3 class="pro_title">
                人体解剖手稿 酷燃特装书盒！可收纳！可装饰！会发光！
              </h3></a
            >
            <div class="author">
              <div
                class="au_logo"
                style="
                  background: url(https://p6.moimg.net/ico/2019/07/16/20190716_1563258148_5908.jpg?imageMogr2/auto-orient/strip)
                    no-repeat center center;
                  background-size: cover;
                "
              ></div>
              <p>中信出版集团</p>
            </div>
            <div class="progress_bar">
              <el-progress
                :text-inside="true"
                :stroke-width="20"
                :percentage="10"
                status="exception"
              ></el-progress>
            </div>
            <div class="pro_bottom">
              <div class="left">
                <p class="status_title">¥<span>21.3万</span></p>
              </div>
              <div class="right">
                <p class="gray_ex">
                  <span backer_count="120136">532</span> 支持者
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