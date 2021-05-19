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
      :placeholder="placeholder"
      :size="size"
      :disabled="disabled"
      :readonly="readonly">
      <template v-if="perpend" slot="prepend">
        <Select v-if="perpend.type === 'select'" v-model="perpendVal" :style="`width: ${perpend.content.width}px`">
          <Option :value="op.value" v-for="op in perpend.content.options" :key="op.name">{{op.name}}</Option>
        </Select>
        <span v-if="perpend.type === 'text'">
          {{perpend.content.value}}
        </span>
      </template>
      <template v-if="append" slot="append">
        <Select v-if="append.type === 'select'" v-model="appendVal" :style="`width: ${perpend.content.width}px`">
          <Option :value="op.value" v-for="op in append.content.options" :key="op.name">{{op.name}}</Option>
        </Select>
        <span v-if="append.type === 'text'">
          {{append.content.value}}
        </span>
      </template>
    </Input>
  </FormItem>
</template>

<script>
import BaseForm from '../mixin/base-form'
export default {
  name: 'BInput',
  mixins: [BaseForm],
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      perpendVal: '',
      appendVal: '',
    }
  },
  computed: {
    required() {
      return this.validator.filter(v => v.type === 'required').length > 0
    },
    perpend() {
      if (this.formConfig.prepend && this.formConfig.prepend.type === 'text') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.perpendVal = this.formConfig.prepend.content.value
      }
      return this.formConfig.prepend || null
    },
    append() {
      if (this.formConfig.append && this.formConfig.append.type === 'text') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.appendVal = this.formConfig.append.content.value
      }
      return this.formConfig.append || null
    },
  },
  watch: {
    formValue: {
      handler(v) {
        this.$emit('input', `${this.perpendVal}${v}${this.appendVal}`)
      },
      deep: true,
    },
    perpendVal: {
      handler(v) {
        this.$emit('input', `${v}${this.formValue}${this.appendVal}`)
      },
      deep: true,
    },
    appendVal: {
      handler(v) {
        this.$emit('input', `${this.perpendVal}${this.formValue}${v}`)
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