<template>
  <div class="addEnquiry_page">
    <!-- <Header :title="pageTitle + '询价'" :isBack=true /> -->
    <div class="formInfo">询价请补充需求细节，以获得精准报价</div>
    <div class="form">
      <div class="formItem" v-for="(input, index) in inputList" :key="'input' + index">
        <label for="">{{input.name}}</label>
        <div class="input" v-if="input.type == 2">
          <input v-model="input.value" @blur="scrollTop" @click="clickShowPicker(input)" readonly type="text" :placeholder="'请选择' + input.name">
        </div>
        <div class="input" v-if="input.type == 1">
          <input @blur="scrollTop" v-model="input.value" type="text" :placeholder="'请输入' + input.name">
        </div>
        <div class="selectLogo" v-if="input.type == 2">
          <img src="@/assets/global/ic_chevron_right_small.png" alt="">
        </div>
      </div>
      <div class="formItem" @click="jumpArea">
        <label for="">需求地区</label>
        <div class="input">
          <input v-model="area" @blur="scrollTop" @click="show = true" readonly type="text" placeholder="请选择需求地区">
        </div>
        <div class="selectLogo">
          <img src="@/assets/global/ic_chevron_right_small.png" alt="">
        </div>
      </div>
      <div class="formItem">
        <label for="">姓名</label>
        <div class="input">
          <input maxlength="10" v-model="name" type="text" @blur="scrollTop" placeholder="请输入姓名">
        </div>
      </div>
      <div class="formItem">
        <label for="">联系方式</label>
        <div class="input">
          <input maxlength="11" v-model="phone" @blur="scrollTop" :readonly="readOnlyPhone" type="tel" placeholder="请输入手机号">
        </div>
      </div>
      <div class="formItem textarea">
        <label for="">备注</label>
        <div class="input">
          <textarea maxlength="100" @blur="scrollTop" v-model="remark" type="text" autoHeight="true" placeholder="输入备注信息"></textarea>
        </div>
      </div>
    </div>
    <div class="submitBtn">
      <p>我们将对您的号码严格保密，请放心使用</p>
      <div class="freeEnquiryBtn">
        <van-button id="addEnquiry" type="primary" size="large" @click="addEnquiry">免 费 询 价</van-button>
      </div>
    </div>
    <van-popup
      v-model="extendShow"
      round
      closeable
      position="bottom"
      :style="{ height: '60%' }"
    >
      <Extent-Select :currentData="currentExtend" :activeData="activeData" @select="selectExtend" />
    </van-popup>
    <!-- <van-popup
      v-model="areaSelectShow"
      position="bottom"
      :style="{ height: '90%' }"
    >
      <Area @closeAreaSelect="closeAreaSelect" @selectCityChange="selectCityChange" />
    </van-popup> -->

  </div>
