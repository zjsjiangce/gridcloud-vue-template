/*
 * 作者: Jacen (shijiachen@hztianque.com)
 * 描述：用于管理schema的相关操作，返回对应配置，以及默认值等
 * 创建时间: Friday, 17th April 2020 4:11:36 pm
 */

// import Pares from './Pares'
// import Config from './Config'

export default class Schema {
  constructor(ctx) {
    this.ctx = ctx
  }

  getConfig(schema, value) {
    const conf = {}
    schema.forEach((sc, i) => {
      const { name, form: { type }} = sc
      if (type === 'Array') {
        conf[name] = this.getArrayConf(sc, value[name])
      } else if (type === 'Wrapper') {
        conf[name] = this.getWrapperConf(sc, value[name])
      } else if (type === 'Space') {
        conf[`space_${i}`] = { ...sc, ...{ name: `space_${i}` }}
      } else {
        conf[name] = sc
      }
    })

    return conf
  }

  getWrapperConf(schema, field) {
    const { config } = this.ctx
    const { name, form } = schema
    const { schema: cSchema } = form

    return {
      ...schema,
      form: {
        ...form,
        schema: config.getWrapperConfig(cSchema, field, name),
      },
    }
  }

  getArrayConf(schema, field) { // 获取数组对象的配置
    const { config } = this.ctx
    const { name, form } = schema
    const { schema: cSchema } = form

    return {
      ...schema,
      form: {
        ...form,
        schema: config.getArrayConfig(cSchema, field, name),
      },
    }
  }
}
