<template>
  <div id="app" class="has-bottombar">
    <keep-alive :include="keepAlive">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keepAlive: ['login', 'addEnquiry']
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 16px;
  background-color: #fff;
}
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
  /*增加头部适配层*/
  .has-topbar {
    height: 100%;
    box-sizing: border-box;
    padding-top: 44px;
    &:before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 44px;
      background-color: #000000;
      z-index: 9998;
    }
  }
  .has-bottombar {
    height: 100%;
    box-sizing: border-box;
    padding-bottom: 34px;
    &:after {
      content: '';
      z-index: 9998;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 34Px;
      background: #f7f7f8;
    }
  }
}
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
  /*增加头部适配层*/
  .has-topbar {
    height: 100%;
    box-sizing: border-box;
    padding-top: 44px;
    &:before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 44px;
      background-color: #000000;
      z-index: 9998;
    }
  }
  .has-bottombar {
    height: 100%;
    box-sizing: border-box;
    padding-bottom: 34px;
    &:after {
      content: '';
      z-index: 9998;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 34Px;
      background: #f7f7f8;
    }
  }
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
  /*增加头部适配层*/
  .has-topbar {
    height: 100%;
    box-sizing: border-box;
    padding-top: 44px;
    &:before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 44px;
      background-color: #000000;
      z-index: 9998;
    }
  }
  .has-bottombar {
    height: 100%;
    box-sizing: border-box;
    padding-bottom: 34px;
    &:after {
      content: '';
      z-index: 9998;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 34Px;
      background: #f7f7f8;
    }
  }
}
img{
  pointer-events: none;
}
</style>
