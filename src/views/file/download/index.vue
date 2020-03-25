<template>
  <div class="">
    <el-button @click="downImg">xiazai</el-button>
  </div>
</template>

<script>
import JSZip from 'jszip'
import FileSaver from 'file-saver'
export default {
  components: {},
  data() {
    return {
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
    downImg() {
      var blogTitle = '打包图片'
      var zip = new JSZip()
      var imgs = zip.folder(blogTitle)
      var baseList = []
      var imgNameList = ['图片1', '图片2', '图片3']
      var arr = ['../../../assets/img1.jpeg', '../../../assets/img2.jpeg', '../../../assets/img1.jpeg']

      for (var i = 0; i < arr.length; i++) {
        console.log(arr)
        const image = new Image()
        // 解决跨域 Canvas 污染问题
        image.setAttribute('crossOrigin', 'anonymous')

        image.onload = function() {
          const canvas = document.createElement('canvas')
          canvas.width = image.width
          canvas.height = image.height

          const context = canvas.getContext('2d')
          context.drawImage(image, 0, 0, image.width, image.height)

          const url = canvas.toDataURL() // 得到图片的base64编码数据
          canvas.toDataURL('image/png')

          baseList.push(url.substring(22)) // 去掉base64编码前的 data:image/png;base64,
          console.log('baseList==', baseList)
          if (baseList.length === arr.length && baseList.length > 0) {
            for (let k = 0; k < baseList.length; k++) {
              imgs.file(imgNameList[k] + '.png', baseList[k], { base64: true })
            }
            zip.generateAsync({ type: 'blob' }).then(function(content) {
              // see FileSaver.js
              FileSaver.saveAs(content, blogTitle + '.zip')
            })
          }
        }
        image.src = arr[i]
        console.log(image.src)
        console.log('baseList==', baseList)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>
