<template>
  <el-row class="terminal-wrapper">
    <el-col :span="23" class="cmd-box">
      <p>
        <code>Ctrl+Ins</code>复制，
        <code>Shift+Ins</code>粘贴
      </p>
    </el-col>
    <el-col :span="23"><div id="xterm" ref="xterm" class="xterm-wrapper" /></el-col>
  </el-row>
</template>
<script>
import '../../../node_modules/xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
export default {
  name: '',
  components: {},
  props: [],
  data() {
    return {
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initXterm()
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    initXterm() {
      const terminalContainer = document.getElementById('xterm')
      const term = new Terminal({
        screenKeys: true,
        useStyle: true,
        cursorBlink: true
      // cols: 92,
      // rows: 22,
      // cursorBlink: true, // 光标闪烁
      // cursorStyle: "underline", // 光标样式  null | 'block' | 'underline' | 'bar'
      // scrollback: 800, //回滚
      // tabStopWidth: 8, //制表宽度
      // screenKeys: true //
      })
      const fitAddon = new FitAddon()
      term.loadAddon(fitAddon)
      term.open(terminalContainer)
      fitAddon.fit() // 自适应大小(使终端的尺寸和几何尺寸适合于终端容器的尺寸) 只是width
      term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
    }
  }
}
</script>
<style lang='scss' scoped>
.terminal-wrapper {
  .cmd-box {
    font-size: 0.75rem;
    .xterm-wrapper {
      margin-bottom: 1rem;
      line-height: 1.2;
      font-size: 12px;
      font-family: "Courier New", Courier, monospace;
      height: 30em;
    }
  }
  .el-col{
    margin-left: 10px;
  }
}
</style>
