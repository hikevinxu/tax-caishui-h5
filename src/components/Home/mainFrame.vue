<template>
  <div class="mainFream_page">
    <router-view />
    <van-tabbar route active-color="#FF7F4A" inactive-color="#9e9e9e">
      <van-tabbar-item replace to="/home" icon="service">
        <span>找服务</span>
        <img slot="icon" slot-scope="props" :src="props.active ? serviceIcon.active : serviceIcon.normal" />
      </van-tabbar-item>
      <van-tabbar-item replace to="/inquiry" icon="inquiry">
        <span>询价</span>
        <img slot="icon" slot-scope="props" :src="props.active ? inquiryIcon.active : inquiryIcon.normal">
      </van-tabbar-item>
      <van-tabbar-item replace to="/mine" icon="mine" >
        <span>我的</span>
        <img slot="icon" slot-scope="props" :src="props.active ? mineIcon.active : mineIcon.normal">
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import Vue from 'vue'
import { Tabbar, TabbarItem } from 'vant'
Vue.use(Tabbar).use(TabbarItem)
export default {
  data() {
    return {
      serviceIcon: {
        normal: require('@/assets/global/tabbar_service.png'),
        active: require('@/assets/global/tabbar_service_active.png')
      },
      inquiryIcon: {
        normal: require('@/assets/global/tabbar_inquiry.png'),
        active: require('@/assets/global/tabbar_inquiry_active.png')
      },
      mineIcon: {
        normal: require('@/assets/global/tabbar_mine.png'),
        active: require('@/assets/global/tabbar_mine_active.png')
      }
    }
  },
  created() {

  }
}
</script>
<style lang="scss" scoped>
.mainFream_page {
   @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    .van-tabbar--fixed {
      bottom: 34Px;
    }
  }
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
    .van-tabbar--fixed {
      bottom: 34Px;
    }
  }
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
    .van-tabbar--fixed {
      bottom: 34Px;
    }
  }
  .van-tabbar--fixed {
    box-shadow: 0 0 2px 0 rgba(0,0,0,0.12);
  }
  .van-hairline--top-bottom::after {
    border-width: 0;
  }
}
</style>
