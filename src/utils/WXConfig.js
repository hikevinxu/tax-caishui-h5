import api from '@/api/api'
import qs from 'qs'
import { Terminal, getQueryString } from '@/utils/global'

export function WeChaAtuthorization (callback) {
  if (Terminal.platform.weixin) {
    if (getQueryString('from') == 'login' || getQueryString('load')) {
      callback()
    } else {
      let params = {
        authorizeCallback: '/authorizationPage'
      }
      let paramsString = qs.stringify(params)
      api.weixinAuthorizeUrl(paramsString).then(res => {
        if( res.code === 0) {
          window.location.href = res.data
          callback()
        }
      })
    }
  } else {
    callback()
  }
}

export function getWeiXinConfig() {
  let data = {
    url: window.location.href
  }
  let dataString = qs.stringify(data)
  api.weixinJsapiConfig(dataString).then(res => {
    if (res.code === 0) {
      console.log(res)
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.data.appId, // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature,// 必填，签名
        jsApiList: [
          'chooseWXPay'
        ] // 必填，需要使用的JS接口列表
      })
    }
  })
}