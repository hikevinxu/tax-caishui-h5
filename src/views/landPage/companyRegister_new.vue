<template>
  <div class="companyRegister_new_page" id="companyRegister_page">
    <div class="header_img">
      <img src="@/assets/landPage/head.png" alt="">
    </div>
    <div style="padding-top: 10px;" id="form">
      <div class="notice">
        <img src="@/assets/landPage/ic_notice.png" alt="">
        <span>目前已经有<i>1127人</i>参与活动</span>
      </div>
    </div>
    <div class="form">
      <div class="formItem">
        <label>电话<span>(加密, 放心填)*</span></label>
        <input maxlength="11" v-model="phone" type="tel" placeholder="请输入电话">
      </div>
      <div class="formItem password">
        <label>验证码<span>*</span></label>
        <input maxlength="4" v-model="password" type="tel" placeholder="请输入验证码">
        <span class="getYZM" @click="getYZM"><span v-if="!getting">获取验证码</span><span v-else>{{second}}秒后重新获取</span></span>
      </div>
      <div id="captcha"></div>
      <div class="submitBtn">
        <van-button id="submitForm" type="primary" size="large" @click="submitForm">抢0元注册公司，最快3天办好</van-button>
      </div>
    </div>
    <div class="intro_img">
      <img src="@/assets/landPage/body_procedure.png" alt="">
      <img src="@/assets/landPage/body_compare.png" alt="">
    </div>
    <div class="notice">
      <img src="@/assets/landPage/ic_notice.png" alt="">
      <span>目前已经有<i>1127人</i>参与活动</span>
    </div>
    <div class="form">
      <div class="formItem">
        <label>电话<span>(加密, 放心填)*</span></label>
        <input maxlength="11" v-model="phone" type="tel" placeholder="请输入电话">
      </div>
      <div class="formItem password">
        <label>验证码<span>*</span></label>
        <input maxlength="4" v-model="password" type="tel" placeholder="请输入验证码">
        <span class="getYZM" @click="getYZM"><span v-if="!getting">获取验证码</span><span v-else>{{second}}秒后重新获取</span></span>
      </div>
      <div id="captcha"></div>
      <div class="submitBtn">
        <van-button id="submitForm" type="primary" size="large" @click="submitForm">抢0元注册公司，最快3天办好</van-button>
      </div>
    </div>
    <div class="counselPhone">
      咨询电话：400-168-0458
    </div>
    <a href="#form" class="fixed_bth">
      <img src="@/assets/landPage/ic_fill_flow.png" alt="">
    </a>
    <div v-if="showBottomBtn">
      <div class="bottom_btn" v-if="showConsult">
        <a href="tel:4001680458" @click="contact" :style="isBottom ? 'width: 100%;' : ''" class="bottom_left">
          <img src="@/assets/landPage/ic_button_call.png" alt="">
          <span>立即咨询</span>
        </a>
        <a href="#form" :style="isBottom ? 'display: none;' : ''" class="bottom_right">
          <img src="@/assets/landPage/ic_button_apply.png" alt="">
          <span>0元注册公司，快速申请</span>
        </a>
      </div>
      <div class="bottom_btn" v-else>
        <a href="#form" :style="isBottom ? 'display: none;' : ''" class="bottom_right">
          <img src="@/assets/landPage/ic_button_apply.png" alt="">
          <span>0元注册公司，快速申请</span>
        </a>
      </div>
    </div>
    <van-popup v-model="show" :close-on-popstate="true" :close-on-click-overlay="false" :round="true">
      <div class="dialog">
        <i><img src="@/assets/serviceDetail/success-answer.png" alt=""></i>
        <span>客服将在24小时内联系您<br />请您注意接听电话</span>
        <button class="close" @click="close">关闭</button>
      </div>
    </van-popup>
  </div>
</template>
<script>

import enquiryApi from '@/api/enquiry'
import globalApi from '@/api/globalApi'
import { config, Terminal } from '@/utils/global'
import Vue from 'vue'
import { Button, Toast, Popup, Dialog } from 'vant'
Vue.use(Button).use(Toast).use(Popup).use(Dialog)
import sa from 'sa-sdk-javascript'

