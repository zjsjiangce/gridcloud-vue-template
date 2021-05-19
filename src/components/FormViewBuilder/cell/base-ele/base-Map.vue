<template>
  <div class="base-map">
    <!-- {{schemas}}------{{formValue}} -->
    <form-layout
      class="form-itm-layout"
      v-for="(schema, index) in schemas[formValue._uid] ? schemas[formValue._uid].conf : {}"
      :key="schema.name"
      v-if="schema.form"
      :config="config"
      :schema="schema">
      <form-item
        :schema="schema"
        :parent="parent ? `${parent}.${conf.name}.${index}` : `${conf.name}.${index}`"
        :ref="`form-map-${schema.name}`"
        v-model="formValue[schema.name]" />
      {{formValue[schema.name]}}
      <div
        v-if="formValue.tip"
        class="form-map-tip"
        :style="`left:${Number(labelWidth) + 120}px`">
        {{formValue.tip}}
      </div>
    </form-layout>
  </div>
</template>

<script>
import FormLayout from '../form-layout'
import BaseForm from '../mixin/base-form'

export default {
  name: 'BaseMap',
  components: {
    FormLayout,
    'form-item': () => import('../form-item'),
  },
  mixins: [BaseForm],
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      schemas: {},
    }
  },
  computed: {
    schema() {
      return this.form.schema
    },
    labelWidth() {
      return this.config['label-width'] || 0
    },
  },
  watch: {
    formValue: {
      handler(v) {
        console.log('------base-map------', v)
      },
      deep: true,
    },
  },
  mounted() {
    if (Object.keys(this.formValue).length === 0 || !this.formValue['_uid']) {
      // eslint-disable-next-line no-debugger
      // debugger
      const { uid, ...conf } = this.schema()
      this.schemas[uid] = conf
      if (!this.formValue['_uid']) { this.formValue['_uid'] = uid }
    }
    // console.log(111111, this.formValue, this.schemas)
  },
  methods: {
    gutInstance(name) {
      return this.$refs[`form-map-${name}`][0].gutInstance()
    },
  },
}
</script>

<style lang="scss" scoped>
.base-map{
  position: relative;
  /deep/ .has-padding{
    margin: 0;
  }
  .form-map-tip{
    position: absolute;
    bottom: 2px;
    font-size: 12px;
    color: #999;
  }
}
</style>
