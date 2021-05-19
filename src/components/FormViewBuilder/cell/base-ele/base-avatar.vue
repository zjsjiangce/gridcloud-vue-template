<template>
  <FormItem
    class="element-wrapper"
    ref="formItem"
    :label="conf.description"
    :rules="rules"
    :prop="parent ? `${parent}.${conf.name}` : conf.name">
    <i slot="label" />
    <div class="wrapper" :style="`--upload-w: ${width}px;--upload-h: ${height}px;`" ref="wrapper">
      <Spin fix v-if="isUploading">
        <Icon class="demo-spin-icon-load" type="ios-loading" size="18"></Icon>
        <div>上传中...</div>
      </Spin>
      <Upload
        class="upload ivu-select-selection"
        ref="upload"
        :show-upload-list="false"
        :accept="accept"
        :max-size="max"
        :disabled="disabled"
        :on-exceeded-size="handleMaxSize"
        :before-upload="beforeUpload"
        action="">
        <div class="content">
          <div class="img-holder" v-if="formValue">
            <img class="defalut-img" :src="formValue" :alt="formValue">
          </div>
          <div class="empty-holder" v-if="!formValue">
            <div class="empty-description">
              <Icon type="ios-camera" size="20"></Icon><br>
              <p>{{conf.description}}</p>
            </div>
          </div>

          <div class="close-btn" v-if="formValue && !isView" @click.stop="clear">
            <Icon type="md-close-circle" />
          </div>
        </div>
      </Upload>
    </div>
  </FormItem>
</template>

<script>
import BaseForm from '../mixin/base-form'
export default {
  name: 'BaseAvatar',
  mixins: [BaseForm],
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isUploading: false,
    }
  },
  computed: {
    documentUrl() {
      return encodeURIComponent(this.value)
    },
    accept() {
      return 'image/*'
    },
    width() {
      return this.formConfig.width || 128
    },
    height() {
      return this.formConfig.height || 128
    },
    max() {
      return this.formConfig.max || 2048
    },
    loadFunc() {
      if (this.formConfig.load && this.custom && this.custom[this.formConfig.load]) {
        return this.custom[this.formConfig.load]
      }
      return null
    },
  },
  methods: {
    beforeUpload(file) {
      if (file.size / 1024 > this.max) {
        this.$Message.warning(`文件超出最大限制(${this.max}KB)。`)
        return false
      }
      this.upload(file)
      return false
    },
    handleMaxSize() {
      this.$Message.warning(`文件超出最大限制(${this.max}KB)。`)
    },
    clear() {
      this.formValue = ''
    },
    async upload(payload) {
      this.isUploading = true
      const rst = this.loadFunc(payload)
      if (typeof rst.then === 'function') {
        this.formValue = await rst
      } else {
        this.formValue = rst
      }
      this.isUploading = false
    },
  },
}
</script>

<style lang="scss" scoped>
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
.wrapper {
  display: inline-block;
  position: relative;
  width: var(--upload-w);
  height: var(--upload-h);

  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  .ivu-select-selection{
    border-style: dashed;
  }
  .upload{
    display: inline-block;
    width: var(--upload-w);
    height: var(--upload-h);
    overflow: hidden;
    .content{
      position: relative;
      cursor: pointer;
      width: var(--upload-w);
      height: var(--upload-h);
      .close-btn{
        position: absolute;
        right: 10px;
        top: 0;
        font-size: 16px;
        color: #d4d4d4;
        &:hover{
          color: #333;
        }
      }
      .img-holder,.empty-holder{
        display: flex;
        width: var(--upload-w);
        height: var(--upload-h);
        /* border: 1px dashed #111111; */
        /* border-radius: 4px; */
        /* text-align: center; */
        .empty-description{
          text-align: center;
        }
        align-items: center;
        flex-direction: column;
        justify-content: center;

        .defalut-img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
