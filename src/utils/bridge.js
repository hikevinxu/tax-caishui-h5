function setupWebViewJavascriptBridge (callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge)
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  // 创建一个 WVJBCallbacks 全局属性数组，并将 callback 插入到数组中。
  window.WVJBCallbacks = [callback]
  // 创建一个 iframe 元素
  var WVJBIframe = document.createElement('iframe')
  // 不显示
  WVJBIframe.style.display = 'none'
  // 设置 iframe 的 src 属性
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
  // 把 iframe 添加到当前文导航上。
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

//  重新封装的方法
export const brigeNativeByJavascript = (funcName, data, callbackName, callbackNameStr) => {
  if (window.native) {
    let dataJson = data ? JSON.stringify(data) : '{}'
    if (callbackName) {
      window.native[funcName](dataJson, callbackNameStr)
    } else {
      if (data) {
        if (window.native[funcName](dataJson)) {
          return window.native[funcName](dataJson)
        } else {
          window.native[funcName](dataJson)
        }
      } else {
        console.log(funcName)
        if (window.native[funcName]()) {
          return window.native[funcName]()
        } else {
          window.native[funcName]()
        }
      }
    }
  } else {
    if (window.webkit) { // 兼容1.0
      console.log('有webkit')
      window.webkit.messageHandlers[funcName].postMessage({
        callbackName: callbackNameStr,
        data: data
      })
    } else {
      console.log('没有webkit', funcName, data)
      setupWebViewJavascriptBridge(brige => {
        brige.callHandler(funcName, data, callbackName)
      })
    }
  }
}

// 有callback的调用原生方法
export const callBackNative = (funcName, args) => {
  return new Promise((resolve, reject) => {
    const date = new Date().getTime()
    window['nativeFuncName' + date] = data => {
      resolve(data)
    }
    brigeNativeByJavascript(funcName, args, window['nativeFuncName' + date], 'nativeFuncName' + date)
  })
}
