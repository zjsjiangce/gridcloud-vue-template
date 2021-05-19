<!--
 * @作者: wrr (wangruirui@hztianque.com)
 * @描述:
 * @Date: 2021-04-27 11:19:47
-->

<script>
export default {
  name: 'IconLevel',
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  render(h) {
    return h('div', {
      class: `icon_level level${this.value}`,
    }, [
      h('span'),
      h('span'),
      h('span'),
    ])
  },
}
</script>

<style lang="scss" scoped>
  .icon_level{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 25px;
    span{
      width: 7px;
      background-color: #D2D2D2;
      &:nth-of-type(1){
        height: 5px;
      }
      &:nth-of-type(2){
        height: 10px;
      }
      &:nth-of-type(3){
        height: 16px;
      }
    }
    &.level1{
      span:nth-of-type(1){
        background-color: #3BC602;
      }
    }
    &.level2{
      span:nth-of-type(1), span:nth-of-type(2){
        background-color: #FFA83A;
      }
    }
    &.level3{
      span{
        background-color: #FF5A2F;
      }
    }
  }
</style>