<template>
  <div class="v-table">
    <Table
      ref="gridList"
      :columns="columns"
      :data="data.data"
      no-data-text="<i class='no-data'>暂无数据</i>"
      :load-data="handleLoadData"
      :loading="loading"
      @on-row-click="(data,index) => $emit('on-row-click',data,index)"
      @on-selection-change="(selection) => $emit('on-selection-change',selection)"
      @on-filter-change="(cell) => $emit('on-filter-change', cell)">
    </Table>
    <Page
      v-if="pagenation && (data.total > data.size)"
      :current="data.curPage"
      :page-size="data.size || pagesize"
      :total="data.total"
      :page-size-opts="[15, 20, 25, 30]"
      show-total
      show-elevator
      show-sizer
      @on-page-size-change="(size) => $emit('on-page-size-change',size)"
      @on-change="(page) => $emit('on-change',page)" />
  </div>
</template>
<script>
export default {
  name: 'VTable',
  props: {
    pagenation: {
      type: Boolean,
      default: true,
    },
    columns: {
      type: Array,
    },
    data: {
      type: [Object, Array],
      default: () => {
        return {
          size: 15,
          page: 1,
          total: 1,
          data: [],
        }
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      pagesize: 10,
    }
  },
  methods: {
    handleLoadData(item, callback) {
      this.$emit('load-data', item, callback)
    },
    getSelection() {
      return this.$refs.gridList.getSelection()
    },
  },
}
</script>
<style lang="scss" scoped>
.v-table{
  /deep/ .ivu-table-tip{
    .no-data{
      display: inline-block;
      width: 64px;
      height: 41px;
      margin: 48px 0;
      background: url('../../assets/img/no-data-icon.png') no-repeat;
      background-size: 64px 41px;
      padding-top: 49px;
      color: #999999;
    }
  }
  /deep/ .ivu-table-fixed-body{
     background-color: #ffffff;
  }
  /deep/ .ivu-table-cell .ivu-btn-text{
    font-size: 14px;
    color: var(--primary-color);
    &:hover{
      background: transparent;
    }
    &:focus{
      box-shadow: none;
    }
  }
}
.ivu-page{
  margin-top: 16px;
  height: 28px;
  line-height: 28px;
  text-align: right;
  & /deep/ .ivu-page-prev,
  & /deep/ .ivu-page-next,
  & /deep/ .ivu-page-item-jump-next,
  & /deep/ .ivu-page-item{
    width: auto!important;
    height: 28px!important;
    line-height: 28px!important;
  }
  & /deep/ .ivu-page-total,
  & /deep/ .ivu-select-selected-value,
  & /deep/ .ivu-page-options-sizer .ivu-select-selection,
  & /deep/ .ivu-page-options-elevator,
  & /deep/ .ivu-page-options-elevator input{
    height: 28px!important;
    line-height: 28px!important;
  }
  & /deep/ .ivu-page-total{
    float: left;
  }

}
</style>
