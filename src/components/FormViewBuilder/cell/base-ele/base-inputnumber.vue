<template>
  <FormItem
    class="element-wrapper"
    ref="formItem"
    :label="conf.description"
    :rules="rules"
    :required="required && config['required-symbol']"
    :label-width="config['label-width'] || 80"
    :prop="parent ? `${parent}.${conf.name}` : conf.name">
    <InputNumber
      class="b-ipt-num"
      v-model="formValue"
      :min="min"
      :max="max"
      :size="size"
      :step="step"
      :disabled="disabled"
      :readonly="readonly">
    </InputNumber>
  </FormItem>
</template>

<script>
import BaseForm from '../mixin/base-form'
export default {
  name: 'BInputNumber',
  mixins: [BaseForm],
  props: {
    value: {
      type: [Number, String],
      default: 0,
    },
    form: {
      required: true,
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formValue: (isNaN(this.value) || this.value === '') ? 0 : this.value,
    }
  },
  computed: {
    required() {
      return this.validator.filter(v => v.type === 'required').length > 0
    },
    max() {
      return this.formConfig.max || 99999
    },
    min() {
      return this.formConfig.min || 0
    },
    step() {
      return this.formConfig.step || 1
    },
  },
  watch: {
    formValue: {
      handler(v) {
        this.$emit('input', v)
      },
      deep: true,
    },
    value: {
      handler(v) {
        this.formValue = (isNaN(v) || v === '') ? 0 : v
      },
      deep: true,
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
.b-ipt-num{
  width: 100%;
}
</style>
