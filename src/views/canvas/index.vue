<template>
  <div class>
    canvas
    <h3>截图---html2canvas</h3>
    <div id="img-containner" class="img-containner">
      <div v-for="(item,index) in imgList" :key="index">
        <img :id="imgItem(index)" :src="item.src" alt @click="download(index)">
        <!-- <svg /> -->
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
// import canvg from 'canvg'

export default {
  components: {},
  data() {
    return {
      imgList: [
        {
          src: '/static/img/img2.4dbe7428.jpeg'
        },
        {
          src: '/static/img/img1.5eae238c.jpeg'
        },
        {
          src: '/static/img/img2.4dbe7428.jpeg'
        }
      ]
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
    imgItem(index) {
      return 'imgItem_' + index
    },
    download(index) {
      this.handleGenerator(index)
    },
    handleGenerator(index) {
      // 最外层的容器
      const outContainnerElem = document.getElementById('img-containner')
      // 要导出div
      const id = this.imgItem(index)
      // const itemElem = document.getElementById('tree')
      const itemElem = document.getElementById(id)
      console.log(id, itemElem)

      // 从要导出的div克隆的临时div
      const tempElem = itemElem.cloneNode(true)
      tempElem.id = 'temp-id'
      tempElem.className = 'fff'
      tempElem.style.width = itemElem.clientWidth + 'px'
      tempElem.style.height = itemElem.clientHeight + 'px'
      outContainnerElem.appendChild(tempElem)

      // // 在临时div上将svg都转换成canvas，并删除原有的svg节点
      // const svgElem = tempElem.querySelectorAll('svg')
      // svgElem.forEach(node => {
      //   var parentNode = node.parentNode
      //   var svg = node.outerHTML.trim()
      //   var canvas = document.createElement('canvas')
      //   canvg(canvas, svg)
      //   canvas.style.zIndex = 9
      //   if (node.style.position) {
      //     canvas.style.position += node.style.position
      //     canvas.style.left += node.style.left
      //     canvas.style.top += node.style.top
      //   }
      //   parentNode.removeChild(node)
      //   parentNode.appendChild(canvas)
      // })

      html2canvas(tempElem, {
        useCORS: true // 允许CORS跨域
      }).then(canvas => {
        // 图片触发下载
        const img = canvas
          .toDataURL('image/jpeg')
          .replace('data:image/jpeg;base64,', '')
        const finalImageSrc = 'data:image/jpeg;base64,' + img
        const aElem = document.createElement('a')
        document.body.appendChild(aElem)
        aElem.href = finalImageSrc
        // 设置下载标题
        aElem.download = 'img.jpg'
        aElem.click()
        document.body.removeChild(aElem)
        outContainnerElem.removeChild(tempElem)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.img-containner {
  div {
    width: 150px;
    height: 280px;
    background: pink;
    float: left;
    margin-left: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
