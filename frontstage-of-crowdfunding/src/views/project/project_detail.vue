<template>
  <div class="project_detail">
    <navigation></navigation>
    <div class="project_header clearfix">
      <div class="head_box clearfix">
        <div class="head_left">
          <h3 class="title">
            <span>{{project.title}}</span>
          </h3>
          <div class="head_picture">
            <img
              id="big_logo"
              width="100%"
              height="518"
              :src="project.headPicture"
              alt=""
            />
          </div>
        </div>
        <div class="head_right">
          <div class="sponsor">
            <div class="sponsor_info">
              <span class="sponsor_name clearfix">{{project.sponsor.nickName}}</span>
              <p
                style="
                  margin-top: 7px;
                  font-size: 14px;
                  height: 14px;
                  line-height: 14px;
                  color: #7a8087;
                "
              >
                
              </p>
              <div class="authen">
                <div class="realname person"></div>
              </div>
              <p class="project_tag clearfix">
                <i class="iconfont icon-tag"></i>
                项目类别：{{project.type}}
              </p>
            </div>

            <a
              href=""
              target="_blank"
              class="avater"
              ><img
                onerror="javascript:this.src='https://s.moimg.net/img/web4-0/default_profile@3x.png'"
                :src="project.sponsor.avatar" /><span
                class="blue-v"
              ></span
            ></a>
          </div>
          <div class="right_body">
            <div class="project_info">
              <!-- 众筹目标 -->
              <div class="project_goal">
                <h3>已筹¥<span>{{project.supportMoney}}</span></h3>
                <p class="progress">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="22"
                    :percentage="project.supportMoney/project.targetMoney*100"
                    status="exception"
                  ></el-progress>
                </p>
                <p style="line-height: 16px; margin-top: 18px">
                  <span class="goal-money">目标金额 ¥{{project.targetMoney}}</span>
                </p>
              </div>
              <!-- 剩余时间 -->
              <div class="remain-time" style="margin-top: 30px">
                <h3>5天00:14:40</h3>
                <p style="margin-top: 9px">剩余时间</p>
              </div>
              <!-- 支持人数-->
              <div class="support_people" style="margin-top: 30px">
                <h3><span>{{project.supporterNumber}}</span>人</h3>
                <p style="margin-top: 9px">支持人数</p>
              </div>
            </div>
            <div class="project_button" style="height: 60px">
              <a
                @click="dialogTableVisible = true"
                class="support-btn btn support-btn-go"
                ><i class="iconfont icon-money"></i> 立即购买支持</a
              >
              <el-dialog :visible.sync="dialogTableVisible">
                <li v-for="rewardItem in project.rewardVos" :key="rewardItem.id" style="margin-bottom: 30px">
                  <reward :rewardItem="rewardItem"></reward>
                </li>
              </el-dialog>
              <a
                href="javascript:;"
                class="atten NshowMaskAtten"
                style="color: rgb(122, 128, 135)"
                ><i class="iconfont icon-optimistic"></i> <span>看好</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="project_body">
      <div class="project_body_left">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="项目详情" name="first">
            <div id="cont_match_htmlstr" class="content-wrap html-from-editor">
              <p v-for="projectDetail in project.projectDetailVos" :key="projectDetail.id">
                <img
                  class="editor"
                  :src="projectDetail.picturePath"
                  width="690"
                  height="1886"
                />
              </p>
              
            </div>
          </el-tab-pane>
          <el-tab-pane label="项目评论" name="second">
            <comment :sourceId="projectId"></comment>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="project_body_right">
        <div class="risk_warning">
          <h3 class="tips">风险提示</h3>
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item name="1">
              <p class="risk_warning_context">
                1.点击“确认支付”，即表明您已阅读并同意<a
                  href="https://zhongchou.modian.com/about/index/3/3.html"
                  target="_blank"
                  >《支持者协议》</a
                >及<a
                  href="https://zhongchou.modian.com/about/index/3/4.html"
                  target="_blank"
                  >《隐私政策》</a
                >，并自愿承担众筹相应风险。
              </p>

              <p class="risk_warning_context">
                2.您参与众筹是支持将创意变为现实的过程，而不是直接的商品交易，因此存在一定风险。请您根据自己的判断选择、支持众筹项目。众筹存在于发起人与支持者之间，摩点网作为第三方平台，只提供网络空间、技术支持等服务。众筹的回报产品和承诺由发起人提供和作出，发起者和支持者应依法承担使用摩点产品产生的法律后果。
              </p>
              <p class="risk_warning_context">
                3.众筹项目的回报发放及其他后续服务事项均由发起人负责。如果发生发起人无法发放回报、延迟发放回报、不提供回报后续服务等情形，您需要直接和发起人协商解决。
              </p>
              <p class="risk_warning_context">
                <span
                  >4.由于发起人能力和经验不足、市场风险、法律风险等各种因素，众筹可能失败。对于在众筹期限届满前失败的项目，您支持项目的款项会全部原路退还给您；对于众筹成功的项目，支持者不能通过摩点平台申请退款，若此时支持者因任何原因希望退款，需直接与发起者协商，若发
                  起者同意退款，需直接向支持者退回款项，摩点不会从可结算款项中扣除该部分退款金额。您对项目发起人的无偿支持以及额外打赏，一旦众筹成功将不予退款，但众筹失败的情况除外。</span
                >
              </p></el-collapse-item
            >
          </el-collapse>
        </div>
        <div class="reward_list">
          <li v-for="rewardItem in project.rewardVos" :key="rewardItem.id" style="margin-bottom: 30px">
            <reward :rewardItem="rewardItem"></reward>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "@/components/header/navigation";
