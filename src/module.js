import pkg from '../package.json'
import { initModule } from './app'

window[`load_${pkg.name}`] = ($el, state = {}, emitter, baseRouter) => {
  return initModule(state, emitter, baseRouter).$mount($el)
}
