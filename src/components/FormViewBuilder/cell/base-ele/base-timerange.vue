<template>
  <FormItem
    class="element-wrapper"
    ref="formItem"
    :label="conf.description"
    :rules="rules"
    :label-width="config['label-width']"
    :prop="parent ? `${parent}.${conf.name}` : conf.name">
    <TimePicker
      v-model="formValue"
      style="width: 100%;"
      type="timerange"
      value-format="yyyy/MM/dd"
      :placeholder="placeholder"
      :size="size"
      :editable="false"
      :disabled="disabled"
      :readonly="readonly"
      :confirm="confirm"
      transfer>
    </TimePicker>
  </FormItem>
</template>

<script>
import BaseForm from '../mixin/base-form'
export default {
  name: 'BTimeRange',
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
    confirm() {
      return this.formConfig.confirm || false
    },
  },
  methods: {
    clear() {
      this.formValue = []
    },
  },
}
</script>

<style lang="scss" scoped>
</style>