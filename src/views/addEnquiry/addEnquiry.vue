<template>
  <div class="addEnquiry_page">
    <Header title="公司注册服务询价" :isBack=true />
    <div class="formInfo">询价请补充需求细节，以获得精准报价</div>
    <div class="form">
      <div class="formItem">
        <label for="">公司类型</label>
        <div class="input">
          <input v-model="companyType" readonly type="text" placeholder="请选择公司类型">
        </div>
        <div class="selectLogo">
          <img src="@/assets/global/ic_chevron_right_small.png" alt="">
        </div>
      </div>
      <div class="formItem" @click="jumpArea">
        <label for="">需求地区</label>
        <div class="input">
          <input v-model="companyType" @click="show = true" readonly type="text" placeholder="请选择需求地区">
        </div>
        <div class="selectLogo">
          <img src="@/assets/global/ic_chevron_right_small.png" alt="">
        </div>
      </div>
      <div class="formItem">
        <label for="">姓名</label>
        <div class="input">
          <input v-model="companyType" type="text" placeholder="请输入姓名">
        </div>
      </div>
      <div class="formItem">
        <label for="">联系方式</label>
        <div class="input">
          <input v-model="companyType" readonly type="text" placeholder="请输入手机号">
        </div>
      </div>
      <div class="formItem">
        <label for="">备注</label>
        <div class="input">
          <input v-model="companyType" type="text" placeholder="输入备注信息">
        </div>
      </div>
    </div>
    <div class="submitBtn">
      <p>我们将对您的号码严格保密，请放心使用</p>
      <div class="freeEnquiryBtn">
        <van-button type="primary" size="large">免 费 询 价</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header/Header'
import Vue from 'vue'
import { Button, ActionSheet } from 'vant'
Vue.use(Button).use(ActionSheet)
export default {
  name: 'addEnquiry',
  components: {
    Header
  },
  data() {
    return {
      companyType: '',
      show: false
    }
  },
  created() {

  },
  methods: {
    // 跳转到选择地区的页面
    jumpArea() {
      this.$router.push('area')
    }
  }
}
</script>
<style lang="scss" scoped>
.addEnquiry_page {
  padding-top: 56px;
  .formInfo {
    height: 44px;
    background: #FAFAFA;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: rgba(0,0,0,0.38);
    padding-left: 16px;
    line-height: 44px;
    text-align: left;
  }
  .form {
    text-align: left;
    .formItem {
      height: 48px;
      margin: 0 16px;
      display: flex;
      label {
        display: block;
        width: 104px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0,0,0,0.60);
        text-align: left;
        line-height: 49px;
      }
      .input {
        flex: 1;
        input {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          padding: 14px 0;
          outline: none;
        }
      }
      .selectLogo {
        width: 24px;
        height: 24px;
        margin-top: 12px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .submitBtn {
    margin-top: 32px;
    p {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: rgba(0,0,0,0.20);
      text-align: center;
    }
    .freeEnquiryBtn {
      margin: 0 32px;
      margin-top: 12px;
      height: 40px;
      border-radius: 2px;
      .van-button--large {
        height: 40px;
        line-height: 40px;
        background-image: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
        border-radius: 2px;
        border: 0;
        .van-button__text {
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #FFFFFF;
          text-align: center;
          line-height: 18px;
        }
      }
    }
  }
}
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: rgba(0,0,0,0.26);
  text-align: left;
  line-height: 20px;
}

input:-moz-placeholder, textarea:-moz-placeholder {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: rgba(0,0,0,0.26);
  text-align: left;
  line-height: 20px;
}

input::-moz-placeholder, textarea::-moz-placeholder {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: rgba(0,0,0,0.26);
  text-align: left;
  line-height: 20px;
}

input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: rgba(0,0,0,0.26);
  text-align: left;
  line-height: 20px;
}
</style>
