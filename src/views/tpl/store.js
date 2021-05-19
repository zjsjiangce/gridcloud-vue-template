import * as stores from './views/children/*/store.js'

export default (http) => {
  const modules = {}
  Object.keys(stores).forEach(k => { modules[k] = stores[k](http) })
  return {
    namespaced: true,
    modules,
  }
}
