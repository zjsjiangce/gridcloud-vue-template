import { isDate } from './index'

// 身份证号码验证规则
export const idCardValid = (rule, value, cb) => { // eslint-disable-line
  const pattern = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
  if (value) {
    const year = value.substring(6, 10)
    const month = value.substring(10, 12)
    const day = value.substring(12, 14);
    (pattern.test(value) && isDate(year, month, day)) ?
      cb() :
      cb('无效的证件号码，请重新录入')
  } else {
    rule.required ? cb('请输入证件号码') : cb()
  }
}
// 手机号码验证规则
export const telValid = (rule, value, cb) => {// eslint-disable-line
  const pattern = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/
  if (value) {
    if (pattern.test(value)) {
      cb()
    } else {
      cb('联系方式格式错误')
    }
  } else {
    if (rule.required) {
      cb('请输入联系方式')
    } else {
      cb()
    }
  }
}
// 网址验证规则
export const urlValid = (rule, value, cb) => {
  const pattern = /^((https|http|ftp|rtsp|mms){0,1}(:\/\/){0,1})www\.(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/
  if (value) {
    if (pattern.test(value)) {
      cb()
    } else {
      cb('网址格式错误')
    }
  } else {
    if (rule.required) {
      cb('请输入网址')
    } else {
      cb()
    }
  }
}
// 邮箱验证
export const emailValid = () => {
  const pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
  if (value) {
    if (pattern.test(value)) {
      cb()
    } else {
      cb('邮箱格式错误')
    }
  } else {
    if (rule.required) {
      cb('请输入邮箱地址')
    } else {
      cb()
    }
  }
}
// 邮政编码验证
export const postalValid = () => {
  const pattern = /^[1-9][0-9]{5}$/
  if (value) {
    if (pattern.test(value)) {
      cb()
    } else {
      cb('联系方式格式错误')
    }
  } else {
    if (rule.required) {
      cb('请输入联系方式')
    } else {
      cb()
    }
  }
}

// 最小长度不小于
export const minValid = (rule, value, cb, len = 1) => {
  const str = value.trim()
  if (str) {
    if (str.length >= len) {
      cb()
    } else {
      cb(`字符长度不得小于${len}`)
    }
  } else {
    if (rule.required) {
      cb('不能为空')
    } else {
      cb()
    }
  }
}
//最大长度
export const maxValid = (rule, value, cb, len = 1) => {
  const str = String(value).trim()
  if (str) {
    if (str.length <= len) {
      cb()
    } else {
      cb(`字符长度不得大于${len}`)
    }
  } else {
    if (rule.required) {
      cb('不能为空')
    } else {
      cb()
    }
  }
}
//中文验证
export const cnValid = (rule, value, cb) => {
  const str = value.trim()
  if (str) {
    if (/[\u4e00-\u9fa5]/.test(str)) {
      cb()
    } else {
      cb(`请输入中文`)
    }
  } else {
    if (rule.required) {
      cb('不能为空')
    } else {
      cb()
    }
  }
}

//车牌号验证
export const carNumberValid = (rule, value, cb) => {
  const str = value.trim()
  if (str) {
    if (/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test(str)) {
      cb()
    } else {
      cb(`车牌号格式有误,请核对！`)
    }
  } else {
    if (rule.required) {
      cb('不能为空')
    } else {
      cb()
    }
  }
}
