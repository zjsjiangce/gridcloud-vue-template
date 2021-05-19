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
      style="width: 100%"
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
  name: 'BDate',
  mixins: [BaseForm],
  props: {
    value: {
      type: [Date, String, Number],
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
        return 'datetime'
      }
      return 'date'
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
  },
  methods: {
    // dateChange(v) {
    //   console.log('333333333', v)
    // },
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