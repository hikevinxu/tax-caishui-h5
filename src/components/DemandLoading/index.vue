<template>
  <div class="demandLoading">
    <div class="demandLoading_inner">
      <div class="time"><img src="@/assets/global/img_page_in_audit.png" alt=""></div>
      <div class="msg">当前还剩25家商家正在报价中，请耐心等待…</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
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
.demandLoading {
  width: 100%;
  .demandLoading_inner {
    margin: 0 40px;
    height: 32px;
    background: rgba(255,173,113,0.12);
    border-radius: 2px;
    padding-left: 28px;
    position: relative;
    .time {
      width: 16px;
      height: 16px;
      position: absolute;
      top: 8px;
      left: 8px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .msg {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: rgba(0,0,0,0.60);
      line-height: 32px;
      text-align: left;
    }
  }
}
</style>
