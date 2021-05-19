<!--
 * @作者: wrr (wangruirui@hztianque.com)
 * @描述:
 * @Date: 2021-04-27 11:27:56
-->
<template>
  <div class="year-range-wrapper">
    <DatePicker
      type="year"
      placeholder="请选择"
      :value="startYear"
      @on-change="changeStartYear">
    </DatePicker>
    <span>~</span>
    <DatePicker
      ref="datePicker"
      type="year"
      placeholder="请选择"
      :value="endYear"
      :options="endYearOptions"
      @on-change="(year) => endYear = year">
    </DatePicker>
  </div>
</template>
<script>
export default {
  name: 'YearRange',
  props: {
    value: {
      type: Array,
    },
  },
  data() {
    return {
      startYear: '',
      endYear: '',
    }
  },
  computed: {
    yearrange() {
      return [this.startYear, this.endYear]
    },
    endYearOptions() {
      const startYear = Number(this.startYear)
      return {
        disabledDate(date) {
          const year = new Date(date).getFullYear()
          return year && year < startYear
        },
      }
    },
  },
  watch: {
    value(newVal) {
      const [start, end] = newVal
      this.startYear = start || ''
      this.endYear = end || ''
    },
    yearrange(newVal) {
      this.$emit('input', newVal)
    },
  },
  created() {
    const [start, end] = this.value
    this.startYear = start || ''
    this.endYear = end || ''
  },
  methods: {
    changeStartYear(year) {
      if (Number(year) > Number(this.endYear)) {
        this.endYear = ''
        this.$nextTick(() => {
          this.startYear = year
        })
        return
      }
      this.startYear = year
    },
  },
}
</script>
<style lang="scss" scoped>
.year-range-wrapper{
  width: 100%;
  height: 32px;
  line-height: 32px;
  display: flex;
  position: relative;
  span{
    display: inline-block;
    width: 20px;
    text-align: center;
    height: 100%;
    font-size: 18px;
    vertical-align: middle;
  }
  .ivu-date-picker{
    flex: 1;
  }
}
</style>