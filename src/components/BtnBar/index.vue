<!--
 * @作者: wrr (wangruirui@hztianque.com)
 * @描述:
 * @Date: 2021-04-27 11:18:01
-->
<template>
  <div class="btn-bar" v-if="btns.length">
    <Button
      v-for="(item,index) in pageBtns"
      :key="item.ename"
      :type="index===0?'primary':'default'"
      :disabled="item.ename in btnStatus && !btnStatus[item.ename]"
      @click="$emit('click',item.ename)">
      <i
        class="iconfont"
        :class="item.logo"
        v-if="item.logo" />
        {{item.cname}}
    </Button>

    <!-- 更改状态 -->
    <Dropdown
      v-if="setStatusBtn.length"
      @on-click="(name) => $emit('click',name)">
      <Button>设置状态</Button>
      <DropdownMenu slot="list">
        <DropdownItem
          v-for="item in setStatusBtn"
          :key="item.name"
          :disabled="btnStatus[item.ename]"
          :name="item.ename">
            {{item.name}}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>

    <!-- 导入导出 -->
    <Dropdown
      v-if="importExportBtn.length"
      @on-click="(name) => $emit('click',name)">
      <Button>
        <i v-if="importExportBtn.find(i => i.name==='导入')">导入</i>
        <i v-if="importExportBtn.find(i => i.name==='导出')">导出</i>
      </Button>
      <DropdownMenu slot="list">
        <DropdownItem
          v-for="item in importExportBtn"
          :key="item.name"
          :name="item.ename">
          {{item.name}}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
</div>
</template>
<script>
export default {
  name: 'BtnBar',
  props: {
    btns: { // 页面默认全部操作按钮
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      btnStatus: {},
    }
  },
  computed: {
    // 页面显示的按钮权限
    pageBtns() {
      // 后台返回按钮权限列表
      const btns = this.$store.getters['globe/user/pageBtns']
      const showBtns = []
      this.btns.forEach(item => {
        const target = btns.find(i => i.ename === item)
        if (!target) { return }
        if (target.cname === '导入' || target.cname === '导出') {
          const importBtns = btns.filter(i => i.cname === '导入')
          const exportBtns = btns.filter(i => i.cname === '导出')
          const importBtn = importBtns.find(i => this.btns.indexOf(i.ename) > -1)
          const exportBtn = exportBtns.find(i => this.btns.indexOf(i.ename) > -1)
          if (!(importBtn && exportBtn)) {
            showBtns.push(target)
          }
          return
        }
        if (
          target.cname !== '设置死亡' &&
          target.cname !== '取消死亡' &&
          target.cname !== '重新关注' &&
          target.cname !== '取消关注'
        ) {
          showBtns.push(target)
        }
      })

      return showBtns
    },
    setStatusBtn() {
      const btnList = this.$store.getters['globe/user/pageBtns']
      const statusBtn = []

      if (btnList.find(i => i.cname === '设置状态')) {
        const setDeathBtns = btnList.filter(i => i.cname === '设置死亡')
        const cancelDeathBtns = btnList.filter(i => i.cname === '取消死亡')
        const refocusBtns = btnList.filter(i => i.cname === '重新关注')
        const cancelFollowBtns = btnList.filter(i => i.cname === '取消关注')

        const setDeathBtn = setDeathBtns.find(i => this.btns.indexOf(i.ename) > -1)
        const cancelDeathBtn = cancelDeathBtns.find(i => this.btns.indexOf(i.ename) > -1)
        const refocusBtn = refocusBtns.find(i => this.btns.indexOf(i.ename) > -1)
        const cancelFollowBtn = cancelFollowBtns.find(i => this.btns.indexOf(i.ename) > -1)

        setDeathBtn && statusBtn.push({ name: '设置死亡', ename: setDeathBtn.ename })
        cancelDeathBtn && statusBtn.push({ name: '取消死亡', ename: cancelDeathBtn.ename })
        refocusBtn && statusBtn.push({ name: '重新关注', ename: refocusBtn.ename })
        cancelFollowBtn && statusBtn.push({ name: '取消关注', ename: cancelFollowBtn.ename })

      }
      return statusBtn
    },
    importExportBtn() {
      const btnList = this.$store.getters['globe/user/pageBtns']
      const btns = []
      const importBtns = btnList.filter(i => i.cname === '导入')
      const exportBtns = btnList.filter(i => i.cname === '导出')
      const importBtn = importBtns.find(i => this.btns.indexOf(i.ename) > -1)
      const exportBtn = exportBtns.find(i => this.btns.indexOf(i.ename) > -1)
      if (importBtn && exportBtn) {
        btns.push({ name: '导入', ename: importBtn.ename })
        btns.push({ name: '导出', ename: exportBtn.ename })
      }
      return btns
    },
  },
  methods: {
    // 设置按钮状态
    setStatus(status) {
      this.btnStatus = status
    },
  },
}
</script>
<style lang="scss" scoped>
.btn-bar{
  flex: 0 0 32px;
  > .ivu-btn, > .ivu-dropdown{
    vertical-align: top;
    margin-right: 16px;
    margin-bottom: 16px;
    &:nth-last-child(1){
      margin-right: 0
    }
  }
}
</style>
