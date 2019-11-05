<template>
  <div class="error404">
    <div class="header">
      <div class="back" @click="goBack()"><img src="@/assets/global/ic_arrow_back.png" alt=""></div>
      网络错误
    </div>
    <div class="picInfo">
      <img src="@/assets/error/network.png" alt="">
    </div>
    <div class="info">
      网络连接异常
    </div>
  </div>
</template>

<script>
export default {
  name: 'error404',
  methods: {
    goBack () {
      window.history.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.error404 {
  .header {
    height: 56px;
    line-height: 56px;
    font-weight: 500;
    background-color: #fff;
    .back {
      position: absolute;
      top: 0;
      left: 0;
      width: 24px;
      height: 24px;
      margin-top: 16px;
      margin-left: 16px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .picInfo {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    margin-top: 20px;
    color: #858b9c;
  }
}
</style>
