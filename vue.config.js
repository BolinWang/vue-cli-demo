const path = require('path')
const resolve = dir => {
  return path.join(__dirname,dir)
}

module.exports = {
  runtimeCompiler: true,
  configureWebpack: config => {
    config.resolve = {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src')
      }
    }
  }
}