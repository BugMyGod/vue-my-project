<template>
  <div>
    <div id="jsoneditor" style="width: 400px; height: 400px;" />
  </div>
</template>

<script>
// import  from ''
export default {
  name: 'JsonEditor',
  /* eslint-disable vue/require-prop-types */
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      jsonEditor: null
    }
  },
  watch: {
    value(value) {
      const editorValue = this.jsonEditor.get()
      if (value !== editorValue) {
        this.jsonEditor.set(value)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initJsonEditor()
    })
  },
  methods: {
    // 初始化jsonEditor
    initJsonEditor() {
      var container = document.getElementById('jsoneditor')
      const options = {
        mode: 'code',
        modes: ['code'],
        onError: function(err) {
          alert(err.toString())
        }
      }
      var editor = new this.$jsoneditor(container, options)
      this.jsonEditor = editor
      this.jsonEditor.set(this.value)
    },
    // 获取json
    getValue() {
      return this.jsonEditor.get()
    }
  }
}
</script>
<style scoped>
</style>
