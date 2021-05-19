/*
 * 作者: Jacen (shijiachen@hztianque.com)
 * 描述：用于根据schema生成配置
 * 创建时间: Friday, 17th April 2020 4:40:33 pm
 */
// import Schema from './Schema'


export default class Config {
  constructor(ctx) {
    this.ctx = ctx
    this.schemas = ctx.json.schemas || {}
  }

  getConfig(name, value) {
    const { schema, pares } = this.ctx
    // 获取配置则会将 配置对应的默认只放入 value 中，存放位置根据path来确定
    const schemaConf = this.schemas[name] || null
    if (!schemaConf) {
      throw new Error('无效的结构类型')
    }
    return () => {
      const temp = pares.setArrayDefault(schemaConf.schema, value)
      return schema.getConfig(this.schemas[name].schema, temp)
    }
  }

  /**
   * 获取容器类型的相关配置
   * @param {*} schemaName 结构名称
   * @param {*} value 数组的字段的数据对象
   */
  getWrapperConfig(schemaName, value, name) {
    const { schema, pares, controls, _CONTROLS_DEFAULT_FUNC_NAME } = this.ctx
    const schemaConf = this.schemas[schemaName] || null
    const ctlValue = controls[name]
    if (!schemaConf) {
      throw new Error('无效的结构类型')
    }
    const { schema: sc } = schemaConf
    const temp = pares.setWrapperDefault(sc, value)
    const ctl = pares.setWrapperDefault(sc, ctlValue, _CONTROLS_DEFAULT_FUNC_NAME)
    ctl._uid = temp._uid
    return schema.getConfig(sc, temp)
  }

  /**
   * 获取数组类型的相关配置
   * @param {*} schemaName 结构名称
   * @param {*} value 数组的字段的数据对象
   */
  getArrayConfig(schemaName, value, name) {
    const { schema, pares, controls, _CONTROLS_DEFAULT_FUNC_NAME } = this.ctx
    const schemaConf = this.schemas[schemaName] || null
    const ctlValue = controls[name]
    if (!schemaConf) {
      throw new Error('无效的结构类型')
    }

    return (cFs = true) => {
      const { schema: sc, layout } = schemaConf
      const temp = pares.setArrayDefault(sc, value, cFs)
      const ctl = pares.setArrayDefault(sc, ctlValue, cFs, _CONTROLS_DEFAULT_FUNC_NAME)
      const { _uid } = temp
      ctl._uid = _uid
      return {
        conf: {
          ...schema.getConfig(sc, temp),
          _uid,
        },
        del: () => pares.delArrayValue(value, ctlValue, _uid),
        layout,
        uid: _uid,
      }
    }
  }
}
