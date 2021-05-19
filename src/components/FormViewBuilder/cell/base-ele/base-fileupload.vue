<template>
  <FormItem
    class="element-wrapper"
    ref="formItem"
    :label="conf.description"
    :label-width="config['label-width']"
    :rules="rules"
    :required="required && config['required-symbol']"
    :prop="parent ? `${parent}.${conf.name}` : conf.name">
    <div class="files-upload-wrapper" v-if="!isView">
      <Spin fix v-if="isUploading">
        <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
        <div>上传中...</div>
      </Spin>
      <Upload
        ref="upload"
        multiple
        :action="uploadAction"
        type="select"
        class="files-upload"
        :format="accept"
        :max-size="maxSize"
        :show-upload-list="false"
        :before-upload="handleBeforeUpload"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :on-exceeded-size="handleMaxSize"
        :on-format-error="uploadFormatErr">
        <Button>选择文件</Button>
        <span class="tip">{{tip}}</span>
      </Upload>
      <ul class="file-list" v-if="fileList.length > 0">
        <li v-for="(item,index) in fileList" :key="index">
          <i class="icon" />{{item.fileName}}
          <span class="remove-btn" @click="removeFile(index)">删除</span>
        </li>
      </ul>
    </div>
    <div v-if="isView && fileList.length > 0">
      <ul class="file-list">
        <li v-for="(item,index) in fileList" :key="index">
          <i class="icon" />{{item.fileName}}
          <span class="download-btn" @click="downloadFile([item])">下载</span>
        </li>
      </ul>
    </div>
  </FormItem>
</template>

