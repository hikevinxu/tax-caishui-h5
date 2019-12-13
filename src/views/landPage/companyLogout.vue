<template>
  <div class="companyRegister_page" id="companyRegister_page">
    <div class="header_img">
      <img src="@/assets/landPage/logout_head.png" alt="">
    </div>
    <div style="padding-top: 10px;" id="form"></div>
    <div class="form">
      <div class="form_title">算一算公司注销报价</div>
      <div v-for="(input, index) in inputList" :key="index">
        <div class="formSelectItem" v-if="input.type == 2">
          <label>{{input.name}}</label>
          <div class="selectList">
            <div class="selectList_item" v-for="(value, valueIndex) in input.valueTrees" :key="'value' + valueIndex" @click="changeRadio(index, value)">
              <div class="selectLogoImg">
                <img v-if="input.valueCode == value.code" src="@/assets/landPage/ic_radio_on_g.png" alt="">
                <img v-else src="@/assets/landPage/ic_radio_off.png" alt="">
              </div>
              <div class="selectText">{{value.name}}</div>
            </div>
          </div>
        </div>
        <div class="formItem" v-if="input.type == 1">
          <label>{{input.name}}</label>
          <input v-model="input.value" @input="inputValueChange" type="text" :placeholder="'请输入' + input.name">
        </div>
      </div>
      <div class="formItem formSelectItem">
        <label>需求地区</label>
        <div class="selectList">
          <div class="selectList_item"  @click="changeArea(1)">
            <div class="selectLogoImg">
              <img v-if="selectCityType == 1" src="@/assets/landPage/ic_radio_on_g.png" alt="">
              <img v-else src="@/assets/landPage/ic_radio_off.png" alt="">
            </div>
            <div class="selectText">上海市</div>
          </div>
          <div class="selectList_item" @click="changeArea(2)">
            <div class="selectLogoImg">
              <img v-if="selectCityType == 2" src="@/assets/landPage/ic_radio_on_g.png" alt="">
              <img v-else src="@/assets/landPage/ic_radio_off.png" alt="">
            </div>
            <div class="selectText">其他城市</div>
          </div>
        </div>
        <input readonly type="text" @click="selectDemandArea()" v-model="area" :placeholder="selectCityType == 1 ? '请选择行政区' : '请选择其他城市'">
        <div class="selectLogo">
          <img src="@/assets/landPage/ic_chevron_right.png" alt="">
        </div>
      </div>
      <div class="formItem">
        <label>姓名</label>
        <input maxlength="10" v-model="name" type="text" placeholder="请输入姓名">
      </div>
      <div class="formItem">
        <label>电话</label>
        <input maxlength="11" v-model="phone" type="tel" placeholder="请输入电话">
      </div>
      <div class="submitBtn">
        <van-button id="submitForm" type="primary" size="large" @click="submitForm">免费获取报价</van-button>
      </div>
    </div>
    <div class="intro_img">
      <img src="@/assets/landPage/body_01.png" alt="">
      <img src="@/assets/landPage/body_02.png" alt="">
      <a href="#form" class="jumpBtn">
        <img src="@/assets/landPage/button_mid_01.png" alt="">
      </a>
      <img src="@/assets/landPage/body_03.png" alt="">
      <a href="#form" class="jumpBtn">
        <img src="@/assets/landPage/button_mid_02.png" alt="">
      </a>
      <img src="@/assets/landPage/body_04.png" alt="">
      <img src="@/assets/landPage/body_about.png" alt="">
    </div>
    <!-- <div class="notice">
      <img src="@/assets/landPage/ic_notice.png" alt="">
      <span>目前已经有<i>1127人</i>参与活动</span>
    </div> -->
    <div class="form">
      <div class="form_title">算一算公司注销报价</div>
      <div v-for="(input, index) in inputList" :key="index">
        <div class="formSelectItem" v-if="input.type == 2">
          <label>{{input.name}}</label>
          <div class="selectList">
            <div class="selectList_item" v-for="(value, valueIndex) in input.valueTrees" :key="'value' + valueIndex" @click="changeRadio(index, value)">
              <div class="selectLogoImg">
                <img v-if="input.valueCode == value.code" src="@/assets/landPage/ic_radio_on_g.png" alt="">
                <img v-else src="@/assets/landPage/ic_radio_off.png" alt="">
              </div>
              <div class="selectText">{{value.name}}</div>
            </div>
          </div>
        </div>
        <div class="formItem" v-if="input.type == 1">
          <label>{{input.name}}</label>
          <input v-model="input.value" @input="inputValueChange" type="text" :placeholder="'请输入' + input.name">
        </div>
      </div>
      <div class="formItem formSelectItem">
        <label>需求地区</label>
        <div class="selectList">
          <div class="selectList_item"  @click="changeArea(1)">
            <div class="selectLogoImg">
              <img v-if="selectCityType == 1" src="@/assets/landPage/ic_radio_on_g.png" alt="">
              <img v-else src="@/assets/landPage/ic_radio_off.png" alt="">
            </div>
            <div class="selectText">上海市</div>
          </div>
          <div class="selectList_item" @click="changeArea(2)">
            <div class="selectLogoImg">
              <img v-if="selectCityType == 2" src="@/assets/landPage/ic_radio_on_g.png" alt="">
              <img v-else src="@/assets/landPage/ic_radio_off.png" alt="">
            </div>
            <div class="selectText">其他城市</div>
          </div>
        </div>
        <input readonly type="text" @click="selectDemandArea()" v-model="area" :placeholder="selectCityType == 1 ? '请选择行政区' : '请选择其他城市'">
        <div class="selectLogo">
          <img src="@/assets/landPage/ic_chevron_right.png" alt="">
        </div>
      </div>
      <div class="formItem">
        <label>姓名</label>
        <input maxlength="10" v-model="name" type="text" placeholder="请输入姓名">
      </div>
      <div class="formItem">
        <label>电话</label>
        <input maxlength="11" v-model="phone" type="tel" placeholder="请输入电话">
      </div>
      <div class="submitBtn">
        <van-button id="submitForm" type="primary" size="large" @click="submitForm">免费获取报价</van-button>
      </div>
    </div>
    <!-- <div class="counselPhone">
      咨询电话：400-168-0458
    </div> -->
    <!-- <a href="#form" class="fixed_bth">
      <img src="@/assets/landPage/ic_fill_flow.png" alt="">
    </a> -->
    <div v-if="showBottomBtn">
      <div class="bottom_btn" v-if="showConsult">
        <a href="tel:4001680458" @click="contact" :style="isBottom ? 'width: 100%;' : ''" class="bottom_left">
          <img src="@/assets/landPage/ic_button_call.png" alt="">
          <span>立即咨询</span>
        </a>
        <a href="#form" :style="isBottom ? 'display: none;' : ''" class="bottom_right">
          <img src="@/assets/landPage/ic_button_freeapply.png" alt="">
          <span>免费获取报价</span>
        </a>
      </div>
      <div class="bottom_btn" v-else>
        <a href="#form" :style="isBottom ? 'display: none;' : ''" class="bottom_right">
          <img src="@/assets/landPage/ic_button_freeapply.png" alt="">
          <span>免费获取报价</span>
        </a>
      </div>
    </div>
    <van-popup
      v-model="areaShow"
      round
      closeable
      position="bottom"
      :style="{ height: '80%' }"
    >
      <Area-Select :areaSelectData="areaSelectData" @areaSelect="selectCityChange" />
    </van-popup>
  </div>
