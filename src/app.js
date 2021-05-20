/*
 * @作者: wrr (wangruirui@hztianque.com)
 * @描述:
 * @Date: 2021-04-27 10:51:29
 */
import Vue from 'vue'
// 第三方组件
import { sync } from 'vuex-router-sync'
import iview from 'view-design'
import 'view-design/dist/styles/iview.css'

// 文件目录
import views from  './views' // 视图
import components from './components' // 全局组件注册入口
import directives from './directives' // 全局指令注册入口
import utils from './utils' // 全局工具注册入口
// http 框架
import Http, { http } from './lib/http'
// 路由
import Router from './router'
// 状态管理框架
import store from './store'
// reset css
import 'normalize.css'
import './assets/css/init.css'
// 入口组件
import App from './components/App/index.vue'
// pkg.json
import pkg from '../package.json'

Vue.use(iview)
Vue.use(components)
Vue.use(directives)
Vue.use(utils)
Vue.use(Http)

const app = (base = '') => {
  const router = Router(base)
  sync(store, router)
  Vue.use(views, store, router, http)

  const app = new Vue({
    router,
    store,
    ...App,
  })
  return app
}


export const initModule = (state, emitter, baseRouter) => {
  const { options: { base }} = baseRouter
  const { userInfo, operatePermissions } = state //eslint-disable-line
  store.commit('globe/user/SET_USER_INFO', userInfo) //  更新用户信息
  // store.commit('globe/permission/UPDATE_OPERATE_PERMISSIONS', operatePermissions) //更新用户操作权限
  Vue.prototype.$moduleEmitter = emitter

  // 以开发模式调用模块加载函数 对base的路由需新增一层 dev 路径
  const router =  Router(process.env.NODE_ENV === 'development' ? `${base}/dev` : `${base}/pro`)
  // 以开发模式调用模块加载函数 对请求的baseurl需要写全路径，因为框架很可能不存在相关代理，而请求的发出的环境为框架环境
  process.env.NODE_ENV === 'development' && http.setOption({
    conf: {
      baseUrl: 'http://localhost:3000/api', // 此处端口号修改为 本地联调 模式下输出的端口号
    },
  })
  sync(store, router)
  Vue.use(views, store, router, http)

  const app = new Vue({
    router,
    store,
    ...App,
  })

  router.beforeEach((to, from, next) => { // eslint-disable-line
    // 模块路由对路径无匹配的视图时，返回给Base路由做处理
    if (to.matched.length === 0) {
      if (to.path.indexOf(`/${pkg.name}`) === 0) {
        next(to.path.replace(`/${pkg.name}`, ''))
      } else {
        app.$destroy()
        baseRouter.push(to.path.replace(base, ''))
      }
    } else {
      next()
    }
  })

  return app
}

export default app
