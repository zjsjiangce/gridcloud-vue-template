
/*
 * 作者: Jacen (shijiachen@hztianque.com)
 * 描述：图片上传表单组件，主要是多图片上传场景
 * 创建时间: Tuesday, 19th May 2020 5:20:25 pm
 */

<template>
  <FormItem
    class="element-wrapper"
    ref="formItem"
    :label="conf.description"
    :rules="rules"
    :prop="parent ? `${parent}.${conf.name}` : conf.name">
    <i slot="label" />
    <div class="img-list" :style="`--upload-w: ${width}px;--upload-h: ${height}px;`">
      <figure class="img-wrapper" v-for="src in formValue" :key="src">
        <img class="img-item" :src="src" :alt="src">
        <div class="close-btn" @click.stop="clear(src)" v-show="!disabled">
          <Icon type="md-close-circle" />
        </div>
      </figure>
      <div class="wrapper" ref="wrapper" v-show="formValue.length < count">
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
            <!-- <div class="img-holder" v-if="formValue">
              <img class="defalut-img" :src="formValue" :alt="formValue">
            </div> -->
            <div class="empty-holder">
              <div class="empty-description">
                <Icon type="ios-camera" size="20"></Icon><br>
                <p>{{conf.description}}</p>
              </div>
            </div>

            <!-- <div class="close-btn" v-if="formValue" @click.stop="clear">
              <Icon type="md-close-circle" />
            </div> -->
          </div>
        </Upload>
      </div>
    </div>
</FormItem>
</template>

<script>
import BaseForm from '../mixin/base-form'
export default {
  name: 'BaseImageUpload',
  mixins: [BaseForm],
  props: {
    value: {
      type: Array,
      default: () => ([]),
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
      return this.formConfig.max || 1024
    },
    count() {
      return this.formConfig.count || 5
    },
    loadFunc() {
      if (this.formConfig.load && this.custom && this.custom[this.formConfig.load]) {
        return this.custom[this.formConfig.load]
      }
      return null
    },
    clearFunc() {
      if (this.formConfig.clear && this.custom && this.custom[this.formConfig.clear]) {
        return this.custom[this.formConfig.clear]
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
    clear(src = '') {
      this.formValue = this.formValue.filter(val => src !== val)
      this.clearFunc && this.clearFunc(src, this.formValue)
    },
    async upload(payload) {
      this.isUploading = true
      const rst = this.loadFunc(payload)
      if (typeof rst.then === 'function') {
        const path = await rst
        if (this.formValue.length >= this.count) {
          this.isUploading = false
          this.$Message.warning(`最大上传数量: ${this.count}`)
          return
        }
        path && this.formValue.push(path)
      } else {
        if (this.formValue.length >= this.count) {
          this.isUploading = false
          this.$Message.warning(`最大上传数量: ${this.count}`)
          return
        }
        rst && this.formValue.push(rst)
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
  .element-wrapper{
    &::v-deep .ivu-form-item-label{
      display: none;
    }
  }
  .img-list{

    .img-wrapper{
      position: relative;
      display: inline-block;
      margin: 0 5px;
      border-radius: 4px;
      overflow: hidden;
      width: var(--upload-w);
      height: var(--upload-h);
      .close-btn{
        position: absolute;
        right: 10px;
        top: 0;
        font-size: 16px;
        color: #d4d4d4;
        cursor: pointer;
        &:hover{
          color: #333;
        }
      }
      .img-item{
        display: inline-block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
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
  }

</style>