</template>
<script>

import enquiryApi from '@/api/enquiry'
import globalApi from '@/api/globalApi'
import Vue from 'vue'
import { Button, Toast, Popup, Dialog } from 'vant'
Vue.use(Button).use(Toast).use(Popup).use(Dialog)
import AreaSelect from '@/components/AreaSelect/index'
import { eventManager } from '@/utils/global'
import sa from 'sa-sdk-javascript'

export default {
  name: 'companyRegister',
  components: {
    AreaSelect
  },
  data() {
    return {
      serviceCode: '101004',
      serviceName: '公司注销',
      inputList: [],
      name: '',
      phone: '',
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
      showBottomBtn: true,
      showConsult: false
    }
  },
  created() {
    this.getIntentionExtends()
  },
  activated() {
    document.title = this.serviceName  + '询价'
    let h = document.body.scrollHeight
    sa.quick("autoTrackSinglePage",{
      $title: this.serviceName + '落地页',
      $screen_name: `company_logout_page`,
      $utm_source: this.$store.getters.getUtmSource,
      $utm_medium: this.$store.getters.getUtmMedium
    })
    if (localStorage.getItem('first') == '1') {
      localStorage.setItem('first', '0')
      this.getIntentionExtends()
    }
    if (localStorage.getItem('goXieyi') == '1') {
      localStorage.setItem('goXieyi', '0')
      if (localStorage.getItem('userPhone') && localStorage.getItem('userPhone') != '') {
        this.$loginBox.showLoginBox(localStorage.getItem('userPhone')).then((val) => {
          this.phone = val
          this.submitForm()
        })
      } else {
        this.$loginBox.showLoginBox({autoSend: false}).then((val) => {
          this.submitForm()
        })
      }
    }
    // 微信内置浏览器浏览H5页面弹出的键盘遮盖文本框的解决办法
    window.addEventListener('resize', (e) => {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        window.setTimeout( () => {
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
    } else {
      this.showConsult = false
    }
  },
  methods: {
    changeRadio(index, selectValue) {
      for(let i=0;i<this.inputList.length;i++){
        if(this.inputList[i].code == selectValue.extendCode) {
          this.inputList[i].value = selectValue.name
          this.inputList[i].valueCode = selectValue.code
          this.$set(this.inputList[i], i, this.inputList)
          this.$forceUpdate()
        }
      }
    },
    inputValueChange() {
      this.$forceUpdate()
    },
    // 获取表单配置项
    getIntentionExtends() {
      let params = {
        serviceCode: this.serviceCode
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
          }
        }
      })
    },
    changeArea(val){
      if(this.selectCityType != val) {
        this.area = ''
        this.areaCode = ''
        this.selectCityType = val
      }
    },
    // 选择需求区域
    selectDemandArea() {
      if(this.selectCityType == 1){
        this.getCurrentArea()
      }else if(this.selectCityType == 2) {
        eventManager.addEvent('selectArea', (data) => {
          console.log(data)
          this.area = data.area
          this.areaCode = data.code
          eventManager.removeEvent('selectArea')
        })
        this.$router.push('/area')
      }
    },
    selectCityChange(val) {
      this.area = val.provinceName + '-' + val.cityName + '-' + val.name
      this.areaCode = val.code
      this.areaShow = false
    },
    // 根据省市code获取区域
    getCurrentArea() {
      let params = {
        provinceCode: this.areaSelectData.provinceCode,
        cityCode: this.areaSelectData.cityCode
      }
      globalApi.addressAreas(params).then(res => {
        if(res.code == 0){
          this.areaSelectData.childs = res.data
          this.areaShow = true
        }
      })
    },
    scrollBottom(e) {
      clearTimeout(this.timer)  // 节流
      this.timer = setTimeout(()=>{
        let {scrollTop,clientHeight,scrollHeight} = e.target
        if(scrollTop + clientHeight + 40 > scrollHeight){
          this.isBottom = true
          console.log(this.isBottom)
        } else {
          this.isBottom = false
          console.log(this.isBottom)
        }
      }, 60)
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
    // 提交表单 添加询价单
    submitForm() {
      console.log(this.inputList)
      let arr = []
      if (this.inputList && this.inputList.length > 0) {
        for(let i=0;i<this.inputList.length;i++) {
          // if (this.inputList[i].value && this.inputList[i].value != '') {
            if(this.inputList[i].type == 1) {
              if(this.inputList[i].value == '') {
                Toast.fail('请输入' + this.inputList[i].name)
                return
              } else {
                arr.push({
                  valueCode: this.inputList[i].value,
                  valueName: this.inputList[i].value,
                  propCode: this.inputList[i].code,
                  propName: this.inputList[i].name,
                  type: this.inputList[i].type
                })
              }
            }else if(this.inputList[i].type == 2) {
              if(this.inputList[i].valueCode == ''){
                Toast.fail('请选择' + this.inputList[i].name)
                return
              } else {
                arr.push({
                  valueCode: this.inputList[i].valueCode,
                  valueName: this.inputList[i].value,
                  propCode: this.inputList[i].code,
                  propName: this.inputList[i].name,
                  type: this.inputList[i].type
                })
              }
            }
          // }
        }
      }

      if(!this.area || this.area == '') {
        Toast.fail('需求地区不能为空')
        return
      }
      if(!this.name || this.name == '') {
        Toast.fail('姓名不能为空')
        return
      }
      if(!this.phone || this.phone == '') {
        Toast.fail('电话不能为空')
        return
      }
      if(this.phone && this.phone.length != 11) {
        Toast.fail('请输入11位合法手机号')
        return
      }

      localStorage.setItem('formPhone', this.phone)

      let params = {
        area: this.area,
        areaCode: this.areaCode,
        intentionCode: this.serviceCode,
        name: this.name,
        phone: this.phone,
        extra: JSON.stringify(arr)
      }

      enquiryApi.intentionCreate(params).then(res => {
        if(res.code == 0) {
          console.log(window._agl)
          console.log(window._hmt)
          _hmt.push(['_trackEvent', 'services', 'submit_success', this.serviceName, 200.00]);
          window._agl && window._agl.push(['track', ['success', {t: 3}]])
          sa.track("WebUserEnquiryClick",{
            code: this.serviceCode,
            name: this.serviceName,
            page: this.serviceName + '落地页',
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
              this.submitForm()
            })
          } else {
            this.$loginBox.showLoginBox({userName : this.phone, autoSend: true}).then((val) => {
              this.phone = val
              this.submitForm()
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
    }
  }
}
</script>
<style lang="scss" scoped>
.companyRegister_page {
  background-color: #fff;
  margin-bottom: 88px;
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
        color: #3F8C7F;
      }
    }
  }
  .form {
    margin: 16px 16px;
    // height: 632px;
    border: 1px solid rgba(0,0,0,0.04);
    border-radius: 4px;
    border-radius: 4px;
    padding: 16px;
    .form_title {
      width: 100%;
      height: 18px;
      background: #FAFAFA;
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #3F8C7F;
      text-align: center;
      line-height: 22px;
      margin-bottom: 16px;
    }
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
          border-bottom: 1px solid #3F8C7F;
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
        background-image: linear-gradient(135deg, #5AB3A4 0%, #007C61 100%);
        box-shadow: 0 4px 8px 0 rgba(19,112,98,0.24);
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
    .jumpBtn {
      display: block;
      margin: 8px 72px;
    }
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
      height: 64px;
      img {
        width: 24px;
        height: 24px;
        margin-top: 20px;
        vertical-align: top;
      }
      span {
        margin-left: 4px;
        line-height: 64px;
        font-family: PingFangSC-Medium;
        font-size: 15px;
        color: #FFFFFF;
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
