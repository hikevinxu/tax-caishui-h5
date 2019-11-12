<template>
  <div class="LoginDialogComponent">
    <van-popup v-model="isShowLoginBox">
      <div class="loginBox">
        {{content}}
      </div>
    </van-popup>
  </div>
</template>
<script>
import Vue from 'vue'
import { Popup } from 'vant'

Vue.use(Popup)
export default {
  props: {
    content: {
      type: String,
      default: '12345678'
    }
  },
  data() {
    return {
      isShowLoginBox: false,
      promise: '',
      resolve: '',
      reject: ''
    }
  },
  created() {

  },
  methods: {
    // 弹出messageBox,并创建promise对象
    showLoginBox(){
      this.isShowLoginBox = true
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
      // 返回promise对象
      return this.promise
    },
  }
}
</script>
<style lang="scss" scoped>
.LoginDialogComponent {
  .loginBox {
    width: 296px;
    height: 246px;
  }
}
</style>
