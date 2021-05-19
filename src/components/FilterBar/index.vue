<!--
 * @作者: wrr (wangruirui@hztianque.com)
 * @描述:
 * @Date: 2021-04-28 15:57:59
-->
<template>
  <div class="filter-bar">
    <div v-for="item in columns" :key="item.key" class="filter-item-wrapper">
      <span v-if="item.label" class="filter-item-label">{{item.label}}:</span>
      <filter-item v-model="form[item.key]" :info="item"></filter-item>
    </div>
    <slot />
  </div>
</template>

<script>
import FilterItem from './cell/FilterItem'
export default {
  name: 'FilterBar',
  components: {
    FilterItem,
  },
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      form: {},
    }
  },
  watch: {
    form: {
      handler(newVal, oldVal) {
        if (!oldVal) { return }
        this.$emit('on-change', newVal)
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.columns.forEach(item => {
      this.$set(this.form, item.key, item.value || '')
    })
  },
  methods: {
    formData() {
      return this.form
    },
    reset() {
      this.columns.forEach(item => {
        this.$set(this.form, item.key, item.value || '')
      })
      this.$emit('on-search', this.form)
    },
  },
}
</script>

<style lang="scss" scoped>
.filter-bar{
  flex: none;
  margin-bottom: 16px;
  .filter-item-wrapper{
    float: left;
    margin-right: 24px;
    .filter-item-label{
      display: inline-block;
      padding-right: 10px;
    }
  }
  & > button{
    float: left;
    margin-right: 16px;
    &:nth-last-child(1){
      margin-right: 0
    }
  }
}
</style>