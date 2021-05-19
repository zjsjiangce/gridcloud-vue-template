<template>
  <FormItem
    class="element-wrapper"
    ref="formItem"
    :label="conf.description"
    :rules="rules"
    :required="required && config['required-symbol']"
    :label-width="config['label-width'] || 80"
    :prop="parent ? `${parent}.${conf.name}` : conf.name"
    :class="{'disabled': disabled}">
    <Input
      v-model="formValue"
      type="textarea"
      :size="size"
      :autosize="{ minRows: rows, maxRows: rows }"
      :rows="rows"
      :placeholder="placeholder"
      :wrap="wrap"
      :disabled="disabled"
      :readonly="readonly">
    </Input>
  </FormItem>
</template>

<script>
import BaseForm from '../mixin/base-form'
export default {
  name: 'BTextarea',
  mixins: [BaseForm],
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    required() {
      return this.validator.filter(v => v.type === 'required').length > 0
    },
    rules() {
      return (this.validator || []).map(v => {
        // eslint-disable-next-line no-unused-vars
        const { type, trigger = 'change', regex = '', message } = v
        switch (type) {
          case 'required':
            return {
              // eslint-disable-next-line no-unused-vars
              validator: (rule, value, callback) => {
                if (!this.formValue && this.formValue !== 0 && !this.isView) {
                  return callback(new Error(message ? message : `${this.conf.description}为必填`))
                }
                callback()
              },
              trigger,
            }
          case 'regex':
            return {
              // eslint-disable-next-line no-unused-vars
              validator: (rule, value, callback) => {
                // 换行校验处理
                const _val = this.formValue.replace(/[\r\n]/g, '')
                // eslint-disable-next-line no-eval
                if (this.formValue && !eval(regex).test(_val) && !this.isView) {
                  return callback(new Error(message ? message : '该信息格式错误'))
                }
                callback()
              },
              trigger,
            }
          default:
            return {
              // eslint-disable-next-line no-unused-vars
              validator: (rule, value, callback) => callback(),
              trigger,
            }
        }
      })
    },
    rows() {
      return this.formConfig.rows || 4
    },
    wrap() {
      return this.formConfig.wrap || 'soft'
    },
  },
  methods: {
    clear() {
      this.formValue = ''
    },
  },
}
</script>