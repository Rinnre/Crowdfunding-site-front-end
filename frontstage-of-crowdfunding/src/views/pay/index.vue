<template>
  <div id="orderDiv">
    <!--二维码生成-->
    <vueQr
      :text="qr"
      :size="200"
      :margin="10"
      :correctLevel="0"
      :whiteMargin="false"
      :logoSrc="this.$store.state.logoUrl"
    ></vueQr>
    <span id="dialogSpan" v-show="paySucc == true"></span>
    <span id="dialogSpan2" v-show="paySucc == true">
      <i
        class="el-icon-success"
        style="
          background-color: #ffffff;
          color: #67c23a;
          font-size: 60px;
          border-radius: 30px;
        "
      />
      <br />
      支付成功
    </span>
  </div>
</template>

<script>
import vueQr from "vue-qr";
import pay from "@/api/pay";
export default {
  name: "payQr",
  components: {
    vueQr,
  },
  props: {
    order_id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      dialogVisible: false,
      qr: "",
      paySucc: false,
    };
  },
  created() {
    this.toPayment();
  },
  methods: {
    toPayment() {
      let _this = this;
      // 这里填写后台支付的地址
      pay.sendRequestToAliPay(this.order_id).then((res) => {
        // this.qr = res.data;
        // 添加之前先删除一下，如果单页面，页面不刷新，添加进去的内容会一直保留在页面中，二次调用form表单会出错
        const divForm = document.getElementsByTagName("div");
        if (divForm.length) {
          document.body.removeChild(divForm[0]);
        }
        const div = document.createElement("div");
        div.innerHTML = res.data; // data就是接口返回的form 表单字符串
        document.body.appendChild(div);
        document.forms[0].setAttribute("target", "_self"); // 新开窗口跳转
        document.forms[0].submit();
        if ("WebSocket" in window) {
          // 打开一个 web socket
          // 通道地址按照项目进行配置
          var ws = new WebSocket("ws://localhost:9537/bindingRecord");
          ws.onopen = function () {
            // Web Socket 已连接上，使用 send() 方法发送数据
            // ws.send("data");
            // alert("数据发送中...");
          };
          ws.onmessage = function (evt) {
            var received_msg = evt.data;
            // 接收后台推送的数据
            // alert("数据已接收..." + evt.data);
            if (Boolean(evt.data)) {
              _this.paySucc = true;
              setTimeout(() => {
                _this.dialogVisible = false;
              }, 3 * 1000);
              _this.$emit("paySuccess");
            }
            ws.close();
          };
          ws.onclose = function () {};
        } else {
          // 浏览器不支持 WebSocket
          alert("您的浏览器不支持 WebSocket!");
        }
      });
      this.dialogVisible = true;
    },
  },
};
</script>

<style scoped>
#dialogSpan {
  display: inline-block;
  width: 200px;
  height: 200px;
  position: absolute;
  top: 36px;
  right: 369px;
  opacity: 0.9;
  background-color: #ffffff;
}
#dialogSpan2 {
  display: inline-block;
  width: 100px;
  height: 100px;
  position: absolute;
  top: 116px;
  right: 414px;
  font-size: 20px;
  text-align: center;
}
</style>

