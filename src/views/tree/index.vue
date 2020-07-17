<template>
  <div class="">
    <p>jsoneditor</p>
    <json-editor :value="jsonValue" />
  </div>
</template>

<script>
import JsonEditor from '@/components/JsonEditor'
export default {
  components: {
    JsonEditor
  },
  data() {
    return {
      jsonValue: {
        'Array': [1, 2, 3],
        'Boolean': true,
        'Null': null,
        'Number': 123,
        'Object': { 'a': 'b', 'c': 'd' },
        'String': 'Hello World'
      }
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
