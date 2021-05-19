
<script>
import { time } from '../../lib/form-builder/utils'

export default {
  props: {
    form: {
      required: true,
      type: Object,
      default: null,
    },
    conf: {
      required: true,
      type: Object,
      default: null,
    },
    parent: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      formValue: this.value,
    }
  },
  inject: ['builder', 'state'],
  computed: {
    custom() {
      return this.builder ? this.builder().custom : {}
    },
    placeholder() {
      return this.form.placeholder || ''
    },
    config() {
      return this.builder ? this.builder().getConfig() : {}
    },
    size() {
      return this.config.size
    },
    disabled() {
      return this.conf.controls.disabled[this.state] || false
    },
    readonly() {
      return this.conf.controls.visible[this.state] || false
    },
    isView() {
      return this.state === 'view'
    },
    validator() {
      return this.conf.validator || []
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
                if (!this.formValue && this.formValue !== 0 && !this.isView) {
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
          case 'period':
            return {
              // eslint-disable-next-line no-unused-vars
              validator: (rule, value, callback) => {
                const { period, other } = this.parentVal
                if (!period) {
                  callback(new Error('请选择有效期'))
                } else if (period === '0' && !/^[1-9][0-9]{0,3}$/.test(other)) {
                  callback(new Error('请输入1-9999'))
                } else {
                  return callback()
                }

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
    formConfig() {
      return this.conf.config || {}
    },
  },
  watch: {
    formValue: {
      handler(v) {
        if (Object.prototype.toString.call(v) === '[object Date]') {
          this.$emit('input', time(v))
        } else {
          this.$emit('input', v)
        }
        this.$refs.formItem && this.$nextTick(() => {
          this.$refs.formItem && this.$refs.formItem.validate('change')
        })
      },
      deep: true,
    },
    value: {
      handler(v) {
        this.formValue = v
      },
      deep: true,
    },
  },
  mounted() {
    if (this.isView) {
      this.form.placeholder = ''
    }
  },
}
</script>