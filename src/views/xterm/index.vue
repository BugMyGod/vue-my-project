<template>
  <div style="height:100%;">
    <el-row>
      <el-col>
        <p>
          <code>Ctrl+Ins</code>复制，
          <code>Shift+Ins</code>粘贴
        </p>
      </el-col>
    </el-row>
    <el-row style="height:100%;">
      <el-col style="height:100%;"><div ref="xterm" class="xterm" /></el-col>
    </el-row>
  </div>

</template>
<script>
// import { mapGetters } from 'vuex'
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'
import { FitAddon } from 'xterm-addon-fit'
export default {
  name: '',
  components: {},
  props: [],
  data() {
    return {
      terminal: null,
      fitAddon: null,
      address: '127.0.0.1:7912'
    }
  },
  computed: {
    // ...mapGetters(['deviceCurrent']),
    // address() {
    //   let ip = '127.0.0.1:7912' // local test
    //   if (this.deviceCurrent.model) {
    //     ip = this.deviceCurrent.model.addrRealDevice
    //   }
    //   return ip
    // }
  },
  watch: {},
  created() {},
  mounted() {
    this.loadTerminal()
  },
  methods: {
    loadTerminal() {
      this.$nextTick(() => {
        this.loadTerminal2()
      })
    },
    /* 终端 */
    loadTerminal2() {
      if (this.terminal) {
        return
      }
      let term
      const ws = new WebSocket('ws://' + this.address + '/term')
      ws.binaryType = 'arraybuffer'

      function ab2str(buf) {
        return String.fromCharCode.apply(null, new Uint8Array(buf))
      }

      ws.onopen = (evt) => {
        term = new Terminal()
        this.fitAddon = new FitAddon()
        term.loadAddon(this.fitAddon)

        term.onData(data => {
          console.log('onData==>', data)
          ws.send(new TextEncoder().encode('\x00' + data))
        })

        term.onResize(evt => {
          console.log('onResize==>', evt)
          ws.send(new TextEncoder().encode('\x01' + JSON.stringify({
            cols: evt.cols,
            rows: evt.rows
          })))
        })

        term.onTitleChange(title => {
          console.log('title', title)
        })

        term.open(this.$refs.xterm)
        this.fitAddon.fit()
        this.terminal = term
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
.xterm {
  height: 100%;
  background-color: black;
  padding-left: 5px;
}
</style>
