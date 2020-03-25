<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div>
      <p>鼠标事件</p>
      <el-row class="img-box">
        <!--
            @mouseup="imouseup"
            @mousedown="imousedown"
            @mousemove.prevent="imousemove"
            @dblclick.prevent="idblclick"
            @mousewheel.prevent="iscroll"
            @contextmenu.prevent

            @dragstart.prevent
            @dragend.prevent
            @drag.prevent

            @keyup.prevent="ikeyup"
            @keydown.prevent="ikeydown"
            
            @ondragstart.prevent

            mousedown：鼠标的键钮被按下。
            mouseup：鼠标的键钮被释放弹起。
            click：单击鼠标的键钮。
            dblclick：鼠标的键钮被按下。
            contextmenu ：弹出右键菜单。
            mouseover：鼠标移到目标的上方。
            mouseout：鼠标移出目标的上方。
            mousemove：鼠标在目标的上方移动。

            在DOM3级事件中定义了9个鼠标事件：
            click：在用户单击主鼠标按钮（一般是左边的按钮）或按下回车键时触发
            dbclick：在用户双击主鼠标按钮时触发
            mousedown：在用户按下了任意鼠标按钮时触发
            mouseenter：在护镖光标从元素外部首次移动到元素范围之内时触发，这个事件不冒泡，而且在鼠标移动到后代元素上也不会触发
            mouseleave：在位于元素上方的鼠标光标移动到元素范围之外时触发。这个事件不冒泡，而且在鼠标移动到后代元素上也不会触发
            mousemove：当鼠标指针在元素内部移动时重复地触发
            mouseout：在鼠标指针位于一个元素上方，然后用户将其移动到另一个元素时触发
            mouseover：在鼠标指针位于一个元素外部，然后用户将其首次移入另一个元素边界之内时触发
            mouseup：在用户释放鼠标按钮时触发

            触发一个click事件会依次先后触发：
            mousedown
            mouseup
            click
        -->
        <el-col :span="8">
          <p>img</p>
          <img
            src="../../assets/img1.jpeg"
            alt
            @mousedown="imgMousedown"
            @mouseup="imgMouseup"
            @click="imgClick"
            @click.right.prevent="imgRightClick"
            @dblclick.prevent="imgDblclick"
            @mouseenter="imgMouseenter"
            @mouseleave="imgMouseleave"
            @mousemove="imgMousemove"
            @contextmenu.prevent="imgContextmenu"
            @mousewheel="imgMousewheel"
            @mouseover="imgMouseover"
            @mouseout="imgMouseout"
          >
        </el-col>
        <el-col :span="8" :offset="1">
          <p>div</p>
          <div
            class="div"
            @click.right.prevent="divRightClick"
            @mousewheel="divMousewheel"
          >
            <p>div1</p>
            <p>div2</p>
            <p>div3</p>
            <p>div4</p>
            <p>div5</p>
            <p>div6</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['name'])
  },
  methods: {
    /* ============img============== */
    // 按下了任意鼠标按钮时触发
    imgMousedown(e) {
      console.log('mousedown==', e)
    },
    // 释放鼠标按钮时触发
    imgMouseup(e) {
      console.log('mouseup==', e)
    },
    // 单击主鼠标按钮（一般是左边的按钮）或按下回车键时触发
    imgClick(e) {
      console.log('click==', e)
    },
    // 双击主鼠标按钮时触发
    imgDblclick(e) {
      console.log('dbclick==', e)
    },
    imgRightClick(e) {
      console.log('imgRightClick==', e)
    },
    imgMouseenter(e) {
      // console.log('mouseenter==', e)
    },
    imgMouseleave(e) {
      // console.log('mouseleave==', e)
    },
    // 鼠标指针在元素内部移动时重复地触发
    imgMousemove(e) {
      // console.log('mousemove==', e)
    },
    // 弹出右键菜单
    imgContextmenu(e) {
      console.log('contextmenu==', e)
    },
    // 鼠标滚轮事件
    imgMousewheel(e) {
      console.log('mousewheel==', e)
    },
    imgMouseover(e) {
      // console.log('mouseover==', e)
    },
    imgMouseout(e) {
      // console.log('mouseout==', e)
    },
    /* ============div=========== */
    divRightClick(e) {
      console.log('divRightClick--', e)
    },
    // 鼠标滚轮事件
    divMousewheel(e) {
      console.log('divMousewheel--', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.img-box {
  width: 100%;
  height: auto;
  background: pink;
  img {
    width: 200px;
    height: 300px;
  }
  .div {
    width: 200px;
    height: 300px;
    overflow: auto;
    background: palegoldenrod;
    p{
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
