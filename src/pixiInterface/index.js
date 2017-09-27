import Application from 'pixi.js'
import Neuron from './components/neuron.js'
import DragAndDropService from './services/DragAndDropService.js'
import SelectionLayer from './components/SelectionLayer.js'
import MultiSelectionManager from './services/MultiSelectionManager.js'
import _ from 'lodash'
import $ from 'jquery'
import TWEEN from 'tween'

window.TWEEN = TWEEN

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
  })
  const stage = app.stage
  const background = new PIXI.Graphics()
    .beginFill(0x000000, 0.3)
    .drawRect(0, 0, 10000, 10000)
  stage.addChild(background)
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
  DragAndDropService.enableDrag(stage, {
    mouseButtonIndex: 2,
    onDragEnd: () => {
      if(stage.x > 0) {
        new TWEEN.Tween({x: stage.x})
          .to({x: 0}, 2000)
          .easing(TWEEN.Easing.Elastic.InOut)
          .onUpdate(function(){
            stage.x = this.x
          })
          .start()
      }
      if(stage.y > 0) {
        new TWEEN.Tween({x: stage.x})
          .to({y: 0}, 2000)
          .easing(TWEEN.Easing.Elastic.InOut)
          .onUpdate(function(){
            stage.y = this.y
          })
          .start()
      }
    },
  })


  function animate(){
    TWEEN.update()
    requestAnimationFrame(function(){
      animate()
    })
  }
  animate()


}


export default {
  construct: construct
}
