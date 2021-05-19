<template>
  <div class="base-wrapper" :class="{border: border && label}">
    <p class="header line" :class="{line: !border}" v-if="label">
      <span class="label">{{conf.description}}&nbsp;</span>
      <i class="holder" />
      <Icon v-if="label && expendable" :type="expend ? 'ios-arrow-up' : 'ios-arrow-down'" @click="expend = !expend" />
    </p>
    <div
      class="wrapper"
      :class="{animation: label}"
      :style="`height: ${(expend || !label || !expendable) ? expendHeight : 0}px`">
      <div class="inner-wrapper">
        <form-layout
          class="form-layout"
          v-for="schema in schema || {}"
          v-if="schema.form"
          :key="schema.name"
          :config="config"
          :schema="schema">
          <form-item
            :parent="parent ? `${parent}.${conf.name}` : `${conf.name}`"
            v-model="formValue[schema.name]"
            :parentVal="formValue"
            :schema="schema" />
        </form-layout>
      </div>
    </div>
  </div>
</template>

<script>

import FormLayout from '../form-layout'
import BaseForm from '../mixin/base-form'
export default {
  name: 'BWrapper',
  components: {
    'form-item': () => import('../form-item'),
    FormLayout,
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
      expend: false,
      expendHeight: 60,
      formValue: this.value,
    }
  },
  computed: {
    schema() {
      return this.form.schema
    },
    label() {
      return !!this.formConfig.label
    },
    border() {
      return !!this.formConfig.border
    },
    expendable() {
      return !!this.formConfig.expend
    },
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    sizeUpdate([w, h]) {
      this.expendHeight = h
    },
  },
}
</script>

<style lang="scss" scoped>
.border{
  border: 1px solid #e4e4e4;
}
.base-wrapper{
  width: 100%;
  border-radius: 4px;
  .animation{
    transition: height .3s ease;
  }
  .wrapper{
    position: relative;
    overflow: hidden;
  }
  .inner-wrapper{
    width: 100%;
    position: relative;
    float: left;
    padding: 0px;
    .form-layout{
    }
  }
  .line{
    // padding: 10px;
    // &::before{
    //   position: absolute;
    //   content: "";
    //   display: block;
    //   left: 0;
    //   right: 0;
    //   top: 0;
    //   height:1px;
    //   background:rgba(230,230,230,1);
    //   opacity:1;
    // }
  }
  .header{
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px;

    .holder{
      flex: 1;
    }
    .label{
      display: inline-block;
      width: 90px;
      color: #666;
      padding: 0 14px 0 0;
      text-align: left;
      font-weight: 500;
    }
  }
}
</style>
