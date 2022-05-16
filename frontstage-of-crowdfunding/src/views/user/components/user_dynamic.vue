<template>
  <div class="main-inner">
    <h3>
      <span class="big_title">发布动态</span>
    </h3>
    <ul class="nav" style="display: none">
      <li data-type="image-text" class="active">图文发布</li>
      <li data-type="article">文章发布</li>
    </ul>
    <div class="image-text" style="display: block">
      <div class="item">
        <div class="edit edit-kinds">
          <div class="text-field">
            <textarea
              id="dynamic_content"
              name="content"
              class="statistics cctext"
              maxlength="1000"
              placeholder="输入内容..."
              style="resize: none; height: 76px"
            ></textarea>
            <span class="word-count"
              ><em class="current">0</em> /
              <em data-max="1000" class="max">1000</em></span
            >
            <div class="_topicList"></div>
          </div>
          <div class="op-buttons clearfix">
            <div class="left">
              <!-- 图片上传 -->
              <el-popover placement="bottom" width="300" trigger="click">
                <div class="mface-box dy_img">
                  <div class="mface-inner dy_img_field">
                    <div class="dy_img_list">
                      <div
                        class="img_list img_lists img"
                        @mousemove="deleteVisual = true"
                        @mouseleave="deleteVisual = false"
                      >
                        <img
                          src="https://p6.moimg.net/path/dst_project/202205/1414/5754/22051457544Rlaex12qJdYEjQZo8vpw98PL0ABGZ.png"
                          style="height: auto"
                        />
                        <p class="img_meng" v-if="deleteVisual">
                          <span class="del_img"></span>
                        </p>
                      </div>

                      <div class="img_list dyup_btn">
                        <input
                          type="file"
                          id="dy_img_input"
                          multiple=""
                          name="dy_img_input[]"
                          accept="image/jpeg,image/gif,image/png"
                        />
                      </div>
                    </div>
                    <p
                      style="
                        font-size: 14px;
                        padding-top: 10px;
                        color: #bcbfc3;
                        line-height: 21px;
                      "
                    >
                      允许上传20张，支持jpg、png、gif格式图片，大小不超过10M。
                    </p>
                  </div>
                </div>
                <a slot="reference" class="btn JImgs" href="javascript:;">
                  <i class="iconfont icon-picture"></i> 图片
                </a>
              </el-popover>
              <a class="btn JVedio" href="javascript:;">
                <i class="iconfont icon-video"></i> 视频
              </a>
              <a class="btn Topic" href="javascript:void(0);">
                <i
                  class="iconfont icon-topic"
                  style="color: #785a5a; font-size: 17.5px"
                ></i
                >话题
              </a>
            </div>
            <div class="right ordinary-operate">
              <ul>
                <!-- <li @click="privacyVisual=true" class="btn changeable show-select status limit">
                  <span class="changeable-txt" data-type="0">公开</span>
                  <i
                    style="margin-left: 8px; color: #96a7be"
                    class="iconfont icon-downmore"
                  ></i>
                  <ul class="select-options" v-if="privacyVisual" >
                    <li data-type="0">公开</li>
                    <li data-type="1">仅自己可见</li>
                  </ul>
                </li> -->
               
                <li class="edit changeable" style="min-width: auto">
                  <span class="btn submit changeable-txt" data-type="0"
                    >发布</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "publicDynamic",
  data() {
    return {
      deleteVisual: false,
      privacyVisual: true,
    };
  },
  methods: {
     handleCommand(command) {
        this.$message('click on item ' + command);
      }
  },
};
</script>

<style scoped>
/* mian */
.main-inner {
  width: 740px;
  float: left;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border-top: 1px solid transparent;
}
/* 标题 */
.main-inner h3 {
  font-size: 24px;
  line-height: 28px;
  padding-bottom: 30px;
  /* border-bottom: 1px solid #dee0e1; */
}
/* text-field */
.item .text-field {
  padding: 0px 10px 30px;
}
.item .text-field {
  width: 100%;
  min-height: 138px;
  border: 1px solid #dee0e1;
  /* border-top: none; */
  padding: 0px 20px 30px;
  position: relative;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}
