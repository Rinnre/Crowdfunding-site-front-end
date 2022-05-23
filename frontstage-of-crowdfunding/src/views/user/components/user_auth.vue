<template>
  <!-- header -->
  <div class="nav-container page-component">
    <div class="page-container">
      <div>
        <div class="title">实名认证</div>
          <el-divider></el-divider>
        <div class="tips">
          <span class="iconfont"></span>
          完成实名认证后才能发起项目众筹，为了不影响后续步骤，建议提前实名认证。
        </div>
        <div class="form-wrapper" v-if="userInfo.authStatus == 0">
          <div>
            <el-form
              :model="userauth"
              label-width="110px"
              label-position="left"
            >
              <el-form-item prop="name" label="姓名：" class="form-normal">
                <div class="name-input">
                  <el-input
                    v-model="userauth.name"
                    placeholder="请输入联系人姓名全称"
                    class="input v-input"
                  />
                </div>
              </el-form-item>
              <el-form-item prop="certificatesType" label="证件类型：">
                <el-select
                  v-model="userauth.certificatesType"
                  placeholder="请选择证件类型"
                  class="v-select patient-select"
                >
                  <el-option
                    v-for="item in certificatesTypeList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="certificatesNo" label="证件号码：">
                <el-input
                  v-model="userauth.certificatesNo"
                  placeholder="请输入联系人证件号码"
                  class="input v-input"
                />
              </el-form-item>
              <el-form-item prop="name" label="上传证件：">
                <div class="upload-wrapper">
                  <div class="avatar-uploader">
                    <el-upload
                      class="avatar-uploader"
                      :action="fileUrl"
                      :show-file-list="false"
                      :on-success="onUploadSuccess"
                    >
                      <div class="upload-inner-wrapper">
                        <img
                          v-if="userauth.certificatesUrl"
                          :src="userauth.certificatesUrl"
                          class="avatar"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div v-if="!userauth.certificatesUrl" class="text">
                          上传证件合照
                        </div>
                      </div>
                    </el-upload>
                  </div>
                  <img
                    src="//img.114yygh.com/static/web/auth_example.png"
                    class="example"
                  />
                </div>
              </el-form-item>
            </el-form>
            <div class="bottom-wrapper">
              <div class="button-wrapper">
                <div class="v-button" @click="saveUserauth()">
                  {{ submitBnt }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="context-container" v-if="userInfo.authStatus != 0">
          <div>
            <el-form
              :model="formData"
              label-width="110px"
              label-position="right"
            >
              <el-form-item prop="name" label="姓名：" class="form-normal">
                <div class="name-input">
                  {{ userInfo.name }}
                </div>
              </el-form-item>
              <el-form-item prop="name" label="证件类型：">
                {{ userInfo.certificatesType }}
              </el-form-item>
              <el-form-item prop="name" label="证件号码：">
                {{ userInfo.certificatesNo }}
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧内容 #end -->
    <!-- 登录弹出框 -->
  </div>
  <!-- footer -->
</template>

<script>
// import '~/assets/css/hospital_personal.css'
// import '~/assets/css/hospital.css'
import "@/assets/css/personal.css";
// import dictApi from '@/api/dict'
// import userInfoApi from '@/api/userInfo'
const defaultForm = {
  name: "",
  certificatesType: "",
  certificatesNo: "",
  certificatesUrl: "",
};
export default {
  data() {
    return {
      userauth: defaultForm,
      certificatesTypeList: [],
      fileUrl: "http://localhost/api/oss/file/fileUpload",
      userInfo: {
        param: {},
        authStatus: 0,
      },
      submitBnt: "提交",
      formData: {},
    };
  },
  created() {
    // this.init()
  },
  methods: {
    init() {
      this.getUserInfo();
    },
    getUserInfo() {
      userInfoApi.getUserInfo().then((response) => {
        this.userInfo = response.data;
      });
    },
    saveUserauth() {
      if (this.submitBnt == "正在提交...") {
        this.$message.info("重复提交");
        return;
      }
      this.submitBnt = "正在提交...";
      userInfoApi
        .saveUserAuth(this.userauth)
        .then((response) => {
          this.$message.success("提交成功");
          window.location.reload();
        })
        .catch((e) => {
          this.submitBnt = "提交";
        });
    },
    onUploadSuccess(response, file) {
      if (response.code !== 200) {
        this.$message.error("上传失败");
        return;
      }
      // 填充上传文件列表
      this.userauth.certificatesUrl = file.response.data;
    },
  },
};
</script>
<style>
.page-container .title {
  letter-spacing: 1px;
  font-weight: 700;
  color: #333;
  font-size: 24px;
  margin-top: 0;
  margin-bottom: 20px;
}

.page-container .form-wrapper {
  padding-left: 92px;
  width: 580px;
}

.bottom-wrapper .button-wrapper {
  width: 140px;
  margin-top: 80px;
}
.bottom-wrapper {
  width: 100%;
  padding: 0;
  margin-top: 0;
  display: flex;
  justify-content: center;
}

.v-button {
  justify-content: center;
  align-items: center;
  background-color: #4490f1;
  box-shadow: 0 10px 20px -10px rgba(73, 144, 241, 0.5);
  border-radius: 4px;
  height: 44px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
}
.col-right-bottom,
.v-button {
  display: flex;
  flex-direction: row;
}
</style>
