<template>
  <div class="LoginDialogComponent">
    <van-popup :close-on-click-overlay="false" v-model="isShowLoginBox">
      <div class="loginBox">
        <div class="loginBox_title">
          请登录
          <span @click="closeLoginBox"><img src="../../assets/global/close_icon.png" alt=""></span>
        </div>
        <div class="loginInfoInput">
          <div class="userName">
            <input type="tel" maxlength="11" @blur="scrollTop" v-model="userName" placeholder="请输入手机号码">
          </div>
          <div class="password">
            <input type="tel" maxlength="4" @blur="scrollTop" v-model="password" placeholder="验证码">
            <span ref="getYZMInput" v-if="!regain" @click="getYZM($event, 'sms')">获取验证码</span>
            <span v-if="regain" @click="getYZM($event, 'sms')">{{num}}秒后重新获取</span>
          </div>
          <div id="captcha"></div>
          <div class="loginBtn">
            <van-button class="btn" plain type="primary" @click="login">登  录</van-button>
          </div>
          <div class="agreeXY" key="qq">
            <van-checkbox v-model="checked">
              阅读并同意 <span @click.stop="jumpXieyi(1)">《平台服务协议》</span>和<span @click.stop="jumpXieyi(2)">《隐私权政策》</span>
            </van-checkbox>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import Vue from 'vue'
import { Popup, Toast, Checkbox, Button } from 'vant'
import { Terminal, config } from '@/utils/global'
import globalApi from '@/api/globalApi'
import router from '@/router/index'
import store from '@/store/index'
import sa from 'sa-sdk-javascript'
Vue.use(Popup).use(Checkbox).use(Button)
export default {
  props: {
    userName: {
      type: String,
      default: ''
    },
    autoSend: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShowLoginBox: false,
      promise: '',
      resolve: '',
      reject: '',
      password: '',
      checked: true,
      regain: false,
      voiceShow: false,
      num: 60,
      checked: true,
      captchaIns: undefined,
      verifyType: 'sms',
      vioceGetYZM: false,
      timer: undefined
    }
  },
  mounted () {
    // 微信内置浏览器浏览H5页面弹出的键盘遮盖文本框的解决办法
    // window.addEventListener('resize', function () {
    //   if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
    //     window.setTimeout(function () {
    //       document.activeElement.scrollIntoViewIfNeeded()
    //     }, 0)
    //   }
    // })
    var that = this
    // initNECaptcha为全局函数，可直接调用
    initNECaptcha({
        // config对象，参数配置
        captchaId: config.captchaId,
        element: '#captcha',
        mode: 'bind',
        width: '300px',
        enableClose: true, // 由业务方控制验证码弹框关闭
        onVerify: function(err, data){
            // 用户验证码验证成功后，进行实际的提交行为
            if (!err) {
              // 验证成功后，调用close方法关闭弹框（enableClose为true时调用）
              that.captchaIns.close()
              if (data) {
                let params = {
                  clientType: 'h5',
                  verifyType: that.verifyType,
                  captchaValidate: data.validate,
                  captchaId: config.captchaId,
                  phone: that.userName
                }
                that.captchaIns && that.captchaIns.refresh()
                globalApi.sendLoginVerifycode(params).then(res => {
                  if (res.code === 0) {
                    that.nextShow = false
                    that.regain = true
                    that.timer = setInterval(() => {
                      that.num--
                      if (that.num <= 0) {
                        clearInterval(that.timer)
                        that.num = 60
                        that.regain = false
                        that.voiceShow = true
                        that.vioceGetYZM = false
                      }
                    }, 1000)
                  }
                })
              }
            } else {
              return
            }
        }
    }, function  onload (instance) {
        // 初始化成功后得到验证实例instance，可以调用实例的方法
        that.captchaIns = instance
    }, function  onerror (err) {
        // 初始化失败后触发该函数，err对象描述当前错误信息
    })
  },
  methods: {
    // 弹出messageBox,并创建promise对象
    showLoginBox(){
      this.isShowLoginBox = true
      if (this.userName == '') {
        this.userName = localStorage.getItem('formPhone')
      }
      if(this.userName != '' && this.autoSend) {
        setTimeout(() => {
          this.$refs.getYZMInput.click()
        }, 500)
      }
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
      // 返回promise对象
      return this.promise
    },
    closeLoginBox() {
      this.isShowLoginBox = false
      this.num = 60
      this.regain = false
      clearInterval(this.timer)
      // router.push('/home')
    },
    // 获取验证码
    getYZM: function (e, verifyType) {
      e.preventDefault()
      if (this.regain) {
        return
      }
      if (this.userName.length !== 11) {
        Toast('请输入11位合法手机号！')
        return
      }
      this.verifyType = verifyType
      this.captchaIns && this.captchaIns.verify()
    },
    // 登录
    login () {
      if (this.userName.length !== 11) {
        Toast('请输入11位合法手机号！')
        return
      }
      if (this.verifyType === '') {
        Toast('请先获取验证码！')
        return
      }
      if (this.password.length !== 4) {
        Toast('请输入4位验证码！')
        return
      }
      if (!this.checked) {
        Toast('请勾选用户协议！')
        return
      }
      let params = {
        clientType: 'h5',
        verifyType: this.verifyType,
        verifycode: this.password,
        phone: this.userName
      }
      globalApi.loginVerifycode(params).then(res => {
        if (res.code === 0) {
          if(res.data.authInfo.newRegistration && res.data.authInfo.newRegistration == true){
            sa.track('WebSignUp', {
              target: this.$store.getters.getUtmSource,
              utm_source: this.$store.getters.getUtmSource,
              utm_medium: this.$store.getters.getUtmMedium,
              phone: this.userName
            })
          }
          sa.login(res.data.authInfo.uid)
          Toast('登录成功')
          localStorage.setItem('formPhone', '')
          store.dispatch('save_user_phone', this.userName)
          store.dispatch('save_token', res.data.accessToken)
          let token = localStorage.getItem('token')
          this.isShowLoginBox = false
          // router.push(router.currentRoute.fullPath)
          localStorage.setItem('first', '1')
          if (router.currentRoute.path == '/addEnquiry') {
            this.confirm(this.userName)
          } else {
            window.location.reload()
          }
        }
      })
    },
    jumpXieyi(id) {
      localStorage.setItem('goXieyi', '1')
      router.push('/powerOfAttoney?id=' + id)
      this.isShowLoginBox = false
    },
    // 确定,将promise断定为resolve状态
    confirm: function (val) {
      this.resolve(val)
      this.remove()
    },
    remove: function () {
      setTimeout(() => {
        this.destroy()
      }, 300)
    },
    destroy: function () {
      this.$destroy()
      document.body.removeChild(this.$el)
    }
  }
}
</script>
<style lang="scss" scoped>
.LoginDialogComponent {
  .van-popup--center {
    border-radius: 2px;
    transform: translate3d(-50%,-65%,0);
  }
  .loginBox {
    width: 296px;
    padding-bottom: 20px;
    .loginBox_title {
      padding-top: 16px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: rgba(0,0,0,0.87);
      text-align: center;
      position: relative;
      span {
        display: block;
        width: 18px;
        height: 18px;
        position: absolute;
        top: 10px;
        right: 10px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .loginInfoInput {
      margin-top: 16px;
      .password {
        position: relative;
      }
      .userName {
        input {
          width: 100%;
        }
      }
      .userName,
      .password {
        margin: 0 28px;
        height: 48px;
        box-sizing: border-box;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0,0,0,0.87);
        line-height: 22px;
        padding: 13px 0;
        border-bottom: 2px solid rgba(0,0,0,0.04);
        span {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #FF7F4A;
          text-align: right;
          line-height: 18px;
          position: absolute;
          top: 15px;
          right: 0;
        }
      }
      .loginBtn {
        margin: 0 28px;
        margin-top: 20px;
        .btn {
          width: 100%;
          height: 40px;
          background-image: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
          border-radius: 2px;
          border: 0;
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #FFFFFF;
          text-align: center;
          line-height: 18px;
        }
        .YYwarning {
          margin-top: 24px;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: rgba(255,255,255,0.70);
          text-align: center;
          line-height: 18px;
        }
      }
      .agreeXY {
        margin: 0 28px;
        font-size: 12px;
        margin-top: 12px;
        font-family: PingFangSC-Regular;
        text-align: left;
        font-size: 11px;
        color: rgba(0,0,0,0.38);
        line-height: 18px;
      }
    }
  }
}
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  font-family: PingFangSC-Regular;
  color: rgba(0,0,0,0.26);
  font-weight: 300;
  font-size: 14px;
}

