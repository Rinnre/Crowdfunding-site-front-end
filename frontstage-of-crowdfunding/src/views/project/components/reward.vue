<template>
  <div class="reward_body">
    <h3 class="reward_title">
      <div class="head">
        <span>¥329</span>
        <em class="count">已抢光／限 200 份</em>
      </div>
      <div class="sub_head">
        <span>限量</span>
        <span>每人限 1 份</span>
      </div>
    </h3>
    <div class="reward_content">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="珍藏书标准档" name="1">
          <div class="reward_detail">
            <p>
              ①《江户狂歌》众筹特装珍藏书<br />
              （金属徽章镶嵌+刷边+亲签）<br />
              ②超大高清拉页6张（配卷筒）<br />
              ③百变书衣3个<br />
              ④档位解锁福利<br />
              注：此特装版本众筹结束即绝版
            </p>
          </div>
          <div class="reward_img_list">
            <div class="reward_img">
              <img
                class="lazy"
                src="https://p6.moimg.net/path/dst_project/202204/1316/4101/220413410135xwQ9lBMkARzkbd4OyYG1e4OnDrWN.jpg"
                style="width: 100%; display: block"
              />
            </div>
            <div class="reward_img">
              <img
                class="lazy"
                src="https://p6.moimg.net/path/dst_project/202204/1316/4101/220413410135xwQ9lBMkARzkbd4OyYG1e4OnDrWN.jpg"
                style="width: 100%; display: block"
              />
            </div>
            <div class="reward_img">
              <img
                class="lazy"
                src="https://p6.moimg.net/path/dst_project/202204/1316/4101/220413410135xwQ9lBMkARzkbd4OyYG1e4OnDrWN.jpg"
                style="width: 100%; display: block"
              />
            </div>
          </div>

          <div class="reward-time">预计回报发放时间 2022年07月内</div>
          <router-link class="btn back-btn" to="/order/123">
            去支持
          </router-link>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reward",
  data() {
    return {
      activeNames: ["1"],
    };
  },
  methods: {
    handleChange() {},
  },
};
</script>

<style scoped>
.reward_body .reward_title .head {
  line-height: 24px;
  padding: 20px 0 10px;
  font-size: 24px;
  /* border-bottom: 1px solid #dee0e1; */
}

/* reward_head */
.reward_body .reward_title .head .count {
  float: right;
  font-weight: normal;
  font-size: 14px;
  color: #7a8087;
}

i,
em {
  font-style: normal;
}
/* reward_sub_head */
.reward_body .reward_title .sub_head {
  color: #00cba6;
  font-size: 12px;
  font-weight: normal;
  line-height: 20px;
  height: 20px;
}

.reward_body .reward_title .sub_head > span {
  color: #bcbfc3;
  background: #f8f8f9;
  cursor: pointer;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  display: block;
  height: 20px;
  padding: 0 4px;
  /* background: #EBFAF8; */
  border-radius: 10px;
}

.reward_content /deep/ .el-collapse-item__header {
  font-weight: 700;
  font-size: 16px;
}

/* reward_detail */
.reward_content /deep/ .el-collapse-item__content .reward_detail {
  margin: 16px 0;
  font-size: 16px;
  line-height: 1.5;
  color: #7a8087;
}

/*  */
.reward_content /deep/ .el-collapse-item__content .reward_img {
  float: left;
  margin-top: 10px;
  width: 95px;
  height: 100px;
  overflow: hidden;
  margin-right: 15px;
  /* cursor: url('../../img/web4-0/cursor/big.cur'), auto !important; */
  position: relative;
}

.reward_content /deep/ .el-collapse-item__content .reward_img img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
}

/*  */
.reward_content /deep/ .el-collapse-item__content .reward-time {
  font-size: 16px;
  line-height: 1.5;
  margin-top: 140px;
}

.reward_content /deep/  .btn {
    width: 120px;
    height: 40px;
    line-height: 36px;
    display: block;
    background-color: #00cba6;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    margin-top: 16px;
    outline: none;
    border: 0;
    cursor: pointer;
}
</style>