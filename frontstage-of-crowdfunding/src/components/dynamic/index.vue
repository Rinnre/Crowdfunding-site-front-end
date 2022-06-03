<template>
  <el-card class="box-card">
    <div class="dynamic-head">
      <el-avatar :size="50" :src="dynamic.user.avatar"></el-avatar>
      <div style="margin-left: 61px; margin-top: -49px">
        <div style="font-size: 16px; font-weight: normal; color: #7a8087">
          {{ dynamic.user.nickName }}
        </div>
        <div
          class="date"
          style="
            font-size: 12px;
            font-weight: normal;
            color: rgb(122, 128, 135);
            margin-left: 3px;
            margin-top: 7px;
          "
        >
          {{ dynamic.createTime }}
          <div class="dynamic-more">
            <el-popover
              placement="bottom"
              popper-class="dynamic-popover-more"
              trigger="click"
              v-if="userInfo != undefined && userInfo.uid == dynamic.uid"
            >
              <div class="dynamic-operation">
                <div class="dynamic-operation-top" v-if="false">
                  <a href="javascript:;">置顶</a>
                </div>
                <div class="dynamic-operation-delete">
                  <a href="javascript:;" @click="deleteDynamic()">删除</a>
                </div>
              </div>
              <span slot="reference"
                ><i style="font-size: 18px" class="iconfont icon-more"></i
              ></span>
            </el-popover>
          </div>
        </div>
      </div>
    </div>
    <div class="dynamic-body">
      <div class="dynamic-content">
        <div class="dynamic-rich-text">
          <span>{{ dynamic.content }}</span>
        </div>
        <div class="dynamic-img-list">
          <!-- <div :class="{'dynamic-img': len > 2;'dynamic-img1': len == 1;'dynamic-img2': len == 2}"> -->
          <div
            :class="{
              'dynamic-img': dynamic.pictureList.length > 2,
              'dynamic-img1': dynamic.pictureList.length == 1,
              'dynamic-img2': dynamic.pictureList.length == 2,
            }"
            v-for="picture in dynamic.pictureList"
            :key="picture.id"
          >
            <img
              class="lazyload"
              :src="picture.picturePath"
              style="width: 100%; display: block"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="dynamic-footer">
      <div class="action share">
        <i class="iconfont icon-share"></i>
        转发
      </div>
      <div class="action thumbs" @click="commentDisplay = !commentDisplay">
        <i class="iconfont icon-comment"></i>
        评论
      </div>
      <div class="action thumbs">
        <i class="iconfont icon-thumbs"></i>
        点赞
      </div>
    </div>
    <div class="comment_style" v-if="commentDisplay">
      <comment :sourceId="this.dynamic.id" :type="'dynamic'"></comment>
    </div>
  </el-card>
</template>

<script>
import comment from "@/components/comment";
export default {
  name: "Dynamic",
  props: {
    dynamic: {
      type: Object,
      default: {},
    },
  },
  components: {
    comment: comment,
  },
  data() {
    return {
      userInfo: {},

      commentDisplay: false,
    };
  },
  created() {
    this.userInfo = this.$store.state.user;
    // console.log(this.userInfo)
    console.log(this.dynamic)
  },
  methods: {
    deleteDynamic() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("deleteDynamic", this.dynamic.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.box-card {
  width: 100%;
  border-radius: 18px;
  background: #f7f7f7;
  padding-top: 15px;
  padding-left: 15px;
}

/* footer */
.dynamic-footer {
  display: flex;
  height: 48px;
  padding-left: 72px;
}

.action {
  -ms-flex-align: center;
  align-items: center;
  color: #99a2aa;
  cursor: pointer;
  display: -ms-flexbox;
  display: flex;
  font-size: 12px;
  height: 100%;
  position: relative;
  -ms-user-select: none;
  user-select: none;
  width: 92px;
}
.action:hover {
  color: blue;
}
.action i {
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  height: 16px;
  margin-right: 4px;
  width: 20px;
}
.action i {
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  height: 16px;
  margin-right: 4px;
  width: 20px;
}
/* body */
.dynamic-body {
  margin-top: 10px;
  padding-left: 61px;
}
.dynamic-content {
  font-family: Helvetica Neue, Helvetica, Arial, Microsoft Yahei,
    Hiragino Sans GB, Heiti SC, WenQuanYi Micro Hei, sans-serif;
  width: 532px;
}

.dunamic-rich-text {
  font-family: Helvetica Neue, Helvetica, Arial, Microsoft Yahei,
    Hiragino Sans GB, Heiti SC, WenQuanYi Micro Hei, sans-serif;
  font-size: 14px;
  letter-spacing: 0.5px;
  line-height: 22px;
  white-space: pre-wrap;
  word-break: break-word;
}
/* img-list */
.dynamic-content .dynamic-img-list {
  width: 510px;
  display: inline-block;
  margin-top: 4px;
}
/* img */
.dynamic-img-list .dynamic-img {
  width: 160px;
  margin-left: 10px;
  margin-top: 10px;
  float: left;
}
/* img */
.dynamic-img-list .dynamic-img2 {
  width: 245px;
  margin-right: 10px;
  margin-top: 10px;
  float: left;
}
/* img */
.dynamic-img-list .dynamic-img1 {
  width: 100%;
  margin-top: 10px;
}
/* more */
.dynamic-more {
  margin-right: 10px;
  margin-top: -21px;
  float: right;
  cursor: pointer;
}
/* dynamic-operation */
.dynamic-operation {
  width: 30px;
}
.dynamic-operation a {
  color: #000;
}
.dynamic-operation a:hover {
  color: blue;
}

.comment_style /deep/ .detail-feedback-wrap {
  background: #f7f7f7 !important;
  border-radius: 0px;
  margin: 0;
  padding-bottom: 0px;
  box-shadow: none;
}

.comment_style /deep/ .comment-box {
  background: #f7f7f7;
}
</style>