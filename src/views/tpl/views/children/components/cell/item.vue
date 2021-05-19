<!--
 * @作者: wrr (wangruirui@hztianque.com)
 * @描述:
 * @Date: 2021-05-18 15:08:02
-->

<script>
export default {
  name: 'ComponentItem',
  props: {
    label: String,
    labelWidth: {
      type: Number,
      default: 80,
    },
  },
  render(h) {
    return h('div', {
      class: 'component-item',
    }, [
      h('span', { class: 'component-label', style: { width: `${this.labelWidth}px` }}, `${this.label}:`),
      h('div', { class: 'component-content' }, [this.$slots.default]),
    ])
  },
}
</script>
<style lang="scss" scoped>
.component-item{
  padding: 10px;
  &:after{
    content: "";
    display: block;
    height: 0;
    clear:both;
    visibility: hidden;
  }
  .component-label{
    float: left;
    height: 32px;
    line-height: 32px;
  }
  .component-content{
    float: left;
    width: 50%;
    &>div{
      float: left;
      margin-right: 10px;
      &:last-child{
        margin: 0;
      }
    }
  }
}
</style>