<template>
  <div class="noEnquiry">
    <div class="noEnquiryImg">
      <img src="@/assets/global/img_page_in_audit.png" alt="">
    </div>
    <div v-if="page == 'history'" class="noEnquiryMsg">当前需求暂无报价</div>
    <div v-else class="noEnquiryMsg">当前 {{num}} 家商家正在报价中，请等待…</div>
  </div>
</template>
<script>
export default {
  props: {
    page: {
      type: String,
      default: ''
    },
    num: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.noEnquiry {
  margin-top: 48px;
  margin-bottom: 70px;
  .noEnquiryImg {
    margin: 0 auto;
    width: 80px;
    height: 80px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .noEnquiryMsg {
    margin-top: 16px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: rgba(0,0,0,0.60);
  }
}
</style>
