import Application from 'pixi.js'
import Neuron from './components/neuron.js'
import DragAndDropService from './services/DragAndDropService.js'
import _ from 'lodash'

var canvas = document.createElement('canvas');
canvas.id = "pixiCanvas"
document.getElementById('app').appendChild(canvas);

const layerSetup = [3, 5, 2]

const app = new PIXI.Application({
  view: canvas,
  width: 800,
  height: 400,
  transparent: true,
  antialias: true,
})
const stage = app.stage

const networkSetup = layerSetup.map(nodeCount => {
  return _.range(0, nodeCount).map( nodeIndex => new Neuron())
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
    DragAndDropService.enableDrag(neuron.display, stage)
  })
})
