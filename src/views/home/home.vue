<template>
  <div class="home_page">
    <Header title="所有服务" />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="banner">
        <van-swipe :autoplay="3000" indicator-color="#FF7F4A">
          <van-swipe-item v-for="(image, index) in bannerImg" :key="index" @click="jumpAdert">
            <img v-lazy="image.elementValue" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="serviceList">
        <div class="service" v-for="(serviceTypeItem, index) in serviceTypeList" :key="'serviceType' + index">
          <div class="serviceTitle">{{serviceTypeItem.name}}</div>
          <van-row class="list">
            <van-col v-for="(item, key) in serviceTypeItem.childs" :key="'item' + key" class="item" span="6" @click="addEnquiry(item)">
              <span><img :src="item.icon" :alt="item.name"></span>
              <p>{{item.name}}</p>
            </van-col>
          </van-row>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>

import Header from '@/components/Header/Header'
import Vue from 'vue'
import { PullRefresh, Skeleton, Swipe, SwipeItem, Lazyload, Row, Col } from 'vant'
Vue.use(PullRefresh).use(Skeleton).use(Swipe).use(SwipeItem).use(Lazyload, {preload: '120px'}).use(Row).use(Col)
import globalApi from '@/api/globalApi'
import enquiryApi from '@/api/enquiry'
import sa from 'sa-sdk-javascript'
export default {
  components: {
    Header
  },
  data() {
    return {
      isLoading: false,
      serviceTypeList: [],
      bannerImg: []
    }
  },
  created() {
    sa.quick("autoTrackSinglePage",{
      $title: '分类页',
      $screen_name: `category_page`
    })
    this.init()
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.init()
      }, 500)
    },
    init() {
      globalApi.serviceTypeTrees().then(res => {
        if(res.code == 0){
          this.serviceTypeList = res.data
          this.isLoading = false
        }
      })
      let params = {
        positionNo: '001'
      }
      globalApi.advertPositionList(params).then(res => {
        if(res.code == 0) {
          console.log(res)
          this.bannerImg = res.data.infos
          this.isLoading = false
        }
      })
    },
    addEnquiry(item) {
      let params = {
        serviceCode: item.code
      }
      enquiryApi.intentionCheck(params).then(res => {
        if(res.code == 0){
          sa.quick("WebServiceClick",{
            code: item.code,
            name: item.name
          })
          if (res.data) {
            this.$router.push('addEnquiry?code=' + item.code + '&name=' + item.name)
          } else {
            this.$router.push('inquiry')
          }
        }
      })
    },
    jumpAdert() {

    }
  }
}
</script>
<style lang="scss" scoped>
.home_page {
  padding: 56px 0;
  .banner {
    margin: 0 16px;
    height: 120px;
    border-radius: 3px;
    margin-top: 4px;
    .van-swipe {
      height: 120px;
      .van-swipe__track {
        height: 120px;
        .van-swipe-item {
          height: 120px;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .serviceList {
    margin-top: 20px;
    .service {
      .serviceTitle {
        text-align: left;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: rgba(0,0,0,0.87);
        line-height: 22px;
        margin-left: 16px;
      }
      .list {
        margin: 0 16px;
        margin-top: 8px;
        margin-bottom: 20px;
        .item {
          height: 78px;
          span {
            display: block;
            margin: 0 auto;
            margin-top: 8px;
            width: 40px;
            height: 40px;
            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          p {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: rgba(0,0,0,0.60);
            text-align: center;
            line-height: 18px;
            margin-top: 4px;
          }
        }
      }
    }
  }
}
</style>
