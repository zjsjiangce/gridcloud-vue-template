<!--
 * @作者: wrr (wangruirui@hztianque.com)
 * @描述:
 * @Date: 2021-04-27 11:24:19
-->
<template>
  <Drawer
    :title="title"
    v-model="modal"
    :transfer="transfer"
    class="drawer-modal"
    :width="width"
    :mask-closable="maskClosable"
    :closable="closable">
    <div class="drawer-modal-content">
      <slot />
    </div>
    <div v-if="$slots.footer" class="drawer-footer">
      <slot name="footer" />
    </div>
  </Drawer>
</template>
<script>
export default {
  name: 'DrawerModal',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '新增',
    },
    'mask-closable': {
      type: Boolean,
      default: false,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    width: {
      type: [String, Number],
      default: 720,
    },
    transfer: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      modal: false,
    }
  },
  watch: {
    value(newVal) {
      this.modal = newVal
    },
    modal(newVal) {
      this.$emit('input', newVal)
    },
    $route() {
      this.modal = false
    },
  },
  created() {
    this.modal = this.value
  },
}
</script>
<style lang="scss" scoped>
.drawer-modal{
  /deep/ .ivu-drawer-header-inner{
    font-size: 14px;
  }
  /deep/ .ivu-drawer-body{
    display: flex;
    flex-direction: column;
    padding: 0;
    .drawer-modal-content{
      padding: 24px 24px 0;
      flex: 1;
      overflow: auto;
      .address-form{
        width: 100%;
      }
      .form-split{
        margin-left: -8px;
      }
      .ivu-page{
        margin: 16px 0;
      }
    }
    .drawer-footer{
      width: 100%;
      flex: 0 0 32px;
      border-top: 1px solid #e8e8e8;
      padding: 10px 16px 10px;
      text-align: right;
      background: #fff;
      .ivu-btn{
        margin-left: 16px;
      }
    }
  }
}
</style>
