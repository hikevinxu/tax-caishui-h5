import Vue from 'vue'
import LoginDialog from './index.vue'

const LoginBox = {}
LoginBox.install = function(vue, options) {
  const LoginBoxInstance = Vue.extend(LoginDialog)
  let currentBox
  const initInstance = () => {
    currentBox = new LoginBoxInstance()
    let loginBoxEl = currentBox.$mount().$el
    document.body.appendChild(loginBoxEl)
  }
  Vue.prototype.$loginBox = {
    showLoginBox (options) {
      if(!currentBox) {
        initInstance()
      }
      if(typeof options === 'string') {
        currentBox.content = options
      }else if(typeof options === 'object') {
        Object.assign(currentBox, options)
      }
      return currentBox.showLoginBox().then(val => {
        currentBox = null
        return Promise.resolve(val)
      })
      .catch(err => {
        currentBox = null
        return Promise.reject(err)
      })
    }
  }
}

export default LoginBox