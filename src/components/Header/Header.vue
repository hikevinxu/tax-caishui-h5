<template>
  <div class="header_component">
    <span class="back" v-if="isBack" @click="back">
      <img src="@/assets/global/ic_arrow_back.png" alt="">
    </span>
    {{title}}
  </div>
</template>
<script>
export default {
  props: {
    isBack: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
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
</style>
