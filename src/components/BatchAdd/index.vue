<!--
 * @作者: wrr (wangruirui@hztianque.com)
 * @描述:
 * @Date: 2021-04-27 11:21:53
-->
<template>
  <div class="batch-add-wrapper">
    <div class="batch-add-list">
      <div class="batch-add-item" v-for="(item,index) in list" :key="index">
        <Input v-model="list[index]" placeholder="">
          <ButtonGroup slot="append">
            <Button @click="list.push('')">+</Button>
            <Button @click="list.length===1?list=[]:list.splice(index,1)">-</Button>
          </ButtonGroup>
        </Input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BatchAdd',
  props: {
    value: {
      type: [Array, String],
    },
  },
  data() {
    return {
      list: [''],
    }
  },
  watch: {
    value(newVal) {
      typeof newVal === 'object' ?
        this.list = this.value :
        this.list = this.value.split(',')
      this.list.length === 0 && (this.list.push(''))
    },
    list(newVal) {
      this.$emit('input', newVal)
    },
  },
  created() {
    if (this.value && this.value.length) {
      typeof this.value === 'object' ?
        this.list = this.value :
        this.list = this.value.split(',')
      this.list.length === 0 && (this.list.push(''))
    }
  },
}
</script>
<style lang="scss" scoped>
.batch-add-wrapper{
  .batch-add-item{
    margin-bottom: 8px;
    &:nth-last-child(1){
      margin: 0;
    }
  }
  /deep/ .ivu-input-group-append{
    width: 60px;
    padding: 0;
    .ivu-btn{
      width: 32px;
      padding: 0;
      text-align: center;
      box-sizing: border-box;
      &:focus{
        box-shadow: none;
      }
    }
  }
}
</style>