<template>
  <div class="base-array">
    <p class="label" v-if="label">
      <span>{{conf.description}}{{config['label-colon'] ? ':' : ''}}</span>
      <Button
        v-if="!autoInsert"
        class="add-btn"
        :size="size"
        @click="add">
        新增{{conf.description}}
      </Button>
    </p>
    <Row
      type="flex"
      class="array-form-item-wrapper"
      :class="{border: border}"
      v-for="(fields, index) in formValue"
      :key="`${fields._uid}_${index}`">
      <Col span="21">
        <form-layout
          class="form-itm-layout"
          v-for="schema in schemas[fields._uid] ? schemas[fields._uid].conf : {}"
          :key="schema.name"
          v-if="schema.form"
          :config="config"
          :schema="schema">
          <form-item
            :schema="schema"
            :parent="parent ? `${parent}.${conf.name}.${index}` : `${conf.name}.${index}`"
            :ref="`form-${index}-${schema.name}`"
            v-model="fields[schema.name]" />
        </form-layout>
      </Col>
      <Col span="3" v-if="!disabled">
        <div class="btn-wrapper">
          <Button
            v-if="autoInsert && formValue.findIndex(v => v._uid === fields._uid) === 0 && !isView && addBtn"
            style="color: #3399FF"
            :size="size"
            icon="iconfont iconfont-basedata icon-basedata-plus"
            @click="add">
            添加{{conf.description}}
          </Button>
          <Button
            v-else-if="(label || (autoInsert && formValue.findIndex(v => v._uid === fields._uid) > 0)) && delBtn && !isView"
            style="text-align: right; color: #FF3341"
            icon="iconfont iconfont-basedata icon-basedata-delete"
            :size="size"
            @click="del(fields._uid)">
            删除
          </Button>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>

import FormLayout from '../form-layout'
import BaseForm from '../mixin/base-form'

export default {
  name: 'BArray',
  components: {
    'form-item': () => import('../form-item'),
    FormLayout,
  },
  mixins: [BaseForm],
  props: {
    value: {
      type: Array,
      default: () => [],
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
    autoInsert() {
      return !this.label
    },
    border() {
      return !!this.formConfig.border
    },
    label() {
      return !!this.formConfig.label
    },
    uidsValues() {
      return this.formValue.map(m => m._uid).join(',')
    },
    valueLength() {
      return this.formValue.length
    },
    repeat() {
      return this.conf.config.repeat
    },
    repeatNames() {
      return this.conf.config.repeatNames || ''
    },
    addBtn() {
      return this.conf.config.addBtn || false
    },
    delBtn() {
      return this.conf.config.delBtn || true
    },
  },
  watch: {
    formValue: {
      handler(v, o) {
        this.transSchemas(v, o)
        this.lastFormValue = JSON.parse(JSON.stringify(v))
      },
      deep: true,
    },
  },
  mounted() {
    if (this.autoInsert && this.valueLength === 0) {
      const { uid, ...conf } = this.schema()
      this.schemas[uid] = conf
    } else if (this.formValue.length > 0) {
      this.formValue.forEach((value) => {
        const { uid, ...conf } = this.schema(false)
        value['_uid'] = uid
        this.schemas[uid] = conf
      })
    }
    this.lastFormValue = []
  },
  methods: {
    add() {
      const { uid, ...conf } = this.schema()
      this.schemas[uid] = conf
    },
    del(uid) {
      this.schemas[uid].del()
    },
    transSchemas(v, o) {
      const { valueLength, schema, repeat, repeatNames = '', lastFormValue, uidsValues } = this
      // console.log()
      if (v.length !== valueLength) {
        console.log(222, v.map(m => m._uid).join(','))
        if (valueLength > Object.keys(this.schemas).length) {
          this.schemas = {}
          v.forEach((value) => {
            const { uid, ...conf } = schema(false)
            this.$set(value, '_uid', uid)
            this.schemas[uid] = conf
          })
        }
      } else if (valueLength === 0) {
        const { uid, ...conf } = schema()
        this.schemas[uid] = conf
      } else {
        const uids = o.map(m => m._uid).join(',')
        if (uids !== uidsValues) {
          this.schemas = {}
          v.forEach((value) => {
            const { uid, ...conf } = schema(false)
            this.$set(value, '_uid', uid)
            this.schemas[uid] = conf
          })
        }
      }
      // 是否允许重复
      if (!repeat) {
        if (v.length !== lastFormValue.length) { return }
        const repeatFields = repeatNames.split(',')
        const isAllCheck = repeatNames === ''// 全部字段都做排重
        v.forEach((r, i) => {
          // 1 拿到每一组数据
          // 2 判断每一组数据中的字段是否在其他数据中重复
          // 3 如果重复 则清空该字段对应的form 即调用 clear 方法
          if (i !== 0) {
            Object.keys(r).forEach(k => {
              if ((isAllCheck || repeatFields.includes(k)) && k !== '_uid') {
                const isRepeated = v.filter(f => (f[k] === r[k] && f[k])).length > 1
                if (isRepeated) {
                  this.$nextTick(() => {
                    console.log('触发clear')
                    this.$refs[`form-${i}-${k}`][0].gutInstance().clear()
                    this.$Message.warning('该配置已存在!')
                  })
                }
              }
            })
          }
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.base-array{
  width: 100%;
  border-radius: 4px;
  .label{
    padding: 0 10px 10px;
    span{
      display: inline-block;
      width: var(--label-width, 90px);
      padding: 10px 12px 10px 0;
      text-align: var(--label-position, right);
    }
  }
  .inner-wrapper{
    padding: 0px;
  }
  .border{
    padding: 15px 0;
    border: 1px solid #d5d5d5;
    border-radius: 4px;
  }
  .array-form-item-wrapper{
    .btn-wrapper{
      button{
        outline: none;
        border: none;
      }
      /deep/ .ivu-icon{
        vertical-align: 0em;
      }
      /* display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start; */
    }
  }
}
</style>
