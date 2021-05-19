import Vue from 'vue'
import Router from 'vue-router'

import pkg from '../../package.json'

Vue.use(Router)

export default (parentBase = '') => new Router({
  mode: 'history',
  base: parentBase ? `${parentBase}/${pkg.name}` : '/',
  routes: [{
    path: '/',
    redirect: '/tpl',
  }],
})
