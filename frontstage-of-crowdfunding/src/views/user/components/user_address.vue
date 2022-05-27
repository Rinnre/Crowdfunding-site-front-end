<template>
  <div class="address_mian">
    <div class="header">
      <p>
        我的收货地址<span>共 {{ userAddressList.length }} 个地址</span>
      </p>
    </div>
    <div class="add_body">
      <user-address :userAddressList="userAddressList" @initAddress = "initAddress"></user-address>
    </div>
  </div>
</template>

<script>
import userAddress from "@/views/address/user_address";
import user from "@/api/user";
export default {
  name: "Address",
  components: {
    userAddress: userAddress,
  },
  data() {
    return {
      userAddressList: [],
    };
  },
  created() {
    this.initAddress();
  },
  methods: {
    initAddress() {
      user.getUserAddress().then((res) => {
        this.userAddressList = res.data;
      });
    },
  },
};
</script>

<style scoped>
.address_mian .header {
  overflow: hidden;
  padding-bottom: 15px;
  border-bottom: solid 1px #dee0e1;
}

.address_mian .header p:first-child {
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: #222c37;
  float: left;
  margin: 0;
  cursor: pointer;
}

.address_mian .header p span {
  font-size: 16px;
  padding-left: 40px;
  color: #7a8087;
  font-weight: normal;
}
.address_mian .add_body {
  margin-top: 20px;
}
</style>