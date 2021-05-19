<!--
 * @作者: wrr (wangruirui@hztianque.com)
 * @描述:
 * @Date: 2021-04-27 11:08:05
-->
<template>
  <div class="layout">
    <Layout style="height: 100%; width: 100%;overflow:hidden;">
    <Content class="content">
        <div class="breadcrumb">
          <div class="user-org" v-if="orgTreeType === 'org' || orgTreeType === 'depart'">
            <i class="iconfont icon-map" /> {{orgTreeType==='org'?'当前辖区：':'当前部门：'}}
            <org-tree
              simple
              :type="orgTreeType"
              @on-change="updateCurrentOrg"></org-tree>
          </div>
        </div>

        <div class="slot-wrapper" ref="slot-wrapper">
          <slot />
        </div>
      </Content>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'TplLayout',
  data() {
    return {
      breadList: [],
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters['globe/user/userInfo']
    },
    orgTreeType() {
      return this.$route.meta.orgType || 'org'
    },
  },
  created() {
    //监听基座路由变化
    this.$moduleEmitter.on('rootRoute', (path) => {
      this.$router.replace(path)
    })
    this.$moduleEmitter.on('pageBtnUpdate', (rst) => {
      this.$store.commit('globe/user/updatePageBtns', rst)
    })
    this.$moduleEmitter.on('breadUpdated', (bread) => {
      this.breadList = bread
    })
  },
  beforeDestroy() {
    this.$moduleEmitter.rmAll('rootRoute')
    this.$moduleEmitter.rmAll('pageBtnUpdate')
    this.$moduleEmitter.rmAll('breadUpdated')
  },
  methods: {
    updateCurrentOrg(org) {
      this.$store.commit('globe/org/updateOrg', org)
    },
  },
}
</script>

<style lang="scss" scoped>
  .layout{
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
    width: 100%;
    min-width: 1160px;
    height: 100%;
  }
  .content{
    height: 100%;
    background: #F3F3F3;
    display: flex;
    flex-direction: column;
    .breadcrumb{
      height: 42px;
      line-height: 42px;
      background: #fff;
      padding: 0 16px;
      flex: none;
      .ivu-breadcrumb{
        float: left;
        height: 42px;
        font-size: 12px;
        & /deep/ a{
          color: #999999;
        }
        & /deep/ .ivu-breadcrumb-item-separator{
          color: #999999;
        }
      }
      .user-org{
        float: right;
        .icon-map{
          font-size: 14px;
          color: var(--primary-color);
        }
      }
    }
    .slot-wrapper{
      flex: auto;
      width: 100%;
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 100%;
      // height: calc(100% - 42px);
      // padding: 16px;
    }
  }
  .ivu-menu{
    min-height: 100%;
    color: var(--menu-font-color);
    .ivu-menu-submenu-title > i,
    .ivu-menu-submenu-title span > i{
      margin-right: 0px;
    }
    .ivu-menu-item > i{
      margin-right: 0px;
    }
    &.menu-item span{
      display: inline-block;
      overflow: hidden;
      width: 84px;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: bottom;
      transition: width .2s ease .2s;
      margin-left: 10px;
    }
    &.collapsed-menu span{
      width: 0px;
      transition: width .2s ease;
    }
    &.collapsed-menu /deep/ .ivu-icon{
      display: none;
    }
  }

</style>