export default {
  name: 'companyRegister-new',
  data() {
    return {
      serviceCode: '101001',
      serviceName: '公司注册',
      inputList: [],
      name: '',
      phone: '',
      password: '',
      area: '',
      areaCode: '',
      demandAreaType: 1,
      areaShow: false,
      selectCityType: 1,
      areaSelectData: {
        parentName: '上海市',
        provinceCode: '310000',
        cityCode: '310100',
        name: '上海城区',
        areaName: '',
        areaCode: '',
        childs: []
      },
      isBottom: false,
      timer: undefined,
      second: 60,
      getting: false,
      captchaIns: '',
      getYZMStatus: true,
      getYZMType: '',
      showConsult: false,
      show: false,
      showBottomBtn: true
    }
  },
  created() {
    document.title = this.serviceName  + '询价'
    let h = document.body.scrollHeight
    this.initNECaptcha()
    sa.quick("autoTrackSinglePage",{
      $title: '公司注册落地页',
      $screen_name: `company_register_page`,
      $utm_source: this.$store.getters.getUtmSource,
      $utm_medium: this.$store.getters.getUtmMedium
    })
    // 微信内置浏览器浏览H5页面弹出的键盘遮盖文本框的解决办法
    window.addEventListener('resize', (e) => {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        window.setTimeout(() => {
          document.activeElement.scrollIntoViewIfNeeded()
          if(document.body.scrollHeight < h) {
            this.showBottomBtn = false
          } else {
            this.showBottomBtn = true
          }
        }, 0)
      }
    })
    // 监听滚动到底部
    window.addEventListener('scroll', this.scrollBottom, true)
    let currentTime = new Date().getHours()
    if(currentTime > 8 && currentTime < 19) {
      this.showConsult = true
    }
  },
  methods: {
    initNECaptcha() {
      var that = this
      // initNECaptcha为全局函数，可直接调用
      initNECaptcha({
        // config对象，参数配置
        captchaId: config.captchaId,
        element: '#captcha',
        mode: 'bind',
        width: '320px',
        enableClose: true, // 由业务方控制验证码弹框关闭
        onVerify: function(err, data){
          // 用户验证码验证成功后，进行实际的提交行为
          if (!err) {
            // 验证成功后，调用close方法关闭弹框（enableClose为true时调用）
            that.captchaIns.close()
            if (data) {
              console.log(data)
              if (that.getYZMType == 'register') {
                let params = {
                  captchaId: config.captchaId,
                  captchaValidate: data.validate,
                  phone: that.phone
                }
                that.captchaIns && that.captchaIns.refresh()
                globalApi.channelPageObtainFormSendVerifycode(params).then(res => {
                  if (res.code === 0) {
                    if (!that.getting) {
                      that.getting = true
                      let timer = setInterval(() => {
                        that.second--
                        if (that.second <= 0) {
                          clearInterval(timer)
                          that.second = 60
                          that.getting = false
                          that.getYZMStatus = true
                        }
                      }, 1000)
                    }
                  }
                }).catch(err => {
                  that.second = 60
                  that.getting = false
                  that.getYZMStatus = true
                })
              }
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
    getYZM () {
      if (this.getYZMStatus) {
        this.getYZMStatus = false
        if (this.phone.length !== 11) {
          this.getYZMStatus = true
          Toast('请输入11位合法手机号！')
          return
        }
        this.getYZMType = 'register'
        this.captchaIns && this.captchaIns.verify()
      }
    },
    scrollBottom(e) {
      clearTimeout(this.timer)  // 节流
      this.timer = setTimeout(()=>{
        let {scrollTop,clientHeight,scrollHeight} = e.target
        if(scrollTop + clientHeight + 150 > scrollHeight){
          this.isBottom = true
          console.log(this.isBottom)
        } else {
          this.isBottom = false
          console.log(this.isBottom)
        }
      },60)
    },
    contact() {
      _hmt.push(['_trackEvent', 'contact', 'call', this.serviceName , 100.00])
      console.log(_hmt)
      sa.track("WebUserConsult",{
        code: this.serviceCode,
        name: this.serviceName,
        page: this.serviceName + '落地页',
        type: 'CALL',
        $utm_source: this.$store.getters.getUtmSource,
        $utm_medium: this.$store.getters.getUtmMedium
      })
    },
    // 提交表单-new
    submitForm() {
      if (this.phone.length !== 11) {
        Toast('请输入11位合法手机号！')
        return
      }
      if (this.password == '') {
        Toast('请输入短信验证码！')
        return
      }
      let formJson = {
        phone: this.phone
      }

      let params = {
        clientType: 'h5',
        phone: this.phone,
        verifyType: 'sms',
        verifycode: this.password,
        pageType: 2,
        formJson: JSON.stringify(formJson),
        serviceCode: this.serviceCode,
        serviceName: this.serviceName
      }
      globalApi.channelPageObtainFormValidateSave(params).then(res => {
        if(res.code == 0){
          if(res.data.newRegistration && res.data.newRegistration == true){
            sa.track('WebSignUp', {
                target: this.$route.query.channelRemark || '',
                phone: this.phone
            })
            sa.login(res.data.uid)
          }
          console.log(window._agl)
          console.log(window._hmt)
          _hmt.push(['_trackEvent', 'services', 'submit_success', this.serviceName , 200.00])
          window._agl && window._agl.push(['track', ['success', {t: 3}]])
          sa.track("WebUserEnquiryClick",{
            code: this.serviceCode,
            name: this.serviceName,
            page: this.serviceName + '落地页',
            $utm_source: this.$store.getters.getUtmSource,
            $utm_medium: this.$store.getters.getUtmMedium
          })
          this.show = true
        }
      })
    },
    close() {
      this.show = false
    }
  }
}
</script>
<style lang="scss" scoped>
.companyRegister_new_page {
  background-color: #fff;
  margin-bottom: 88px;
  min-height: 100vh;
  .header_img {
    width: 100%;
    img {
      display: block;
      width: 100%;
    }
  }
  .notice {
    margin: 0 16px;
    height: 32px;
    background: #FAF3EE;
    border: 1px solid rgba(0,0,0,0.04);
    border-radius: 16px;
    border-radius: 16px;
    img {
      width: 16px;
      height: 16px;
      margin-top: 8px;
      vertical-align: top;
    }
    span {
      margin-left: 8px;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #7C321E;
      line-height: 32px;
      i {
        color: #FB5332;
      }
    }
  }
  .form {
    margin: 16px 16px;
    border: 1px solid rgba(0,0,0,0.04);
    border-radius: 4px;
    border-radius: 4px;
    padding: 16px;
    .formItem {
      margin-bottom: 16px;
      position: relative;
      label {
        display: block;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: rgba(0,0,0,0.87);
        text-align: left;
        line-height: 20px;
        margin-left: 8px;
        span {
          font-size: 12px;
          color: #FB5332;
          line-height: 18px;
          margin-left: 8px;
        }
      }
      input {
        width: 100%;
        height: 40px;
        font-family: PingFangSC-Regular;
        box-sizing: border-box;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.6);
        padding: 10px 8px;
        line-height: 20px;
        border-bottom: 1px solid rgba(0,0,0,0.12);
        &:focus {
          border-bottom: 1px solid #FB5332;
        }
      }
      .selectLogo {
        width: 16px;
        height: 16px;
        position: absolute;
        bottom: 10px;
        right: 0;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .getYZM {
        position: absolute;
        bottom: 10px;
        right: 8px;
        font-size: 14px;
        line-height: 20px;
      }
    }
    .formItem.password {
      input {
        padding-right: 120px;
      }
    }
    .formSelectItem {
      margin-bottom: 16px;
      position: relative;
      label {
        display: block;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: rgba(0,0,0,0.87);
        text-align: left;
        line-height: 20px;
        margin-left: 8px;
        i {
          font-size: 12px;
          color: rgba(0,0,0,0.38);
          line-height: 18px;
          margin-left: 4px;
        }
        span {
          font-size: 12px;
          color: #FB5332;
          line-height: 18px;
        }
      }
      .selectList {
        overflow: hidden;
        .selectList_item {
          float: left;
          min-width: 50%;
          height: 32px;
          box-sizing: border-box;
          line-height: 32px;
          padding: 0 8px;
          margin-top: 4px;
          display: flex;
          .selectLogoImg {
            width: 16px;
            height: 16px;
            margin-top: 8px;
            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          .selectText {
            flex: 1;
            font-family: PingFangSC-Regular;
            font-size: 13px;
            color: rgba(0,0,0,0.60);
            text-align: left;
            line-height: 32px;
            margin-left: 8px;
          }
          .selectText.select {
            text-decoration: #FF7F4A;
          }
        }
      }
      .selectCity {
        // width: 50%;
        position: absolute;
        top: 0;
        right: 0;
        font-family: PingFangSC-Regular;
        font-size: 11px;
        color: rgba(0,0,0,0.60);
        text-align: left;
        line-height: 20px;
        margin-left: 8px;
        box-sizing: border-box;
        padding: 0 8px;
      }
    }
    .submitBtn {
      height: 40px;
      margin-bottom: 8px;
      border-radius: 4px;
      .van-button--large {
        height: 40px;
        line-height: 40px;
        border: 0;
        background-image: linear-gradient(135deg, #FF7F4A 0%, #FB5332 100%);
        box-shadow: 0 4px 8px 0 rgba(251,83,50,0.24);
        border-radius: 4px;
        .van-button__text {
          font-family: PingFangSC-Medium;
          font-size: 15px;
          color: #FFFFFF;
          text-align: center;
          line-height: 18px;
        }
      }
    }
  }
  .intro_img {
    width: 100%;
    img {
      display: block;
      width: 100%;
    }
  }
  .counselPhone {
    width: 100%;
    height: 48px;
    background: #FAF3EE;
    font-family: PingFangSC-Medium;
    font-size: 13px;
    color: #7C321E;
    line-height: 48px;
    text-align: center;
  }
  .fixed_bth {
    position: fixed;
    bottom: 70px;
    right: 16px;
    width: 60px;
    height: 60px;
    img {
      display: block;
      width: 100%;
    }
  }
  .bottom_btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-image: linear-gradient(135deg, #FF7F4A 0%, #FB5332 100%);
    box-shadow: 0 -8px 16px 0 rgba(251,83,50,0.24);
    display: flex;
    .bottom_left {
      width: 120px;
      height: 64px;
      background: #FFFFFF;
      font-family: PingFangSC-Medium;
      font-size: 15px;
      color: #FB5332;
      text-align: center;
      img {
        width: 24px;
        height: 24px;
        margin-top: 20px;
        vertical-align: top;
      }
      span {
        margin-left: 4px;
        line-height: 64px;
      }
    }
    .bottom_right {
      display: block;
      flex: 1;
      height: 100%;
      img {
        width: 24px;
        height: 24px;
        margin-top: 20px;
        vertical-align: top;
      }
      span {
        margin-left: 4px;
        vertical-align: middle;
        line-height: 64px;
        font-family: PingFangSC-Medium;
        font-size: 15px;
        color: #FFFFFF;
      }
    }
  }
  .dialog {
    width: 260px;
    box-sizing: border-box;
    padding: 24px 0;
    background-color: #fff;
    i {
      display: block;
      width: 40px;
      height: 40px;
      margin: 0 auto;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    span {
      display: block;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: rgba(0,0,0,0.87);
      text-align: center;
      line-height: 20px;
      margin-top: 16px;
    }
    button {
      width: 200px;
      height: 40px;
      box-sizing: border-box;
      border: 1px solid #FF7F4A;
      border-radius: 2px;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #FF7F4A;
      text-align: center;
      line-height: 40px;
      position: relative;
      border: 0;
      background-image: linear-gradient(135deg, #FF7F4A 0%, #FB5332 100%);
      border-radius: 2px;
      color: #fff;
      margin-top: 20px;
      &::before {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        background-color: #000;
        border: inherit;
        border-color: #000;
        border-radius: inherit;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        opacity: 0;
        content: ' ';
      }
      &:active::before {
        opacity: 0.1;
      }
    }
  }
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0,0,0,0.26);
    text-align: left;
    line-height: 20px;
  }

  input:-moz-placeholder, textarea:-moz-placeholder {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0,0,0,0.26);
    text-align: left;
    line-height: 20px;
  }

  input::-moz-placeholder, textarea::-moz-placeholder {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0,0,0,0.26);
    text-align: left;
    line-height: 20px;
  }

  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0,0,0,0.26);
    text-align: left;
    line-height: 20px;
  }
}
</style>
<style lang="scss">
.companyRegister_new_page {
  .van-popup--center.van-popup--round {
    border-radius: 10px;
  }
}
</style>
