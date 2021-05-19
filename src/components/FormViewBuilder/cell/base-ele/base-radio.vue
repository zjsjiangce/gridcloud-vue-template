<template>
  <FormItem
    class="element-wrapper"
    ref="formItem"
    :label="conf.description"
    :rules="rules"
    :label-width="config['label-width'] || 80"
    :prop="parent ? `${parent}.${conf.name}` : conf.name">
    <RadioGroup v-model="formValue" :size="size" :type="type">
      <Radio
        v-for="op in options"
        :key="op.value"
        :label="op.value"
        :border="border"
        :disabled="disabled">
        <span>{{op.name}}</span>
      </Radio>
    </RadioGroup>
  </FormItem>
</template>

<script>
import BaseForm from '../mixin/base-form'
export default {
  name: 'BRadio',
  mixins: [BaseForm],
  props: {
    value: {
      type: String,
      default: '',
    },
    parentVal: {
      type: [String, Number, Array, Object, Boolean, Date],
      default: null,
    },
  },
  data() {
    return {
      options: this.form.options || [],
    }
  },
  computed: {
    dictHandler() {
      return this.custom.dictHandler
    },
    border() {
      return this.formConfig.border || false
    },
    type() {
      return this.formConfig.type || null
    },
    code() {
      return this.formConfig.code || ''
    },
  },
  mounted() {
    if (this.code) { // 字典项获取并加载
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
  },
}
</script>