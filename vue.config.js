var path = require('path')
var ZipPlugin = require('zip-webpack-plugin')

// vue.config.js
module.exports = {
  configureWebpack: config => {
    if(process.env.NODE_ENV === 'production') {
        config.plugins.push(
            new ZipPlugin({
              path: path.resolve(__dirname,config.output.path,process.env.VUE_APP_DEPLOY === 'sit' ? '../deploy/sit' : '../deploy/prod'),
              filename: 'dist.zip'
            })
        )
        //console.log(config)
    } else {
        // 未开发环境修改配置
    }
},
  chainWebpack: config => {
      // 移除 prefetch 插件
      config.plugins.delete('prefetch')
      // 或者
      // 修改它的选项：
      // config.plugin('prefetch').tap(options => {
      //   options[0].fileBlacklist = options[0].fileBlacklist || []
      //   options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
      //   return options
      // })
  },
  outputDir: './dist',
  devServer: { 
    disableHostCheck: true,
    // host: '0.0.0.0',
    port: 8090
  },
  // eslint 如果要用的话 请在项目一开始就使用它，不要在项目进行一半的时候使用，那样会对你造成很大的困扰
  lintOnSave: false
}