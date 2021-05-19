/*
 * @作者: wrr (wangruirui@hztianque.com)
 * @描述:
 * @Date: 2021-04-27 10:48:21
 */
module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset', {
      useBuiltIns: 'usage',
    }],
  ],
  plugins: [
    'import-glob',
    '@babel/plugin-syntax-dynamic-import',
  ],
}
