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
}