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
          <!-- <el-step title="步骤 5 " description="团队设置"></el-step> -->
          <el-step title="步骤 5 " description="辅助资料"></el-step>
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
                  v-model="projectInfo.title"
                />
              </div>
              <p class="normal_tips">项目标题中禁止使用英文符号 &amp; " '</p>
              <h4 style="padding-top: 40px">项目简称</h4>
              <div class="input">
                <input
                  type="text"
                  name="short_title"
                  placeholder="请输入项目简称"
                  class=""
                  v-model="projectInfo.name"
                />
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
                <select v-model="projectInfo.type">
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
            <div class="right">
              <image-cropper
                v-show="imagecropperShowH"
                :key="imagecropperKey"
                :width="540"
                :height="540"
                url="http://localhost/user/upload/picture"
                field="file"
                @crop-upload-success="cropSuccess"
                @close="close"
              />
              <image-cropper
                v-show="imagecropperShowA"
                :key="imagecropperKey"
                :width="540"
                :height="231"
                url="http://localhost/user/upload/picture"
                field="file"
                @crop-upload-success="cropSuccess"
                @close="close"
              />
              <div class="box" @click="uploadProPic('head')">
                <img
                  v-if="projectInfo.headPicture"
                  :src="projectInfo.headPicture"
                  alt=""
                />
                <div v-else>
                  <span>+ 添加项目主图</span>
                  <span>尺寸 1080px*1080px</span>
                </div>
              </div>
              <div class="box" @click="uploadProPic('ad')">
                <img
                  style="margin-top: 48px"
                  v-if="projectInfo.adPicture"
                  :src="projectInfo.adPicture"
                  alt=""
                />
                <div v-else>
                  <span>+ 添加项目推荐图</span>
                  <span>尺寸 1080px*462px</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 下一步 -->
        <div class="column">
          <div class="column fix">
            <div class="inner">
              <div class="btn" @click="submitBaseProject()">
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
                  v-model="projectInfo.targetMoney"
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
              <div class="btn" @click="submitProjectMoney()">
                <i class="iconfont icon-save"></i>
                下一步
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="active == 2" class="launch_project_body">
        <!-- 回报编辑弹框 -->
        <el-dialog title="回报编辑" :visible.sync="dialogVisible" width="80%">
          <el-form
            :model="rewardDetail"
            :rules="rules"
            ref="rewardDetail"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="回报档标题" prop="title">
              <el-input v-model="rewardDetail.title"></el-input>
            </el-form-item>
            <el-form-item label="回报档金额" prop="supportMoney">
              <el-input v-model="rewardDetail.supportMoney"></el-input>
            </el-form-item>
            <el-form-item label="回报档描述" prop="description">
              <el-input
                type="textarea"
                v-model="rewardDetail.description"
              ></el-input>
            </el-form-item>
            <el-form-item label="回报档图片" prop="pictureVos">
              <image-cropper
                v-show="imagecropperShowPicture"
                :key="imagecropperKey"
                :width="300"
                :height="300"
                url="http://localhost/user/upload/picture"
                field="file"
                @crop-upload-success="cropSuccess"
                @close="close"
              />
              <div
                class="picture-card-actions"
                v-for="(picture, index) in filePictureList"
                :key="index - 1"
              >
                <!-- <div class="cover">
                </div> -->
                <div>
                  <img
                    :src="picture.picturePath"
                    @click="delectPicture(index)"
                    alt=""
                  />
                  <i
                    class="el-icon-delete"
                    @click="delectPicture(index + 1)"
                  ></i>
                </div>
              </div>
              <div
                v-if="filePictureList.length < 3"
                class="picture-card"
                @click="(imagecropperShowPicture = true), (type = 'picture')"
              >
                <i class="el-icon-plus"></i>
              </div>
            </el-form-item>
            <el-form-item label="邮费方式" prop="postage">
              <el-select
                v-model="rewardDetail.postage"
                placeholder="请选择邮费方式"
              >
                <el-option label="包邮" value="1"></el-option>
                <el-option label="部分地区不包邮" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="回报发放日期" prop="shipmentsDay">
              <el-select
                v-model="rewardDetail.shipmentsDay"
                placeholder="请选择回报发放日期"
              >
                <el-option label="众筹结束后1个月以内" value="1"></el-option>
                <el-option label="众筹结束后2个月以内" value="2"></el-option>
                <el-option label="众筹结束后3个月以内" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="回报发放方式" prop="shippingMethod">
              <el-select
                v-model="rewardDetail.shippingMethod"
                placeholder="请选择回报发放方式"
              >
                <el-option label="虚拟回报" value="2"></el-option>
                <el-option label="实物回报" value="1"></el-option>
                <el-option label="实物回报+虚拟回报" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="该档位限量总份数" prop="limitNumber">
              <el-radio-group v-model="rewardDetail.limitNumber">
                <el-radio :label="-1">不限量</el-radio>
                <el-radio>
                  <span v-if="rewardDetail.limitNumber == -1"> 限量 </span>
                  <el-input
                    placeholder="设置总份数"
                    v-if="rewardDetail.limitNumber != -1"
                    v-model="rewardDetail.limitNumber"
                  ></el-input>
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                v-if="updateIndex == ''"
                @click="submitRewardForm('rewardDetail')"
                >立即创建</el-button
              >
              <el-button
                type="primary"
                v-else
                @click="saveRewardForm('rewardDetail')"
                >立即保存</el-button
              >
            </el-form-item>
          </el-form>
        </el-dialog>

        <div class="step_name">设置回报</div>
        <!-- 项目回报挡位 -->
        <div class="column">
          <div class="column fix">
            <div class="">
              <strong> <span>*</span> 设置回报档 </strong>
              <p>
                支持设置1-40个档位，一般项目多选择设3-10个回报档。在项目通过审核后，回报档内除时间类设置外，其他设置不支持修改。
              </p>
            </div>
            <div class="" style="margin-top: 40px">
              <el-button style="float: right" @click="addReward()"
                >添加回报</el-button
              >
              <el-table
                :data="projectInfo.rewardVos"
                border
                style="width: 100%"
              >
                <el-table-column type="index" width="50" label="回报档位">
                </el-table-column>
                <el-table-column
                  prop="supportMoney"
                  label="回报金额"
                  width="100"
                >
                </el-table-column>
                <el-table-column prop="title" label="回报标题" width="180">
                </el-table-column>
                <el-table-column prop="description" label="回报内容">
                </el-table-column>
                <el-table-column label="操作" width="100" align="center">
                  <template slot-scope="scope">
                    <span
                      @click="editReward(scope.row, scope.$index)"
                      style="
                        margin-right: 10px;
                        color: #37cb58;
                        cursor: pointer;
                      "
                      >编辑</span
                    >
                    <span
                      @click="confrim_delete_reward(scope.$index)"
                      style="
                        margin-right: 10px;
                        color: #37cb58;
                        cursor: pointer;
                      "
                      >删除</span
                    >
                  </template>
                </el-table-column>
              </el-table>
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

      <div v-if="active == 3" class="launch_project_body">
        <div class="step_name">详情编辑</div>
        <!-- 项目详情 -->
        <div class="column">
          <div class="column fix">
            <div class="">
              <strong> <span>*</span> 详情编辑 </strong>
              <p>
                为保证项目页面的合规性，摩点提示您请确保项目详情中所使用的
                图片、照片、视频、音乐、字体 等为原创或是已获得授权。
                为便于您的项目页面能够更好地展现给用户，摩点建议您上传图片宽度为
                1080px，高度不大于
                4500px，过长的图片可裁剪为多张上传，单图不大于3mb。 图片格式
                jpg、png、jpeg、gif，分辨率 72 像素／英寸。
              </p>
            </div>
            <div class="">
              <el-upload
                action="http://localhost/user/upload/picture"
                list-type="picture-card"
                :file-list="fileList"
                :auto-upload="true"
                :on-success="handleUploadSuccess"
                ref="upload"
              >
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{ file }">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.response.data"
                    alt=""
                  />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisiblePro">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
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
              <div class="btn" @click="sumbmitProjectDetail()">
                <i class="iconfont icon-save"></i>
                下一步
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="active == 8" class="launch_project_body">
        <div class="step_name">团队设置</div>
        <!-- 项目目标 -->
        <div class="column">
          <div class="column fix">
            <div class="left">
              <strong> <span>*</span> 团队成员（选填） </strong>
              <p>
                若此项目为您与其他团队共同合作的作品，一些情况下，需添加其作为团队成员进行授权背书。
                邀请成功后对方将显示在项目发起团队列表中。
              </p>
            </div>
            <div class="right">
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="date" label="成员" min-width="100">
                </el-table-column>
                <el-table-column prop="address" label="认证状态" width="80">
                </el-table-column>
                <el-table-column label="操作" width="60" align="center">
                  <template slot-scope="scope">
                    <span
                      @click="confrim_delete(scope.row.id)"
                      style="
                        margin-right: 10px;
                        color: #37cb58;
                        cursor: pointer;
                      "
                      >删除</span
                    >
                  </template>
                </el-table-column>
              </el-table>
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
      <div v-if="active == 4" class="launch_project_body">
        <div class="step_name">辅助资料（选填）</div>
        <!-- 项目目标 -->
        <div class="column">
          <div class="column fix">
            <div>
              <p>
                1.文件资料及其扫描件要求必须真实、有效、完整、清晰，并确保在众筹项目成功结束之前保持资质证明文件持续合法有效。
              </p>
              <p>
                2.文件资料如涉及数家企业或个人，则相互关系必须明确清晰，并由各方签章确认（个人所签署文件，需保证为个人亲笔签署，并明示身份证号码）。
              </p>
              <p>
                3.发起人需提供的相关文件资料包括但不限于要求的所列项目，如国家法律法规及行政要求规定必须具有其他相关的文件资料时，发起人有义务配合及时补充提供。
              </p>
              <p>4.本页面所提及证件，均需提供原件照片或扫描件。</p>
            </div>
            <div class="upload_box">
              <el-upload
                class="upload-demo"
                drag
                :limit="10"
                :auto-upload="true"
                :file-list="supportingList"
                :on-success="successSupporting"
                :on-remove="removeSupporting"
                action="http://localhost/user/upload/picture"
                multiple
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
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
              <div class="btn" @click="submitProject()">
                <i class="iconfont icon-save"></i>
                提交
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
import project from "@/api/project";
export default {
  name: "LaunchProject",
  components: {
    navigation: navigation,
    ImageCropper: ImageCropper,
  },
  created() {
    if (this.projectsName != "" && this.projectsName != null) {
      this.initProjectInfo();
    }
  },
  data() {
    return {
      projectsName: "解谜手札",
      projectInfo: {
        name: "",
        rewardVos: [],
        projectDetailVos: [],
      },
      imagecropperShowA: false,
      imagecropperShowH: false,
      imagecropperShowPicture: false,
      filePictureList: [],
      imagecropperKey: 0,
      dialogImageUrl: "",
      dialogVisiblePro: false,
      disabled: false,
      type: "",
      disabled: false,
      dialogVisible: false,
      active: 4,
      updateIndex: "",
      rewardDetail: {
        limitNumber: "",
      },
      supportingList: [], // 项目辅助资料
      fileList: [],
      rules: {
        title: [
          { required: true, message: "请输入回报标题", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        supportMoney: [
          { required: true, message: "请输入回报金额", trigger: "blur" },
        ],
        description: [
          { required: true, message: "请输入回报描述", trigger: "blur" },
        ],
        postage: [
          { required: true, message: "请选择邮费方式", trigger: "blur" },
        ],
        shipmentsDay: [
          { required: true, message: "请选择发货日期", trigger: "blur" },
        ],
        shippingMethod: [
          { required: true, message: "请选择发货方式", trigger: "blur" },
        ],
        limitNumber: [
          { required: true, message: "请输入数量", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    addReward() {
      this.rewardDetail = {};
      this.updateIndex = "";
      this.filePictureList = [];
      this.dialogVisible = true;
    },
    // 初始化项目信息
    initProjectInfo() {
      project.getProjectInfo(this.projectsName).then((res) => {
        this.projectInfo = res.data;
        if (
          this.projectInfo.projectSupportingList != null &&
          this.projectInfo.projectSupportingList.length != 0
        ) {
          this.projectInfo.projectSupportingList.forEach((item) => {
            let index = 1;
            this.supportingList.push({ name: 1, url: item.picturePath });
          });
        }
      });
    },
    // 更新回报信息
    saveRewardForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.rewardDetail.pictureVos = this.filePictureList;

          for (let i = 0; i < this.projectInfo.rewardVos.length; i++) {
            if (i == this.updateIndex) {
              this.projectInfo.rewardVos[i] == this.rewardDetail;
            }
          }
          this.saveRewards();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新建回报
    submitRewardForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.rewardDetail.pictureVos = this.filePictureList;
          if (this.projectInfo.rewardVos == null) {
            this.projectInfo.rewardVos = [];
          }
          this.projectInfo.rewardVos.push(this.rewardDetail);
          this.saveRewards();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 保存回报信息
    saveRewards() {
      console.log(this.updateIndex);
      project.saveProjectReward(this.projectInfo).then((response) => {
        this.$message.success(response.message);
        this.rewardDetail = {};
        this.dialogVisible = false;
        this.initProjectInfo();
      });
    },
    // 回报信息删除
    confrim_delete_reward(index) {
      this.$confirm("此操作将永久删除该回报, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log(index);
        this.projectInfo.rewardVos.splice(index, 1);
        this.saveRewards();
      });
    },
    // 编辑回报信息
    editReward(row, index) {
      this.updateIndex = index;
      this.rewardDetail = {};
      this.rewardDetail = row;
      this.filePictureList = [];
      if (row.pictureVos != null) {
        this.filePictureList = row.pictureVos;
      }
      this.dialogVisible = true;
    },
    //设置项目目标
    submitProjectMoney() {
      project.saveProjectMoney(this.projectInfo).then((res) => {
        this.$message.success(res.message);
        this.next();
      });
    },
    // 基本信息上传
    submitBaseProject() {
      project.saveBaseProject(this.projectInfo).then((response) => {
        this.projectsName = this.projectInfo.name;
        this.$message.success(response.message);
        this.next();
      });
    },
    // 项目详情图片上传
    handleUploadSuccess(response, file, fileList) {
      // console.log(file)
      // console.log(fileList)
      if (response.code == 200) {
        if (this.projectInfo.projectDetailVos == null) {
          this.projectInfo.projectDetailVos = [];
        }
        this.projectInfo.projectDetailVos.push({ picturePath: response.data });
        this.fileList.push(file);
        this.$message.success("上传成功");
      }
    },
    // 项目详情图片删除
    handleRemove(file) {
      let index = this.projectInfo.projectDetailVos.findIndex((item) => {
        if (file.response.data == item.picturePath) return true;
      });
      this.projectInfo.projectDetailVos.splice(index, 1);
      index = this.$refs.upload.uploadFiles.findIndex((item) => {
        if (file.uid == item.uid) return true;
      });
      this.$refs.upload.uploadFiles.splice(index, 1);
      this.fileList.splice(index, 1);
    },
    // 项目详情图片预览
    handlePictureCardPreview(file) {
      // this.dialogImageUrl = file.response.data;
      this.dialogImageUrl = file.response.data;
      this.dialogVisiblePro = true;
    },
    // 保存项目详情图片
    sumbmitProjectDetail() {
      project.saveProjectDetail(this.projectInfo).then((response) => {
        this.next();
      });
    },

    uploadProPic(type) {
      this.type = type;
      if (this.type === "ad") {
        this.imagecropperShowA = true;
      } else if (this.type === "head") {
        this.imagecropperShowH = true;
      }
    },
    // 上传成功后的回调函数
    cropSuccess(data) {
      // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1;
      if (this.type === "ad") {
        this.imagecropperShowA = false;
        this.projectInfo.adPicture = data;
      } else if (this.type === "head") {
        this.imagecropperShowH = false;
        this.projectInfo.headPicture = data;
      } else if (this.type === "picture") {
        this.imagecropperShowPicture = false;
        this.filePictureList.push({ id: null, picturePath: data });
      }
    },

    // 删除回报图片
    delectPicture(index) {
      this.filePictureList.splice(index, 1);
    },

    removeSupporting(file) {
      let index = this.supportingList.findIndex((item) => {
        return item.uid == file.uid;
      });
      this.supportingList.splice(index, 1);
      // console.log(this.supportingList)
    },
    successSupporting(response, file, fileList) {
      this.supportingList.push({ name: file.name, url: response.data });
    },

    submitProject() {
      if (this.projectInfo.projectSupportingVoList == null) {
        this.projectInfo.projectSupportingVoList = [];
      }
      if (this.supportingList != null && this.supportingList.length != 0) {
        this.supportingList.forEach((item) => {
          this.projectInfo.projectSupportingVoList.push({
            picturePath: item.url,
          });
        });
      }

      project.saveProject(this.projectInfo).then((response) => {
        this.$message({
          message: "项目上传成功！将在5秒后跳转至首页!",
          type: "success",
        });
        let that = this;
        setTimeout(function () {
          that.$router.replace("/#/");
        }, 500);
      });
    },
    // 关闭头像上传组件后的回调函数
    close() {
      this.imagecropperShow = false;
      this.imagecropperShowA = false;
      this.imagecropperShowH = false;
      this.imagecropperShowPicture = false;
      // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1;
      this.$message({
        type: "info",
        message: "已取消上传",
      });
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
      if (this.active-- < 0) this.active = 0;
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
.picture-card:hover {
  border-color: #409eff;
  color: #409eff;
}
.picture-card {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  line-height: 146px;
  vertical-align: top;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  margin-left: 10px;
  outline: 0;
}
.picture-card-actions {
  /* background-color: #000; */
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  /* line-height: 146px;
    vertical-align: top; */
  display: inline-block;
  text-align: center;
  cursor: pointer;
  margin-left: 10px;
  outline: 0;
}
.picture-card-actions > div > img {
  width: 148px;
  height: 148px;
}
.picture-card-actions > div > img:hover {
  opacity: 0.5;
}
.picture-card-actions > div > i {
  margin-top: -79px;
  margin-left: 65px;
  float: left;
  color: red;
}

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
.right .box {
  width: 165px;
  height: 165px;
  margin-left: 12px;
  float: left;
  border: 1px solid #ccc;
}
.right .box > div {
  width: 100%;
  height: 40px;
  margin-top: 63px;
  text-align: center;
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
  margin-left: 10px;
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

.column .upload_box {
  width: 360px;
  margin: 30px auto;
}
</style>