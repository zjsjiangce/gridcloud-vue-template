<template>
  <FormItem
    class="element-wrapper"
    ref="formItem"
    :label="conf.description"
    :rules="rules"
    :required="required && config['required-symbol']"
    :label-width="config['label-width'] || 80"
    :prop="parent ? `${parent}.${conf.name}` : conf.name">
    <Select
      v-model="formValue"
      :placeholder="placeholder"
      :size="size"
      :filterable="remote || filterable"
      :remote="remote"
      :remote-method="remote ? remoteMethod : null"
      :loading="remote && loading"
      :disabled="disabled"
      :allow-create="allowCreate"
      @on-change="onChange"
      @on-create="onCreate"
      clearable
      transfer>
      <Option v-for="item in options" :value="item.value" :key="item.value">{{item.name || item.label}}</Option>
    </Select>
  </FormItem>
</template>

<script>
import BaseForm from '../mixin/base-form'
export default {
  name: 'BSelect',
  mixins: [BaseForm],
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      options: this.form.options || [],
      loading: false,
    }
  },
  computed: {
    required() {
      return this.validator.filter(v => v.type === 'required').length > 0
    },
    remote() {
      return !!(this.remoteFunctionName && this.custom[this.remoteFunctionName])
    },
    remoteFunctionName() {
      return this.formConfig.remote
    },
    dictHandler() {
      return this.custom.dictHandler
    },
    code() {
      return this.formConfig.code || ''
    },
    onSelectChangeHandler() {
      return this.custom[this.formConfig.selectChangeConfig]
    },
    allowCreate() {
      return this.conf.form.allowCreate || false
    },
    filterable() {
      return this.remote || this.conf.form.filterable
    },
  },
  mounted() {
    if (this.remote) { // 远程获取字典项
      this.options = []
    } else if (this.code) { // 字典项获取并加载
      this.options = []
      this.loadDictOptions()
    }
  },
  methods: {
    clear() {
      this.formValue = ''
    },
    async loadDictOptions() {
      if (this.code && this.dictHandler) {
        const rst = this.dictHandler(this.code)
        if (typeof rst.then === 'function') { // 判断是不是 promise
          this.options = await rst
        } else {
          this.options = rst
        }
      }
    },
    async remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        const rst = this.custom[this.remoteFunctionName]()
        if (typeof rst.then === 'function') { // 判断是不是 promise
          this.options = await rst
        } else {
          this.options = rst
        }
      } else {
        this.options = []
      }
      this.loading = false
    },
    onChange(value) {
      // eslint-disable-next-line no-undefined
      if (this.formConfig.selectChangeConfig === undefined) {
        return
      }
      this.onSelectChangeHandler && this.onSelectChangeHandler(value)
    },
    onCreate(value) {
      this.options.push({
        value,
        label: value,
      })
    },
  },
}
</script>