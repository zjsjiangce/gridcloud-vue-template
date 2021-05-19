import * as components from './*/index.vue'
import { formatComponentName } from '../utils'
export default {
  install: function (Vue) { // eslint-disable-line
    const array = Object.keys(components).map(key => {
      const c = components[key]
      Vue.component(formatComponentName(c.name), c)
      return {
        name: formatComponentName(c.name),
        type: 'Component',
      }
    })
    console.group(`全局组件`)
    console.table(array)
    console.groupEnd(`全局组件`)
  },
}
