// import { brigeNativeByJavascript, callBackNative } from './bridge'
import { brigeNativeByJavascript } from './bridge'

/**
 * 1.加载框
 * @function loading
 * @param loading boolean
 */
export function nativeLoading (params) {
  brigeNativeByJavascript('loading', params)
}

/**
 * 2.分享到微信朋友圈或者微信好友
 * @function share
 * @param title String
 * @param url String
 * @param img String
 * @param desc String
 */
export function nativeShare (params) {
  brigeNativeByJavascript('share', params)
}

/**
 * 3.保存H5的图片到相册(自定义路径)
 * @function savePicToDevice
 * @param imgPath string 不能为空
 */
export function nativeSavePicToDevice (params) {
  brigeNativeByJavascript('savePicToDevice', params)
}

/**
 * 4.打开图库或者拍照
 * @function photo
 * @param type 选择的图片所属媒体 String
 * @param count 表示要选几张图片 不能为0 int
 */
export function nativePhoto (params) {
  brigeNativeByJavascript('photo', params)
}

/**
 * 5.打电话
 * @function callPhone
 * @param phoneNumber String
 */
export function nativeCallPhone (params) {
  brigeNativeByJavascript('callPhone', params)
}

/**
 * 6.获取用户信息
 * @function getUserInfo
 * @return
 */
export function nativeGetUserInfo () {
  return brigeNativeByJavascript('getUserInfo')
}

/**
 * 7.获取位置信息
 * @function getLocationInfo
 * @return
 */
export function nativeGetLocationInfo () {
  return brigeNativeByJavascript('getLocationInfo')
}

/**
 * 8.隐藏标题栏
 * @function hideTitleBar
 * @param hide true 隐藏 false 显示 boolean
 */
export function nativeHideTitleBar (params) {
  brigeNativeByJavascript('hideTitleBar', params)
}

/**
 * 9.关闭界面
 * @function close
 */
export function nativeClose () {
  brigeNativeByJavascript('close')
}
