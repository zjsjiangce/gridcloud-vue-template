/*
 * 作者: Jacen (shijiachen@hztianque.com)
 * 描述：用于处理 schema 配置，返回相关配置
 * 创建时间: Friday, 17th April 2020 4:40:33 pm
 */
import DefaultMap from '../config/defaultValue'
import { v1 as uuidv1 } from 'uuid'

class Pares {
  constructor(ctx) {
    this.ctx = ctx
  }

  _getDefaultValueBySchema(schema) {
    const temp = {}
    schema.forEach(sc => {
      const { name, default: def, type } = sc
      if (type === 'space') {
        temp[`_uid_space`] = uuidv1()
      } else {
        temp[name] = DefaultMap[type](def)
      }
      temp['_uid'] = uuidv1()
    })
    return temp
  }

  _getDefaultControlsBySchema(schema) {
    const temp = {}
    const { state } = this.ctx
    schema.forEach(sc => {
      const { name, form, controls, type } = sc
      if (type === 'array' || type === 'wrapper') {
        temp[name] = DefaultMap[type]()
        if (type === 'wrapper') {
          temp[name].show = typeof form.show === 'boolean' ? form.show : true
        }
      } else if (type !== 'space') {
        temp[name] = {}
        temp[name].show = typeof form.show === 'boolean' ? form.show : true
        Object.keys(controls).forEach(col => {
          temp[name][col] = controls[col][state]
        })
      }
      temp['_uid'] = uuidv1()
    })
    return temp
  }

  getRootDefault(schema, field, type = '_getDefaultValueBySchema') {
    const { update } = this.ctx
    const temp = this[type](schema)
    if (Array.isArray(field)) { // 是数组的情况
      field.push(temp)
    } else {
      Object.entries(temp)
        .forEach(([key, val]) => {
          if (update) {
            update(field, key, val)
          } else {
            field[key] = val
          }
        })
    }
  }

  setWrapperDefault(schema, field, type = '_getDefaultValueBySchema') {
    const { update } = this.ctx
    const temp = this[type](schema)
    Object.entries(temp)
      .forEach(([key, val]) => {
        if (update) {
          update(field, key, val)
        } else {
          field[key] = val
        }
      })
    return temp
  }

  setArrayDefault(schema, field, cFs = true, type = '_getDefaultValueBySchema') {
    const temp = this[type](schema)
    if (Array.isArray(field) && cFs) { // 是数组的情况
      field.push(temp)
    }
    return temp
  }

  delArrayValue(target, ctlValue, _uid) {
    const index = target.findIndex(t => t._uid === _uid)
    index >= 0 && target.splice(index, 1)
    const cIndex = ctlValue.findIndex(t => t._uid === _uid)
    cIndex >= 0 && ctlValue.splice(cIndex, 1)
  }

  merge(field, change) {
    const { update } = this.ctx
    const cMerge = (cField, target) => {
      // eslint-disable-next-line no-undefined
      if (cField === undefined) {
        console.log(cField, target, 'cField')
        return
      }
      if (target.constructor === Object) {
        Object.entries(target).forEach(([key, value]) => {
          if (typeof value === 'object') { // object & array
            if (Array.isArray(value)) {
              // eslint-disable-next-line no-undefined
              if (cField[key] === undefined || typeof value[0] !== 'object') {
                update(cField, key, value)
              } else if (typeof value[0] === 'object') {
                cMerge(cField[key], value)
              }
            } else {
              cMerge(cField[key], { ...value, '_uid': uuidv1() })
            }
          } else {
            update(cField, key, value)
          }
        })
      } else if (target.constructor === Array) {
        this.isNullCFieldsAttrValue(cField)
        const oldLen = cField.length
        target.forEach((data, index) => {
          // TODO
          if (!this.isSameCFieldAttrValue(cField, data)) {
            cField.push({})
            cMerge(cField[oldLen + index], { ...data, '_uid': uuidv1() })
          }
        })
      }
    }
    cMerge(field, change)
    return field
  }

  isNullCFieldsAttrValue(cField) {
    const res = cField.map(({ _uid, ...conf }) => (conf))
    res.forEach((data, index) => {
      if (!Object.values(data).some(v => v && v !== '')) {
        cField.splice(index, 1)
      }
    })
  }

  isSameCFieldAttrValue(target, data) {
    const res = target.map(({ _uid, ...conf }) => (conf))
    if (Object.keys(res[0] || []).length !== Object.keys(data).length) { return false }
    let flag = false
    res.forEach(value => {
      if (JSON.stringify(value) === JSON.stringify(data)) { flag = true }
    })
    return flag
  }
}

export default Pares
