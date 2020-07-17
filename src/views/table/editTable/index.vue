<template>
  <el-row class="">
    <el-col :span="24">
      <p>p-table</p>
    </el-col>
    <el-col :span="24">
      <p style="color: red">我是X + Y轴同时虚拟</p>
      <plx-table-grid
        ref="plTable2"
        :data="data.tableData"
        height="300"
      >
        <plx-table-column type="selection" width="55" fixed="left" />
        <plx-table-column type="index" width="100" fixed="left" />
        <plx-table-column
          v-for="item in columns2"
          :key="item.id"
          :resizable="item.resizable"
          min-width="180px"
          :prop="item.prop"
          :label="item.label"
          :fixed="item.fixed"
        />
      </plx-table-grid>
    </el-col>
  </el-row>
</template>

<script>
import 'pl-table/themes/index.css'
import { PlxTableGrid, PlxTableColumn } from 'pl-table'
export default {
  components: {
    PlxTableGrid,
    PlxTableColumn
  },
  data() {
    return {
      columns2: Array.from({ length: 400 }, (_, idx) => ({
        prop: 'address', label: '地址' + idx, width: 200, showOverflow: true, sortable: true, fixed: ''
      })),
      data: {
        tableData: Array.from({ length: 600 }, (_, idx) => ({
          id: idx + 1,
          date: '2016-05-03',
          name: 1,
          ab: '欢迎使用pl-table',
          address: 1 + idx
        }))
      },
      top: 0
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {

  }
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>
