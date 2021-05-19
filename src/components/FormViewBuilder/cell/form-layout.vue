/*
 * 作者: Jacen (shijiachen@hztianque.com)
 * 描述: 决定表单布局以及相关信息展示的组件
 * 创建时间: Thursday, 30th April 2020 2:31:26 pm
 */

<template>
  <div
    is="Col"
    :id="schema.name"
    class="form-layout"
    :style="`--gutter: ${config.gutter}px;`"
    :span="schema.layout">
    <div v-if="schema.name.indexOf('space') !== 0" :class="`inner ${fixed ? 'fixed' : ''}`">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormLayout',
  inject: ['builder'],
  props: {
    schema: {
      type: Object,
      default: null,
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
  computed: {
    formType() {
      return this.schema.form.type
    },
    labelInvisible() {
      const invisibleType = ['Avatar', 'Array', 'Wrapper']
      return invisibleType.indexOf(this.formType) >= 0
    },
    fixed() {
      const fixedType = ['Avatar', 'ImgUpload']
      return fixedType.indexOf(this.formType) >= 0 || this.float
    },
    formConfig() {
      return this.schema.config || {}
    },
    float() {
      return this.formConfig.float || false
    },
  },
  mounted() {
    if (this.formType === 'ImgUpload') {
      console.log(this.schema, '!!!22')
    }
  },
}
</script>

<style lang="scss" scoped>
.form-layout{
  position: relative;

  .fixed{
    position: absolute;
    width: 100%;
    z-index: 1;
  }
/*
  .element-wrapper{
    width: 100%;
  }
  .no-lable{
    margin-bottom: 0;
    &::v-deep >.ivu-form-item-label{
      display: none;
    }
    &::v-deep .ivu-form-item-error-tip{
      margin-left: var(--label-width, 0px);
    }
  } */
}
</style>
