<template>
  <!-- 使用 useVirtual 属性开启虚拟滚动 使用虚拟滚动时，必须要固定表格高度和行高 -->
  <el-table
    :data="tableData"
    height="400"
    use-virtual
  >
    <el-table-column
      type="index"
      width="100"
      fixed
    />
    <el-table-column
      prop="date"
      label="日期"
      width="180"
    />
    <el-table-column
      prop="name"
      label="姓名"
      width="180"
    />
    <el-table-column
      prop="address"
      label="地址"
    />
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: Array.from({ length: 10000 }, () => ({
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }))
    }
  }
}
</script>
