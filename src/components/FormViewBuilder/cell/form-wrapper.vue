/*
 * 作者: Jacen (shijiachen@hztianque.com)
 * 描述：一个schema对应一个form以及对应的校验规则
 * 创建时间: Thursday, 30th April 2020 2:39:02 pm
 */

<template>
  <Form
    ref="form"
    class="form-wrapper"
    :label-position="labelPosition"
    :label-colon="labelColon"
    :model="fields"
    :inline="inline"
    :style="style">
    <Row type="flex"><slot /></Row>
  </Form>
</template>

<script>
export default {
  name: 'FromWrapper',
  inject: ['builder'],
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    config: {
      type: Object,
      default: () => ({
        'gutter': 10,
        'label-colon': true,
        'label-position': 'right',
        'label-width': 90,
      }),
    },
  },
  data() {
    return {
      form: null,
    }
  },
  computed: {
    style() {
      return `
        --label-position: ${this.labelPosition};
        --label-width: ${this.labelWidth}px;
      `
    },
    inline() {
      return this.config['inline'] || false
    },
    labelPosition() {
      return this.config['label-position'] || 'top'
    },
    labelColon() {
      return !!this.config['label-colon']
    },
    labelWidth() {
      return this.config['label-width'] || 80
    },
    girdStyle() {
      const { gutter = 10 } = this.config
      return `
        grid-template-columns: repeat(4, auto);
        grid-template-rows: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: ${gutter}px;
      `
    },
  },
  mounted() {
    this.form = this.$refs.form
  },
  methods: {
    validate(callback) {
      this.form.validate(callback)
    },
    validateField(name, callback) {
      this.$refs.form.validateField(name, callback)
    },
  },
}
</script>

<style lang="scss" scoped>
.form-wrapper{
  .grid-wrapper{
    display: grid;
  }
}
</style>
