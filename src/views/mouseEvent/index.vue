<template>
  <div class="mouse-event-wrapper">
    <p>鼠标事件</p>
    <el-row id="innerBox" ref="innerBox" class="inner-box">
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
      <el-col
        :span="10"
        class="img-box"
        @mousewheel.native="imgBoxMousewheel"
        @mousedown.native="imgBoxMousedown"
      >
        <p>img-box <el-button size="mini" @click="clearAll">clear all</el-button></p>
        <el-col :span="24">
          <el-col :span="14" class="img-box-double">
            <img
              ref="imgRef"
              src="../../assets/miao.jpeg"
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
          <el-col
            :span="10"
            class="img-box-double"
            @mousewheel.native="rightDivWheel"
            @mousedown.native="rightDivMousedown"
          >
            <p>div1</p>
            <p>div2</p>
            <p>div3</p>
            <p>div4</p>
            <p>div5</p>
            <p>div6</p>
            <p>div7</p>
            <p>div8</p>
            <p>div9</p>
            <p>div10</p>
            <p>div11</p>
            <p>div12</p>
          </el-col>
        </el-col>
        <el-col
          :span="24"
          class="div-text"
        >
          <p>text1</p>
          <p>text2</p>
          <p>text3</p>
          <p>text4</p>
          <p>text5</p>
        </el-col>
      </el-col>
      <el-col :span="14" class="show-point-box">
        <el-col :span="8">
          <p>img: point</p>
          <p>
            <el-button size="mini" @click="clearImgMovePoints">清空Move</el-button>
            <el-button size="mini" @click="clearImgWheelPoints">清空Wheel</el-button>
          </p>
          <ul>
            <li>down: {{ imgDownPoint }}</li>
            <li>move: {{ imgMovePoints }}</li>
            <li>up: {{ imgUpPoint }}</li>
            <li>Right: {{ imgRightPoint }}</li>
            <li>Wheel: {{ imgWheelPoints }}</li>
          </ul>
        </el-col>
        <el-col :span="8">
          <p>img-box: point</p>
          <el-button size="mini" @click="clearImgBoxWheelPoints">清空Wheel</el-button>
          <ul>
            <li>imgBoxDownPoint: {{ imgBoxDownPoint }}</li>
            <li>imgBoxWheelPoints: {{ imgBoxWheelPoints }}</li>
          </ul>
        </el-col>
        <el-col :span="8">
          <p>right-box: point</p>
          <el-button size="mini" @click="clearRightDivWheelPoints">清空Wheel</el-button>
          <ul>
            <li>rightDivDownPoint: {{ rightDivDownPoint }}</li>
            <li>rightDivWheelPoints: {{ rightDivWheelPoints }}</li>
          </ul>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      imgDownPoint: {},
      imgUpPoint: {},
      imgMovePoints: [],
      imgWheelPoints: [],
      imgRightPoint: {},
      imgBoxDownPoint: {},
      imgBoxWheelPoints: [],
      rightDivWheelPoints: [],
      rightDivDownPoint: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    /* --img--子元素：阻止事件冒泡-- */
    imgMousedown(e) {
      e.stopPropagation()
      // 按下了任意鼠标按钮时触发
      // console.log('mousedown==', e)
      let { x, y } = this.windowToCanvas(e.clientX, e.clientY, e)
      x = Math.round(x)
      y = Math.round(y)
      this.imgDownPoint = {
        x: x,
        y: y
      }
    },
    imgMouseup(e) {
      e.stopPropagation()
      // 释放鼠标按钮时触发
      // console.log('mouseup==', e)
      const { x, y } = this.windowToCanvas(e.clientX, e.clientY, e)
      this.imgUpPoint = {
        x: Math.round(x),
        y: Math.round(y)
      }
    },
    imgRightClick(e) {
      e.stopPropagation()
      // console.log('imgRightClick==', e)
      const { x, y } = this.windowToCanvas(e.clientX, e.clientY, e)
      this.imgRightPoint = {
        x: Math.round(x),
        y: Math.round(y)
      }
    },
    imgMousemove(e) {
      e.stopPropagation()
      // 鼠标指针在元素内部移动时重复地触发
      // console.log('mousemove==', e)
      const { x, y } = this.windowToCanvas(e.clientX, e.clientY, e)
      this.imgMovePoints.push({
        x: Math.round(x),
        y: Math.round(y)
      })
    },
    imgContextmenu(e) {
      // 弹出右键菜单
      e.stopPropagation()
      // console.log('contextmenu==', e)
      this.$message.info('阻止默认右键菜单！')
    },
    imgMousewheel(e) {
      e.stopPropagation()
      // 鼠标滚轮事件
      // console.log('mousewheel==', e)
      const { x, y } = this.windowToCanvas(e.clientX, e.clientY, e)
      this.imgWheelPoints.push({
        x: Math.round(x),
        y: Math.round(y)
      })
    },

    imgClick(e) {
      // 单击主鼠标按钮（一般是左边的按钮）或按下回车键时触发
      // console.log('click==', e)
    },
    imgDblclick(e) {
      // 双击主鼠标按钮时触发
      // console.log('dbclick==', e)
    },
    imgMouseenter(e) {
      // console.log('mouseenter==', e)
    },
    imgMouseleave(e) {
      // console.log('mouseleave==', e)
    },
    imgMouseover(e) {
      // console.log('mouseover==', e)
    },
    imgMouseout(e) {
      // console.log('mouseout==', e)
    },

    /* --最外层div---父元素-- */
    imgBoxMousewheel(e) {
      // console.log('imgBoxMousewheel--', e)
      const { x, y } = this.windowToCanvas(e.clientX, e.clientY, e)
      this.imgBoxWheelPoints.push({
        x: Math.round(x),
        y: Math.round(y)
      })
    },
    imgBoxMousedown(e) {
      console.log('imgBoxMousedown==', e)
      const { x, y } = this.windowToCanvas(e.clientX, e.clientY, e)
      this.imgBoxDownPoint = {
        x: Math.round(x),
        y: Math.round(y)
      }
    },

    /* --img右侧div--子元素-- */
    rightDivWheel(e) {
      e.stopPropagation()
      console.log('rightDivWheel--', e)
      const { x, y } = this.windowToCanvas(e.clientX, e.clientY, e)
      this.rightDivWheelPoints.push({
        x: Math.round(x),
        y: Math.round(y)
      })
    },
    rightDivMousedown(e) {
      e.stopPropagation()
      console.log('rightDivMousedown==', e)
      const { x, y } = this.windowToCanvas(e.clientX, e.clientY, e)
      this.rightDivDownPoint = {
        x: Math.round(x),
        y: Math.round(y)
      }
    },

    /* point */
    windowToCanvas(x, y, e) {
      const el = this.$refs.imgRef
      // // const el = this.$refs.innerBox
      // // const el = document.getElementById('innerBox')
      // const el = e.target
      const rect = el.getBoundingClientRect()
      // console.log('el---', el, el.width)
      return {
        x: x - rect.left * (el.width / rect.width),
        y: y - rect.top * (el.height / rect.height)
      }
    },
    clearImgMovePoints() {
      this.imgMovePoints = []
    },
    clearImgWheelPoints() {
      this.imgWheelPoints = []
    },
    clearImgBoxWheelPoints() {
      this.imgBoxWheelPoints = []
    },
    clearRightDivWheelPoints() {
      this.rightDivWheelPoints = []
    },
    clearAll() {
      this.imgDownPoint = {}
      this.imgUpPoint = {}
      this.imgMovePoints = []
      this.imgWheelPoints = []
      this.imgRightPoint = {}
      this.rightDivDownPoint = {}
      this.imgBoxDownPoint = {}
      this.imgBoxWheelPoints = []
      this.rightDivWheelPoints = []
    }
  }
}
</script>

<style lang='scss' scoped>
.mouse-event-wrapper {
  padding: 20px;
  ul {
    list-style: none;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0;
    border-right: 1px solid red;
    li {
      border-bottom: 1px solid #ccc;
      // margin-right: 5px;
      // float: left;
      margin-bottom: 10px;
      height: auto;
      overflow: auto;
    }
  }
  .inner-box {
    width: 100%;
    height: 500px;
    overflow: hidden;
    // background: pink;
    .img-box {
      background: palegoldenrod;
      height: 500px;
      overflow: auto;
      .img-box-double{
        background: palegreen;
        height: 350px;
        overflow: auto;
        img {
          width: 300px;
          height: 350px;
        }
      }
    }
    .show-point-box{
      height: 500px;
      overflow: auto;
      background: powderblue;
    }
  }
}
</style>
