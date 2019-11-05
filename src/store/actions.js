let actions = {
  increment (context) {
    context.commit('increment')
  },
  update_title (context, title) {
    return new Promise((resolve) => {
      console.log('actions 接收title start')
      console.log(title)
      console.log('actions 接收title end')
      context.commit('update_title', title)
      resolve()
    })
  },
  update_preUrl (context, preUrl) {
    return new Promise((resolve) => {
      console.log('actions 接收title start')
      console.log(preUrl)
      console.log('actions 接收title end')
      context.commit('update_preUrl', preUrl)
      resolve()
    })
  },
  save_token (context, token) {
    return new Promise((resolve) => {
      context.commit('update_token', token)
      resolve()
    })
  },
  save_jumpUrl (context, jumpUrl) {
    return new Promise((resolve) => {
      context.commit('update_jumpUrl', jumpUrl)
      resolve()
    })
  },
  save_payInfo (context, payInfo) {
    return new Promise((resolve) => {
      context.commit('update_payInfo', payInfo)
      resolve()
    })
  }
}

export default actions
