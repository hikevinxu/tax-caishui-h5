<template>
  <div class="login" ref="loginPage">
    <div class="welcome">欢迎来到财税鱼</div>
    <div class="loginInfo">
      <div class="loginheader">
        <div class="pic">
          <img onclick="return false" src="../../assets/global/login_logo@3x.png" alt="">
        </div>
        <div class="loginTitle">登录/注册</div>
      </div>
      <div class="loginInfoInput">
        <div class="userName loginInput">
          <input type="phone" @blur="scrollTop" maxlength="11" v-model="userName" placeholder="输入手机号">
          <span v-if="nextShow" :style="userName.length === 11 ? 'opacity: 1;' : 'opacity: 0.5;'" class="nextIcon" @click="getYZM($event, 'sms')"><img onclick="return false" src="../../assets/global/login_arrow@3x.png" alt=""></span>
        </div>
        <div id="captcha"></div>
        <transition-group name="fadeInDown" enter-active-class="fadeInDown animated">
          <div class="password loginInput" v-if="!nextShow"  key="ww">
            <input @blur="scrollTop" type="number" maxlength="11" v-model="password" placeholder="验证码">
            <span class="getYZM font14 redColor" :style="password !== '' ? 'opacity: 1;' : 'opacity: 0.5;'" v-show="regain">{{num}}秒后重新获取</span>
            <span class="getYZM font14 redColor" :style="password !== '' ? 'opacity: 1;' : 'opacity: 0.5;'" v-show="!regain" @click="getYZM($event, 'sms')">重新获取</span>
          </div>
          <div class="agreeXY" v-if="!nextShow"  key="qq">
            <van-checkbox v-model="checked">
              阅读并同意 <span class="whiteColor" @click.stop="jumpXY(1)">《平台服务协议》</span> 和<span class="whiteColor" @click.stop="jumpXY(2)">《隐私权政策》</span>
            </van-checkbox>
          </div>
        </transition-group>
      </div>
      <div class="loginBtn">
        <van-button :style="userName !== '' && password !== '' && checked ? 'opacity: 1;' : 'opacity: 0.5;'" class="btn" v-if="!nextShow" plain type="primary" @click="login">登录</van-button>
        <transition name="fadeInDown" enter-active-class="fadeInDown animated">
          <div class="YYwarning" v-if="voiceShow">收不到验证码？<span class="whiteColor" @click="getVoiceYZM($event, 'voice')">试试语音验证码</span></div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Toast, Checkbox, Button } from 'vant'
import { Terminal, config } from '@/utils/global'
import globalApi from '@/api/globalApi'
// import sa from 'sa-sdk-javascript'
Vue.use(Checkbox).use(Button)

