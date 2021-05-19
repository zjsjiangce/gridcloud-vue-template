import * as directives from './*/index.js'

export default {
  install: function (Vue) { // eslint-disable-line
    const array = Object.keys(directives).map(key => {
      const d = directives[key]
      Vue.use(d)
      return {
        name: key,
        type: 'Directive',
      }
    })
    console.group(`全局指令`)
    console.table(array)
    console.groupEnd(`全局指令`)
  },
}
