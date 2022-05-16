<template>
  <div class="main_right self user_auth">
    <div class="column detail">
      <p>个人资料</p>
      <div class="userInfo-operation">
        <a v-if="!is_edit" @click="is_edit = true">编辑</a>
        <a v-else @click="is_edit = false">保存</a>
      </div>
    </div>
    <div class="detail center">
      <el-form ref="form" :model="userInfo" label-width="80px" size="mini">
        <div class="item">
          <el-form-item label="头像">
            <!-- <el-tooltip effect="dark" content="更换头像" placement="bottom"> -->
              <img
                src="https://thirdwx.qlogo.cn/mmopen/vi_32/uX2etULict61IswIibDv4dibj4uwGCjrp2uuqbj6byYz7YxEFbYia8gGpIg7hTCZJ06kX6jyZWia51bJariboldmhVmw/0"
                style="width: 60px; border-radius: 50%; margin-left: 48px"
                @click="is_update()"
              />
            <!-- </el-tooltip> -->
            <image-cropper
              v-show="imagecropperShow"
              :key="imagecropperKey"
              :width="300"
              :height="300"
              url="http://localhost:8222/study/oss/upload/avatar"
              field="file"
              @crop-upload-success="cropSuccess"
              @close="close"
            />
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="昵称">
            <el-input :readonly="!is_edit" v-model="userInfo.name"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="性别">
            <el-input :readonly="!is_edit" v-model="userInfo.name"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <label for="" style="line-height: 73px">生日</label>
          <el-date-picker
            :readonly="!is_edit"
            v-model="userInfo.birthday"
            type="date"
            placeholder="未填写"
          >
          </el-date-picker>
        </div>

        <div class="item">
          <el-form-item label="个人简介">
            <el-input :readonly="!is_edit" v-model="userInfo.name"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="detail">
      <div class="item">
        <label> 认证情况 </label>
        <div class="item_r">
          <p class="no_ren text" style="margin-top: -27px">
            <el-link :underline="false" type="warning">
              <i style="padding-right: 6px" class="iconfont icon-warning"></i
              >未认证</el-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'

export default {
  components: { ImageCropper },

  name: "UserInfo",
  data() {
    return {
      userInfo: {
        name: "mo8579717294",
      },
      imagecropperShow: false,
      imagecropperKey: 0,
      is_edit: false,
    };
  },
  methods: {
    // 判断是否为编辑模式
    is_update(){
      if(this.is_edit){
        this.imagecropperShow = true;
      }
    },
    // 讲师头像上传成功后的回调函数
    cropSuccess (data) {
      this.imagecropperShow = false
      // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1
      userApi.updateAvatar(data.data).then((response) => {
        if (response.data.success) {
          this.loginInfo.avatar = data.data.url
        }
      })
    },
    // 关闭头像上传组件后的回调函数
    close () {
      this.imagecropperShow = false
      // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1
      this.$message({
        type: 'info',
        message: '已取消头像上传'
      })
    }

  }
};
</script>

<style scoped>
.main_right.self {
  float: left;
  position: relative;
}
.main_right {
  width: 643px !important;
  height: auto;
}

.main_right .column:after {
  content: " ";
  display: block;
  clear: both;
  height: 0;
}
.main_right.user_auth .column.detail {
  margin-bottom: 35px;
  position: relative;
}
.main_right.user_auth .column {
  margin-bottom: 39px;
}
.main_right .column {
  /* overflow: hidden; */
  padding-bottom: 15px;
  margin-bottom: 20px;
  border-bottom: solid 1px #dee0e1;
}

.main_right .column p:first-child {
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: #222c37;
  float: left;
  margin: 0;
}

.main_right.user_auth .detail.center {
  margin-bottom: 24px;
}

.main_right .detail .item {
  margin-bottom: 24px;
  position: relative;
  line-height: 73px;
}

.main_right .detail .item.logo label {
  line-height: 80px;
}

.main_right .detail .item label {
  width: 127px;
  float: left;
  font-size: 16px;
  line-height: 36px;
  color: #626672;
}

.main_right .detail .item .item_r {
  float: left;
  margin-left: -1px;
  margin-top: 8px;
  width: 446px;
  background: #fff;
  position: relative;
  height: auto;
  color: #222c37;
}

.main_right .detail .item .item_r .logo_field {
  float: left;
  border: 1px solid #dee0e1;
  width: 60px;
  height: 60px;
  overflow: hidden;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  position: relative;
  font-size: 20px;
  line-height: 78px;
  text-align: center;
  color: #bcbfc3;
  margin-right: 20px;
  cursor: pointer;
}
.main_right .detail .item .item_r .logo_field img {
  width: 100%;
  height: 100%;
  vertical-align: baseline;
}
.item /deep/ .el-input {
  padding-left: 30px;
}

.item /deep/ .el-input__inner {
  font-size: 16px;
  border: 0;
}
.item /deep/ .el-form-item__label {
  font-size: 16px;
  float: left;
  text-align: left;
}

/* 隐藏日期图标 */
.item /deep/ .el-input__prefix {
  display: none;
}
/* 隐藏清空图标 */
.item /deep/ .el-input__suffix {
  display: none;
}
/* 生日框对齐 */
.item /deep/ .el-input--prefix .el-input__inner {
  padding-left: 0;
  margin-left: -33px;
}

/* 行高 */
.item /deep/ .el-form-item--mini .el-form-item__content,
.item /deep/ .el-form-item--mini .el-form-item__label {
  line-height: 73px;
}
/* 编辑和保存按钮 */
.userInfo-operation {
  float: right;
  margin-top: 10px;
}


</style>