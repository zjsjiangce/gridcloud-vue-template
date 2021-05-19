/*
 * @作者: wrr (wangruirui@hztianque.com)
 * @描述:
 * @Date: 2021-04-27 10:51:29
 */
import Http, { HttpError } from '@ourea/fetch' // eslint-disable-line
import store from '../../store'
import { Message } from 'view-design'

let logout = false

export const http = Http({
  config: {
    baseUrl: '/api',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  },
},
)

export default (Vue, opt = {}) => {

  const CUSTOM_HTTP_ERROR_STATUS = 602 // 前端项目内自定义错误码

  opt && http.setOption(opt)

  http.injectBefore(({ url, opt }) => {

    const { headers } = opt
    const token = store.getters['globe/user/token']

    if (!url.endsWith('/login') && !url.endsWith('/logout')) {
      if (!token) { return }
      const rstHeaders = {
        ...headers,
        'Authorization': token,
      }
      return { url, opt: { ...opt, headers: rstHeaders }}
    } else {
      return { url, opt }
    }
  })

  http.injectAfter(rsp => {
    logout = false
    try {
      const { success, code, message, msg } = rsp

      if (!success || code === 401 || code === 666) {
        if (code === 401 || code === 666) { // 根据项目判断状态码
          return new HttpError({
            code,
            httpStatus: HttpError.ERROR_CODE.TOKEN_EXPIRE, // 登录超时
            message: message || msg || '后台返回未知错误',
          })
        } else if (code === -1) {
          return new HttpError({
            code,
            httpStatus: CUSTOM_HTTP_ERROR_STATUS, // 系统内部未知错误
            message: '系统内部未知错误',
          })
        } else if (code !== 0) {
          return new HttpError({
            code,
            httpStatus: CUSTOM_HTTP_ERROR_STATUS, // 服务器返回的错误
            message: message || msg || '后台返回未知错误',
          })
        }
      }
    } catch (error) {
      return new HttpError({
        code: CUSTOM_HTTP_ERROR_STATUS,
        httpStatus: HttpError.ERROR_CODE.RESPONSE_PARSING_FAILED, // 解析数据错误
        message: HttpError.HTTP_ERROR_MAP[HttpError.ERROR_CODE.RESPONSE_PARSING_FAILED],
      })
    }
  })

  http.setErrorHook(async (httpError, fetchUrl) => {
    let errorData = {}
    if (httpError.response) {
      errorData = await httpError.response.json()
    } else {
      errorData = JSON.parse(JSON.stringify(httpError))
    }

    const { code, message, msg } = errorData

    if (logout) { return }
    Message.error((code === 401 || code === 666) ? '您的账号已下线,请重新登录！' : (message || msg))
    if (code === 401 || code === 666) {
      logout = true
      // window.location.href = window.location.href.replace(/(dev|pro)\/.*/gm, 'login')
    }
    console.log('[HTTP ERROR]', fetchUrl, httpError) // eslint-disable-line
  })

  Vue.prototype.http = http
}
