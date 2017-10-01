import { h, render, Component } from 'preact'
import PixiApp from './PixiApp'
import Application from 'pixi.js'
import Neuron from './components/neuron.js'
import DragAndDropService from './services/DragAndDropService.js'
import SelectionLayer from './components/SelectionLayer.js'
import MultiSelectionManager from './services/MultiSelectionManager.js'
import _ from 'lodash'
import $ from 'jquery'
import TWEEN from 'tween'
import GlobalSubjects from '../globalServices/Subjects.js'


// const construct = (targetDom) => {
//   var canvas = document.createElement('canvas');
//   canvas.id = "pixiCanvas"
//   targetDom.appendChild(canvas);
//
//   const layerSetup = [3, 5, 2]
//
//   const app = new PIXI.Application({
//     view: canvas,
//     width: targetDom.offsetWidth,
//     height: targetDom.offsetHeight,
//     antialias: true,
//     resolution: 2,
//     transparent: true,
//   })
//   const stage = app.stage
//   const background = new PIXI.Graphics()
//     .beginFill(0x000000, 0.3)
//     .drawRect(0, 0, 2000, 2000)
//   stage.addChild(background)
//   const updateRenderSize = (event) => {
//     console.log("resizes!!!!");
//     const renderer = app.renderer
//     const w = targetDom.clientWidth
//     const h = targetDom.clientHeight
//     // this part resizes the canvas but keeps ratio the same
//     renderer.view.style.width = w + "px";
//     renderer.view.style.height = h + "px";
//     // this part adjusts the ratio:
//     renderer.resize(w,h)
//   }
//   window.addEventListener('resize', updateRenderSize)
//   updateRenderSize()
//
//   const selectionLayer = new SelectionLayer({
//     stage: stage,
//     app: app,
//   })
//   stage.addChild(selectionLayer.getDisplay())
//
//   const networkSetup = layerSetup.map(nodeCount => {
//     return _.range(0, nodeCount).map( nodeIndex => new Neuron() )
//   })
//
//   networkSetup.forEach(layer => {
//     layer.forEach(neuron => {
//       neuron.display.x = networkSetup.indexOf(layer)
//         * (neuron.getDisplayWidth() + 100)
//         + neuron.getDisplayWidth()
//       neuron.display.y = layer.indexOf(neuron)
//         * (neuron.getDisplayWidth() + 10)
//         + neuron.getDisplayWidth()
//       stage.addChild(neuron.display)
//       MultiSelectionManager.registerSelectableObject(neuron, neuron.getDisplay())
//       DragAndDropService.enableDrag(neuron.display, {
//         onDragStart: () => {},
//         onDragEnd: () => {},
//         onDragUpdate: () => {},
//         stage: stage
//       })
//     })
//   })
//   DragAndDropService.enableDrag(stage, {
//     mouseButtonIndex: 2,
//     stage: stage,
//     onDragEnd: () => {
//       const targetX = stage.x > 0 ? 0 : -stage.getBounds().width
//       const targetY = stage.y > 0 ? 0 : -stage.getBounds().height
//       const updateTween = () => {TWEEN.update()}
//       if(stage.x > 0) {
//         app.ticker.add(updateTween)
//         new TWEEN.Tween({x: stage.x})
//           .to({x: -targetX}, 400)
//           .easing(TWEEN.Easing.Elastic.Out)
//           .onUpdate(function(){
//             stage.x = this.x
//           })
//           .onComplete(function(){
//             app.ticker.remove(updateTween)
//           })
//           .start()
//       }
//       if(stage.y > 0) {
//         app.ticker.add(updateTween)
//         new TWEEN.Tween({y: stage.y})
//           .to({y: targetY}, 400)
//           .easing(TWEEN.Easing.Elastic.Out)
//           .onUpdate(function(){
//             stage.y = this.y
//           })
//           .onComplete(function(){
//             app.ticker.remove(updateTween)
//           })
//           .start()
//       }
//     },
//   })
// }



export default class PixiAppContainer extends Component{

  componentDidMount(){
    // construct(this.container)
    this.container.appendChild(PixiApp.view)
    PixiApp.renderer.resize(this.container.offsetWidth, this.container.offsetHeight)
    const updateRenderSize = () => {
      GlobalSubjects.$_pixiAppCanvasDimention.next({
        width: this.container.offsetWidth,
        height: this.container.offsetHeight,
      })
    }
    window.addEventListener('resize', updateRenderSize)
    updateRenderSize()
  }

  render(){
    return <div style="flex: 1" ref={el => this.container = el}></div>
  }
}
