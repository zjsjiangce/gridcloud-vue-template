<template>
  <FormItem
    class="element-wrapper"
    ref="formItem"
    :label="conf.description"
    :rules="rules"
    :label-width="config['label-width'] || 80"
    :prop="parent ? `${parent}.${conf.name}` : conf.name">
    <i-switch :size="size" v-model="formValue" :disabled="disabled">
      <span v-if="texts[0]" slot="open">{{texts[0]}}</span>
      <span v-if="texts[1]" slot="close">{{texts[1]}}</span>
    </i-switch>
  </FormItem>
</template>

<script>
import BaseForm from '../mixin/base-form'
export default {
  name: 'BSwitch',
  mixins: [BaseForm],
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
    }
  },
  computed: {
    texts() {
      return this.formConfig.texts || ['', '']
    },
    remote() {
      return this.form.remote
    },
  },
  methods: {
    clear() {
      this.formValue = false
    },
  },
}
</script>