<script>
import BaseForm from '../mixin/base-form'
export default {
  name: 'BaseFileUpload',
  mixins: [BaseForm],
  props: {
    form: {
      required: true,
      type: Object,
      default: null,
    },
    conf: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      isUploading: false,
      uploadNum: 0,
      fileList: [],
    }
  },
  computed: {
    required() {
      return this.validator.filter(v => v.type === 'required').length > 0
    },
    uploadAction() {
      return this.$store.getters['globe/user/userInfo'].nacosInfo.ossInfo.uploadUrl
    },
    ossGetPath() {
      return this.$store.getters['globe/user/userInfo'].nacosInfo.ossInfo.getUrl
    },
    // 接收那些文件
    accept() {
      return this.formConfig.accept || ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'pdf', 'doc', 'ppt', 'rar', 'zip', 'xlsx', 'xls', 'txt', 'docx', 'pptx']
    },
    // 接收那些文件
    tip() {
      return this.formConfig.tip || '支持文档、图片等文件上传；图片支持gif、jpg、jpeg、png等常用格式'
    },
    maxSize() {
      return this.formConfig.max || 10240
    },
    maxFiles() {
      return this.formConfig.count || 10
    },
    isView() {
      return this.state === 'view'
    },
    rules() {
      return (this.validator || []).map(v => {
        // eslint-disable-next-line no-unused-vars
        const { type, trigger = 'change', regex = '', message } = v
        switch (type) {
          case 'required':
            return {
              // eslint-disable-next-line no-unused-vars
              validator: (rule, value, callback) => {
                const isFileList =  Array.isArray(this.formValue) && this.formValue.length > 0
                if (!this.isView && !isFileList) {
                  return callback(new Error(message ? message : '该信息为必填'))
                }
                callback()
              },
              trigger,
            }
          case 'regex':
            return {
              // eslint-disable-next-line no-unused-vars
              validator: (rule, value, callback) => {
                // eslint-disable-next-line no-eval
                if (this.formValue && !eval(regex).test(this.formValue) && !this.isView) {
                  return callback(new Error(message ? message : '该信息格式错误'))
                }
                callback()
              },
              trigger,
            }
          default:
            return {
              // eslint-disable-next-line no-unused-vars
              validator: (rule, value, callback) => callback(),
              trigger,
            }
        }
      })
    },
  },
  watch: {
    formValue: {
      handler(v) {
        this.fileList = [...v]
        this.uploadNum = v.length
      },
      deep: true,
    },
  },
  methods: {
    handleBeforeUpload(file) { //eslint-disable-line
      this.isUploading = true
      this.uploadNum++
      if (this.uploadNum > this.maxFiles) {
        this.$Message.warning(`附件个数不可超过${this.maxFiles}个！`)
        this.isUploading = false
        return false
      }
    },
    uploadSuccess(res, file, fileList) { //eslint-disable-line
      const [ , path] = res.split(',')[0].split('//')
      this.formValue.push({ fileName: file.name, ossKey: path })
      this.isUploading = false
    },
    uploadError(error, file, fileList) { //eslint-disable-line
      this.uploadNum--
      this.$Message.error('附件上传失败！')
      this.isUploading = false
    },
    uploadFormatErr(file, fileList) { //eslint-disable-line
      this.uploadNum--
      this.$Message.error('附件格式有误，请查证后上传！')
      this.isUploading = false
    },
    handleMaxSize() {
      this.uploadNum--
      this.isUploading = false
      this.$Message.error(`单个附件大小不能超过${this.maxSize / 1024}M！`)
    },
    removeFile(index) { //eslint-disable-line
      const files = this.$refs.upload.fileList
      const defaultFileNum = this.fileList.length - files.length
      if (defaultFileNum <= index) {
        files.splice(index - defaultFileNum, 1)
      }
      this.uploadNum--
      this.formValue.splice(index, 1)
    },
    downloadFile(arr) {
      arr.forEach(file => {
        const x = new XMLHttpRequest()
        x.open('GET', this.ossGetPath + file.ossKey, true)
        x.responseType = 'blob'
        x.onload = function () {
          const url = window.URL.createObjectURL(x.response)
          const a = document.createElement('a')
          a.href = url
          a.download = file.fileName
          a.click()
        }
        x.send()
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.files-upload-wrapper{
  .ivu-upload{
    &.files-upload{
      text-align: left;
      cursor: pointer;
      .tip{
        margin-left: 16px;
        color:#999999;
      }
    }
  }
}
.file-list{
  margin-top: 12px;
  li{
    padding: 0 10px;
    height: 32px;
    line-height: 32px;
    color: #333333;
    font-size: 14px;
    border-radius: 4px;
    list-style-type:none;
    cursor: default;
    .icon{
      float: left;
      width: 12px;
      height: 32px;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABUklEQVRYR+2XP0rEQBSH3y+BNFYKdm4pHsDSG4geIoTM3MBWa28wCSGHUNgTWHoAsdRO0MomkDwZMLKG3cyfzZAmKcN7833zy2SYAc38YGY+eQkope6I6NZGHsAHMz8lSXKTpunrsMdZwAW+CQPwHcfxeZZlL//e28yir/GF9/0AHoUQ114Cu+BSyp0plmV5wsyKmS9/oV9SyiNngbGZjwlokJbouu6thw7rjWvAFLtJQIOVUuwlYILrQYMJ2MCDCdjCgwi4wEMJ/C0Y0x4B4F0IsTLVOS3CzeKxgTWciIQQYh1MwGaFm+DOv+FYXDawbTXen2BJYElgSWBJYPYEoiha5Xmu93zvx/lIppT6JKJDTQSwBiB8JbwOpUVRPDDzlfeURxqtjuVVVZ21bfvMzAdTSjhdTOq6Pm2a5h7ABTMf7yMy+dVsH5ltvcZ7wdTA4Xg/wSMDMDEsFRAAAAAASUVORK5CYII=') no-repeat center;
      background-size: 12px 14px;
      margin-right: 8px;
    }
    .remove-btn, .download-btn{
      float: right;
      color: var(--primary-color);
      font-size: 12px;
      display: none;
    }
    &:hover{
      background: #EFF2F7;
      .remove-btn, .download-btn{
        display: inline-block;
      }
    }
  }
}
</style>