import reward from "@/views/project/components/reward";
import comment from "@/components/comment"
import project from "@/api/project"
export default {
  name: "projectDetail",
  components: {
    navigation: navigation,
    reward: reward,
    comment:comment
  },
  data() {
    return {
      activeName: "first",
      activeNames: ["1"],
      dialogTableVisible: false,
      projectId:"",
      project:{}
    };
  },
  created() {
    this.projectId = this.$route.params.id
    this.initProject();
  },
  methods: {
    handleChange() {},
    initProject(){
      project.getProjectDetail(this.projectId)
          .then(response =>{
            this.project = response.data;
            console.log(response.data)
          })
    }
  },
};
</script>

<style scoped>
/* head */
.project_header {
  width: 100%;
  background: #f8f8f9;
  overflow: hidden;
  display: block;
}

.project_header .head_box {
  width: 1080px;
  margin: 0 auto;
}
.clearfix {
  zoom: 1;
}

/* head_left */
.head_box .head_left {
  width: 690px;
  float: left;
  margin-right: 60px;
}

/* title */
.head_left .title {
  margin: 50px 0 20px 0;
  font-size: 34px;
  line-height: 1.5;
  height: 102px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  position: relative;
}

/* picture */
.head_left .head_picture {
  overflow: hidden;
  height: 690px;
  position: relative;
  margin-bottom: 40px;
}

.head_left .head_picture #big_logo {
  height: 690px;
}

/* head_left */
.head_box .head_right {
  width: 330px;
  float: left;
}

/* sponsor */
.head_right .sponsor {
  margin-top: 55px;
  padding-bottom: 180px;
}

.head_right .sponsor .sponsor_info {
  float: left;
}

.head_right .sponsor_info {
  max-width: 250px;
}

.head_right .sponsor_info .sponsor_name {
  font-size: 24px;
  height: 30px;
  line-height: 30px;
  font-weight: 700;
  cursor: pointer;
}
/* auth */
.head_right .sponsor .authen {
  height: 24px;
  overflow: hidden;
  margin-top: 9px;
}
/* .head_right .authen .persion {
  background: url("../../assets/realname@2x.png") center center / contain
    no-repeat;
} */
.head_right .authen .realname {
  float: left;
  width: 70px;
  height: 24px;
  margin-right: 10px;
  background: url("../../assets/realname@2x.png") center center / contain
    no-repeat;
  /* background: url('../../img/web4-0/not_realname@2x.png') center center / contain no-repeat; */
}