</template>
<script>
import Header from '@/components/Header/Header'
import ExtentSelect from '@/components/ExtendSelect/index'
import Area from './area'
import Vue from 'vue'
import { Button, ActionSheet, Picker, Popup, Toast, Dialog } from 'vant'
Vue.use(Button).use(ActionSheet).use(Picker).use(Popup).use(Toast).use(Dialog)
import enquiryApi from '@/api/enquiry'
import { eventManager } from '@/utils/global'
import sa from 'sa-sdk-javascript'
export default {
  name: 'addEnquiry',
  components: {
    Header,
    ExtentSelect,
    Area
  },
  data() {
    return {
      pageTitle: this.$route.query.name,
      inputList: [],
      extendShow: false,
      currentExtend: [],
      activeData: '',
      area: '',
      areaCode: '',
      name: '',
      phone: '',
      remark: '',
      show: false,
      areaSelectShow: false,
      readOnlyPhone: false
    }
  },
  created() {
    this.init()
  },
  activated() {
    document.title = this.$route.query.name + '询价'
    sa.quick("autoTrackSinglePage",{
      $title: '询价表单生成页',
      $screen_name: `enquiry_form_generate_page`,
      $utm_source: this.$store.getters.getUtmSource,
      $utm_medium: this.$store.getters.getUtmMedium
    })
    if (localStorage.getItem('first') == '1') {
      localStorage.setItem('first', '0')
      this.init()
    }
    if (localStorage.getItem('goXieyi') == '1') {
      localStorage.setItem('goXieyi', '0')
      if (localStorage.getItem('userPhone') && localStorage.getItem('userPhone') != '') {
        this.$loginBox.showLoginBox(localStorage.getItem('userPhone')).then((val) => {
          this.phone = val
          this.addEnquiry()
        })
      } else {
        this.$loginBox.showLoginBox({autoSend: false}).then((val) => {
          this.addEnquiry()
        })
      }
    }
    // 微信内置浏览器浏览H5页面弹出的键盘遮盖文本框的解决办法
    window.addEventListener('resize', function () {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        window.setTimeout(function () {
          document.activeElement.scrollIntoViewIfNeeded()
        }, 0)
      }
    })
  },
  methods: {
    // 初始化
    init() {
      this.area = ''
      this.areaCode = ''
      this.name = ''
      this.phone = ''
      this.remark = ''
      this.pageTitle = this.$route.query.name
      let userPhone = localStorage.getItem('userPhone')
      if (localStorage.getItem('userPhone') && localStorage.getItem('userPhone') != '') {
        this.readOnlyPhone = true
      } else {
        this.readOnlyPhone = false
      }
      this.phone = userPhone
      let token = localStorage.getItem('token')
      if(token && token != '') {
        this.intentionCheck()
        this.getIntentionExtends()
      } else {
        this.getIntentionExtends()
      }
    },
    intentionCheck() {
      let params = {
        serviceCode: this.$route.query.code
      }
      enquiryApi.intentionCheck(params).then(res => {
        if(res.code == 0){
          if (res.data) {
            this.getIntentionInfo()
          } else {
            window.history.replaceState(null, null, "/home")
            this.$router.push('inquiry')
          }
        }
      }).catch((err) => {
        if (err.data.code == 10000) {
          if (localStorage.getItem('userPhone') && localStorage.getItem('userPhone') != '') {
            this.$loginBox.showLoginBox({userName : localStorage.getItem('userPhone')})
          } else {
            this.$loginBox.showLoginBox()
          }
        }
      })
    },
    // 获取最近一次该服务的表单配置
    getIntentionInfo() {
      let params = {
        serviceCode: this.$route.query.code
      }
      enquiryApi.intentionInfo(params).then(res => {
        if(res.code == 0){
          if(res.data) {
            this.area = res.data.area
            this.areaCode = res.data.areaCode
            this.name = res.data.name
            this.remark = res.data.remark
            let extra = res.data.extra
            let params = {
              serviceCode: this.$route.query.code
            }
            enquiryApi.intentionExtends(params).then(res => {
              if(res.code == 0) {
                if(res.data.length == 0) {
                  this.inputList = []
                } else {
                  this.inputList = res.data
                  for(let i=0;i<this.inputList.length;i++) {
                    this.inputList[i].value = ''
                    this.inputList[i].valueCode = ''
                  }
                }
                if (extra && extra != '') {
                  let arr = JSON.parse(extra)
                  for(let i=0;i<arr.length;i++){
                    for(let j=0; j<this.inputList.length;j++){
                      if(arr[i].propCode == this.inputList[j].code){
                        this.inputList[j].value = arr[i].valueName
                        this.inputList[j].valueCode = arr[i].valueCode
                      }
                    }
                  }
                }
              }
            })
          } else {
            this.getIntentionExtends()
          }
        }
      })
    },
    // 获取表单配置项
    getIntentionExtends() {
      let params = {
        serviceCode: this.$route.query.code
      }
      enquiryApi.intentionExtends(params).then(res => {
        if(res.code == 0){
          if(res.data.length == 0) {
            this.inputList = []
          } else {
            this.inputList = res.data
            for(let i=0;i<this.inputList.length;i++) {
              this.inputList[i].value = ''
              this.inputList[i].valueCode = ''
            }
            console.log(this.inputList)
          }
        }
      })
    },
    clickShowPicker(input) {
      this.extendShow = true
      this.currentExtend = input.valueTrees
      this.activeData = input.value
    },
    selectExtend(selectValue) {
      for(let i=0;i<this.inputList.length;i++){
        if(this.inputList[i].code == selectValue.extendCode) {
          this.inputList[i].value = selectValue.name
          this.inputList[i].valueCode = selectValue.code
          this.$set(this.inputList[i], i, this.inputList)
        }
      }
      this.extendShow = false
    },
    // 跳转到选择地区的页面
    jumpArea() {
      // this.areaSelectShow = true
      eventManager.addEvent('selectArea', (data) => {
        console.log(data)
        this.area = data.area
        this.areaCode = data.code
        eventManager.removeEvent('selectArea')
      })
      this.$router.push('/area')
    },
    // 添加询价单
    addEnquiry() {
      if(!this.area || this.area == '') {
        Toast.fail('需求地区不能为空')
        return
      }
      if(!this.name || this.name == '') {
        Toast.fail('姓名不能为空')
        return
      }
      if(!this.phone || this.phone == '') {
        Toast.fail('联系方式不能为空')
        return
      }
      if(this.phone && this.phone.length != 11) {
        Toast.fail('请输入11位合法手机号')
        return
      }

      let arr = []
      if (this.inputList && this.inputList.length > 0) {
        for(let i=0;i<this.inputList.length;i++) {
          if (this.inputList[i].value && this.inputList[i].value != '') {
            if(this.inputList[i].type == 1) {
              arr.push({
                valueCode: this.inputList[i].value,
                valueName: this.inputList[i].value,
                propCode: this.inputList[i].code,
                propName: this.inputList[i].name,
                type: this.inputList[i].type
              })
            }else if(this.inputList[i].type == 2) {
              arr.push({
                valueCode: this.inputList[i].valueCode,
                valueName: this.inputList[i].value,
                propCode: this.inputList[i].code,
                propName: this.inputList[i].name,
                type: this.inputList[i].type
              })
            }
          }
        }
      }

      localStorage.setItem('formPhone', this.phone)

      let params = {
        area: this.area,
        areaCode: this.areaCode,
        intentionCode: this.$route.query.code,
        name: this.name,
        phone: this.phone,
        remark: this.remark,
        extra: JSON.stringify(arr)
      }
      enquiryApi.intentionCreate(params).then(res => {
        if(res.code == 0) {
          console.log(123)
          console.log(window._agl)
          console.log(window._hmt)
          _hmt.push(['_trackEvent', 'services', 'submit_success', this.$route.query.name , 200.00]);
          window._agl && window._agl.push(['track', ['success', {t: 3}]])
          console.log(456)
          sa.track("WebUserEnquiryClick",{
            code: this.$route.query.code,
            name: this.$route.query.name,
            $utm_source: this.$store.getters.getUtmSource,
            $utm_medium: this.$store.getters.getUtmMedium
          })
          Dialog.alert({
            title: '提交成功',
            message: '财税鱼将为您匹配1-3家商户\n让您货比三家，祝你找到合适的落地服务！',
            confirmButtonText: '我知道了',
            closeOnPopstate: true
          }).then(() => {
            window.history.replaceState(null, null, "/home")
            this.$router.push('/inquiry')
          })
          // window.history.replaceState(null, null, "/home")
          // this.$router.push('/success?name=' + this.$route.query.name)
        }
      }).catch((err) => {
        if (err.data.code == 10000) {
          if (localStorage.getItem('userPhone') && localStorage.getItem('userPhone') != '') {
            this.$loginBox.showLoginBox({userName : localStorage.getItem('userPhone')}).then((val) => {
              this.phone = val
              this.addEnquiry()
            })
          } else {
            this.$loginBox.showLoginBox({userName : this.phone, autoSend: true}).then((val) => {
              this.phone = val
              this.addEnquiry()
            })
          }
        } else if(err.data.code == 10002) {
          Dialog.alert({
            title: '温馨提示',
            message: '当前有询价单正在报价',
            confirmButtonText: '点击查看'
          }).then(() => {
            window.history.replaceState(null, null, "/home")
            this.$router.push('/inquiry')
          })
        }
      })
    },
    closeAreaSelect() {
      this.areaSelectShow = false
    },
    selectCityChange(data) {
      this.area = data.area
      this.areaCode = data.code
      this.areaSelectShow = false
    },
    scrollTop () {
      window.scroll(0, 0);
    }
  }
}
</script>
<style lang="scss" scoped>
.addEnquiry_page {
  // padding-top: 56px;
  .formInfo {
    height: 44px;
    background: #FAFAFA;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: rgba(0,0,0,0.38);
    padding-left: 16px;
    line-height: 44px;
    text-align: left;
  }
  .form {
    text-align: left;
    .formItem {
      height: 48px;
      margin: 0 16px;
      display: flex;
      label {
        display: block;
        width: 104px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0,0,0,0.60);
        text-align: left;
        line-height: 49px;
      }
      .input {
        flex: 1;
        input {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          padding: 14px 0;
          outline: none;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          text-align: left;
          line-height: 20px;
        }
      }
      .selectLogo {
        width: 24px;
        height: 24px;
        margin-top: 12px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .formItem.textarea {
      height: auto;
      min-height: 48px;
      .input {
        textarea {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          min-height: 48px;
          padding: 14px 0;
          outline: none;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          text-align: left;
          line-height: 20px;
          outline:0;
          resize:none;
          overflow-y: visible;
          border: 0;
        }
      }
    }
  }
  .submitBtn {
    margin-top: 32px;
    padding-bottom: 80px;
    p {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: rgba(0,0,0,0.20);
      text-align: center;
    }
    .freeEnquiryBtn {
      margin: 0 32px;
      margin-top: 12px;
      height: 40px;
      border-radius: 2px;
      .van-button--large {
        height: 40px;
        line-height: 40px;
        background-image: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
        border-radius: 2px;
        border: 0;
        .van-button__text {
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #FFFFFF;
          text-align: center;
          line-height: 18px;
        }
      }
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
</style>
