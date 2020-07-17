<template>
  <!-- <div class="dashboard-container"> -->
  <!-- <div class="dashboard-text">name: {{ name }}</div>
    <div class="top" @click="topClick">
      top
      <div class="inner" @click="innerClick($event)">inner</div>
    </div> -->
  <!-- </div> -->
  <el-row>
    <el-col :span="12" class="img-box">
      <img id="myImg" ref="myImg" src="../../assets/img2.jpg" alt="">
      <canvas id="calibrationCanvas" ref="calibrationCanvas" class="calibration-canvas" width="400" height="288">你的浏览器不支持绘图，请更换浏览器后重试！</canvas>
    </el-col>
    <el-col :span="12">
      <el-button @click="btnClick">获取截屏</el-button>
      <el-button id="drawRect" @click="reactClick">绘制矩形</el-button>
      <!-- <canvas id="calibrationCanvas" width="352" height="288" style="width:352px;height:288px;display: block;margin:5px auto;border:1px solid red;">你的浏览器不支持绘图，请更换浏览器后重试！</canvas> -->
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { GraffitiCanvas } from '@/utils/graffitiCanvas'
var drawUtil = new GraffitiCanvas()

export default {
  name: 'Dashboard',
  data() {
    return {
      // drawUtil: null
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {

  },
  methods: {
    topClick() {
      console.log('top')
    },
    innerClick(e) {
      e.stopPropagation()
      console.log('inner')
    },
    btnClick() {
      this.initCanvas()
    },
    initCanvas() {
      var img = document.querySelector('#myImg')
      var imgStyle = getComputedStyle(img)

      console.log('myImg---', img)
      // console.log('imgStyle---', imgStyle, 'img.currentStyle--', img.currentStyle)
      console.log('imgStyle.width--', imgStyle.width, 'height---', imgStyle.height)

      this.$nextTick(() => {
        var myCanvas = document.getElementById('calibrationCanvas')
        var myCanvas_rect = myCanvas.getBoundingClientRect()
        var widths = myCanvas_rect.width
        var heights = myCanvas_rect.height
        document.getElementById('calibrationCanvas').style.width = imgStyle.width
        document.getElementById('calibrationCanvas').style.height = imgStyle.height
        console.log('calibrationCanvas---', this.$refs.calibrationCanvas, 'widths--', widths, 'heights--', heights)
      })
      drawUtil.init({ 'id': 'calibrationCanvas' })
      drawUtil.begin(4)
    },
    reactClick() {
      // drawUtil.begin(4)
    }
  }
}
</script>

<style lang="scss" scoped>
.img-box{
  position: relative;
  img{
    width: 400px;
    height: auto;
  }
  .calibration-canvas{
    border:1px solid red;
    position: absolute;
    top: 0;
    left: 0;
    width: 400px;
    height: auto;
  }
}
// .dashboard {
//   &-container {
//     margin: 30px;
//   }
//   &-text {
//     font-size: 30px;
//     line-height: 46px;
//   }
// }
// .top{
//   width: 200px;
//   height: 200px;
//   background: red;
// }
// .inner{
//   width: 200px;
//   height: 150px;
//   background: paleturquoise;
//   // pointer-events: none;
// }
</style>