/* tag */
.head_right .sponsor .project_tag {
  height: 16px;
  font-size: 16px;
  line-height: 16px;
  margin-top: 20px;
  white-space: nowrap;
  display: block;
}
.head_right .project_tags span {
  display: inline-block;
}

.head_right p {
  margin-top: 7px;
  font-size: 14px;
  height: 14px;
  line-height: 14px;
  color: #7a8087;
}
/*  sponsor_picture */
.head_right .sponsor .avater {
  float: right;
  width: 80px;
  height: 80px;
  margin-top: 3px;
  position: relative;
}

.head_right .sponsor .avater img {
  width: 100%;
  height: 100%;
  border: solid 1px #dee0e1;
  overflow: hidden;
  border-radius: 50%;
}

/* right_body */
.head_right .right_body {
  height: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-top: 1px solid #dee0e1;
  border-bottom: 1px solid #dee0e1;
  padding-bottom: 40px;
  padding-top: 20px;
}
/* project_info */
.head_right .project_info {
  height: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  /* border-top: 1px solid #dee0e1; */
  /* border-bottom: 1px solid #dee0e1; */
  padding-bottom: 40px;
}
/* gaol */
.head_right .project_goal h3 {
  color: #21b6c7;
}
.head_right .project_info h3 {
  height: 34px;
  line-height: 34px;
  font-size: 34px;
  font-weight: 700;
}

/* progress */
.head_right .project_goal .progress {
  height: auto;
  margin-top: 16px;
  overflow: hidden;
}

/* remian_time  */
.head_right.right_body h3 {
  height: 34px;
  line-height: 34px;
  font-size: 34px;
  font-weight: 700;
}
/* project_button */
.head_right .project_button .btn {
  width: 240px;
  height: 60px;
  text-align: center;
  color: #fff;
  background: #00cba6;
  margin-right: 20px;
}

.head_right .project_button a,
.head_right .project_button .look-good-btn {
  float: left;
  line-height: 60px;
  font-size: 16px;
}

.head_right .project_button .atten {
  color: #7a8087;
  max-width: 70px;
  float: left;
}

.head_right .project_button .atten .iconfont {
  float: left;
  font-size: 18px;
  margin-right: 4px;
}

/* project_body */
.project_detail .project_body {
  width: 1080px;
  margin: 0 auto;
}

/* project_body_left */
.project_body .project_body_left {
  float: left;
  width: 690px;
  margin-right: 60px;
}

.project_body .project_body_right {
  float: right;
  width: 330px;
}

/* Tabs */
.project_body .project_body_left /deep/.el-tabs__item {
  font-size: 16px !important;
  padding-top: 20px;
  height: 70px;
  color: #7a8087;
}

.project_body /deep/ .el-tabs__active-bar {
  background-color: #222c37;
  margin-left: -1px;
}

/* project_deail */
.content-wrap {
  padding: 40px 0;
}
.html-from-editor {
  font-size: 16px;
  line-height: 1.75;
  word-wrap: break-word;
}

.html-from-editor p img {
  display: block;
  margin: 0 auto;
  /* vertical-align: middle !important; */
  /* cursor: url('../../img/web4-0/cursor/big.cur'), auto !important; */
}
/* risk_warning */
.project_body .risk_warning {
  line-height: 1.5;
  font-size: 16px;
  width: 330px;
  margin: 5px auto 0;
}

.project_body .risk_warning .tips,
.project-main .main-wrap .titst {
  font-size: 24px;
  line-height: 62px;
  border-bottom: 1px solid #dee0e1;
}

.risk_warning /deep/.el-collapse-item:last-child {
  margin-top: -47px;
}
.risk_warning_context {
  font-size: 16px;
  margin-bottom: 10px;
}
</style>