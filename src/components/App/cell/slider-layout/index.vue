<template>
  <Layout class="slider-layout-wrapper">
    <SiderMenu
      v-show="menus.length"
      :data="menus"
      @sider-menu-click="(name, row) => transformRouter(name, row)" />
    <Layout :style="{padding: '20px'}">
      <Content class="tpl-content">
        <template v-if="!iframeUrl">
          <slot />
        </template>
        <iframe class="iframe-content" v-else :src="iframeUrl" />
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import SiderMenu from './component/sider-menu'

// 测试数据
import devs from './assets/json/dev.json'

export default {
  name: 'SliderLayout',
  components: {
    SiderMenu,
  },
  props: {},
  data() {
    return {
      menus: devs.data,
      iframeUrl: '',
    }
  },
  created() {
    this.lastName = window.location.pathname
  },
  mounted() {
    //添加按钮权限的监听事件
    this.$moduleEmitter && this.$moduleEmitter.on('updateOperatePermission', (rst) => {
      this.$store.commit('globe/permission/UPDATE_OPERATE_PERMISSIONS', rst)
    })
  },
  methods: {
    // 路由跳转逻辑
    transformRouter(name, row) {
      const { jumpType } = row
      this.iframeUrl = ''
      // 外链
      if (jumpType === 'open') {
        window.open(name, '_blank')
      // iframe
      } else if (jumpType === 'iframe') {
        this.iframeUrl = name
      // 正常路由
      } else {
        if (this.lastName !== name) {
          this.$router.push(name)
          this.lastName = name
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.slider-layout-wrapper {
  width: 100%;
  height: 100%;
  /deep/ .ivu-layout {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
.slider-layout-wrapper {
  flex-direction: row;
}
.iframe-content{
  width: 100%;
  height: 100%;
}
.tpl-content{
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #fff;
  padding: 10px 20px 20px 20px;
}
</style>
