<template>
  <FormItem
    class="element-wrapper"
    ref="formItem"
    :label="conf.description"
    :rules="rules"
    :required="required && config['required-symbol']"
    :label-width="config['label-width'] || 80"
    :prop="parent ? `${parent}.${conf.name}` : conf.name">
    <div style="display: inline-block;position: relative;width: 100%;">
      <Spin v-if="!isSettled" fix></Spin>
      <Cascader
        :class="['cp', 'values-selector']"
        :style="`width: 100%;`"
        ref="cascader"
        :data="source"
        :load-data="loadData"
        transfer
        v-model="values"
        :change-on-select="jsonChangeOnSelect"
        clearable
        @on-visible-change="(v) => $emit('on-visible-change', v)"
        @on-change="onChange"
        :render-format="format"
        :size="size"
        :disabled="disabled"
        :placeholder="isLeaf ? leafOrg.label || '未知' : placeholder" />
      <!-- <Input
        ref='ipt'
        v-else
        :value='format(labels, values)'
        :readonly='true' /> -->
    </div>
  </FormItem>
</template>
<script>

import BaseForm from '../mixin/base-form'
export default {
  name: 'BaseCascader',
  mixins: [BaseForm],
  props: {
    value: {
      type: String,
      required: true,
    },
    changeOnSelect: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isSettled: true,
      source: [],
      isLeaf: false, // 用户是不是属于叶子结点
      leafOrg: null,
      values: [], // 级联的绑定数据
      labels: [],
    }
  },
  computed: {
    required() {
      return this.validator.filter(v => v.type === 'required').length > 0
    },
    jsonChangeOnSelect() {
      return this.formConfig.changeOnSelect !== false
    },
    level() {
      return this.custom[this.formConfig.level]
    },
    nodeHandler() {
      return this.custom[this.formConfig.nodeHandler]
    },
    format() {
      return this.custom[this.formConfig.format]
    },
    rootHandler() {
      return this.custom[this.formConfig.rootHandler]
    },
    load() {
      return this.custom[this.formConfig.load]
    },
    trackHandler() {
      return this.custom[this.formConfig.trackHandler]
    },
  },
  watch: {
    async value(id) {
      // console.log('---base-id---', id)
      if (id) {
        const lastId = this.values[this.values.length - 1]
        id !== lastId && this.isExpend && this.expendTo(id)
      } else {
        this.values = []
      }
    },
    values(values) {
      // console.log('---base-values---', values)
      if (values.length > 0) {
        const last = values[values.length - 1]
        this.$emit('input', last)
      } else {
        this.$emit('input', '')
      }
    },
  },
  async mounted() {
    // console.log('---base-mounted---', this.value)
    this.isSettled = false
    await this.initCascaderTree()
    this.isExpend = true
    if (this.value) {
      await this.expendTo(this.value)
    }
    this.isSettled = true
  },
  methods: {
    clear() {
      this.$nextTick(() => {
        this.values = []
      })
    },
    // 初始化级联
    async initCascaderTree() {
      const data = await this.rootHandler(this.value)
      if (data === [] || Object.keys(data).length === 0) {
        return
      }
      this.source = data.map(d => this.tarnslateDateToNode(d))
      const cData = await this.load(this.source[0], this.value)
      if (cData.length === 0) { // 说明当前帐号自身就是叶子节点
        this.isLeaf = true
        // eslint-disable-next-line prefer-destructuring
        this.leafOrg = this.source[0]
      }
    },
    //加载下辖的节点
    async loadData(node, cb) {
      node.loading = true
      const data = await this.load(node, this.value)
      if (data.length === 0) {
        node.loading = false
        delete node.children
        delete node.loading
      } else {
        node.children = data.map(d => this.tarnslateDateToNode(d))
        node.loading = false
        cb && cb()
      }
    },
    async expendTo(id) {
      this.isExpend = false
      const data = await this.trackHandler(id)
      let target = this.source
      let index = 0
      const loop = async (node) => {
        if (!target || target.length === 0) { return }
        const { id, currentNodeId } = node
        const rst = id || currentNodeId
        const [temp] = target.filter(node => `${node.data.id}` === `${rst}`)
        if (temp && temp.children) { // 说明数据中存在该节点且该子节点还存在子节点 则直接展开
          if (temp.children.length === 0) {
            const data = await this.load(temp, this.value)
            temp.children = data.map(d => this.tarnslateDateToNode(d))
          }
          target = temp.children
          index += 1

          data[index] && await loop(data[index])
        } else {
          target = null
        }
      }
      await loop(data[index])
      const node = data.map(this.nodeHandler)
      this.labels = node.map(n => n.label)
      this.values = node.map(d => d.id)
      this.isExpend = true
    },
    // 数据节点转化为级联节点
    tarnslateDateToNode(d) {
      const { label, id, level, parent } = this.nodeHandler ? this.nodeHandler(d) : d
      // 根据level方法进行判断是否展示下级 暂不支持 Promise 方法
      const isLevelAllow = this.level ? this.level(level) : true
      return {
        id,
        label,
        value: id,
        level,
        data: d,
        ...((parent && isLevelAllow) ? { children: [], loading: false } : {}),
      }
    },
    onChange(ids, nodes) {
      this.labels = nodes.map(n => n.label)
      this.$emit('on-change', ids, nodes)
    },
  },
}
</script>
<style>
  .ivu-cascader-menu-item {
    padding-right: 30px !important;
  }
</style>

<style lang="scss" scoped>
.text-mode{
  & /deep/ .ivu-input-type{
    input{
      border: none;
      box-shadow: none;
      outline: none;
      height: 22px;
      line-height: 22px;
      padding: 0 7px;
    }
  }
  & /deep/ .ivu-icon-arrow-down-b::before{
    content: "\F3D0";
  }
}
</style>


