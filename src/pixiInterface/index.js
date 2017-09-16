import Application from 'pixi.js'
import Neuron from './components/neuron.js'
import DragAndDropService from './services/DragAndDropService.js'
import SelectionLayer from './components/selectionLayer.js'
import _ from 'lodash'

const construct = (targetDom) => {
  var canvas = document.createElement('canvas');
  canvas.id = "pixiCanvas"
  targetDom.appendChild(canvas);

  const layerSetup = [3, 5, 2]

  const app = new PIXI.Application({
    view: canvas,
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true,
    antialias: true,
    resolution: 2,
  })
  const stage = app.stage
  const updateRenderSize = window.onresize = (event) => {
    const w = window.innerWidth
    const h = window.innerHeight
    const renderer = app.renderer
    // this part resizes the canvas but keeps ratio the same
    renderer.view.style.width = w + "px";
    renderer.view.style.height = h + "px";
    // this part adjusts the ratio:
    renderer.resize(w,h)
  }
  updateRenderSize()

  const selectionLayer = new SelectionLayer({
    stage: stage
  })
  stage.addChild(selectionLayer.getDisplay())

  const networkSetup = layerSetup.map(nodeCount => {
    return _.range(0, nodeCount).map( nodeIndex => new Neuron() )
  })

  networkSetup.forEach(layer => {
    layer.forEach(neuron => {
      neuron.display.x = networkSetup.indexOf(layer)
      * (neuron.getDisplayWidth() + 100)
      + neuron.getDisplayWidth()
      neuron.display.y = layer.indexOf(neuron)
      * (neuron.getDisplayWidth() + 10)
      + neuron.getDisplayWidth()
      stage.addChild(neuron.display)
      DragAndDropService.enableDrag(neuron.display, {
        onDragStart: () => {},
        onDragEnd: () => {},
        onDragUpdate: () => {},
      })
    })
  })
}


export default {
  construct: construct
}
