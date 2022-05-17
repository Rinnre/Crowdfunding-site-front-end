<template>
  <div class="launch_project_main">
    <navigation></navigation>
    <div class="step_back">
      <div class="step">
        <el-steps :active="active" finish-status="success">
          <el-step title="步骤 1 " description="基础信息"></el-step>
          <el-step title="步骤 2 " description="众筹目标"></el-step>
          <el-step title="步骤 3 " description="设置回报"></el-step>
          <el-step title="步骤 4 " description="详情编辑"></el-step>
          <el-step title="步骤 5 " description="团队设置"></el-step>
          <el-step title="步骤 6 " description="辅助资料"></el-step>
        </el-steps>
      </div>
      <div v-if="active == 0" class="launch_project_body">
        <div class="step_name">基础信息</div>
        <!-- 项目标题 -->
        <div class="column">
          <div class="column fix">
            <div class="left">
              <strong> <span>*</span> 项目标题 </strong>
              <p>写一个清晰、意赅的标题，帮助人们快速理解你的项目主题。</p>
            </div>
            <div class="right">
              <h4>标题</h4>
              <div class="input">
                <input
                  type="text"
                  name="name"
                  placeholder="请输入项目标题"
                  class=""
                />
                <span class="word-count"> 0／26 </span>
              </div>
              <p class="normal_tips">项目标题中禁止使用英文符号 &amp; " '</p>
              <h4 style="padding-top: 40px">项目简称</h4>
              <div class="input">
                <input
                  type="text"
                  name="short_title"
                  placeholder="请输入项目简称"
                  class=""
                /><span class="word-count"> 0／10 </span>
              </div>
              <p class="normal_tips">项目简称中禁止使用英文符号 &amp; " '</p>
            </div>
          </div>
        </div>
        <!-- 项目类别 -->
        <div class="column">
          <div class="column fix">
            <div class="left">
              <strong><span>*</span> 项目类别</strong>
              <p>按实际情况选择你项目最符合的类别，平台会精准推荐相关用户。</p>
            </div>
            <div class="right">
              <div class="input">
                <select>
                  <option disabled="disabled" value="">请选择项目类别</option>
                  <option>潮玩模型</option>
                  <option>设计</option>
                  <option>游戏</option>
                  <option>动漫</option>
                  <option>出版</option>
                  <option>桌游</option>
                  <option>卡牌</option>
                  <option>活动</option>
                  <option>影视</option>
                  <option>音乐</option>
                  <option>科技</option>
                  <option>食品</option>
                  <option>其他</option>
                </select>
                <span class="icon_down"
                  ><i class="iconfont icon-a-downmore"></i
                ></span>
              </div>
            </div>
          </div>
        </div>
        <!-- 项目头图 -->
        <div class="column">
          <div class="column fix">
            <div class="left">
              <strong><span>*</span> 项目图</strong>
              <p>
                主要展示在主页，图片应简洁清晰，除 Logo
                外的其他文字要精练，说明产品亮点即可。好的项目图会为项目带来更多流量。
              </p>
            </div>
            <div class="right"></div>
          </div>
        </div>
        <!-- 下一步 -->
        <div class="column">
          <div class="column fix">
            <div class="inner">
              <div class="btn" @click="next()">
                <i class="iconfont icon-save"></i>
                下一步
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="active == 1" class="launch_project_body">
        <div class="step_name">众筹目标</div>
        <!-- 项目目标 -->
        <div class="column">
          <div class="column fix">
            <div class="left">
              <strong> <span>*</span> 项目目标 </strong>
              <p>
                为项目设置一个基础目标。众筹项目规则为「all-or-nothing」，如项目最终未达成目标金额，则不会收到任何资金。
              </p>
            </div>
            <div class="right">
              <div class="input">
                <input
                  type="text"
                  name="name"
                  placeholder="请输入目标金额"
                  class=""
                />
              </div>
              <p class="normal_tips">
                如项目成功，平台将收取筹资总额的 6% 作为基础服务费
              </p>
            </div>
          </div>
        </div>
        <!-- 下一步 -->
        <div class="column">
          <div class="column fix">
            <div class="inner">
              <div class="btn" @click="prev()">
                <i class="iconfont icon-save"></i>
                上一步
              </div>
              <div class="btn" @click="next()">
                <i class="iconfont icon-save"></i>
                下一步
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "@/components/header/navigation";
import ImageCropper from "@/components/ImageCropper";
export default {
  name: "LaunchProject",
  components: {
    navigation: navigation,
    ImageCropper: ImageCropper,
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      active: 0,
    };
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    next() {
      if (this.active++ > 5) this.active = 0;
      var timer = setInterval(function () {
        let osTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        let ispeed = Math.floor(-osTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + ispeed;
        this.isTop = true;
        if (osTop === 0) {
          clearInterval(timer);
        }
      }, 30);
    },
     prev() {
       if(this.active--<0)this.active=0;
      var timer = setInterval(function () {
        let osTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        let ispeed = Math.floor(-osTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + ispeed;
        this.isTop = true;
        if (osTop === 0) {
          clearInterval(timer);
        }
      }, 30);
    },
  },
};
</script>

<style scoped>
/* step */
.launch_project_main .step_back {
  height: 140px;
  width: 100%;
  min-width: 1040px;
  position: relative;
  background-color: #fff;
  -webkit-box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.1);
}
.launch_project_main .step_back .step {
  width: 576px;
  margin: auto;
  overflow: hidden;
  padding-top: 38px;
  position: relative;
}

