<template>
  <div class="mine_page">
    <div class="avatar">
      <div v-if="avatar != '' && (token && token !='')">
         <img :src="avatar" alt="">
      </div>
      <div v-else-if="avatar == '' && (token && token != '')">
        <img src="../../assets/global/img_default_avatar.png" alt="">
      </div>
      <div v-else  @click.stop="login">
        <img src="../../assets/global/img_default_avatar.png" alt="">
      </div>
    </div>
    <div v-if="token == ''" class="pleaseLogin" @click.stop="login">
      <i>请登录</i>
      <span>
        <img src="@/assets/global/mine-right.png" alt="">
      </span>
    </div>
    <div v-if="token && token != ''" class="logout" @click="logout">
      <img src="@/assets/global/mine_ic_logout.png" alt="">
    </div>
    <div class="name">{{name}}</div>
    <div class="menuList">
      <div class="menuItem" @click="jumpXieyi">
        <span class="menuLogo">
          <img src="@/assets/global/mine_ic_message.png" alt="">
        </span>
        <span class="menuTitle">服务协议</span>
        <!-- <span class="noticeNum">2</span> -->
        <span class="rightLogo">
          <img src="@/assets/global/ic_chevron_right_small.png" alt="">
        </span>
      </div>
      <div class="menuItem" @click="aboutUs">
        <span class="menuLogo">
          <img src="@/assets/global/mine_ic_about.png" alt="">
        </span>
        <span class="menuTitle">关于我们</span>
        <span class="rightLogo">
          <img src="@/assets/global/ic_chevron_right_small.png" alt="">
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import globalApi from '@/api/globalApi'
import sa from 'sa-sdk-javascript'
import Vue from 'vue'
import { Dialog } from 'vant'

Vue.use(Dialog)
export default {
  data() {
    return {
      avatar: '',
      name: '',
      token: ''
    }
  },
  created() {
    sa.quick("autoTrackSinglePage",{
      $title: '我的',
      $screen_name: `my_page`,
      $utm_source: this.$store.getters.getUtmSource,
      $utm_medium: this.$store.getters.getUtmMedium
    })
    this.token = localStorage.getItem('token') || ''
    let token = localStorage.getItem('token') || ''
    if (token && token != '') {
      this.init()
    } else {
      this.finished = true
      this.loadingData = true
    }
    if (localStorage.getItem('goXieyi') == '1') {
      localStorage.setItem('goXieyi', '0')
      if (localStorage.getItem('userPhone') && localStorage.getItem('userPhone') != '') {
        this.$loginBox.showLoginBox(localStorage.getItem('userPhone'))
      } else {
        this.$loginBox.showLoginBox({autoSend: false})
      }
    }
  },
  methods: {
    init() {
      globalApi.userHomepageInfo().then(res => {
        if(res.code == 0){
          this.avatar = res.data.avatar
          this.name = res.data.name
        }
      }).catch((err) => {
        if (err.data.code == 10000) {
          if (localStorage.getItem('userPhone') && localStorage.getItem('userPhone') != '') {
            this.$loginBox.showLoginBox(localStorage.getItem('userPhone'))
          } else {
            this.$loginBox.showLoginBox()
          }
        }
      })
    },
    // 跳转到服务协议
    jumpXieyi() {
      this.$router.push('/powerOfAttoney?id=1')
    },
    logout() {
      Dialog.confirm({
        message: '是否注销登录？'
      }).then(() => {
        globalApi.authLogout().then((res) => {
          if(res.code == 0){
            this.$store.dispatch('save_user_phone', '')
            this.$store.dispatch('save_token', '')
            this.$router.push('home')
          }
        })
      }).catch(() => {
        
      })
    },
    login() {
      this.$loginBox.showLoginBox()
    },
    aboutUs() {
      this.$router.push('aboutUs')
    }
  }
}
</script>
<style lang="scss" scoped>
.mine_page {
  padding: 0 24px;
  position: relative;
  .avatar {
    margin-top: 24px;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    img {
      border-radius: 50%;
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .pleaseLogin {
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: rgba(0,0,0,0.87);
    letter-spacing: 0;
    position: absolute;
    top: 22px;
    left: 104px;
    i {
      float: left;
    }
    span {
      display: block;
      float: left;
      width: 22px;
      height: 22px;
      position: relative;
      top: -2px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .logout {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 0;
    right: 24px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .name {
    margin-top: 16px;
    padding-bottom: 23px;
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: rgba(0,0,0,0.87);
    line-height: 30px;
    text-align: left;
    border-bottom: 1px solid rgba(0,0,0,0.04);
  }
  .menuList {
    text-align: left;
    margin-top: 8px;
    .menuItem {
      display: flex;
      height: 56px;
      .menuLogo {
        margin-top: 16px;
        width: 24px;
        height: 24px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .menuTitle {
        margin-left: 16px;
        flex: 1;
        line-height: 56px;
      }
      .noticeNum {
        margin-right: 8px;
        margin-top: 20px;
        width: 16px;
        height: 16px;
        background-color: #FF7F4A;
        font-family: PingFangSC-Regular;
        font-size: 11px;
        color: #fff;
        text-align: center;
        line-height: 16px;
        border-radius: 50%;
      }
      .rightLogo {
        margin-top: 20px;
        width: 16px;
        height: 16px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
