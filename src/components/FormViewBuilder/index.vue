<template>
  <div class="form-view-builder">
    <form-wrapper
      v-if="builder"
      ref="form"
      :fields="fields"
      :config="config">
      <form-layout
        class="form-itm-layout"
        v-for="schema in schemas"
        :key="schema.name"
        :config="config"
        :schema="schema"
        :controls="controls">
        <form-item
          :schema="schema"
          :config="config"
          :control="controls[schema.name]"
          :key="`form-${schema.name}`"
          :parent="''"
          :ref="`form-item-${schema.name}`"
          v-model="fields[schema.name]">
          <template v-if="schema.form.type === 'Slot'" v-slot:[schema.name]>
            <slot :name="schema.name" />
          </template>
        </form-item>
      </form-layout>
    </form-wrapper>
  </div>
</template>

<script>
import FormItem from './cell/form-item'
import FormLayout from './cell/form-layout'
import FormWrapper from './cell/form-wrapper'
import FormBuilder from './lib/form-builder'
export default {
  name: 'FormViewBuilder',
  components: {
    FormItem,
    FormLayout,
    FormWrapper,
  },
  provide() {
    return {
      builder: () => this.builder,
      builderRoot: this,
      state: this.state,
    }
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
      description: '数据源',
    },
    controls: {
      type: Object,
      default: () => ({}),
      description: '控制项',
    },
    state: {
      type: String,
      default: 'insert',
      description: '状态',
    },
    custom: {
      type: Object,
      default: null,
      description: '自定义方法配置项',
    },
    json: {
      type: Object,
      default: null,
      description: '配置文件',
    },
    initData: {
      type: Object,
      default: () => ({}),
      description: '初始化数据源',
    },
  },
  data() {
    return {
      builder: null,
      fields: this.value || {},
    }
  },
  computed: {
    schemas() {
      return this.builder ? this.builder.getSchema() : []
    },
    layout() {
      return this.builder ? this.builder.getLayout() : null
    },
    config() {
      return this.builder ? this.builder.getConfig() : {}
    },
  },
  watch: {
    fields: {
      handler(v) {
        // const fields = JSON.parse(JSON.stringify(v).replace(/("_uid.*?":".*?",?(?=")|,?"_uid.*?":".*?")/gi, ''))
        this.$emit('input', v)
      },
      deep: true,
    },
    value: {
      handler(v) {
        this.fields = v
      },
      deep: true,
    },
    json: {
      handler(v) {
        this.builder.setJson(v)
      },
      deep: true,
    },
    initData: {
      handler(v) {
        this.fields = this.builder.pares.merge(this.fields, v)
      },
      deep: true,
    },
  },
  created() {
    this.initFields()
  },
  methods: {
    initFields() {
      this.builder = new FormBuilder(this.fields, this.controls, this.json, {
        state: this.state,
        update: (value, path, val) => { // 更新数据的方法
          this.$set(value, path, val)
        },
        delete: (value, path) => { // 删除数据的方法
          this.$delete(value, path)
        },
        ...(this.custom || {}),
      })
    },
    validate(callback) {
      this.$refs.form.validate(callback)
    },
    validateField(name, callback) {
      this.$refs.form.validateField(name, callback)
    },
    updateFields(value) {
      Object.entries(value).forEach(([k, v]) => {
        if (typeof v !== 'object') {
          this.fields[k] = v
          // this.builder.update(this.fields, k, v)
        }
      })
    },
    mergeFields(val) {
      this.builder.pares.merge(this.fields, val)
    },
    getBaseItem(name) {
      const [formItem] = this.$refs[`form-item-${name}`]
      return formItem && formItem.gutInstance()
    },
  },
}
</script>

<style lang="scss" scoped>
.form-view-builder{
}
</style>