.item .text-field textarea {
  padding: 10px 0;
  display: block;
  width: 100%;
  height: 100%;
  /* background: #f6f9f9; */
  font-size: 16px;
  line-height: 1.75;
  resize: none;
  /* border-top: 1px solid #dee0e1; */
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}
/*输入字数  */
.item .text-field .word-count {
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 10px 20px;
  color: #bcbfc3;
  /* background-color: #f6f9f9; */
}

._topicList {
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  left: 10px;
  bottom: 10px;
}
/*  */
.op-buttons {
  height: 86px;
  line-height: 86px;
}
.clearfix {
  zoom: 1;
}

.op-buttons .left {
  float: left;
}
.op-buttons a {
  float: left;
  margin-right: 24px;
  color: #7a8087;
  position: relative;
}
a {
  text-decoration: none;
  outline: none;
  color: #425eb2;
}

.op-buttons .right {
  float: right;
}

.op-buttons .right li {
  float: left;
  line-height: 40px;
  margin: 23px 0;
  margin-left: 20px;
  position: relative;
}

.op-buttons .right .edit {
  min-width: 120px;
  height: 40px;
  line-height: 40px;
  margin: 23px 0 23px 20px;
  text-align: center;
  background: #00cba6;
  color: #fff;
}
/* 图片上传 */
.mface-box .dy_img_field {
  width: 260px;
  height: auto;
  min-height: 115px;
  background: #fff;
  box-sizing: content-box;
}
.mface-box {
  display: block;
}

.dy_img_list {
  overflow: hidden;
}
.dy_img_list .img_list:nth-child(3n + 1) {
  margin-left: 0px;
}
.dy_img_list .img_list {
  margin-left: 10px;
  margin-bottom: 10px;
  float: left;
}
.dyup_btn input[type="file"] {
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.dyup_btn {
  background-image: url("../../../assets/icon-edit.png");
  background-position: -19px -135px;
  position: relative;
}
input {
  font-family: inherit;
  line-height: 90px;
  height: 38px;
  font-size: 16px;
  border: none;
  outline: none;
}
.img_list {
  width: 80px;
  height: 80px;
  position: relative;
  overflow: hidden;
}
.img_list img {
  display: block;
  max-width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
}

.img_list .img_meng {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(34, 44, 55, 0.8);
}

.img_list .del_img {
  position: absolute;
  display: inline-block;
  right: 10px;
  top: 10px;
  width: 10px;
  height: 10px;
  background-image: url("../../../assets/del_img.png");
  background-size: contain;
  cursor: pointer;
}

/*私有化 */
.op-buttons .right .btn {
  cursor: pointer;
}
.op-buttons .right li {
  float: left;
  line-height: 40px;
  margin: 23px 0;
  margin-left: 20px;
  position: relative;
}

.op-buttons .select-options {
  position: absolute;
  width: 80px;
  top: 40px;
  left: 50%;
  transform: translate(-50%);
  padding: 0 20px;
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
  display: none;
}
.op-buttons .select-options li {
  margin: 0;
  float: none;
  cursor: pointer;
  line-height: 20px;
  margin: 15px 0;
  color: #7a8087;
  text-align: center;
}

.op-buttons .right .edit {
  min-width: 120px;
  height: 40px;
  line-height: 40px;
  margin: 23px 0 23px 20px;
  text-align: center;
  background: #00cba6;
  color: #fff;
}

.op-buttons .edit .btn {
  padding: 0 26px;
}

.op-buttons .select-options {
  position: absolute;
  width: 80px;
  top: 40px;
  left: 50%;
  transform: translate(-50%);
  padding: 0 20px;
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
}
.op-buttons .select-options li {
  margin: 0;
  float: none;
  cursor: pointer;
  line-height: 20px;
  margin: 15px 0;
  color: #7a8087;
  text-align: center;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>