/*
 * 作者: Jacen (shijiachen@hztianque.com)
 * 描述：FormBuild的顶层类，负责暴露顶层api
 * 创建时间: Friday, 17th April 2020 2:20:29 pm
 */

import Config from './Config'
import Pares from './Pares'
import Schema from './Schema'
import defaultConfig from '../config/defalutGlobeConfig'

export default class Builder {
  constructor(value, controls, json, custom) {
    const { name = '未命名', version = '0.0.1' } = json
    const {
      state = 'insert',
      update = null,
      delete: del = null,
    } = custom
    this.value = value
    this.controls = controls
    this.json = json
    this.custom = custom
    this.version = version
    this.name = name
    this.state = state
    this.update = update
    this.delete = del
    this._VALUE_DEFAULT_FUNC_NAME = '_getDefaultValueBySchema'
    this._CONTROLS_DEFAULT_FUNC_NAME = '_getDefaultControlsBySchema'
    this._init()
  }

  /**
   * 根据conf初始化，产出表单默认数据以及配置
   */
  _init() {
    const { schema } = this.json
    this.config = new Config(this)
    this.schema = new Schema(this)
    this.pares = new Pares(this)
    this.pares.getRootDefault(schema, this.value)
    this.pares.getRootDefault(schema, this.controls, this._CONTROLS_DEFAULT_FUNC_NAME)
  }

  setJson(json) {
    const { name = '未命名', version = '0.0.1', schema } = json
    this.json = json
    this.name = name
    this.version = version

    this.config = new Config(this)
    this.schema = new Schema(this)
    this.pares = new Pares(this)
    this.pares.getRootDefault(schema, this.value)
    this.pares.getRootDefault(schema, this.controls, this._CONTROLS_DEFAULT_FUNC_NAME)
  }

  /**
   * 获取表单配置
   */
  getSchema() {
    const { schema } = this.json
    return this.schema.getConfig(schema, this.value)
  }

  getLayout() {
    const { layout } = this.json
    return layout
  }

  getConfig() {
    const { config = {}} = this.json
    return Object.assign({}, defaultConfig, config)
  }

  // getSchemaConfig(schema) {

  // }
}
