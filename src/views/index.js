import * as modules from './*/index.js'

export default (Vue, store, router, http) => {

  const array = []
  Object.keys(modules).forEach(key => {
    Vue.use(modules[key], store, router, http)
    array.push({
      name: key,
      type: 'Module',
    })
  })

  console.group(`系统模块`)
  console.table(array)
  console.groupEnd(`系统模块`)
}
