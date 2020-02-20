<template>
  <div>
    <el-row style="margin:20px 0">
      <el-col :span="4" :offset="1">
        <el-button @click="preClick">上一步</el-button>
      </el-col>
      <el-col :span="4">
        <el-button @click="nextClick">下一步</el-button>
      </el-col>
    </el-row>
    <div id="mygoChart" style="width:100%; height:600px; border:1px solid #ccc" />
  </div>
</template>

<script>
import go from 'gojs'
export default {
  components: {},
  data() {
    return {
      dataList: [
        {
          key: '1',
          img: require('../../../assets/img1.png')
        },
        {
          key: '2',
          parent: '1',
          linktext: 'link',
          img: require('../../../assets/img2.jpg')
        },
        {
          key: '3',
          parent: '1',
          name3: '秘书2',
          linktext: 'link',
          img: require('../../../assets/img2.png')
        },
        {
          key: '4',
          parent: '3',
          linktext: 'link',
          img: require('../../../assets/404_images/404.png')
        }
      ],
      goObj: null,
      count: 1
    }
  },
  computed: {
  },
  watch: {},
  created() {},
  mounted() {
    var _that = this
    // 定义gojs在全局的简洁符号
    // const MAKE = go.GraphObject.make
    _that.goObj = go.GraphObject.make

    // 构建gojs对象
    _that.myDiagram = _that.goObj(go.Diagram, 'mygoChart', {
      initialContentAlignment: go.Spot.Center, // 居中显示
      'undoManager.isEnabled': false, // 支持 Ctrl-Z 和 Ctrl-Y 操作
      'toolManager.hoverDelay': 100, // tooltip提示显示延时
      'toolManager.toolTipDuration': 10000, // tooltip持续显示时间
      isReadOnly: true, // 只读
      'grid.visible': false, // 显示网格
      allowMove: false, // 允许拖动
      allowDragOut: false,
      allowDelete: false,
      allowCopy: false,
      allowClipboard: false,
      // 'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom, // 有鼠标滚轮事件放大和缩小，而不是向上和向下滚动
      layout: _that.goObj(go.TreeLayout, {
        angle: 0,
        layerSpacing: 50
      })
    })
    console.log(_that.myDiagram)

    // 监听事件:单击 （）
    _that.myDiagram.addDiagramListener('ObjectSingleClicked', function(e) {
      // debugger
      console.log('ObjectSingleClicked==', e.subject.part)
    })
    // 画布单击
    _that.myDiagram.addDiagramListener('BackgroundSingleClicked', function(e) {
      // debugger
      console.log('Double-clicked at' + e.diagram.lastInput.documentPoint)
    })
    _that.myDiagram.addDiagramListener('ClipboardPasted', function(e) {
      // debugger
      console.log('Pasted' + e.diagram.selection.count + 'parts')
    })

    // 定义个简单的 Node 模板
    _that.myDiagram.nodeTemplate = _that.goObj(
      go.Node,
      new go.Binding('location', 'loc', go.Point.parse),
      // 节点wrapper
      _that.goObj(go.Shape, 'RoundedRectangle', {
        fill: 'transparent',
        stroke: 'transparent',
        strokeWidth: 1,
        angle: 0,
        width: 250,
        height: 300
      }),
      'Auto', // Vertical,Auto,Horizontal
      { // 节点继承Part的属性定义,例如
        movable: false, // 禁止拖动
        deletable: true// 禁止删除
        // 节点的属性定义也写在这
      },
      _that.goObj(
        go.Panel,
        'Horizontal',
        { padding: 0 },
        _that.goObj(
          go.Panel,
          'Vertical',
          _that.goObj(
            go.Picture,
            { margin: 0, width: 200, height: 300, background: 'pink' }, // 图片设置
            new go.Binding('source', 'img') // new go.Binding() 绑定属性，dataList中的img==>source
          )
        )
      ),
      // 节点范围内部事件
      {
        cursor: 'pointer', // 改变鼠标样式变成小手
        doubleClick: function(e, node) {
          // 双击事件,输出节点数据
          console.log(node.part.data)
        },
        mouseEnter: function(e, node, prev) {
          console.log('mouseEnter')
        },
        mouseLeave: function(e, node, prev) {
          _that.detailShow = false
        },
        selectionChanged: _that.nodeSelectionChanged
      }
    )

    // the link shape
    _that.myDiagram.linkTemplate = _that.goObj(
      go.Link,
      { routing: go.Link.Orthogonal, corner: 2 },
      _that.goObj(go.Shape, { strokeWidth: 1, stroke: 'red' }), // 连接线
      _that.goObj(go.Shape, { toArrow: 'Standard', fill: '#000', stroke: null }), // 箭头
      _that.goObj(
        go.TextBlock,
        {
          // margin: 20,
          stroke: 'pink' // 文字
          // font: "14px sans-serif",
          // width:50,
          // wrap: go.TextBlock.WrapDesiredSize
        },
        new go.Binding('text', 'linktext')
      )
    )

    /* 数据 */
    _that.makeFun()
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
      const len = this.dataList.length
      this.dataList.splice(len - 1, 1)
      this.makeFun()
    },
    nextClick() {
      const index = this.count++
      let parentIndex = '0'
      if (this.dataList.length !== 0) {
        parentIndex = this.dataList.length - 1
      }
      const obj = {
        key: index,
        parent: parentIndex,
        linktext: 'link',
        img: require('../../../assets/img1.png')
      }
      this.dataList.push(obj)
      this.makeFun()
    },
    makeFun() {
      const myModel = this.goObj(go.TreeModel)
      myModel.nodeDataArray = this.dataList
      this.myDiagram.model = myModel
    },
    nodeSelectionChanged(node) {
      console.log('node123====', node)
      if (node.isSelected) {
        console.log('key===', node.key) // 节点的属性信息
        console.log('node.data.key===', node.data.key) // 拿到节点的Key,拿其他属性类似

        this.$confirm('是否删除该节点?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除节点
          this.myDiagram.model.removeNodeData(node.key)
          this.dataList.map((value, index) => {
            if (node.key === value.key) {
              this.dataList.splice(index, 1)
            }
          })
          this.makeFun()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
      // if (node.isSelected) {
      //   // 节点选中执行的内容
      //   console.log(node.data)// 节点的属性信息
      //   console.log(node.data.key)// 拿到节点的Key,拿其他属性类似
      //   var node1 = this.myDiagram.model.findNodeDataForKey(node.data.key)
      //   this.myDiagram.model.setDataProperty(node1, 'fill', '#ededed')
      // } else {
      //   // 节点取消选中执行的内容
      //   var node1 = this.myDiagram.model.findNodeDataForKey(node.data.key)
      //   this.myDiagram.model.setDataProperty(node1, 'fill', '1F4963 ')
      // }
    }
  }
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
