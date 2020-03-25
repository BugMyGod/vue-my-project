<template>
  <div class="">
    CarouselPicture
    <h3>v-viewer</h3>
    <div class="content">
      <h1>Viewer图片预览插件</h1>
      <viewer :images="imgs">
        <img v-for="src in imgs" :key="src.title" :src="src.url">
      </viewer>
    </div>
  </div>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import Vuer from 'v-viewer'
import Vue from 'vue'
Vue.use(Vuer, { name: 'vuer' })

export default {
  components: { },
  data() {
    return {
      imgs: [
        { url: '../../../assets/img1.jpg', title: '图片1' },
        { url: '../../../assets/img2.jpeg', title: '图片2' }]
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
    // show() {
    //   const vuer = this.$el.querySelector('.images').$vuer
    //   vuer.show()
    // }

  }
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>
