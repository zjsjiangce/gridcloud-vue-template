<template>
  <FormItem
    class="element-wrapper base-tip"
    ref="formItem"
    :style="`left:${Number(config['label-width']) + 120}px;width: calc(100% - ${Number(config['label-width']) + 120}px);`"
    v-if="formValue"
    :label="conf.description"
    :label-width="40"
    :prop="parent ? `${parent}.${conf.name}` : conf.name">
    <Input
      class="b-ipt-num"
      v-model="formValue"
      :disabled="disabled"
      :readonly="readonly">
    </Input>
  </FormItem>
</template>

<script>
import BaseForm from '../mixin/base-form'
export default {
  name: 'BTip',
  mixins: [BaseForm],
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      formValue: this.value,
    }
  },
  computed: {
    required() {
      return this.validator.filter(v => v.type === 'required').length > 0
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
.base-tip{
  position: absolute;
  margin-top: -20px;
  margin-bottom: 0;
  /deep/ .ivu-form-item-label{
    font-size: 12px;
    color: #999;
    padding: 0 5px 0 0;
    margin-top: 1px;
  }
  /deep/ .ivu-form-item-content{
    font-size: 12px;
    color: #999;
    line-height: 12px;
    .ivu-input{
      height: 12px;
      background: #fff;
      color: #999;
      border: none;
      font-size: 12px;
    }
  }
}
</style>
