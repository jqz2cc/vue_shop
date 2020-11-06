module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = process.env.NODE_ENV === 'production'?'電商管理後台':"開發測試"
      return args
    })
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main.js')
      // config.set('externals', {
      //   // vue: 'vue',
      //   // 'vue-router': 'VueRouter',
      //   // axios: 'axios',
      //   // nprogress: 'nprogress'
      // })
    })
    // 開發模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
    })
  }
}