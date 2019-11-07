<template>
  <div class="success_page">
    <!-- <Header title="提交成功" /> -->
    <div class="header_component">
    <span class="back" @click="back">
      <img src="@/assets/global/ic_arrow_back.png" alt="">
    </span>
    {{title}}
  </div>
    <div class="customer">
      <Official-Customer />
    </div>
    <div class="loading">
      <div class="noEnquiry">
        <div class="noEnquiryImg">
          <img src="@/assets/global/img_page_in_audit.png" alt="">
        </div>
        <div class="submitSuccess">您的需求已经提交成功</div>
        <div class="contact">等待商家联系…</div>
        <!-- <div class="noEnquiryMsg">当前25家商家正在报价中，请等待…</div> -->
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header/Header'
import OfficialCustomer from '@/components/OfficialCustomer/index'
export default {
  components: {
    Header,
    OfficialCustomer,
  },
  data() {
    return {
      title: this.$route.query.name
    }
  },
  created() {

  },
  methods: {
    back() {
      this.$router.push('/home')
    }
  }
}
</script>
<style lang="scss" scoped>
.success_page {
  padding-top: 56px;
  .header_component {
    width: 100%;
    height: 56px;
    line-height: 56px;
    background-color: #fff;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: rgba(0,0,0,0.87);
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    .back {
      display: block;
      width: 24px;
      height: 24px;
      position: absolute;
      top: 16px;
      left: 16px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .customer {
    margin: 0 16px;
    margin-top: 16px;
  }
  .loading {
    .demand {
      margin: 0 16px;
      margin-top: 12px;
      overflow: hidden;
      padding-top: 11px;
      .demandName {
        float: left;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #FF7F4A;
      }
      .demandTime {
        float: right;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: rgba(0,0,0,0.38);
      }
    }
    .noEnquiry {
      margin-top: 41px;
      margin-bottom: 70px;
      .noEnquiryImg {
        margin: 0 auto;
        width: 120px;
        height: 120px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .submitSuccess {
        margin-top: 4px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: rgba(0,0,0,0.87);
        text-align: center;
        line-height: 22px;
      }
      .contact {
        margin-top: 4px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0,0,0,0.38);
        text-align: center;
        line-height: 22px;
      }
      .noEnquiryMsg {
        margin-top: 40px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: rgba(0,0,0,0.60);
      }
    }
  }
}
</style>
