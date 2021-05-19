<template>
  <div class="base-slot">
    <p :class="[{required: required}]" class="label" v-if="label">
      <span>{{conf.description}}{{config['label-colon'] ? ':' : ''}}</span>
    </p>
    <div class="slot">
      <slot :name="conf.name" />
    </div>
  </div>
</template>

<script>
import BaseForm from '../mixin/base-form'
export default {
  name: 'BSlot',
  mixins: [BaseForm],
  props: {
    value: {
      type: [String, Number, Array, Object, Boolean, Date],
      default: null,
    },
  },
  data() {
    return {}
  },
  computed: {
    label() {
      return !!this.formConfig.label
    },
    required() {
      return this.validator.filter((v) => v.type === 'required').length > 0
    },
  },
  methods: {
    clear() {
      this.formValue = null
    },
  },
}
</script>

<style lang="scss" scoped>
.base-slot {
  margin-bottom: 24px;
  .label {
    line-height: 1;
    padding-bottom: 10px;
    &::after {
      content: '\0020\0028\9009\586b\0029';
      color: #999999;
    }
    &.required {
      &::after {
        display: none;
      }
    }
  }
}
</style>