.launch_project_body {
  width: 940px;
  background: #fff;
  border-radius: 6px;
  -webkit-box-shadow: 0px 2px 8px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0px 2px 8px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  margin: 30px auto;
  position: relative;
}

/* step_name */
.step_name {
  /* min-width: 1040px; */
  height: 104px;
  font-size: 24px;
  line-height: 104px;
  text-align: center;
  font-weight: 600;
  position: relative;
}
/*  */
.column {
  width: 100%;
  padding: 40px 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-top: 1px solid #f2f3f3;
  display: inline-block;
}

.column .column_fix {
  min-width: 904px;
  max-width: 1240px;
  margin: 0 auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  /* justify-content: space-between; */
}

.column .column_fix .left {
  width: 36%;
  margin-right: 60px;
}
.left {
  float: left;
  width: 367px;
}
.column .column_fix .right {
  width: calc(64% - 60px);
}
.right {
  float: left;
  margin-left: 79px;
  width: 407px;
  width: 359px;
}
.right h4 {
  font-size: 16px;
  line-height: 1;
  font-weight: 600;
  padding-bottom: 14px;
}
.right .input {
  width: 100%;
  margin: 0;
  height: 36px;
  line-height: 36px;
  position: relative;
  cursor: pointer;
}
.right .input input {
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid #dee0e1;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0 10px;
  font-size: 16px;
  outline: none;
}

.right .input .word-count {
  position: absolute;
  bottom: 6px;
  right: 10px;
  line-height: 24px;
  color: #7a8087;
  font-size: 16px;
  cursor: default;
}

.right .normal_tips {
  color: #7a8087;
  font-size: 14px;
  line-height: 14px;
  padding-top: 14px;
}

/* select */
.right .input select {
  width: 100%;
  height: 100%;
  border: 1px solid #dee0e1;
  padding: 0 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 16px;
  appearance: none;
  cursor: pointer;
  z-index: 1;
  background: transparent;
  outline: none;
}

.right .input .icon_down {
  position: absolute;
  top: 50%;
  right: 11px;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  color: #7a8087;
}

.inner {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: end;
  justify-content: flex-end;
  height: 79px;
  padding: 0 100px;
}

.inner .btn {
  margin-left:10px;
  min-width: 120px;
  height: 40px;
  background: #00c4a1;
  font-size: 16px;
  line-height: 38px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  border: 0;
}
</style>