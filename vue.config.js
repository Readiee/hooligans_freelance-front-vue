const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081
  },
  css: {
    loaderOptions: {
      less: {
        additionalData: '@import "@/assets/css/variables.less";'
      }
    }
  }
})
