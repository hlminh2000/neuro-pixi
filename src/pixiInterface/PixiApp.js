import Application from 'pixi.js'
import Neuron from './components/neuron.js'
import DragAndDropService from './services/DragAndDropService.js'
import SelectionLayer from './components/SelectionLayer.js'
import MultiSelectionManager from './services/MultiSelectionManager.js'
import _ from 'lodash'
import $ from 'jquery'
import TWEEN from 'tween'
import Observables from '../globalServices/Observables.js'
import ContextMenuService from './services/ContextMenuService.js'

const layerSetup = [10, 10, 10]

const app = new PIXI.Application({
  antialias: true,  resolution: 2,
  forceCanvas: true,
  transparent: true,
})
const stage = app.stage
const background = new PIXI.Graphics()
  .lineStyle(1, 0xffffff)
  .beginFill(0xffffff, 0.1)
  .drawRoundedRect(0, 0, 2000, 2000, 5)
stage.addChild(background)
ContextMenuService.registerMenuDispatcher(stage, app, 'STAGE')

Observables.pixiAppCanvasDimentionv$.subscribe(dimention => {
  const renderer = app.renderer
  const w = dimention.width
  const h = dimention.height
  // this part resizes the canvas but keeps ratio the same
  renderer.view.style.width = w + "px";
  renderer.view.style.height = h + "px";
  // this part adjusts the ratio:
  renderer.resize(w,h)
})

const selectionLayer = new SelectionLayer({
  stage: stage,
  app: app,
})
stage.addChild(selectionLayer.getDisplay())

DragAndDropService.enableDrag(stage, {
  mouseButtonIndex: 2,
  keyboardRequirement: 'cmdDown',
  stage: stage,
  onDragEnd: () => {
    const targetX = stage.x > 0 ? 0 : -stage.getBounds().width
    const targetY = stage.y > 0 ? 0 : -stage.getBounds().height
    const updateTween = () => {TWEEN.update()}
    if(stage.x > 0) {
      app.ticker.add(updateTween)
      new TWEEN.Tween({x: stage.x})
        .to({x: -targetX}, 1000)
        .easing(TWEEN.Easing.Elastic.Out)
        .onUpdate(function(){
          stage.x = this.x
        })
        .onComplete(function(){
          app.ticker.remove(updateTween)
        })
        .start()
    }
    if(stage.y > 0) {
      app.ticker.add(updateTween)
      new TWEEN.Tween({y: stage.y})
        .to({y: targetY}, 1000)
        .easing(TWEEN.Easing.Elastic.Out)
        .onUpdate(function(){
          stage.y = this.y
        })
        .onComplete(function(){
          app.ticker.remove(updateTween)
        })
        .start()
    }
  },
})

Observables.latestNeuronConfig$.subscribe((_config) => {
  addNeuron(_config)
})

// const networkSetup = layerSetup.map(nodeCount => {
//   return _.range(0, nodeCount).map( nodeIndex => {
//     var neuron = addNeuron()
//     return neuron
//   })
// })

function addNeuron(_config){
  var config = {
    x: 50,
    y: 50,
    ..._config
  }
  const neuron = new Neuron()
  neuron.display.x = config.x - stage.x
  neuron.display.y = config.y - stage.y
  stage.addChild(neuron.display)
  ContextMenuService.registerMenuDispatcher(neuron.display, neuron, 'NEURON')
  MultiSelectionManager.registerSelectableObject(neuron, neuron.getDisplay())
  DragAndDropService.enableDrag(neuron.display, {
    onDragStart: (e) => {e.stopPropagation()},
    onDragEnd: () => {},
    onDragUpdate: () => {},
    stage: stage
  })
  return neuron;
}

export default app
