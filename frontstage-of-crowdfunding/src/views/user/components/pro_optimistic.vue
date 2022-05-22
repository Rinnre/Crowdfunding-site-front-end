<template>
  <div class="pro_main">
    <div class="header">
      <p>我看好的项目<span>共 4 个项目</span></p>
    </div>
    <div class="pro_field">
      <ul class="pro_ul clearfix">
        <li v-for="index in 4" :key="index">
          <project></project>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import project from "@/components/home/project";
export default {
  name: "ProOptimistic",
  components: {
    project: project,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.pro_main .header {
  overflow: hidden;
  padding-bottom: 15px;
  border-bottom: solid 1px #dee0e1;
}

.pro_main .header p:first-child {
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: #222c37;
  float: left;
  margin: 0;
  cursor: pointer;
}

.pro_main .header p span {
  font-size: 16px;
  padding-left: 40px;
  color: #7a8087;
  font-weight: normal;
}

.pro_ul li {
  float: left;
  width: 230px;
  height: 480px;
  background-color: #fff;
  margin: 10px 0 0 10px;
  overflow: hidden;
  transition: all 0.2s linear;
}
</style>