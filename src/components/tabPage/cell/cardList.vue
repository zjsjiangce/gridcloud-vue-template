<script>
export default {
  name: 'CardList',
  props: {
    data: {
      type: Object,
    },
    checkable: {
      type: Boolean,
      default: false,
    },
    cardRender: {
      type: Function,
    },
  },
  data() {
    return {
      selRows: [], // 用来存放勾选的数据
    }
  },
  methods: {
    checkedChange() {
      this.selRows = this.data.data.filter(i => i._checked)
      this.$emit('on-selection-change', this.selRows)
    },
    getSelection() {
      return this.selRows
    },
  },
  render(h) {
    if (this.data.data && !this.data.data.length) {
      return h('div', {
        class: 'g-no-data',
      }, [
        h('img', {
          attrs: {
            src: require('../../../assets/img/no-data-icon.png'),
          },
        }),
        h('p', {}, '暂无数据'),
      ])
    }
    return h('div', {
      class: 'card-list-wrapper',
    }, [h('div', {
      class: 'card-list-content',
    }, this.data.data && this.data.data.map((item, index) => {
      return h('div', {
        class: `card-list-item ${item._checked ? 'checked' : ''}`,
        on: {
          click: () => {
            this.$emit('on-row-click', item, index)
          },
        },
      }, [this.cardRender(h, item), this.checkable && h('span', {
        on: {
          click(e) {
            e.stopPropagation()
          },
        },
      }, [h('Checkbox', {
        props: {
          value: item._checked,
        },
        on: {
          'on-change': (bool) => {
            this.$set(item, '_checked', bool)
            this.checkedChange()
          },
        },
      })])])
    }))])
  },

}
</script>
<style lang="scss" scoped>
.g-no-data{
  text-align: center;
  width: 100%;

  img{
    margin-top: 46px;
    height: 42px;
    width: 64px;
  }
  p{
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
    margin-top: 8px;
  }
}
.card-list-wrapper{
  overflow-x: hidden;
  .card-list-content{
    width: calc(100% + 24px);
  }
  .card-list-item{
    position: relative;
    border: 1px solid #E9E9E9;
    border-radius: 4px;
    margin: 0 24px 24px 0;
    &.checked,
    &:hover{
      border-color: var(--primary-color);
    }
    .ivu-checkbox-wrapper{
      position: absolute;
      top: 16px;
      right: 16px;
      margin-right: 0;
      & /deep/ .ivu-checkbox-inner{
        width: 16px;
        height: 16px;
        border-radius: 16px;
        &::after{
          top: 2px;
          left: 5px;
        }
      }
    }
  }
}

@media (min-width: 1920px) {
  .card-list-item{
    display: inline-block;
    width: calc(50% - 24px);
  }
}
</style>