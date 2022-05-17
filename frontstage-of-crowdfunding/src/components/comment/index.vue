<template>
  <div class="opus-wrap clearfix">
    <div class="detail-left">
      <!-- <div class="df-title" id="all_comments">
        <span class="comment-num"
          ><i>{{ commentCount }}</i></span
        >
        评论
      </div> -->
      <div class="detail-feedback-wrap">
        <div class="df-ipt-wrap clearfix" id="comment">
          <div class="feeds-author l">评论</div>
          <div class="textarea-one l">
            <textarea
              v-model="commentForm.content"
              placeholder="共同学习，写下你的评论"
            ></textarea>
          </div>
          <el-button
            class="reply-btn-one"
            type="primary"
            round
            @click="addComment('0', '0')"
            >评论</el-button
          >
        </div>

        <div
          id="js-feedback-list-wrap"
          class="feedback-list js-feedback-lookimg"
          v-if="commentList == undefined || commentList.length <= 0"
        >
          <p class="feedback-none">暂无评论</p>
        </div>

        <div
          id="js-feedback-list-wrap"
          class="feedback-list js-feedback-lookimg"
          v-else
        >
          <div id="js-feedback-list">
            <div
              v-for="(comment, index) in commentList"
              v-bind:key="index"
              class="comment-box clearfix"
            >
              <div class="comment clearfix">
                <div class="feed-author l">
                  <a>
                    <img :src="comment.avatar" width="48" /><span
                      class="com-floor"
                      >{{ index + 1 }}楼</span
                    >
                  </a>
                </div>
                <div class="feed-list-content">
                  <a class="nick">{{ comment.nickname }}</a>
                  <p></p>
                  <p>{{ comment.content }}</p>
                  <p></p>
                  <div class="comment-footer clearfix">
                    <span
                      class="reply-btn"
                      @click="addReply(comment.id, comment.id)"
                      >回复</span
                    >
                    <span
                      v-if="memberId == comment.memberId"
                      class="reply-btn"
                      @click="removeComment(comment.id)"
                      >删除</span
                    >
                    <span v-else class="reply-btn" @click="toReport(comment.id)"
                      >举报</span
                    >
                    <span class="feed-list-times">{{ comment.gmtCreate }}</span>
                  </div>
                </div>
              </div>
              <div class="reply-box">
                <div
                  v-for="(childrenList, index) in comment.children"
                  v-bind:key="index"
                  class="comment clearfix"
                >
                  <div class="feed-author l">
                    <a>
                      <img :src="childrenList.avatar" width="48" />
                    </a>
                  </div>
                  <div class="feed-list-content">
                    <a class="from-user">{{ childrenList.nickname }}</a> 回复
                    <a class="to-user">{{ childrenList.replyNickname }}</a>
                    <p>{{ childrenList.content }}</p>
                    <div class="comment-footer clearfix">
                      <span
                        class="reply-btn"
                        @click="addReply(comment.id, childrenList.id)"
                        >回复</span
                      >
                      <span
                        v-if="memberId == childrenList.memberId"
                        class="reply-btn"
                        @click="removeComment(childrenList.id)"
                        >删除</span
                      >
                      <span
                        v-else
                        class="reply-btn"
                        @click="toReport(childrenList.id)"
                        >举报</span
                      >
                      <span class="feed-list-times">{{
                        childrenList.gmtCreate
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="commentId == comment.id"
                class="release-reply clearfix"
              >
                <a class="user-head">
                  <img :src="avatar" />
                </a>
                <div class="replay-con l">
                  <div class="textarea-wrap">
                    <textarea
                      v-model="commentForm.replyContent"
                      placeholder="写下你的回复..."
                    ></textarea>
                  </div>
                  <p class="errtip"></p>
                  <div class="reply-ctrl clearfix">
                    <div class="btn-wrap">
                      <div class="cancel-btn" @click="addReply('')">取消</div>
                      <div
                        class="release-reply-btn"
                        @click="addComment(commentForm.replyId, comment.id)"
                      >
                        回复
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="举报"
      :visible.sync="reportDialogVisible"
      width="500px"
      @close="clean()"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="举报类型">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="广告或垃圾信息" name="type"></el-checkbox>
            <el-checkbox label="辱骂" name="type"></el-checkbox>
            <el-checkbox label="涉政或违法" name="type"></el-checkbox>
            <el-checkbox label="抄袭" name="type"></el-checkbox>
            <el-checkbox label="不合适内容" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="举报理由">
          <el-input
            type="textarea"
            placeholder="请输入举报理由"
            maxlength="150"
            show-word-limit
            v-model="form.reason"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reportDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addReport()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import comment from '@/api/comment'
export default {
  //
  props: {
    sourceId: {
      type: String,
      default: "",
    },
    sourceType: {
      type: String,
      default: "",
    },
    memberId: {
      type: String,
      default: "",
    },
    sourceTitle: {
      type: String,
      default: "",
    },
    authorId: {
      type: String,
      default: "0",
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // 发布评论
      commentForm: {
        parentId: "",
        sourceId: "",
        sourceType: "",
        content: "",
        replyId: "",
        replyContent: "",
        replyMemberId: "",
        replyNickname: "",
      },

      commentId: "",
      //
      commentVo: {
        sourceId: "",
        sourceType: "",
      },
      // 评论列表
      commentList: [
        {
          id: "1510468317616820226",
          parentId: "0",
          sourceType: "course",
          sourceId: "1501441043374637058",
          memberId: "1501820738536570881",
          nickname: "彭浩",
          avatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIlBiaNaPKczt4mrHTGORt4ic2wCHZgO8kyJaId4Y7Btda36Elm862YYAA8GRuzFx4Vqbj5KEvJficSg/132",
          content: "测试添加评论功能——Java精品课程",
          replyId: "0",
          replyMemberId: null,
          replyNickname: null,
          level: 1,
          children: [
            {
              id: "1510482404388114434",
              parentId: "1510468317616820226",
              sourceType: "course",
              sourceId: "1501441043374637058",
              memberId: "1501820738536570881",
              nickname: "彭浩",
              avatar:
                "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIlBiaNaPKczt4mrHTGORt4ic2wCHZgO8kyJaId4Y7Btda36Elm862YYAA8GRuzFx4Vqbj5KEvJficSg/132",
              content: "测试回复评论功能——Java精品课程",
              replyId: "1510468317616820226",
              replyMemberId: "1501820738536570881",
              replyNickname: "彭浩",
              level: 2,
              children: null,
              state: 0,
              gmtCreate: "2022-04-03 13:00:43",
            },
            {
              id: "1510482958355009537",
              parentId: "1510468317616820226",
              sourceType: "course",
              sourceId: "1501441043374637058",
              memberId: "1501820738536570881",
              nickname: "彭浩",
              avatar:
                "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIlBiaNaPKczt4mrHTGORt4ic2wCHZgO8kyJaId4Y7Btda36Elm862YYAA8GRuzFx4Vqbj5KEvJficSg/132",
              content: "测试回复评论功能——Java精品课程2",
              replyId: "1510468317616820226",
              replyMemberId: "1501820738536570881",
              replyNickname: "彭浩",
              level: 2,
              children: null,
              state: 0,
              gmtCreate: "2022-04-03 13:02:55",
            },
            {
              id: "1510494370100002818",
              parentId: "1510468317616820226",
              sourceType: "course",
              sourceId: "1501441043374637058",
              memberId: "1501820738536570881",
              nickname: "彭浩",
              avatar:
                "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIlBiaNaPKczt4mrHTGORt4ic2wCHZgO8kyJaId4Y7Btda36Elm862YYAA8GRuzFx4Vqbj5KEvJficSg/132",
              content: "测试回复评论功能——Java精品课程3",
              replyId: "1510468317616820226",
              replyMemberId: "1501820738536570881",
              replyNickname: "彭浩",
              level: 2,
              children: null,
              state: 0,
              gmtCreate: "2022-04-03 13:48:16",
            },
            {
              id: "1510500646200569857",
              parentId: "1510468317616820226",
              sourceType: "course",
              sourceId: "1501441043374637058",
              memberId: "1510498291698728962",
              nickname: "张三 ",
              avatar:
                "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKvyvYrjCqe53yg49Liazd4Ox6aiclVbXxichnF1wpVu6R6EDCIaIJYp4ZfY0Ih7Fq5EgvRNEWVGABdA/132",
              content: "测试回复评论功能——Java精品课程4",
              replyId: "1510482404388114434",
              replyMemberId: "1501820738536570881",
              replyNickname: "彭浩",
              level: 2,
              children: null,
              state: 1,
              gmtCreate: "2022-04-03 14:13:12",
            },
          ],
          state: 0,
          gmtCreate: "2022-04-03 12:04:45",
        },
        {
          id: "1510482128755232769",
          parentId: "0",
          sourceType: "course",
          sourceId: "1501441043374637058",
          memberId: "1501820738536570881",
          nickname: "彭浩",
          avatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIlBiaNaPKczt4mrHTGORt4ic2wCHZgO8kyJaId4Y7Btda36Elm862YYAA8GRuzFx4Vqbj5KEvJficSg/132",
          content: "测试添加评论功能——Java精品课程2",
          replyId: "0",
          replyMemberId: "",
          replyNickname: "",
          level: 1,
          children: [
            {
              id: "1510500764081483778",
              parentId: "1510482128755232769",
              sourceType: "course",
              sourceId: "1501441043374637058",
              memberId: "1510498291698728962",
              nickname: "张三 ",
              avatar:
                "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKvyvYrjCqe53yg49Liazd4Ox6aiclVbXxichnF1wpVu6R6EDCIaIJYp4ZfY0Ih7Fq5EgvRNEWVGABdA/132",
              content: "测试添加评论功能——Java精品课程21",
              replyId: "1510482128755232769",
              replyMemberId: "1501820738536570881",
              replyNickname: "彭浩",
              level: 2,
              children: null,
              state: 0,
              gmtCreate: "2022-04-03 14:13:41",
            },
            {
              id: "1510501397496885250",
              parentId: "1510482128755232769",
              sourceType: "course",
              sourceId: "1501441043374637058",
              memberId: "1501820738536570881",
              nickname: "彭浩",
              avatar:
                "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIlBiaNaPKczt4mrHTGORt4ic2wCHZgO8kyJaId4Y7Btda36Elm862YYAA8GRuzFx4Vqbj5KEvJficSg/132",
              content: "测试添加评论功能——Java精品课程22",
              replyId: "1510500764081483778",
              replyMemberId: "1510498291698728962",
              replyNickname: "Jlinのabysmᵀᴹ",
              level: 2,
              children: null,
              state: 0,
              gmtCreate: "2022-04-03 14:16:12",
            },
            {
              id: "1522899590960496642",
              parentId: "1510482128755232769",
              sourceType: "course",
              sourceId: "1501441043374637058",
              memberId: "1510498291698728962",
              nickname: "张三 ",
              avatar:
                "https://guli-edu-ph.oss-cn-beijing.aliyuncs.com/avatar/2022/05/25e73b00c8dc4370827c17dd64b2e2dc.png",
              content: "测试数据提醒——回复评论（课程）",
              replyId: "1510482128755232769",
              replyMemberId: "1501820738536570881",
              replyNickname: "彭浩",
              level: 2,
              children: null,
              state: 0,
              gmtCreate: "2022-05-07 19:22:11",
            },
          ],
          state: 0,
          gmtCreate: "2022-04-03 12:59:38",
        },
        {
          id: "1522899545544572930",
          parentId: "0",
          sourceType: "course",
          sourceId: "1501441043374637058",
          memberId: "1510498291698728962",
          nickname: "张三 ",
          avatar:
            "https://guli-edu-ph.oss-cn-beijing.aliyuncs.com/avatar/2022/05/25e73b00c8dc4370827c17dd64b2e2dc.png",
          content: "测试数据提醒——发布评论（课程）",
          replyId: "0",
          replyMemberId: null,
          replyNickname: null,
          level: 1,
          children: [],
          state: 0,
          gmtCreate: "2022-05-07 19:22:00",
        },
      ],
      commentCount: 0,
      reportDialogVisible: false,
      // 举报
      form: {
        commentId: "",
        type: [],
        reason: "",
      },
    };
  },
  created() {
    this.defaultForm = JSON.parse(JSON.stringify(this.form));
    this.defaultCommentForm = JSON.parse(JSON.stringify(this.commentForm));
    this.getCommentList();
  },
  methods: {
    getCommentList() {
      this.commentVo.sourceId = this.sourceId;
      this.commentVo.sourceType = this.sourceType;
      comment.getCommentList(this.commentVo).then((response) => {
        if (response.data.success === true) {
          this.commentList = response.data.data.commentList;
          this.commentCount = response.data.data.count;
          this.toParent();
        }
      });
    },
    toParent() {
      this.$emit("fromChild", this.commentCount);
    },
    addComment(replyId, parentId) {
      this.commentForm.replyId = replyId;
      this.commentForm.parentId = parentId;
      this.commentForm.sourceId = this.sourceId;
      this.commentForm.sourceType = this.sourceType;
      this.commentForm.sourceTitle = this.sourceTitle;
      this.commentForm.authorId = this.authorId;
      this.commentForm.content =
        this.commentForm.content === ""
          ? this.commentForm.replyContent
          : this.commentForm.content;
      comment.addComment(this.commentForm).then((response) => {
        if (response.data.success === true) {
          this.getCommentList();
          this.clean();
        }
      });
    },
    clean() {
      this.form = JSON.parse(JSON.stringify(this.defaultForm)); // 重置
      this.commentForm = JSON.parse(JSON.stringify(this.defaultCommentForm)); // 重置
      this.commentId = "";
    },
    addReply(commentId, replyId) {
      this.commentId = commentId;
      this.commentForm.replyId = replyId;
    },
    toReport(commentId) {
      this.form.commentId = commentId;
      this.reportDialogVisible = true;
    },
    addReport() {
      this.form.type = JSON.stringify(this.form.type);
      comment.addReport(this.form);
      this.reportDialogVisible = false;
    },
    removeComment(commentId) {
      this.$confirm("此操作将永久删除该评论，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return comment.removeComment(commentId);
        })
        .then(() => {
          this.getCommentList();
        })
        .catch((response) => {
          // 失败
          if (response === "cancel") {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.textarea-one {
  width: -webkit-fill-available;
  border: 1px solid #d9dde1;
  border-radius: 4px;
  padding: 8px 12px;
  background: #fff;
  font-size: 14px;
  color: #93999f;
  line-height: 22px;
  textarea {
    width: 100%;
    min-height: 58px;
    resize: none;
    border: 0;
    outline: 0;
  }
}
.reply-btn-one {
  margin-top: 10px;
  float: right;
}
.collected {
  color: #ffaa00 !important;
}
.reply-box {
  margin: 32px 0 0 64px;
}
.reply-box .comment:first-child {
  margin-top: 0;
}
.reply-box .comment {
  margin-top: 24px;
}
.comment-box .feed-author {
  width: 48px;
  margin-right: 16px;
}
.reply-box .comment .feed-author {
  width: 48px;
}
.comment-box .feed-author a {
  display: inline-block;
  text-align: center;
}
.comment-box .feed-author a img {
  border-radius: 50%;
  opacity: 0.8;
}
.reply-box .comment .feed-list-content {
  margin: 0 0 0 64px;
  font-size: 14px;
  color: #93999f;
  line-height: 24px;
  position: relative;
}
.feed-list-content {
  word-break: break-all;
  color: #14191e;
  font-size: 16px;
  line-height: 36px;
  margin-left: 64px;
}
.reply-box .comment .feed-list-content .from-user {
  color: #07111b;
  font-weight: 600;
}
.reply-box .comment .feed-list-content .comment-footer {
  margin-top: 4px;
}
.feed-list-content .comment-footer {
  margin: 12px 0 0 0;
  line-height: 32px;
  position: relative;
}
.feed-list-content .comment-footer .reply-btn {
  float: left;
  font-size: 12px;
  color: #9199a1;
  line-height: 32px;
  cursor: pointer;
  margin-right: 24px;
}
.feed-list-content .comment-footer .report-btn {
  float: left;
  font-size: 12px;
  color: #9199a1;
  line-height: 32px;
  cursor: pointer;
  margin-right: 24px;
}
.reply-box .comment .feed-list-content .feed-list-time {
  font-size: 12px;
  color: #93999f;
  line-height: 32px;
  position: absolute;
  right: 0;
  top: -1px;
}
.detail-feedback-wrap #js-feedback-list-wrap .feedback-loading,
.detail-feedback-wrap #js-feedback-list-wrap .feedback-none {
  text-align: center;
  margin-top: 20px;
}
.active-box {
  text-align: center;
  position: fixed;
  top: 190px;
  left: 50%;
  margin-left: -546px;
  z-index: 88;
}
.follow-warp {
  margin: 0 auto;
}
#main {
  min-height: initial;
  padding: 0;
}
.main_con {
  position: relative;
  width: 960px;
  margin: 32px auto 0 auto;
}
.active-box {
  text-align: center;
  position: fixed;
  top: 190px;
  left: 50%;
  margin-left: -546px;
  z-index: 88;
}
.share-wrap {
  text-align: center;
}
.active-box .small-share .weichat-posi {
  height: auto;
  padding-left: 0;
  width: 36px;
  position: relative;
}
.small-share li {
  width: auto;
  padding: 0 2px;
  display: inline-block;
}
.active-box .small-share .weichat-posi .praise-box {
  position: relative;
  width: 100%;
  left: -2px;
  text-align: center;
  padding-bottom: 12px;
}
.active-box .small-share .weichat-posi .praise-box button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 170, 0, 0.1);
  border: none;
  position: relative;
  display: block;
  margin: 0 auto;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  transition: all 0.3s;
  -moz-transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
}
.comment-num {
  padding: 0 5px;
  line-height: 20px;
}
.active-box .small-share .weichat-posi .praise-box button .icon-dianzan {
  line-height: 24px;
  position: relative;
  display: inline-block;
  font-size: 24px;
  color: #fa0;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  transition: all 0.3s;
  -moz-transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
}
.active-box .small-share .weichat-posi .praise-box button.praised {
  background: rgb(255, 170, 0);
}
.active-box
  .small-share
  .weichat-posi
  .praise-box
  button.praised
  .icon-dianzan {
  color: #fff;
}
.active-box .weichat-posi span {
  font-size: 12px;
  color: #9199a1;
  line-height: 18px;
}
.active-box .icon-warp {
  padding-bottom: 12px;
}
.active-box .small-share .weichat-posi .icon-nav {
  width: 38px;
  height: 24px;
  font-size: 24px;
  color: #b2b8bd;
  line-height: 24px;
  border-radius: 50%;
}
.small-share .icon-nav {
  font-size: 20px;
  color: #787d82;
  display: inline-block;
}
.share-wrap .icon-nav {
  background-image: none;
  line-height: 47px;
  float: none;
  display: inline-block;
  margin: 0;
  padding: 0;
  height: auto;
  color: #b4bbbf;
  font-size: 47px;
}
.active-box .weichat-posi span {
  font-size: 12px;
  color: #9199a1;
  line-height: 18px;
}
.active-box .small-share .weichat-posi .dc-follow {
  cursor: pointer;
  height: 18px;
  line-height: 18px;
}
.small-share .icon-nav {
  font-size: 20px;
  color: #787d82;
  display: inline-block;
}
.share-wrap .icon-nav {
  background-image: none;
  line-height: 47px;
  float: none;
  display: inline-block;
  margin: 0;
  padding: 0;
  height: auto;
  color: #b4bbbf;
  font-size: 47px;
}

/////////////////////////////////////////
.main_con .left_essay {
  width: 960px;
  margin-bottom: 100px;
}
.l {
  float: left;
}
.left_essay .part_essay {
  background: #fff;
  box-shadow: 0 8px 16px 0 rgba(7, 17, 27, 0.05);
  border-radius: 12px;
  box-sizing: border-box;
  padding: 40px 40px 24px 40px;
  position: relative;
}
.left_essay .part_essay .detail-path {
  font-size: 12px;
  color: #9199a1;
  line-height: 24px;
  position: relative;
  z-index: 10;
}
.left_essay .part_essay .detail-path a {
  color: #9199a1;
}
.left_essay .part_essay .detail-path i {
  color: #9199a1;
}
.left_essay .part_essay .detail-path span {
  margin: 0 5px;
}
.left_essay .part_essay .detail-title-wrap .detail-title {
  font-size: 32px;
  color: #1c1f21;
  line-height: 40px;
  margin: 8px 0;
  word-wrap: break-word;
  word-break: break-all;
}
.left_essay .part_essay .detail-title-wrap .detail-title .d-t {
  font-weight: 700;
}
.left_essay .part_essay .detail-title-wrap .dc-profile img {
  width: 48px;
  height: 48px;
  margin-right: 10px;
  border-radius: 50%;
}
.left_essay .part_essay .detail-title-wrap .dc-profile p {
  display: inline-block;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #1c1f21;
}
.left_essay .part_essay .detail-title-wrap .dc-profile {
  margin-top: 10px;
  font-size: 12px;
  color: #9199a1;
  line-height: 24px;
}
.left_essay .part_essay .detail-title-wrap .dc-profile .spacer {
  margin-right: 24px;
}
.left_essay .part_essay .detail-title-wrap .dc-profile span {
  vertical-align: middle;
}
.r {
  float: right;
}
.left_essay
  .part_essay
  .detail-title-wrap
  .dc-profile
  .path-right-box
  .rinfo
  .dc-sns:last-child {
  margin-right: 0;
}
.left_essay
  .part_essay
  .detail-title-wrap
  .dc-profile
  .path-right-box
  .rinfo
  .dc-sns {
  position: relative;
  margin-right: 24px;
  font-size: 12px;
  color: #9199a1;
  line-height: 16px;
}
.left_essay
  .part_essay
  .detail-title-wrap
  .dc-profile
  .path-right-box
  .rinfo
  .dc-sns
  i {
  width: 16px;
  height: 16px;
  display: inline-block;
  font-size: 16px;
  margin-top: -3px;
  vertical-align: middle;
}
.left_essay .part_essay .detail-content-wrap {
  padding-top: 24px;
}
.left_essay .part_essay .detail-content-wrap .detail-content {
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, STHeiti,
    "Microsoft Yahei", sans-serif;
  font-size: 16px;
  line-height: 32px;
  color: #1c1f21;
  word-wrap: break-word;
  color: #1c1f21;
  font-family: "PingFang SC", "微软雅黑", "Microsoft YaHei", Helvetica,
    "Helvetica Neue", Tahoma, Arial, sans-serif;
  line-height: 36px;
}
.left_essay .part_essay .detail-content-wrap .cat-box {
  margin-top: 24px;
  width: 100%;
  text-align: center;
}
.left_essay .part_essay .detail-content-wrap .cat-box .cat-wrap {
  display: inline-block;
}
.left_essay .part_essay .detail-content-wrap .cat-box .cat {
  display: inline-block;
  margin-right: 12px;
  padding: 4px 12px;
  background: rgba(84, 92, 99, 0.1);
  border-radius: 12px;
  font-size: 12px;
  color: #545c63;
  line-height: 16px;
}
.df-title {
  margin: 24px 0 16px 0;
  font-weight: 700;
  color: #07111b;
  line-height: 24px;
  font-size: 16px;
}
.df-title {
  margin: 24px 0 16px 0;
  font-weight: 700;
  color: #07111b;
  line-height: 24px;
  font-size: 16px;
}
.df-title span i {
  font-style: normal;
}
.detail-feedback-wrap {
  margin: 0 0 24px 0;
  background: #fff;
  border-radius: 12px;
  padding-bottom: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05);
}
.detail-feedback-wrap .df-ipt-wrap {
  padding: 28px 0;
  margin: 0 32px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(56, 61, 66, 0.1);
}
.detail-feedback-wrap .df-ipt-wrap .feeds-author {
  width: 48px;
  height: 48px;
  line-height: 48px;
  margin-right: 16px;
  text-align: center;
  overflow: hidden;
  font-size: 16px;
  font-weight: 700;
  color: #1c1f21;
}
.detail-feedback-wrap .df-ipt-wrap .fadeInput {
  width: 526px;
  height: 48px;
  padding: 12px 16px;
  box-sizing: border-box;
  background: #f3f5f6;
  border-radius: 6px;
  font-size: 16px;
  color: #9199a1;
  line-height: 24px;
}
.comment-box {
  background: #fff;
  padding: 28px 0;
  margin: 0 32px;
  border-bottom: 1px solid rgba(56, 61, 66, 0.1);
  width: inherit;
  position: relative;
  cursor: pointer;
}
.comment-box .feed-author {
  width: 48px;
  margin-right: 16px;
}
.comment-box .feed-author a {
  display: inline-block;
  text-align: center;
}
.comment-box .feed-author a img {
  border-radius: 50%;
  opacity: 0.8;
  width: 48px;
  height: 48px;
}
.comment-box .feed-author a .com-floor {
  font-size: 12px;
  color: #b7bbbf;
  line-height: 24px;
}
.feed-list-content {
  word-break: break-all;
  color: #14191e;
  font-size: 16px;
  line-height: 36px;
  margin-left: 64px;
}
.feed-list-content .nick {
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: #07111b;
  line-height: 24px;
  font-weight: 700;
}
.feed-list-content p {
  font-size: 16px;
  color: #1c1f21;
  line-height: 28px;
  word-wrap: break-word;
}
.feed-list-content .comment-footer {
  margin: 12px 0 0 0;
  line-height: 32px;
  position: relative;
}
.feed-list-content .comment-footer .agree-with {
  height: 32px;
  background: rgba(28, 31, 33, 0.08);
  border-radius: 16px;
  line-height: 32px;
  display: inline-block;
  cursor: pointer;
  text-align: center;
  padding: 0 16px;
  margin-right: 24px;
}
.feed-list-content .comment-footer .reply-btn {
  float: left;
  font-size: 12px;
  color: #9199a1;
  line-height: 32px;
  cursor: pointer;
  margin-right: 24px;
}
.feed-list-content .comment-footer .report-btn {
  float: left;
  font-size: 12px;
  color: #9199a1;
  line-height: 32px;
  cursor: pointer;
  margin-right: 24px;
}
.feed-list-content .comment-footer .feed-list-times {
  font-size: 12px;
  color: #9199a1;
  line-height: 32px;
  position: absolute;
  right: 0;
}
.release-reply {
  display: block;
  position: relative;
  margin-left: 64px;
  margin-top: 24px;
}
.release-reply .user-head {
  float: left;
  display: block;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 24px;
}
.release-reply .user-head img {
  display: block;
  height: 100%;
  width: 48px;
  height: 48px;
}
.release-reply .replay-con {
  width: 450px;
}
.release-reply .textarea-wrap {
  position: relative;
  border: 1px solid #d9dde1;
  border-radius: 4px;
  padding: 8px 12px;
  background: #fff;
  font-size: 14px;
  color: #93999f;
  line-height: 22px;
}
.release-reply textarea {
  width: 100%;
  min-height: 58px;
  resize: none;
}
.release-reply .errtip {
  height: 30px;
  font-size: 12px;
  color: #f01400;
  text-align: left;
  line-height: 20px;
}
.release-reply .reply-ctrl {
  position: relative;
}
.release-reply .reply-ctrl .btn-wrap {
  float: right;
  margin-bottom: 20px;
}
.release-reply .reply-ctrl .cancel-btn {
  display: inline-block;
  height: 36px;
  font-size: 14px;
  line-height: 36px;
  color: #93999f;
  padding: 0 16px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #d9dde1;
  border-radius: 18px;
}
.release-reply .reply-ctrl .release-reply-btn {
  display: inline-block;
  height: 36px;
  font-size: 14px;
  line-height: 36px;
  text-align: center;
  padding: 0 16px;
  color: #fff;
  background: #37f;
  border-radius: 18px;
  cursor: pointer;
  margin-left: 12px;
}
.comment-box:last-child {
  border-bottom: none;
}
input,
textarea {
  outline: 0;
}
input,
button,
textarea,
select {
  *font-size: 100%;
  border: 0;
}
.hide {
  display: none;
}
.bottom-fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 48px;
  background: #fff;
  box-shadow: 0 0 16px 0 rgba(28, 31, 33, 0.1);
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  transition: all 0.3s;
  -moz-transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  z-index: 900;
}
.bottom-fixed .bottom-wrap {
  width: 1152px;
  margin: 0 auto;
}
.bottom-fixed .bottom-wrap .praise-box {
  position: relative;
  left: 0px;
  text-align: center;
  margin-right: 32px;
  margin-top: 8px;
}
.bottom-fixed .bottom-wrap .praise-box button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 170, 0, 0.1);
  border: none;
  position: relative;
  display: inline-block;
  margin: 0 auto;
  vertical-align: middle;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  transition: all 0.3s;
  -moz-transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
}
.bottom-fixed .bottom-wrap .praise-box button.praised {
  background: rgb(255, 170, 0);
}
.bottom-fixed .bottom-wrap .praise-box button.praised .icon-dianzan {
  color: #fff;
}
.bottom-fixed .bottom-wrap .praise-box button .icon-dianzan {
  line-height: 20px;
  position: relative;
  display: inline-block;
  font-size: 20px;
  color: #fa0;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  transition: all 0.3s;
  -moz-transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
}
.bottom-fixed .bottom-wrap .praise-box span {
  font-size: 12px;
  padding: 0 5px;
  color: #9199a1;
}
.bottom-fixed .bottom-wrap .icon-warp {
  margin-top: 14px;
  margin-right: 32px;
}
.bottom-fixed .bottom-wrap .icon-warp .icon-nav {
  font-size: 20px;
  color: #b2b8bd;
  line-height: 20px;
  border-radius: 50%;
}
.bottom-fixed .bottom-wrap .input {
  width: 320px;
  height: 32px;
  margin: 8px 104px 8px 0;
  background: #f3f5f6;
  border-radius: 16px;
  padding: 7px 12px;
  box-sizing: border-box;
  font-size: 12px;
  color: #9199a1;
  line-height: 18px;
  cursor: pointer;
}
</style>
