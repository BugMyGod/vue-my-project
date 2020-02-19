<template>
  <div class="register">
    <h3>d3</h3>
    <el-container>
      <div id="treeId" class="tree-svg" />
    </el-container>
  </div>
</template>

<script>
import d3 from 'd3'
var diagonal = d3.svg.diagonal()
  .projection(function(d) { return [d.x, d.y] })
export default {
  name: 'Register',
  components: {

  },
  data() {
    return {
      root: {
        'name': 'flare',
        'size': '1',
        'image': '../../../assets/img1.png',
        'children': [{
          'name': 'AAA',
          'size': '11',
          'image': '../../../assets/img2.png'
        }, {
          'name': 'BBB',
          'size': '12',
          'image': '../../../assets/img1.png'
        }]
      },
      tree: null,
      zm: null,
      height: 750,
      count: 0,
      duration: 800
    }
  },
  computed: {

  },
  created() {
    var that = this
    var tree = d3.layout.tree().nodeSize([60, 60])
    that.tree = tree
  },
  mounted() {
    var that = this
    var svg = d3.select('#treeId').append('svg').attr('width', 960).attr('height', 650)
      .call(that.zm = d3.behavior.zoom().scaleExtent([1, 3]).on('zoom', d => { svg.attr('transform', 'translate(' + d3.event.translate + ')') }))
      .append('g')
      .attr('transform', 'translate(' + 480 + ',' + 50 + ')')

    that.zm.translate([512, 50])
    that.svg = svg
    that.root.x0 = 0
    that.root.y0 = that.height / 2

    function collapse(d) {
      if (d.children) {
        d._children = d.children
        d._children.forEach(collapse)
        d.children = null
      }
    }
    // Initialize the display to show a few nodes.
    that.root.children.forEach(collapse)

    that.update(that.root)
  },
  methods: {
    update(source) {
      var that = this
      // Compute the new tree layout.
      var nodes = that.tree.nodes(that.root).reverse()
      var links = that.tree.links(nodes)

      // Normalize for fixed-depth.
      nodes.forEach(function(d) { d.y = d.depth * 180 })
      // Update the nodes…
      var node = that.svg.selectAll('g.node')
        .data(nodes, function(d) { return d.id || (d.id = ++that.count) })

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', function(d) {
          return 'translate(' + source.x0 + ',' + source.y0 + ')'
        })
        .on('click', d => that.click(d))

      nodeEnter.append('image')
        .attr('xlink:href', d => {
          return d.image
        })
        .attr('x', d => {
          return d.children || d._children ? -25 : -25
        })
        .attr('y', -50)

      nodeEnter.append('text')
        .attr('x', function(d) { return d.children || d._children ? -20 : -20 })
        .attr('y', '15')
        .attr('font-size', '18px')
        .text(function(d) { return d.name })
        .style('fill-opacity', 1e-6)

      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
        .duration(that.duration)
        .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')' })

      nodeUpdate.selectAll('image')
        .attr('width', 50)
        .attr('height', 50)

      nodeUpdate.select('text')
        .style('fill-opacity', 1)

      // Transition exiting nodes to the parent's new position.
      var nodeExit = node.exit().transition()
        .duration(that.duration)
        .attr('transform', function(d) { return 'translate(' + source.x + ',' + source.y + ')' })
        .remove()

      nodeExit.select('image')
        .attr('width', 0)
        .attr('height', 0)

      nodeExit.select('text')
        .style('fill-opacity', 1e-6)

      // Update the links…
      var link = that.svg.selectAll('path.link')
        .data(links, function(d) {
          return d.target.id
        })

      // Enter any new links at the parent's previous position.
      link.enter().insert('svg:path', 'g')
        .attr('class', 'link')
        .attr('fill', 'none')
        .attr('stroke', '#ccc')
        .attr('stroke-width', '2')
        .attr('d', function(d) {
          var o = { x: source.x0, y: source.y0 }
          return diagonal({ source: o, target: o })
        })

      // Transition links to their new position.
      link.transition()
        .duration(that.duration)
        .attr('d', diagonal)

      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
        .duration(that.duration)
        .attr('d', function(d) {
          var o = { x: source.x, y: source.y }
          return diagonal({ source: o, target: o })
        })
        .remove()

      // Stash the old positions for transition.
      nodes.forEach(function(d) {
        d.x0 = d.x
        d.y0 = d.y
      })
    },
    click(d) {
      var that = this
      // #重点关注这个函数的不同之处。尤其是else部分

      if (d.children) {
        d._children = d.children
        d.children = null
      } else if (d._children) {
        d.children = d._children
        d._children = null
      } else {
        var mnodes = that.getNode(d.size)
        d.children = mnodes
      }
      that.update(d)
    },
    getNode(id) {
      // #自定义的一个新的以同步方式从后台取数据的ajax函数
      var mynodes = []
      if (id === '11') {
        mynodes = [{
          'name': 'AAA01',
          'image': '../../../assets/img1.png',
          'size': '111'
        }, {
          'name': 'AAA02',
          'image': '../../../assets/img2.png',
          'size': '112'
        }, {
          'name': 'AAA03',
          'image': '../../../assets/img1.png',
          'size': '113'
        }]
      } else if (id === '12') {
        mynodes = [{
          'name': 'BBB01',
          'image': '../../../assets/img1.png',
          'size': '121'
        }, {
          'name': 'BBB02',
          'image': '../../../assets/img1.png',
          'size': '122'
        }, {
          'name': 'BBB03',
          'image': '../../../assets/img2.png',
          'size': '123'
        }]
      } else {
        mynodes = [{
          'name': 'DDD',
          'image': '../../../assets/img1.png',
          'size': '131'
        }, {
          'name': 'EEE',
          'image': '../../../assets/img1.png',
          'size': '132'
        }, {
          'name': 'FFF',
          'image': '../../../assets/img1.png',
          'size': '133'
        }]
      }
      return mynodes
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register {
  padding-top: 50px;
  width: 100%;
}
.tree-svg{
  margin: 0 auto;
  border: 1px solid #f00;
}

</style>
