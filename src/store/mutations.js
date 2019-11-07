let mutations = {
  increment (state) {
    // mutate state
    state.count++
  },
  update_title (state, title) {
    state.title = title
  },
  update_preUrl(state, preUrl) {
    state.preUrl = preUrl
  },
  update_token(state, token) {
    state.token = token
    console.log(token)
    localStorage.setItem('token', token)
  },
  update_user_phone(state, userPhone) {
    state.userPhone = userPhone
    console.log(userPhone)
    localStorage.setItem('userPhone', userPhone)
  },
  update_jumpUrl(state, jumpUrl) {
    state.jumpUrl = jumpUrl
    localStorage.setItem('jumpUrl', jumpUrl)
  },
  update_payInfo(state, payInfo) {
    state.payInfo = payInfo
    localStorage.setItem('payInfo', payInfo)
  }
}

export default mutations
