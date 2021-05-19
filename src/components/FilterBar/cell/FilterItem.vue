<template>
  <div class="filter-item">
    <!-- 输入框 -->
    <Input
      v-if="inputTypes.includes(info.type)"
      v-model="itemValue"
      :type="info.type"
      :placeholder="info.placeholder || `请输入${info.label}`"
      :style="{width: `${info.width}px`}"
      :rows="info.rows || 4"
      :search="info.search"
      :disabled="info.disabled"
      :readonly="info.readonly">
      <span slot="prepend" v-if="info.prepend">{{info.prepend}}</span>
      <span slot="append" v-if="info.append">{{info.append}}</span>
    </Input>

    <!-- 数字框 -->
    <InputNumber
      v-if="info.type === 'number'"
      v-model="itemValue"
      :placeholder="info.placeholder || `请输入${info.label}`"
      :style="{width: `${info.width}px`}"
      :min="0"
      :precision="info.precision || 0"
      :disabled="info.disabled"
      :readonly="info.readonly"></InputNumber>

    <!-- select -->
    <Select
      v-if="info.type === 'select'"
      v-model="itemValue"
      transfer
      :placeholder="info.placeholder || `请选择${info.label}`"
      :style="{width: `${info.width}px`}"
      :multiple="info.multiple || false"
      :disabled="info.disabled"
      :readonly="info.readonly">
      <Option
        v-for="item in (info.options || [])"
        :key="item.value"
        :value="item.value || ''"
        :label="item.label"
        :disabled="item.disabled">
        {{item.label}}
      </Option>
    </Select>

    <!-- 日期选择 -->
    <DatePicker
      v-if="dataTypes.includes(info.type)"
      transfer
      :value="itemValue"
      :type="info.type"
      :placeholder="info.placeholder || '请选择日期'"
      :format="info.format || 'yyyy-MM-dd'"
      :placement="info.placement"
      :options="info.options"
      :disabled="info.disabled"
      :readonly="info.readonly"
      @on-change="$emit('input', $event)">
    </DatePicker>
  </div>
</template>
<script>
export default {
  name: 'FilterItem',
  props: {
    value: {
      type: [String, Number, Array, Object],
      default: null,
    },
    info: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      itemValue: null,
      inputTypes: ['text', 'password', 'textarea', 'url', 'email' ],
      dataTypes: ['date', 'daterange', 'datetime', 'datetimerange', 'year', 'month'],
    }
  },
  watch: {
    value: {
      handler(newVal) {
        this.itemValue = (this.info.type === 'number' ? Number(newVal) : newVal)
      },
      deep: true,
    },
    itemValue: {
      handler(newVal) {
        this.$emit('input', newVal)
      },
      deep: true,
    },
  },
  created() {
    this.itemValue = (this.info.type === 'number' ? Number(this.value) : this.value)
    typeof this.value === 'object' && (this.itemValue = JSON.parse(JSON.stringify(this.value)))
    // 数据字典直接提取值
    if (typeof this.info.options === 'function') {
      this.info.options = this.info.options.call(this)
    }
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.filter-item{
  display: inline-block;
}
</style>
