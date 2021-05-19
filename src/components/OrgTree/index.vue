<!--
 * @作者: wrr (wangruirui@hztianque.com)
 * @描述:
 * @Date: 2021-04-27 11:12:14
-->
<template>
  <div class="org-tree" ref="orgTree">
    <div class="org-tree-header">
      <span
        :disabled="disabled"
        class="simple-text"
        v-if="simple"
        @click.stop="showDropdown=!showDropdown">
          {{type==='org'?selectOrg.orgName:selectOrg.deptName}}
        <Icon type="ios-arrow-down" :style="{transform: `rotate(${showDropdown?180:0}deg)` }" />
      </span>
        <!-- :value="type==='org'?selectOrgList.map(i => i.orgName).join('>'):selectOrgList.map(i => i.deptName).join('>')" -->
      <Input
        :class="`org-tree-input${flag}`"
        v-else
        :disabled="disabled"
        :value="type==='org'?selectOrg.orgName:selectOrg.deptName"
        @on-focus="showDropdown=true"
        @click.native="showDropdown=true"
        placeholder="请选择" />
        <!-- @on-focus="showDropdown=!showDropdown" -->
        <!-- @click.native.stop -->
    </div>
    <transition name="fade" mode="out-in" appear>
      <div
      v-show="showDropdown"
      class="org-tree-drapdown"
      ref="dropDown"
      @click.stop>
        <Select
          v-model="orgName"
          filterable
          ref="searchIpt"
          remote
          :remote-method="$Debounce(remoteMethod)"
          :loading="loading"
          @on-change="choseOrg">
          <Option
            v-for="(option, index) in searchResultList"
            :value="option.id"
            :key="index">
            {{option.orgName || option.deptName}}
          </Option>
        </Select>
        <div class="select-area-area">
          请选择：
            <span class="org-item" @click.stop="backRoot">全部</span>
            <span
              class="org-item"
              v-for="(item,index) in selectOrgList"
              :key="item.id"
              @click.stop="updateSelectList(index)">
              <span>{{type==='org'?item.orgName:item.deptName}}</span>
            </span>
        </div>

        <div class="children-area-list">
          <ul>
            <li v-for="item in childrenTree" :key="item.id" @click.stop="getChildOrgs(item)">
            {{type==='org'?item.orgName:item.deptName}}
            </li>
          </ul>
        </div>
        <div class="footer">
          <Button @click.native.stop="showDropdown = false">取消</Button>
          <Button :disabled="selectOrgList.length === 0" type="primary" @click.native.stop="updateOrg">确定</Button>
        </div>
      </div>
    </transition>
