<template>
  <div class="detail_container">
    <div class="detail_img">
      <img v-for="(img, index) in imgData.imgList" :key="index" :src="img" alt="">
    </div>
    <div :class="source == 'zsfp' ? 'btn' : 'btn iphoneX'">
      <van-button id="enquiryDetail" type="primary" size="large" @click="addEnquiry">立即询价</van-button>
    </div>
  </div>
</template>
<script>

import Vue from 'vue'
import { Button } from 'vant'
Vue.use(Button)
import sa from 'sa-sdk-javascript'
import { imgDetailData } from '@/utils/categoryDetailImg'

export default {
  data() {
    return {
      imgData: {
        code: '',
        name: '',
        imgList: []
      },
      source: ''
    }
  },
  created() {
    this.source = this.$store.getters.getUtmSource
    document.title = this.$route.query.name
    sa.quick("autoTrackSinglePage",{
      $title: '分类详情页',
      $screen_name: `category_detail_page`,
      $utm_source: this.$store.getters.getUtmSource,
      $utm_medium: this.$store.getters.getUtmMedium
    })
    this.init()
  },
  methods: {
    init() {
      for(let i=0;i<imgDetailData.length;i++) {
        if (process.env.VUE_APP_DEPLOY == "prod") {
          if(this.$route.query.code == imgDetailData[i].prodCode) {
            this.imgData.imgList = imgDetailData[i].imgList
          }
        } else {
          if(this.$route.query.code == imgDetailData[i].sitCode) {
            this.imgData.imgList = imgDetailData[i].imgList
          }
        }
      }
    },
    addEnquiry() {
      sa.track("WebUserEnquiryClick",{
        page: '分类详情页',
        code: this.$route.query.code,
        name: this.$route.query.name,
        $utm_source: this.$store.getters.getUtmSource,
        $utm_medium: this.$store.getters.getUtmMedium
      })
      localStorage.setItem('first', '1')
      this.$router.push('addEnquiry?code=' + this.$route.query.code + '&name=' + this.$route.query.name)
    }
  }
}
</script>
<style lang="scss" scoped>
.detail_container {
  position: relative;
  margin-bottom: 88px;
  .detail_img {
    img {
      display: block;
      width: 100%;
    }
  }
  .btn {
    border-radius: 2px;
    .van-button--large {
      height: 44px;
      line-height: 44px;
      // background-image: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
      background-image: linear-gradient(45deg, #0858E6 0%, #38BDFF 100%);
      box-shadow: 0 4px 8px 0 rgba(8,88,230,0.30);
      border-radius: 22px;
      border: 0;
      .van-button__text {
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #FFFFFF;
        text-align: center;
        line-height: 22px;
      }
    }
  }
  .btn {
    border-radius: 2px;
    width: 328px;
    height: 44px;
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    /*增加头部适配层*/
    .iphoneX {
      bottom: 58px;
    }
  }
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
    /*增加头部适配层*/
    .iphoneX {
      bottom: 58px;
    }
  }
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
    /*增加头部适配层*/
    .iphoneX {
      bottom: 58px;
    }
  }
}
</style>
