<template>
  <div class="tab-page-wrapper">
    <div class="tab-page-left">
      <header>
        <!-- <h3 class="title">{{title}}</h3> -->
        <div class="filter">
          <slot name="filter" />
        </div>

        <RadioGroup v-model="listType" type="button">
          <Radio label="card"><i class="iconfont iconkapian" />卡片</Radio>
          <Radio label="table"><i class="iconfont iconliebiao" />列表</Radio>
        </RadioGroup>
      </header>
      <div class="tab-page-content">
        <card-list
          v-if="listType === 'card'"
          ref="gridList"
          :data="data"
          :checkable="checkable"
          :cardRender="cardRender"
          @on-selection-change="(selection) => $emit('on-selection-change',selection)"
          @on-row-click="(data,index) => $emit('on-row-click',data,index)">
        </card-list>
        <Table
          v-if="listType === 'table'"
          ref="gridList"
          :columns="columns"
          :data="data.data"
          no-data-text="<i class='no-data'>暂无数据</i>"
          :load-data="handleLoadData"
          @on-selection-change="(selection) => $emit('on-selection-change',selection)">
        </Table>
        <Page
          v-if="data.totalPage>1"
          :current="data.page"
          :page-size="data.size"
          :total="data.total"
          :page-size-opts="[15, 20, 25, 30]"
          show-total
          show-elevator
          show-sizer
          @on-page-size-change="(size) => $emit('on-page-size-change',size)"
          @on-change="(page) => $emit('on-change',page)" />
      </div>
    </div>
    <!-- <div class="tab-page-right">
      <slot name="list" />
    </div> -->
  </div>
</template>
<script>
import cardList from './cell/cardList'
export default {
  name: 'TabPage',
  components: {
    'card-list': cardList,
  },
  props: {
    title: {
      type: String,
      default: '全部',
    },
    columns: {
      type: Array,
    },
    data: {
      type: Object,
      default: () => {
        return {
          data: [],
          page: 1,
          total: 1,
          size: 10,
        }
      },
    },
    checkable: {
      type: Boolean,
      default: false,
    },
    cardRender: {
      type: Function,
      default: (h) => h('div'),
    },
  },
  data() {
    return {
      listType: 'card',
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
.tab-page-wrapper{
  width: 100%;
  .tab-page-left{
    float: left;
    width: 100%;
    // width: calc(100% - 220px);
    padding-right: 24px;
    header{
      height: 26px;
      line-height: 26px;
      margin-bottom: 18px;
      .title{
        display: inline-block;
        height: 14px;
        line-height: 14px;
        padding-left: 6px;
        color: #333333;
        font-weight: 500;
        border-left: 2px solid var(--primary-color);
        margin-right: 8px;
      }
      .filter{
        display: inline-block;
        margin-right: 10px;
      }
      .ivu-radio-group{
        float: right;
        .ivu-radio-wrapper{
          height: 26px;
          line-height: 26px;
        }
      }
    }
  }
  // .tab-page-right{
  //   float: left;
  //   width: 220px;
  //   border-left: 1px solid #E9E9E9;
  //   min-height: 100%;
  //   li{
  //     height: 46px;
  //     line-height: 46px;
  //     cursor: pointer;
  //     font-size: 14px;
  //     border-left: 3px solid transparent;
  //     color: var(--primary-font-color);
  //     padding: 0 12px 0 16px;
  //     &.active,
  //     &:hover{
  //       border-left-color: var(--primary-color);
  //       background: #F5F7FD;
  //     }
  //   }
  // }
  .ivu-table-wrapper{
    margin-bottom: 24px;
    /deep/ .ivu-table-cell .ivu-btn-text{
      font-size: 14px;
      &:hover{
        background: transparent;
      }
      &:focus{
        box-shadow: none;
      }
    }
  }
  .ivu-page{
    text-align: right;
    & /deep/ .ivu-page-total{
      float: left;
    }
  }
}
</style>