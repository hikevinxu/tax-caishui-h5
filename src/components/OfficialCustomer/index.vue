<template>
  <div class="OfficialCustomer">
    <div class="logo">
      <img src="../../assets/InquiryImg/img_default_avatar.png" alt="" />
    </div>
    <div class="title">官方客服</div>
    <div class="message" @click="jumpMessage">
      <img src="../../assets/InquiryImg/ic_message.png" alt="" />
    </div>
    <a href="tel:4001680458" class="phone">
      <img src="../../assets/InquiryImg/ic_firm_call.png" alt="" />
    </a>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  created() {

  },
  methods: {
    jumpMessage() {
      window.location.href = ysf('url')
      // window.location.href="https://anniu.qiyukf.com/client?k=394edb8ea8c46b5bbe73ed39ad18c3f7&wp=1&gid=912308&robotShuntSwitch=0"
    }
  }
}
</script>
<style lang="scss" scoped>
.OfficialCustomer {
  width: 100%;
  box-sizing: content-box;
  height: 72px;
  background: rgba(255,173,113,0.06);
  border: 1px solid rgba(255,173,113,0.20);
  border-radius: 4px;
  overflow: hidden;
  .logo {
    float: left;
    width: 40px;
    height: 40px;
    margin: 16px 12px 0 20px;
    border-radius: 50%;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .title {
    float: left;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: rgba(0,0,0,0.87);
    letter-spacing: 0;
    margin-top: 26px;
    line-height: 24px;
  }
  .phone,
  .message{
    float: right;
    width: 24px;
    height: 24px;
    margin: 26px 0px 0 0px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .message {
    margin-right: 20px;
  }
  .phone {
    margin-right: 28px;
  }
}
</style>
