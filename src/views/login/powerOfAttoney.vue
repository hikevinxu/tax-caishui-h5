<template>
  <div class="powerOfAttoney">
    <!-- <Header :title="pageTitle" :isBack=true /> -->
    <div class="body">
      <div class="iframe" v-if="agreement == 1">
        <iframe width="100%" height="100%" frameborder="no" border="0" scrolling="auto" src="https://res.caishuiyu.com/common/h5/platform_agreement.html"></iframe>
      </div>
      <div class="iframe" v-if="agreement == 2">
        <iframe width="100%" height="100%" frameborder="no" border="0" src="https://res.caishuiyu.com/common/h5/privacy_agreement.html"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
export default {
  components: {
    Header
  },
  data () {
    return {
      pageTitle: '',
      agreement: undefined
    }
  },
  created () {
    if (this.$route.query.id == 1) {
      this.agreement = 1
      this.pageTitle = '平台服务协议'
      document.title = '平台服务协议'
    } else {
      this.agreement = 2
      this.pageTitle = '隐私权政策'
      document.title = '隐私权政策'
    }
  }
}
</script>

<style lang="scss" scoped>
.powerOfAttoney {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding: 0 10px;
  // padding-top: 56px;
  .body {
    width: 100%;
    height: 100%;
    .iframe {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
    }
  }
}
</style>
