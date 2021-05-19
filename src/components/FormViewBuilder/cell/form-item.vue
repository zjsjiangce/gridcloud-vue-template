<template>
  <div
    class="form-ele"
    :class="{
      'form-view': isView,
      'has-padding': hasPadding,
      'label-top': labelPosition
    }">
    <div
      class="action-btn left"
      v-if="actions && actions.before && !isView"
      type="text"
      @click="handler(actions.before)">
      {{actions.before.text}}
      </div>
          <component
            class="item"
            v-model="formValue"
            ref="form-instance"
            :is="componentName"
            :form="from"
            :conf="schema"
            :parent="parent"
            :parentVal="parentVal"
            :custom="custom">
            <template v-if="type === 'Slot'" v-slot:[schema.name]>
              <slot :name="schema.name" />
            </template>
          </component>
          <div
            class="action-btn right"
            :class="{
              'top': labelPosition
            }"
            v-if="actions && actions.after && !isView"
            type="text"
            @click="handler(actions.after)">
            {{actions.after.text}}
      </div>
  </div>
</template>

<script>
import * as BaseEle from './base-ele/*.vue'
export default {
  name: 'FormItem',
  components: {
    ...BaseEle,
  },
  inject: ['builderRoot', 'builder', 'state'],
  props: {
    value: {
      type: [String, Number, Array, Object, Boolean, Date],
      default: null,
    },
    schema: {
      required: true,
      type: Object,
      default: () => ({}),
    },
    parent: {
      type: String,
      default: '',
    },
    config: {
      type: Object,
      default: () => ({
        gutter: 10,
        'label-colon': true,
        'label-position': 'right',
        'label-width': 90,
      }),
    },
    tip: {
      type: String,
      default: '',
    },
    parentVal: {
      type: [String, Number, Array, Object, Boolean, Date],
      default: null,
    },
  },
  data() {
    return {
      formValue: this.value,
    }
  },
  computed: {
    from() {
      return this.schema.form
    },
    actions() {
      return this.from.actions
    },
    type() {
      return this.from.type
    },
    isView() {
      return this.state === 'view'
    },
    labelWidth() {
      return this.config['label-width']
    },
    labelPosition() {
      return this.config['label-position'] === 'top'
    },
    componentName() {
      return `base-${this.type.toLocaleLowerCase()}`
    },
    custom() {
      return this.builder().custom[this.from.customConf]
    },
    hasPadding() {
      const invisibleType = ['Upload', 'Array', 'Wrapper']
      return invisibleType.indexOf(this.type) < 0
    },
  },
  watch: {
    formValue: {
      handler(v) {
        this.$emit('input', v)
      },
      deep: true,
    },
    value: {
      handler(v) {
        this.formValue = v
      },
      deep: true,
    },
  },
  mounted() {
    if (this.isView) {
      this.from.placeholder = ''
    }
  },
  methods: {
    handler(info) {
      this.builderRoot.$emit(info.handler, this.formValue)
    },
    gutInstance() {
      return this.$refs['form-instance']
    },
  },
}
</script>

<style lang="scss" scoped>
%view-style {
  border: none;
  color: #333;
  // background-color: transparent;
  cursor: auto;
}

.has-padding {
  margin: 0 var(--gutter);
}
.form-ele {
  position: relative;
  display: flex;
  justify-content: center;

  .item {
    flex: 1;
  }

  .action-btn {
    user-select: none;
    position: absolute;
    padding: 8px 8px 0;
    color: #3399ff;
    z-index: 100;
    cursor: pointer;
  }
  .left {
    left: 0;
    transform: translateX(-100%);
  }
  .right {
    right: 0;
    transform: translateX(100%);
  }
  .top {
    transform: translate(100%, 80%);
  }

  /deep/ .ivu-form-item {
    .ivu-cascader-disabled .ivu-input,
    .ivu-input-number-disabled .ivu-input-number-input,
    .ivu-input[disabled],
    .ivu-select-disabled .ivu-select-selection {
      cursor: auto;
    }
  }
}

.form-view {
  /deep/.ivu-form-item-content {
    .ivu-select-arrow,
    .ivu-icon-ios-calendar-outline {
      display: none;
    }
    .ivu-input,
    .ivu-input-number,
    .ivu-input-number-input,
    .ivu-select > div {
      @extend %view-style;
    }
  }
}

.label-top {
  /deep/ .ivu-form-item {
    .ivu-form-item-label {
      width: auto !important;
    }
    .ivu-form-item-content {
      margin-left: 0 !important;
    }
  }
}

//修改样式 和原本 formbuild 一致
.ivu-form-item {
  margin-right: 0px;
  & /deep/ .ivu-form-item-label {
    font-size: 14px;
    &::after {
      content: '\0020\0028\9009\586b\0029';
      color: #999999;
    }
  }
  // &.disabled /deep/ .ivu-form-item-label::after {
  //   display: none;
  // }
  &.ivu-form-item-required {
    & /deep/ .ivu-form-item-label::before,
    & /deep/ .ivu-form-item-label::after {
      display: none;
    }
  }
}
</style>
