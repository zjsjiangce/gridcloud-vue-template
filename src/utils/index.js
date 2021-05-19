/*
 * @作者: wrr (wangruirui@hztianque.com)
 * @描述:
 * @Date: 2021-04-27 10:51:29
 */
/**
 * 格式化全局注册组件名
 * @param {*} name 双驼峰组件名
 */
export const formatComponentName = (name) => {
  const firstIndex = 0
  const deleteCount = 1
  const str = name.replace(/([A-Z])/g, '-$1').toLowerCase()
  return str.indexOf('-') === firstIndex ? str.substr(deleteCount) : str
}

export const time = (val = new Date(), format = 'yy-mm-dd h:m:s') => {
  let date = val
  if (!date) { date = new Date() }
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const H = date.getHours()
  const M = date.getMinutes()
  const S = date.getSeconds()
  return format.replace('yy', y)
    .replace('mm', m >= 10 ? m : `0${m}`)
    .replace('dd', d >= 10 ? d : `0${d}`)
    .replace('h', H >= 10 ? H : `0${H}`)
    .replace('m', M >= 10 ? M : `0${M}`)
    .replace('s', S >= 10 ? S : `0${S}`)
}

/**
 * 函数防抖 (只执行最后一次点击)
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
export const Debounce = (fn, t) => {
  const delay = t || 500
  let timer
  return function () {
    const args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, args)
    }, delay)
  }
}
/**
 * 函数节流
 * @param fn
 * @param interval
 * @returns {Function}
 * @constructor
 */
export const Throttle = (fn, t) => {
  let last
  let timer
  const interval = t || 500
  return function () {
    const args = arguments
    const now = +new Date()
    if (last && now - last < interval) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        last = now
        fn.apply(this, args)
      }, interval)
    } else {
      last = now
      fn.apply(this, args)
    }
  }
}

/**
* @params {*} ename 按钮ename
*/
export const checkBtn = (ename) => {
  const btns = store.getters['globe/user/pageBtns']
  return btns.find(i => i.ename === ename)
}


/*
* 验证日期是否有效
* @param Year
* @param Month
* @param Day
* @returns Boolean
*/
export const isDate = (Year, Month, Day) => {
  if (isNaN(Year) || isNaN(Month) || isNaN(Day)) { return false }
  const month = parseInt(Month)
  const day = parseInt(Day)
  if (month > 12 || month < 1) { return false }
  if (day < 1 || day > 31) { return false }
  if ((month === 4 || month === 6 || month === 9 || month === 11) && (day > 30)) { return false }
  if (month === 2) {
    if (day > 29) { return false }
    if ((((Year % 100 === 0) && (Year % 400 !== 0)) || (Year % 4 !== 0)) && (day > 28)) { return false }
  }
  return true
}


export default {
  install: (Vue) => {
    Vue.prototype.$time = time
    Vue.prototype.$Throttle = Throttle
    Vue.prototype.$Debounce = Debounce
    Vue.prototype.$isDate = isDate
    Vue.prototype.$checkBtn = checkBtn
  },
}
