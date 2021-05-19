<!--
 * @作者: wrr (wangruirui@hztianque.com)
 * @描述:
 * @Date: 2021-04-27 11:23:14
-->
<template>
  <div class="btn-radio">
    <span
      class="btn-radio-item"
      :class="{active: activeData === item.value}"
      v-for="item in options"
      :key="item.name"
      @click="checkBtn(item.value)">
      <i>{{item.name}}</i>
      <Icon
        v-if="activeData === item.value"
        type="md-close"
        color="#979797"
        size="14"
        @click.stop="delet" />
    </span>
  </div>
</template>
<script>
export default {
  name: 'BtnRadio',
  props: {
    value: {
      type: [String, Number],
    },
    options: {
      type: Array,
    },
  },
  data() {
    return {
      activeData: null,
    }
  },
  watch: {
    value(newVal) {
      this.activeData = newVal
    },
  },
  created() {
    this.activeData = this.value
  },
  methods: {
    //选择标签
    checkBtn(id) {
      if (this.options.length > 1 && this.activeData && this.activeData !== id) {
        return this.$Message.warning('请先删除其他标签重新添加此标签！')
      }
      this.activeData = id
      this.$emit('input', id)
      this.$emit('on-change', id)
      this.$emit('on-click', id)
    },
    //删除标签
    delet() {
      this.$Modal.confirm({
        title: '确认',
        content: '<p>确定删除此标签吗？</p>',
        onOk: () => {
          this.activeData = null
          this.$emit('input', null)
          this.$emit('on-change', null)
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.btn-radio{
  .btn-radio-item{
    display: inline-block;
    height: 32px;
    line-height: 32px;
    color: #666666;
    font-size: 14px;
    padding: 0 12px;
    border: 1px dashed #DCDEE3;
    border-radius: 4px;
    margin-right: 16px;
    background: transparent;
    cursor: pointer;
    i{
      font-style: normal;
    }
    &.active{
      border-style: solid;
      border-color: #DCDEE3;
      background: #F8F8F8;
    }
    .ivu-icon{
      float: right;
      margin-top: 9px;
      margin-left: 40px;
    }
  }
}
</style>