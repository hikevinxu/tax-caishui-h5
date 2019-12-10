import { fetchPost, fetchGet } from './axios'
import qs from "qs"

export default {
  /**
   * 服务分类列表
   * @function serviceTypeTrees
   * @type 'Get'
   */
  serviceTypeTrees (params) {
    return fetchGet('/serviceType/trees', params)
  },
  /**
   * 根据广告位置编号和城市获取广告
   * @function advertPositionList
   * @type 'Get'
   */
  bannerPositionList (params) {
    return fetchGet('/banner/position/list', params)
  },
  /**
   * 发送登录验证码
   * @function sendLoginVerifycode
   * @type 'post'
   */
  sendLoginVerifycode (params) {
    return fetchPost('/auth/verifycode/login/send_verifycode', params)
  },
  
  /**
   * 发送登录验证码
   * @function loginVerifycode
   * @type 'post'
   */
  loginVerifycode (params) {
    return fetchPost('/auth/verifycode/login', params)
  },
   /**
   * 个人主页信息
   * @function authLogout
   * @type 'Get'
   */
  authLogout (params) {
    return fetchGet('/auth/logout', params)
  },
  /**
   * 个人主页信息
   * @function userHomepageInfo
   * @type 'Get'
   */
  userHomepageInfo (params) {
    return fetchGet('/user_data/homepage_info', params)
  },
  /**
   * 获取热门城市列表
   * @function addressHotCitys
   * @type 'Get'
   */
  addressHotCitys (params) {
    return fetchGet('/address/hot_citys', params)
  }, 
  /**
   * 获取所有地址列表
   * @function addressTrees
   * @type 'Get'
   */
  addressTrees (params) {
    return fetchGet('/address/trees', params)
  },
  /**
   * 获取海外地区列表
   * @function addressOverseasTree
   * @type 'Get'
   */
  addressOverseasTree (params) {
    return fetchGet('/address/overseasTree', params)
  }, 
  /**
   * 获取区县列表
   * @function addressAreas
   * @type 'Get'
   */
  addressAreas(params) {
    return fetchGet('/address/areas', params)
  }, 
}
