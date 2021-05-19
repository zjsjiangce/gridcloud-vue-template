<template>
  <page-content>
    <!-- 过滤器 -->
    <filter-bar slot="filter" ref="filterBar" :columns="filterForm">
      <Button type="primary" @click="search">搜索</Button>
      <Button @click="advancedSearchModal = true">高级搜索</Button>
    </filter-bar>
    <!-- 操作按钮区 -->
    <btn-bar
      ref="btnBar"
      :btns="btns"
      slot="btns"
      @click="btnBarHandle"></btn-bar>

    <!-- table表格 -->
    <v-table
      :loading="loading"
      :columns="columns"
      :data="listData"
      @on-row-click="(data,index) => viewData(data,index)"
      @on-page-size-change="(size) => {fetchListForm.pageSize=size,fetchList()}"
      @on-change="fetchList"
      @on-selection-change="(selections) => activeDatas = selections">
    </v-table>

    <!-- 高级搜索 -->
    <drawer-modal title="高级搜索" v-model="advancedSearchModal">
      <form-view-builder
        v-model="searchFormInfo"
        ref="searchForm"
        :json="formJson"
        state="insert"></form-view-builder>

      <div slot="footer">
        <Button @click="advancedSearchModal = false">取消</Button>
        <Button type="primary" @click="advancedSearchHandler">确定</Button>
      </div>
    </drawer-modal>

    <!-- 新增、编辑 -->
    <drawer-modal :title="formState==='insert'?'新增':formState==='update'?'编辑':'查看'" v-model="modal">
      <form-view-builder
        v-model="formInfo"
        v-if="modal"
        ref="addForm"
        :json="formJson"
        :state="formState"></form-view-builder>
      <div slot="footer">
        <Button @click="modal = false">取消</Button>
        <Button type="primary" @click="addOrEditHandler">确定</Button>
      </div>
    </drawer-modal>
</page-content>
</template>

<script>
import { formJsons } from './formBuild'

export default {
  name: 'TplHome',
  data() {
    return {
      filterForm: [
        {
          width: 240,
          label: '',
          key: 'title',
          type: 'text',
          placeholder: '请输入标题搜索',
          search: true,
        },
        {
          width: 152,
          label: '类型',
          key: 'type',
          type: 'select',
          value: -1,
          options: [
            { label: '全部', value: -1 },
            { label: '类型1', value: 1 },
            { label: '类型2', value: 2 },
          ],
        },
      ],
      advancedSearchModal: false,
      btns: ['add', 'delete', 'viewComponents'],
      loading: false,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        },
        {
          title: '姓名',
          key: 'name',
        },
        {
          title: '性别',
          key: 'sex',
        },
        {
          title: '年龄',
          key: 'age',
        },
        {
          title: '简介',
          key: 'details',
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, { row }) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small',
                },
                on: {
                  click: (e) => {
                    e.stopPropagation()
                    this.formState = 'update'
                    this.modal = true
                    this.$nextTick(() => {
                      this.formInfo = { ...row }
                    })
                  },
                },
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small',
                },
                on: {
                  click: () => {
                    console.log(row)
                  },
                },
              }, '删除'),
            ])
          },
        },
      ],
      listData: {
        size: 15,
        page: 1,
        total: 1,
        data: [],
      },
      fetchListForm: {},
      activeDatas: [],
      modal: false,
      searchFormInfo: {},
      formInfo: {},
      formState: 'insert', //insert、update、view
      formJson: formJsons[0],
    }
  },
  watch: {
    // 监听日期变化 自动修改年龄参数
    formInfo: {
      handler(newVal) {
        const { birthday } = newVal
        if (birthday) {
          const bir = new Date(birthday).getTime()
          const nowDate = new Date().getTime()
          const time = nowDate - bir
          const age = Math.ceil(time / 1000 / 60 / 60 / 24 / 365)
          if (newVal.age === age) { return }
          this.$refs.addForm.mergeFields({ age })
        } else {
          this.$refs.addForm.mergeFields({ age: 0 })
        }
      },
      deep: true,
    },
  },
  created() {
    // 模拟接收基座信息存储操作按钮权限
    this.$store.commit('globe/user/updatePageBtns', [
      { cname: '新增', ename: 'add' },
      { cname: '删除', ename: 'delete' },
      { cname: '查看组件', ename: 'viewComponents' },
    ])
  },
  methods: {
    // 搜索
    search() {},
    // 高级搜索
    advancedSearchHandler() {
      console.log(this.searchFormInfo)
    },
    // 操作按钮事件
    btnBarHandle(type) {
      switch (type) {
        case 'add':
          this.formState = 'insert'
          this.modal = true
          break
        case 'delete':
          if (this.activeDatas.length === 0) {
            return this.$Message.warning('请先选择数据！')
          }
          break
        case 'viewComponents':
          this.$router.push('/tpl/components')
          break

        default:
          break
      }
    },
    // 更新数据
    fetchList() {},
    // 新增事件
    addOrEditHandler() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$Message.success('新增成功！')
          this.modal = false
          this.listData.data.push({ ...this.formInfo })
        }
      })
    },
    // 查看详情
    viewData(data) {
      this.modal = true
      this.formState = 'view'
      this.$nextTick(() => {
        this.formInfo = { ...data }
      })
    },
  },
}
</script>
