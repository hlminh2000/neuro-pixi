import Graphics from 'pixi.js';
import DisplayObject from 'pixi.js';
import { Subject } from 'rxjs/Rx';
import GlobalSubjects from '../../globalServices/Subjects.js'

const selectionArea = GlobalSubjects.$_selectionArea

interface Selectable {
  getDisplay(): PIXI.DisplayObject
}

export default function SelectionLayer(_config): Selectable{
  const config = {
    stage: null,
    app: null,
    ..._config
  }
  const stage = config.stage
  const app = config.app
  const self = this
  const display = new PIXI.Graphics()
  const selectionShape = new PIXI.Graphics()
  const pointerDownPosition = new PIXI.Point()

  // @flow
  const num:number = "234"

  const onMouseDown = (e) => {
    if(e.data.originalEvent.which !== 2){
      pointerDownPosition.x = e.data.global.x
      pointerDownPosition.y = e.data.global.y
      selectionShape.x = pointerDownPosition.x
      selectionShape.y = pointerDownPosition.y
      selectionShape.clear()
      display.addChild(selectionShape)
      selectionArea.next({
        x: selectionShape.x,
        y: selectionShape.y,
        width: 0,
        height: 0,
      })
      const onMouseUp = (e) => {
        display.removeChild(selectionShape)
        document.removeEventListener('pointerup', onMouseUp)
        display.off('pointermove', onMouseMove)
      }
      const onMouseMove = (_e) => {
        const selectionWidth = _e.data.global.x - pointerDownPosition.x
        const selectionHeight = _e.data.global.y - pointerDownPosition.y
        selectionShape
        .clear()
        .lineStyle(1, 0x000000, 0.5)
        .beginFill(0x000000, 0.1)
        .drawRect(0, 0, selectionWidth, selectionHeight)
        selectionArea.next({
          x: selectionShape.x,
          y: selectionShape.y,
          width: selectionWidth,
          height: selectionHeight,
        })
      }
      document.addEventListener('pointerup', onMouseUp)
      display.on('pointermove', onMouseMove)
    }
  }

  const updateRenderSize = () => {
    display
      .clear()
      .beginFill(0x000000, 0)
      .drawRect(0, 0, config.app.renderer.view.parentNode.clientWidth, config.app.renderer.view.parentNode.clientWidth)
      .endFill()
  }

  updateRenderSize()
  window.addEventListener('resize', updateRenderSize)
  display.on('pointerdown', onMouseDown)
  display.interactive = true;

  // public interface
  self.getDisplay = () => display
 }