</div>
</template>
<script>
export default {
  name: 'OrgTree',
  props: {
    value: {
      type: [String, Number, Object, Array],
    },
    simple: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isDefEmyty: { //是否默认为空
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      orgName: '', //搜索区域名称
      rootOrgs: [], //根结点
      selectOrgList: [], //选中的层级列表
      selectOrg: {}, //选中的层级
      childrenTree: [], //子集
      showDropdown: false,
      loading: false,
      searchResultList: [],
      bool: {
        value: false,
      },
      hasDefaultVal: false,
      flag: Math.random(),
    }
  },
  watch: {
    showDropdown(newVal) {
      if (newVal) {
        this.orgName = ''
        const { x } = this.$refs.orgTree.getBoundingClientRect()

        if (x + 542 > document.body.clientWidth) {
          this.$refs.dropDown.style.right = 0
        } else {
          this.$refs.dropDown.style.left = 0
        }
      } else {
        this.$refs.searchIpt.setQuery(null)
      }
    },
    type() {
      this.getRootOrg()
    },
  },
  created() {
    this.type && this.getRootOrg()
    window.addEventListener('click', (e) => {

      if (e.target.offsetParent && (e.target.offsetParent.classList.contains('org-tree') || e.target.offsetParent.classList.contains('org-tree-drapdown') || e.target.offsetParent.classList.contains(`org-tree-input${this.flag}`))) {
        this.showDropdown = true
        return
      }
      this.showDropdown = false

    })
  },
  methods: {
    // 获取根节点
    getRootOrg() {
      let url = 'globe/org/getOrgRoot'
      if (this.type === 'depart') {
        url = 'globe/org/getDepartRoot'
      }
      this.$store.dispatch(url)
        .then(rst => {
          const [ defaultRoot ] = rst.field
          this.rootOrgs = rst.field
          this.selectOrg = defaultRoot
          // 默认值
          if (typeof this.value !== 'object' && this.value) {
            this.hasDefaultVal = true
            return this.loadTree()
          }
          this.hasDefaultVal = false
          this.getChildOrgs(defaultRoot, true)
        })

    },
    //获取子节点
    getChildOrgs(org, isFirst = false) {
      if (!org) { return }
      let url = 'globe/org/getOrgChild'
      let params = { parentId: org.id }
      if (this.type === 'depart') {
        url = 'globe/org/getDepartChild'
        params = { deptId: org.id }
      }
      this.$store.dispatch(url, params)
        .then(rst => {
          this.selectOrgList = rst.title
          this.childrenTree = rst.children
          if (isFirst) {
            this.selectOrg.children = this.childrenTree
            if (this.isDefEmyty) {
              this.selectOrg = {}
              this.$emit('on-change', '', [])
            } else {
              this.$emit('on-change', this.selectOrg, JSON.parse(JSON.stringify(this.selectOrgList)))
            }
          }

          if (this.hasDefaultVal) {
            this.selectOrg = this.selectOrgList[this.selectOrgList.length - 1]
            this.selectOrg.children = this.childrenTree
            this.$emit('on-change', this.selectOrg, JSON.parse(JSON.stringify(this.selectOrgList)))
            this.$emit('input', this.type === 'depart' ? this.selectOrg.orgCode : this.selectOrg.orgCode)
          }
        })
    },
    // 初始化默认层级
    loadTree() {
      this.$store.dispatch('globe/org/getOrgParents', { orgCode: this.value })
        .then(rst => {
          const orgList = rst.field
          this.getChildOrgs(orgList[orgList.length - 1])
        })
    },
    // 返回根结点
    backRoot() {
      this.selectOrgList = []
      this.childrenTree = this.rootOrgs
    },
    // 添加选中层级
    updateSelectList(index) {
      this.getChildOrgs(this.selectOrgList[index])
      this.selectOrgList = this.selectOrgList.splice(0, index + 1)
    },
    // 模糊搜索组织机构
    remoteMethod(name) {
      if (name.trim() !== '') {
        this.loading = true
        let url = 'globe/org/searchOrgList'
        let params = {
          'orgName': name,
        }
        if (this.type === 'depart') {
          url = 'globe/org/searchDepartList'
          params = {
            'deptName': name,
          }
        }
        this.$store.dispatch(url, params)
          .then(rst => {
            this.searchResultList = rst.field
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
    // 选中搜索层级
    choseOrg(id) {
      const target = this.searchResultList.find(i => i.id === id)
      this.getChildOrgs(target)
    },
    updateOrg() {
      this.selectOrg = this.selectOrgList[this.selectOrgList.length - 1]
      this.selectOrg.children = this.childrenTree
      this.$emit('on-change', this.selectOrg, JSON.parse(JSON.stringify(this.selectOrgList)))
      this.$emit('input', this.type === 'depart' ? this.selectOrg.orgCode : this.selectOrg.orgCode)
      this.showDropdown = false
    },
  },
}
</script>
<style lang="scss" scoped>
.org-tree{
  display: inline-block;
  color: #666;
  position: relative;
  // z-index: 99;
  .org-tree-header {
    height: 32px;
    line-height: 32px;
    .simple-text{
      cursor: pointer;
      font-weight: 500;
      color: #333333;
      user-select: none;
      .ivu-icon{
        transition: all .2s ease-in-out;
      }
    }
    .ivu-input{
      width: 542px;
      height: 32px;
      line-height: 32px;
    }
  }
  .org-tree-drapdown{
    width: 542px;
    padding: 12px 0 16px;
    box-sizing: border-box;
    min-height: 282px;
    height: auto;
    background: #fff;
    box-shadow:0px 2px 6px 0px rgba(0,0,0,0.14);
    border-radius:2px;
    position: absolute;
    top: 40px;
    will-change: top, left;
    transform-origin: center top;
    z-index: 9999;
  }
  .ivu-select,
  .select-area-area{
    padding: 0 12px;
    & /deep/ .ivu-select-dropdown{
      min-width: calc(100% - 24px)!important;
    }
  }
  .select-area-area{
    padding: 16px 12px;
    border-bottom: 1px solid #DDDDDD;
    span.org-item{
      display: inline-block;
      color: var(--primary-color);
      cursor: pointer;
      line-height: 24px;
      &::after{
        content: '>';
        color: var(--primary-color);
        padding: 0 5px;
      }
      &:nth-last-child(1)::after{
        display: none;
      }
      &:hover span{
        text-decoration: underline;
      }
    }
  }
  .children-area-list{
    min-height: 142px;
    padding: 15px 12px 0;
    overflow: hidden;
    ul{
      width: calc(100% + 24px)
    }
    li{
      float: left;
      height: 14px;
      line-height: 14px;
      color: #666666;
      margin: 0 24px 16px 0;
      cursor: pointer;
    }
  }
  .footer{
    text-align: right;
    padding-right: 16px;
    .ivu-btn{
      margin-left: 16px;
    }
  }
}

.fade-enter-active {
  animation: drop-show .5s;
}
.fade-leave-active {
  animation: drop-show .5s reverse;
}
@keyframes drop-show {
  0% {
    opacity: 0;
    transform: translateY(-8px)
  }
  100% {
    opacity: 1;
    transform: translateY(0)
  }
}
</style>