export default {
  name: 'login',
  data () {
    return {
      userName: '',
      password: '',
      nextShow: true,
      regain: true,
      voiceShow: false,
      num: 60,
      checked: false,
      icon: {
        normal: '',
        active: ''
      },
      captchaIns: undefined,
      verifyType: '',
      vioceGetYZM: false
    }
  },
  mounted () {
    this.preUrl = this.$route.query.preUrl
    // 微信内置浏览器浏览H5页面弹出的键盘遮盖文本框的解决办法
    window.addEventListener('resize', function () {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        window.setTimeout(function () {
          document.activeElement.scrollIntoViewIfNeeded()
        }, 0)
      }
    })
    let clientHeight = `${document.documentElement.clientHeight}`
    this.$refs.loginPage.style.height = clientHeight+'px'
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
                    var timer = setInterval(() => {
                      that.num--
                      if (that.num <= 0) {
                        clearInterval(timer)
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
    // 获取验证码
    getYZM: function (e, verifyType) {
      e.preventDefault()
      if (this.vioceGetYZM) {
        Toast('正在发送语音验证码！请稍后！')
        rerurn
      }
      if (this.userName.length !== 11) {
        Toast('请输入11位合法手机号！')
        return
      }
      this.verifyType = verifyType
      // this.nextShow = false
      this.captchaIns && this.captchaIns.verify()
    },
    // 打开协议书
    jumpXY (id) {
      this.$router.push('/powerOfAttoney?id=' + id)
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
          // sa.login(res.data.uid)
          Toast('登录成功')
          this.$store.dispatch('save_user_phone', this.userName)
          this.$store.dispatch('save_token', res.data.accessToken)
          window.history.replaceState(null, null, "/home")
          this.$router.push('home')
          // if (localStorage.getItem('jumpUrl')) {
          //   let routerPath = {
          //     path: JSON.parse(localStorage.getItem('jumpUrl')).path,
          //     query: JSON.parse(localStorage.getItem('jumpUrl')).query
          //   }
          //   routerPath.query.load = 'loaded'
          //   this.$router.push(routerPath)
          // }
        }
      })
    },
    // 获取语音验证码 
    getVoiceYZM (e, verifyType) {
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
    scrollTop () {
      window.scroll(0, 0);
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background: url('../../assets/global/login_bg.png') 100% 100% no-repeat;
  background-size: 100% 100%;
  padding-top: 80px;
  .welcome {
    text-align: left;
    font-size: 14px;
    margin-left: 35px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: rgba(255,255,255,0.70);
    line-height: 22px;
  }
  .loginInfo {
    margin-top: 16px;
    .loginheader {
      overflow: hidden;
      height: 40px;
      .pic {
        float: left;
        width: 40px;
        height: 40px;
        margin: 0 auto;
        margin-left: 35px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .loginTitle {
        float: left;
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #FFFFFF;
        line-height: 36px;
        margin-left: 16px;
      }
    }
    .loginInfoInput {
      margin: 0px 32px;
      margin-top: 55px;
      .loginInput {
        width: 100%;
        height: 48px;
        border-bottom: 2px solid #fff;
        position: relative;
        input {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding: 15px 8px;
          font-size: 16px;
          background-color: transparent;
          color: #fff;
          line-height: 22px;
        }
        .nextIcon {
          width: 32px;
          height: 32px;
          position: absolute;
          right: 8px;
          bottom: 8px;
          z-index: 998;
          img {
            width: 100%;
            height: 100%;
          }
        }
        #captcha {
          width: 320px;
          height: 40px;
        }
      }
      .password {
        margin-top: 16px;
        .getYZM {
          position: absolute;
          right: 8px;
          bottom: 15px;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #fff;
          text-align: right;
          line-height: 18px;
        }
      }
    }
    .agreeXY {
      font-size: 12px;
      margin: 22px auto;
      margin-bottom: 32px;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #fff;
      text-align: left;
    }
  }
  .loginBtn {
    margin: 0 32px;
    .btn {
      width: 100%;
      height: 36px;
      background: #FFFFFF;
      border-radius: 2px;
      border: 0;
      font-family: PingFangSC-Medium;
      font-size: 15px;
      color: #DCA143;
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
}
.font14 {
  font-size: 14px;
}
.whiteColor {
  color: #fff;
}
.van-button--normal {
  padding: 10px 60px;
}
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  color: rgba(255,255,255,0.50);
  font-size: 16px;
}

input:-moz-placeholder, textarea:-moz-placeholder {
  color: rgba(255,255,255,0.50);
  font-size: 16px;
}

input::-moz-placeholder, textarea::-moz-placeholder {
  color: rgba(255,255,255,0.50);
  font-size: 16px;
}

input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  color: rgba(255,255,255,0.50);
  font-size: 16px;
}
</style>

<style lang="scss">
.agreeXY .van-checkbox .van-checkbox__label {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: rgba(255,255,255,0.70);
  text-align: left;
  line-height: 18px;
  margin-left: 20px;
}
.agreeXY .van-checkbox__icon {
  position: absolute;
}
.agreeXY .van-checkbox__icon .van-icon {
  width: 14px;
  height: 14px;
  margin-top: 2px;
}
.agreeXY .van-checkbox__icon .van-icon {
  border: 1.3px solid #ffffff;
  border-color: #ffffff;
}
.agreeXY .van-checkbox__icon--checked .van-icon {
  border-color: #ffffff;
  background-color: transparent;
}
.agreeXY .van-icon-success:before {
  line-height: 1;
  position: absolute;
  bottom: -1px;
  left: -1px;
}
</style>
