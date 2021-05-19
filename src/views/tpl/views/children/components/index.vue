<template>
  <div class="components-wrapper">
    <Item label="等级标示">
      <icon-level :value="1"></icon-level>
      <icon-level :value="2"></icon-level>
      <icon-level :value="3"></icon-level>
    </Item>

    <Item label="年份区间">
      <year-range v-model="yearRange"></year-range>
    </Item>

    <Item label="批量添加">
      <batch-add v-model="batchData"></batch-add>
    </Item>

    <Item label="添加标签">
      <btn-radio v-model="labelRadio" :options="labelOptions"></btn-radio>
    </Item>

    <Item label="地图选址">
      <t-address></t-address>
    </Item>

    <Item label="卡片表格">
      <tab-page :columns="tabPageColumns" :data="tabPageData" :cardRender="cardRender"></tab-page>
    </Item>
  </div>
</template>
<script>
import Item from './cell/item'
import card from './cell/card'
export default {
  name: 'ComponentPage',
  components: { Item },
  data() {
    return {
      yearRange: [],
      batchData: [],
      labelRadio: 1,
      labelOptions: [{ name: 'aaa', value: 1 }, { name: 'bbb', value: 2 }],
      tabPageColumns: [
        { title: 'Name', key: 'name' },
        { title: 'Age', key: 'age' },
        { title: 'Address', key: 'address' },
      ],
      tabPageData: {
        data: [{
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03',
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01',
        }],
        page: 1,
        total: 1,
        size: 10,
      },
    }
  },
  mounted() {
    this.$el.style.cssText = `
      height: ${window.innerHeight - 42}px;
      overflow: auto
    `
  },
  methods: {
    /**
    * 卡片列表渲染
    */
    cardRender(h, data) { //eslint-disable-line
      return h(card, {
        props: {
          data,
        },
        on: {
          'on-click': (evt) => this.cardEventBack(evt),
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.components-wrapper{
  height: 100%;
  overflow: auto;
  .component-item{
    width: 100%;
    span.label{
      float: left;
    }
  }
}
</style>