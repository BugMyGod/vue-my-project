<template>
  <el-row class="terminal-wrapper" style="overflow-y:auto">
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
// import 'xterm/css/xterm.css'
// import { Terminal } from 'xterm'
// import { FitAddon } from 'xterm-addon-fit'
// import { AttachAddon } from 'xterm-addon-attach'

export default {
  name: '',
  components: {},
  props: [],
  data() {
    return {
      socketURL: 'ws://127.0.0.1:7912/term',
      term: null,
      socket: null
    }
  },
  computed: {
  },
  watch: {},
  created() {},
  mounted() {
    this.initSocket()
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {
    this.socket.close()
    this.term.dispose()
  },
  destroyed() {},
  activated() {},
  methods: {
    loadTerminal() {
      const term = new Terminal({
        fontSize: 14,
        cursorBlink: true
      })
      console.log('term1===', term)
      const attachAddon = new AttachAddon(this.socket)
      const fitAddon = new FitAddon()
      term.loadAddon(attachAddon)
      term.loadAddon(fitAddon)
      term.open(document.getElementById('xterm'))

      term.on('data', (data) => {
        console.log('on-data===', data)
      })

      fitAddon.fit()
      term.focus()
      this.term = term
      console.log('term2===', this.term)
    },
    initSocket() {
      this.socket = new WebSocket(this.socketURL)
      this.socketOnClose()
      this.socketOnOpen()
      this.socketOnError()
    },
    socketOnOpen() {
      this.socket.onopen = (e) => {
        // 链接成功后，加载终端
        console.log('链接成功后===', e)
        this.loadTerminal()
        // this.term.on('data', data => {
        //   console.log('data==', data)
        //   this.socket.send(new TextEncoder().encode('\x00' + data))
        // })
      }
    },
    socketOnClose() {
      this.socket.onclose = () => {
        console.log('close socket')
      }
    },
    socketOnError() {
      this.socket.onerror = () => {
        console.log('socket 链接失败')
      }
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
  .terminal {
      border: 5px solid black;
  }
}
</style>
