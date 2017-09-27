import Application from 'pixi.js'
import Neuron from './components/neuron.js'
import DragAndDropService from './services/DragAndDropService.js'
import SelectionLayer from './components/SelectionLayer.js'
import MultiSelectionManager from './services/MultiSelectionManager.js'
import _ from 'lodash'
import $ from 'jquery'

const construct = (targetDom) => {
  var canvas = document.createElement('canvas');
  canvas.id = "pixiCanvas"
  targetDom.appendChild(canvas);

  const layerSetup = [3, 5, 2]

  const app = new PIXI.Application({
    view: canvas,
    width: targetDom.offsetWidth,
    height: targetDom.offsetHeight,
    antialias: true,
    resolution: 2,
    transparent: true,
    // backgroundColor: 0x000000
  })
  const stage = app.stage
  const updateRenderSize = (event) => {
    console.log("resizes!!!!");
    const renderer = app.renderer
    const w = targetDom.clientWidth
    const h = targetDom.clientHeight
    console.log(w);
    // this part resizes the canvas but keeps ratio the same
    renderer.view.style.width = w + "px";
    renderer.view.style.height = h + "px";
    // this part adjusts the ratio:
    renderer.resize(w,h)
  }
  window.addEventListener('resize', updateRenderSize)
  updateRenderSize()

  const selectionLayer = new SelectionLayer({
    stage: stage,
    app: app,
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
      MultiSelectionManager.registerSelectableObject(neuron, neuron.getDisplay())
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
