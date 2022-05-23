<template>
  <div class="safe_main">
    <div class="header">
      <p>账户安全</p>
    </div>
    <div class="box safe_body">
      <dl class="item">
        <dt>密码登录<b>已设置</b></dt>
        <dd>
          <a href="javascript:;" class="lnk_change_pwd">修改密码</a>
          <p>
            安全性高的密码可以使账号更安全，建议您定期更换密码，且设置一个包含数字和字母，并长度超过6位以上的密码。
          </p>
        </dd>
      </dl>
      <dl class="item">
        <dt>手机绑定<b>已设置</b></dt>
        <dd>
          <a href="javascript:;" class="lnk_change_pwd">修改密码</a>
          <p>
            安全性高的密码可以使账号更安全，建议您定期更换密码，且设置一个包含数字和字母，并长度超过6位以上的密码。
          </p>
        </dd>
      </dl>
    </div>
    <div class="box safe_body">
      <dl class="item">
        <dt class="not-set">账号认证<b>未认证</b></dt>
        <dd>
          <a href="javascript:;" class="lnk_change_pwd">立刻认证</a>
          <p>
            提交账号认证可保护您的账号安全，避免账号被盗，花1分钟填写一下吧！
          </p>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserSafe",
  data() {
    return {};
  },
};
</script>

<style scoped>
.safe_main .header {
  overflow: hidden;
  padding-bottom: 15px;
  border-bottom: solid 1px #dee0e1;
}

.safe_main .header p:first-child {
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: #222c37;
  float: left;
  margin: 0;
  cursor: pointer;
}
/*  */
.safe_main .box {
  background: #fff;
  border-radius: 6px;
  -webkit-box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12),
    0 1px 6px 0 rgba(0, 0, 0, 0.12);
  -moz-box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12),
    0 1px 6px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12), 0 1px 6px 0 rgba(0, 0, 0, 0.12);
  /* border: 1px solid #e0e0e0; */
  display: block;
  margin-top: 30px;
  padding-bottom: 30px;
  overflow: hidden;
}

.safe_main .box.safe_body {
  padding-bottom: 40px;
}

/*  */
.safe_main dl.item {
  padding-top: 40px;
  padding-left: 30px;
  padding-right: 30px;
  /* padding: 30px; */
}

.safe_main dl.item dt {
  width: 143px;
  float: left;
  color: #3e4d34;
  font-weight: bolder;
}

.safe_main .safe_body .item dt {
  height: 35px;
  text-indent: 45px;
  background: url("../../../assets/img/space_account_safety_setup_ico_34x34.png")
    no-repeat left center;
}

.safe_main .item dt b {
  display: block;
  font-size: 14px;
  color: #37cb58;
}
.safe_main .safe_body dl.item dd {
  color: #223317;
  font-size: 14px;
  margin-left: -65px;
}
.safe_main .safe_body .item dd p {
  width: 578px;
}

.safe_main .safe_body .item dd a {
  width: 120px;
  height: 36px;
  line-height: 36px;
  color: #223318 !important;
  text-align: center;
  border-radius: 4px;
  border: #d3d2d2 solid 1px;
}

.safe_main .safe_body dl.item dd a {
  float: right;
  font-size: 14px;
  color: #37cb58;
}

.safe_main .safe_body .item dt.not-set {
  background: url("../../../assets/img/space_account_safety_noset_ico_34x34.png")
    no-repeat left center;
}
</style>