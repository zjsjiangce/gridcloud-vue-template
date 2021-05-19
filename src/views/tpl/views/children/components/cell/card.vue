<!--
 * @作者: wrr (wangruirui@hztianque.com)
 * @描述:
 * @Date: 2021-05-18 16:21:23
-->
<template>
    <div>
        <h4>姓名：{{data.name}}</h4>
        <h4>年龄：{{data.age}}</h4>
        <h4>住址：{{data.address}}</h4>
    </div>
</template>
<script>
export default {
  name: 'Card',
  props: {
    data: Object,
  },
}
</script>
<style lang="scss" scoped>

</style>