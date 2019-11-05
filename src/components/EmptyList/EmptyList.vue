<template>
  <div class="emptyList">
    <div class="picInfo">
      <img src="@/assets/error/empty.png" alt="">
    </div>
    <div class="info">
      未找到相关结果
    </div>
  </div>
</template>
<script>
export default {
  name: 'emptyList',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.emptyList {
  margin-top: 40px;
  .picInfo {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    margin-top: 16px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: rgba(0,0,0,0.26);
    text-align: center;
    line-height: 18px;
  }
}
</style>
