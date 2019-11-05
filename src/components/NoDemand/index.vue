<template>
  <div class="noDemand">
    <div class="nothingImg">
      <img src="@/assets/global/ic_nothing.png" alt="">
    </div>
    <div class="nothingNotice">当前暂无报价需求</div>
    <div class="freeEnquiryBtn">
      <van-button type="primary" size="large">免 费 询 价</van-button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Button } from 'vant'
Vue.use(Button)
export default {
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.noDemand {
  margin-top: 72px;
  .nothingImg {
    width: 200px;
    height: 120px;
    margin: 0 auto;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .nothingNotice {
    margin-top: 20px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: rgba(0,0,0,0.87);
    text-align: center;
    line-height: 22px;
  }
  .freeEnquiryBtn {
    margin: 0 auto;
    margin-top: 40px;
    width: 240px;
    height: 40px;
    border-radius: 2px;
    .van-button--large {
      width: 240px;
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
</style>
