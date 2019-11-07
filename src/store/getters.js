let getters = {
  doneTodos: state => {
    return state.todos.filter(todo => todo.done)
  },
  getCount: state => {
    return state.count
  },
  getPreUrl: state => {
    return state.preUrl
  },
  getToken: state => {
    let token = localStorage.getItem('token')
    return token
  },
  getUserPhone: state => {
    let userPhone = localStorage.getItem('userPhone')
    return userPhone
  },
  getJumpUrl: state => {
    let jumpUrl = localStorage.getItem('jumpUrl')
    return jumpUrl
  },
  getPayInfo: state => {
    let payInfo = localStorage.getItem('payInfo')
    return payInfo
  }
}

export default getters
