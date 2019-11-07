import { fetchPost, fetchGet } from './axios'

export default {
  /**
   * 获取询价单列表-有效
   * @function intentionListNow
   * @type 'Get'
   */
  intentionListNow (params) {
    return fetchGet('/intention/list/now', params)
  },
  /**
   * 获取询价单列表-历史记录
   * @function intentionListHistory
   * @type 'Get'
   */
  intentionListHistory (params) {
    return fetchGet('/intention/list/history', params)
  },
  /**
   * 生成询价单
   * @function intentionCreate
   * @type 'post'
   */
  intentionCreate (params) {
    return fetchPost('/intention/create', params)
  }, 
  /**
   * 获取询价单表单配置项
   * @function intentionExtends
   * @type 'Get'
   */
  intentionExtends (params) {
    return fetchGet('/intention/extends', params)
  },
  /**
   * 获取最近一次询价单数据
   * @function intentionInfo
   * @type 'Get'
   */
  intentionInfo (params) {
    return fetchGet('/intention/info', params)
  },
  /**
   * 检测需求是否过期
   * @function intentionCheck
   * @type 'Get'
   */
  intentionCheck (params) {
    return fetchGet('/intention/service_intention/check', params)
  }
}