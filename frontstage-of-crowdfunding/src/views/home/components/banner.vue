<template>
  <div class="banner">
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 class="medium">
          <img
            src="https://p6.moimg.net/path/dst_project/202205/1313/4041/2205134041wq6XBGepD8aVzZ977OymWZ3NonYA0J.jpg"
          />
        </h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Banner",
  data() {
    return {};
  },
};
</script>

<style scoped>
.banner {
    margin-top: 10px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>