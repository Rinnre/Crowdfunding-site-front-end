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
              <a class="btn JImgs" href="javascript:;">
                <i class="iconfont icon-picture"></i> 图片
              </a>
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
                <li class="btn wb">
                  <i class="iconfont icon-weibo"></i>
                  <span class="txt">未同步</span>
                </li>
                <li class="btn changeable show-select status limit">
                  <span class="changeable-txt" data-type="0">公开</span>
                  <i class="iconfont icon-downmore"></i>
                  <ul class="select-options" style="display: none">
                    <li data-type="0">公开</li>
                    <li data-type="1">仅自己可见</li>
                  </ul>
                </li>
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
    return {};
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
</style>