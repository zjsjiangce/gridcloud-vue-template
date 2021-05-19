<template>
  <FormItem
    class="element-wrapper"
    ref="formItem"
    :label="conf.description"
    :rules="rules"
    :required="required && config['required-symbol']"
    :label-width="config['label-width']"
    :prop="parent ? `${parent}.${conf.name}` : conf.name">
    <DatePicker
      style="width: 100%;"
      :value="formValue"
      :format="format"
      :placeholder="placeholder"
      :size="size"
      :editable="false"
      :type="type"
      :disabled="disabled"
      :readonly="readonly"
      :confirm="confirm"
      :options="dateOptions"
      @on-change="$emit('input', $event)"
      transfer>
    </DatePicker>
  </FormItem>
</template>

<script>
import BaseForm from '../mixin/base-form'
export default {
  name: 'BDateRange',
  mixins: [BaseForm],
  props: {
    value: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
    }
  },
  computed: {
    required() {
      return this.validator.filter(v => v.type === 'required').length > 0
    },
    type() {
      if (this.formConfig.time) {
        return 'datetimerange'
      }
      return 'daterange'
    },
    format() {
      return this.formConfig.format ?
        this.formConfig.format :
        (this.formConfig.time ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd')
    },
    confirm() {
      return this.formConfig.confirm || false
    },
    disabledDateFunc() {
      return this.custom[this.formConfig.disabledDate]
    },
    dateOptions() {
      return {
        disabledDate: this.disabledDateFunc,
      }
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
                const isDateRange =  Array.isArray(this.formValue) && this.formValue.length === 2 && this.formValue.every(i => !!i)
                if (!this.isView && !isDateRange) {
                  return callback(new Error(message ? message : '该信息为必填'))
                }
                callback()
              },
              trigger,
            }
          case 'regex':
            return {
              // eslint-disable-next-line no-unused-vars
              validator: (rule, value, callback) => {
                // eslint-disable-next-line no-eval
                if (this.formValue && !eval(regex).test(this.formValue) && !this.isView) {
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
  },
  methods: {
    clear() {
      this.formValue = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.date{

}
</style>