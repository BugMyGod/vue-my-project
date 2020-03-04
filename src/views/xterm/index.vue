<template>
  <el-row class="terminal-wrapper" style="overflow-y:auto">
    <el-col :span="23" class="cmd-box">
      <p>
        <code>Ctrl+Ins</code>复制，
        <code>Shift+Ins</code>粘贴
      </p>
    </el-col>
    <el-col :span="23">
      <div id="xterm" ref="xterm" class="xterm-wrapper" />
    </el-col>
  </el-row>
</template>
<script>
import '../../../node_modules/xterm/dist/xterm.css'
// import { Terminal } from 'xterm'
import { Terminal } from '../../../node_modules/xterm/dist/xterm.js' //  "xterm": "^2.9.2"
import * as fit from 'xterm/lib/addons/fit/fit'

// // cdn引入
// import { Terminal } from 'xterm'
// // import  ResizeSensor from 'ResizeSensor'
// import * as fit from 'fit'

export default {
  name: '',
  components: {},
  props: [],
  data() {
    return {
    }
  },
  computed: {
  },
  watch: {},
  created() {},
  mounted() {
    setTimeout(() => {
      this.loadTerminal()
    }, 2000)
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    /* 终端 */
    loadTerminal() {
      // let term
      console.log('new Terminal==', Terminal())
      let term = new Terminal({
        screenKeys: true,
        useStyle: true,
        cursorBlink: true
      })
      const ws = new WebSocket('ws://127.0.0.1:7912/term')
      ws.binaryType = 'arraybuffer'

      function ab2str(buf) {
        return String.fromCharCode.apply(null, new Uint8Array(buf))
      }

      ws.onopen = (evt) => {
        console.log('on-open===', evt)
        // console.log('new Terminal==', new Terminal())
        // term = new Terminal({
        //   screenKeys: true,
        //   useStyle: true,
        //   cursorBlink: true
        // })
        term.on('data', data => {
          console.log('data===', data)
          ws.send(new TextEncoder().encode('\x00' + data))
        })

        term.on('resize', evt => {
          console.log('resize===', evt)
          ws.send(new TextEncoder().encode('\x01' + JSON.stringify({
            cols: evt.cols,
            rows: evt.rows
          })))
        })

        term.on('title', title => {
          console.log('title', title)
        })

        term.open(this.$refs.xterm, { focus: true })
        term.fit()
        this.term = term

        // new ResizeSensor(this.$refs.xterm, function(e) {
        //   console.log('Resize', e)
        //   term.resize()
        //   term.fit()
        // })
      }

      ws.onmessage = (evt) => {
        if (evt.data instanceof ArrayBuffer) {
          term.write(ab2str(evt.data))
        } else {
          alert(evt.data)
        }
      }

      ws.onclose = (evt) => {
        term.write('Session terminated')
        term.destroy()
      }

      ws.onerror = (evt) => {
        console.log(evt)
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
  .el-col {
    margin-left: 10px;
  }
  .terminal {
    border: 5px solid black;
  }
}
</style>
