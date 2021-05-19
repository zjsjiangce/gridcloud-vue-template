/*
 * @作者: wrr (wangruirui@hztianque.com)
 * @描述:
 * @Date: 2021-04-27 10:51:29
 */
/* eslint-disable indent */
const path = require('path')

module.exports = {
  pluginOptions: {
    PROJ_TYPE: 'module', // 项目类型
    EXTERNAL_OPTIONS: {},
  },
  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true,
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve(__dirname, './src/'))
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.100.242:5080/',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
}
