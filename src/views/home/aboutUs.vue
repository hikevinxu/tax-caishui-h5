<template>
  <div class="aboutUs_page">
    <!-- <Header :isBack="true" title="关于" /> -->
    <div class="appLogo">
      <img src="@/assets/global/logo.png" alt="财税鱼">
    </div>
    <div class="appname">财税鱼</div>
    <div class="version">v1.0.0</div>
    <div class="list">
      <div class="listitem" @click="goYSZC">
        隐私政策
        <span>
          <img src="@/assets/global/ic_chevron_right_small.png" alt="财税鱼">
        </span>
      </div>
      <div class="listitem">
        版本号<i>v1.0.0</i>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header/Header'
import sa from 'sa-sdk-javascript'
export default {
  components: {
    Header
  },
  data() {
    return {

    }
  },
  created() {
    sa.quick("autoTrackSinglePage",{
      $title: '关于页',
      $screen_name: `my_about_page`,
      $utm_source: this.$store.getters.getUtmSource,
      $utm_medium: this.$store.getters.getUtmMedium
    })
  },
  methods: {
    goYSZC() {
      this.$router.push('/powerOfAttoney?id=2')
    }
  }
}
</script>
<style lang="scss" scoped>
.aboutUs_page {
  // padding-top: 56px;
  min-width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #f5f5f5;
  padding-top: 32px;
  .appLogo {
    width: 120px;
    height: 120px;
    margin: 0 auto;
    margin-top: 32px;
    background: #FFFFFF;
    border-radius: 40px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .appname {
    margin-top: 16px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: rgba(0,0,0,0.87);
    text-align: center;
    line-height: 22px;
  }
  .version {
    margin-top: 4px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: rgba(0,0,0,0.38);
    text-align: center;
    line-height: 18px;
  }
  .list {
    margin-top: 24px;
    background-color: #fff;
    .listitem {
      box-sizing: border-box;
      margin: 0 16px;
      height: 48px;
      line-height: 48px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: rgba(0,0,0,0.87);
      text-align: left;
      border-bottom: 1px solid rgba(0,0,0,0.04);
      position:relative;
      span {
        position: absolute;
        top: 16px;
        right: 0px;
        width: 16px;
        height: 16px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      i {
        position: absolute;
        top: 0px;
        right: 0px;
        line-height: 48px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0,0,0,0.87);
      }
    }
  }
}
</style>
