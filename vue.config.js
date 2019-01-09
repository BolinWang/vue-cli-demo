const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: 3900
  },
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
