<template>
  <div class="">
    MergeTable
    <iframe
      id="iframeContain"
      name="iframeContain"
      seamless
      scrolling="yes"
      src="http://192.168.0.212:9528/scripts/index?iframe=true"
    >
      您当前的浏览器不支持页面上的功能，请升级您当前的浏览器版本或使用谷歌浏览器访问当前页面
    </iframe>
  </div>
</template>

<script>
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
    console.log(window.top === window.self)
    console.log(window.top, window.self)
    window.onload = function() {
      const test = document.getElementById('iframeContain').contentWindow.document.getElementById('app')
      console.log('test111---', test)
    }

    // window.addEventListener('message', function(e) {
    //   console.log(e)// {data:'params'}
    // })

    // test.style.width = '200px'
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    testFunc() {
      const test = document.getElementById('iframeContain').contentWindow.document.getElementById('app')
      console.log('test222---', test)
    }
  }
}
</script>
<style lang='scss'>
#iframeContain{
  width: 100%;
  height: 800px;
  #app{
    .main-nav{
      display: none!important;
    }
    .main-container{
      .sidebar-container, .nav-container{
        display: none!important;
      }
      .app-main{
        top: 0;
        left: 0;
      }
    }
  }
}
</style>
