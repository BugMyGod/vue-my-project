<template>
  <div class="wrapper-kity">
    <h3>百度脑图--kityminder-core</h3>
    <el-row>
      <el-col :span="4" :offset="2"><el-button size="small" @click="preClick">上一步</el-button></el-col>
      <el-col :span="4"><el-button size="small" @click="nextClick">下一步</el-button></el-col>
      <el-col :span="6"><a href="https://github.com/fex-team/kityminder-core" target="_blank">kityminder-core网址</a></el-col>
      <el-col :span="6"><a href="https://github.com/fex-team/kityminder" target="_blank">kityminder网址</a></el-col>
    </el-row>
    <div id="minder-container" />
  </div>
</template>

<script>
import kity from 'kity'
import kityminder from 'kityminder-core'
export default {
  components: {},
  data() {
    return {
      infoJson: {
        'root': {
          'data': {
            'text': 'test111'
          },
          'children': [
            { 'data': { 'text': '新闻\nsrc/module/node.j' }},
            { 'data': { 'text': '网页', 'image': 'https://imgs.qunarzz.com/vs_ceph_vs_tts/948024e0-a9c4-43ba-a8d1-ad44c98cc078.jpg_r_390x260x90_b33facaa.jpg' }},
            { 'data': { 'text': '贴吧' }},
            { 'data': { 'text': '知道' }},
            { 'data': { 'text': '音乐' }},
            { 'data': { 'text': '图片' }},
            { 'data': { 'text': '视频' }},
            { 'data': { 'text': '地图' }},
            { 'data': { 'text': '百科', 'expandState': 'collapse' }}
          ]
        },
        'template': 'default'
      }
    }
  },
  computed: {},
  watch: {

  },
  created() {
  },
  mounted() {
    this.km = new window.kityminder.Minder({
      renderTo: '#minder-container'
    })
    this.km.importJson(this.infoJson)
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    preClick() {
      const len = this.infoJson.root.children.length
      this.infoJson.root.children.splice(len - 1, 1)
      this.km.importJson(this.infoJson)
    },
    nextClick() {
      this.infoJson.root.children.push({ 'data': { 'text': 'demo' }})
      // const len = this.infoJson.root.children.length
      // this.$set(this.infoJson.root.children, len, { 'data': { 'text': 'demo12' }})
      console.log('children----', this.infoJson.root.children)
      this.km.importJson(this.infoJson)
    }
  }
}
</script>
<style lang='scss' scoped>
.wrapper-kity{
  width: 100%;
  height: calc(100vh);
  #minder-container{
    height: 100%;
  }
}
</style>