input:-moz-placeholder, textarea:-moz-placeholder {
  font-family: PingFangSC-Regular;
  color: rgba(0,0,0,0.26);
  font-weight: 300;
  font-size: 14px;
}

input::-moz-placeholder, textarea::-moz-placeholder {
  font-family: PingFangSC-Regular;
  color: rgba(0,0,0,0.26);
  font-weight: 300;
  font-size: 14px;
}

input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  font-family: PingFangSC-Regular;
  color: rgba(0,0,0,0.26);
  font-weight: 300;
  font-size: 14px;
}
</style>
<style lang="scss">
.agreeXY .van-checkbox .van-checkbox__label {
  font-family: PingFangSC-Regular;
  font-size: 11px;
  color: rgba(0,0,0,0.38);
  text-align: left;
  line-height: 18px;
  margin-left: 20px;
}
.agreeXY .van-checkbox__icon {
  position: absolute;
}
.agreeXY .van-checkbox__icon .van-icon {
  width: 13px;
  height: 13px;
  margin-top: 2px;
}
.agreeXY .van-checkbox__icon .van-icon {
  border: 1.3px solid rgba(0,0,0,0.38);
  border-color: rgba(0,0,0,0.38);
}
.agreeXY .van-checkbox__icon--checked .van-icon {
  border-color: #FF7F4A;
  background-color: #FF7F4A;
}
.agreeXY .van-icon-success:before {
  line-height: 1;
  position: absolute;
  bottom: -2px;
  left: -2px;
}
</style>
