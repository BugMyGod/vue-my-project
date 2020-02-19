<template>
  <div>
    <h3>jointjs</h3>
    <div id="myholder" @click="click_joint" />
  </div>
</template>

<script>
export default {
  methods: {
    click_joint() {
      const graph = new joint.dia.Graph()

      const paper = new joint.dia.Paper({
        el: $('#myholder'),
        width: 600,
        height: 200,
        model: graph,
        gridSize: 1
      })

      const rect = new joint.shapes.basic.Rect({
        position: { x: 100, y: 30 },
        size: { width: 100, height: 30 },
        attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' }}
      })

      const rect2 = rect.clone()
      rect2.translate(300)

      const link = new joint.dia.Link({
        source: { id: rect.id },
        target: { id: rect2.id }
      })

      graph.addCells([rect, rect2, link])
    }
  }
}
</script>
