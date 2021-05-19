<template>
  <Sider
    class="header-sider"
    v-model="isCollapsed"
    collapsible>
    <div v-if="!isSiderShow">
      <Menu
        theme="light"
        width="auto"
        ref="menus"
        :active-name="activeName"
        :open-names="openNames">
        <template v-for="menu in data">
          <Submenu
            v-if="menu.permissions"
            :key="menu.id"
            :name="menu.moduleName">
            <template slot="title">
              <Icon :custom="menu.ico"></Icon>
              {{menu.moduleName}}
            </template>
            <MenuItem
              v-for="itm in menu.permissions"
              :name="`${menu.moduleName}${itm.cname}`"
              :key="itm.id"
              @click.native="menuClick(menu.moduleName, itm)">
              {{itm.cname}}
            </MenuItem>
          </Submenu>
        </template>
      </Menu>
    </div>
    <div class="header-dropdown-content" v-else>
      <template v-for="menu in data">
        <Dropdown
          v-if="menu.permissions"
          :key="menu.id"
          placement="right-start"
          @on-click="name => menuClick(menu.moduleName, JSON.parse(name))">
          <Icon v-if="menu.ico" :custom="menu.ico" />
          <span>{{menu.moduleName.substr(0, 1)}}</span>
          <DropdownMenu slot="list">
            <DropdownItem
              v-for="itm in menu.permissions"
              :name="JSON.stringify(itm)"
              :key="itm.id"
              :selected="activeName === `${menu.moduleName}${itm.cname}`">
              {{itm.cname}}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </template>
    </div>
  </Sider>
</template>

<script>
export default {
  name: 'SiderMenu',
  props: {
    data: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      isCollapsed: false,
      isSiderShow: false,
      activeName: '',
      openNames: [],
      breadcrumbs: [],
    }
  },
  watch: {
    breadcrumbs: {
      handler(value) {
        this.updateSideMenu(value)
      },
      deep: true,
    },
    isCollapsed(value) {
      if (value) {
        this.isSiderShow = value
        return
      }
      setTimeout(() => {
        this.isSiderShow = value
      }, 200)
    },
  },
  mounted() {
    setTimeout(() => {
      this.updateSideMenu(this.breadcrumbs)
    }, 20)
  },
  methods: {
    // 侧边栏菜单点击事件
    menuClick(moduleName, row) {
      // 更新面包屑
      this.breadcrumbs = [moduleName, `${moduleName}${row.cname}`]
      this.$emit('sider-menu-click', row.normalUrl, row)
    },
    // 更新侧边栏选中菜单的值
    updateSideMenu(value) {
      if (!value.length || !this.$refs.menus) { return }
      const [openNames, activeName] = value
      this.openNames = [openNames]
      this.activeName = activeName
      this.$nextTick(() => {
        this.$refs.menus.updateOpened()
        this.$refs.menus.updateActiveName()
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.header-sider {
  /deep/ .ivu-layout-sider-trigger {
    color: #333;
  }
}
.header-dropdown-content {
  width: 100%;
  font-size: 14px;
  background: #fff;
  /deep/ .ivu-dropdown {
    display: block;
    padding: 14px 0;
    text-align: center;
  }
}
</style>
