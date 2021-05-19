<template>
  <div class="table-wrapper">
      <!-- 过滤器 -->
    <slot name="filter" />
      <!-- 操作按钮 -->
    <slot name="btns" />
      <!-- 内容 -->
    <slot />
  </div>
</template>

<script>
export default {
  name: 'PageContent',
}
</script>

<style lang="scss" scoped>
.table-wrapper{
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius:4px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  .v-table{
    flex: 1;
  }
}
</style>
