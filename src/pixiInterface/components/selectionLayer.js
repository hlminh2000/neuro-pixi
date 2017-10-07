// @flow
import { Graphics, DisplayObject, Point } from 'pixi.js';
import { Subject } from 'rxjs/Rx';
import GlobalSubjects from '../../globalServices/Subjects.js'
import Observables from '../../globalServices/Observables.js'

const keyboardState = {
  cmdDown: false
}

Observables.cmdDown$.subscribe(e => {
  keyboardState.cmdDown = true
})
Observables.cmdUp$.subscribe(e => {
  keyboardState.cmdDown = false
})

const selectionArea = GlobalSubjects.$_selectionArea

export default function SelectionLayer(_config: Object){
  const config = {
    stage: null,
    app: null,
    ..._config
  }
  const stage = config.stage
  const app = config.app
  const self = this
  const display = new Graphics()
  const selectionShape = new Graphics()
  const pointerDownPosition = new Point()

  const onMouseDown = (e) => {
    if(e.data.originalEvent.which !== 2 && !keyboardState.cmdDown){
      pointerDownPosition.x = e.data.global.x - stage.x
      pointerDownPosition.y = e.data.global.y - stage.y
      selectionShape.x = pointerDownPosition.x
      selectionShape.y = pointerDownPosition.y
      selectionShape.clear()
      display.addChild(selectionShape)
      selectionArea.next({
        x: selectionShape.x + stage.x,
        y: selectionShape.y + stage.y,
        width: 0,
        height: 0,
      })
      const onMouseUp = (e: MouseEvent) => {
        display.removeChild(selectionShape)
        document.removeEventListener('mouseup', onMouseUp)
        display.off('mousemove', onMouseMove)
      }
      const onMouseMove = (_e) => {
        const selectionWidth = _e.data.global.x - pointerDownPosition.x - stage.x
        const selectionHeight = _e.data.global.y - pointerDownPosition.y - stage.y
        selectionShape
        .clear()
        .lineStyle(1, 0xffffff, 0.5)
        .beginFill(0xffffff, 0.1)
        .drawRect(0, 0, selectionWidth, selectionHeight)
        selectionArea.next({
          x: selectionShape.x + stage.x,
          y: selectionShape.y + stage.y,
          width: selectionWidth,
          height: selectionHeight,
        })
      }
      document.addEventListener('mouseup', onMouseUp)
      display.on('mousemove', onMouseMove)
    }
  }

  Observables.pixiAppCanvasDimentionv$.subscribe(dimention => {
    display
      .clear()
      .beginFill(0x000000, 0)
      .drawRect(0, 0, dimention.width, dimention.height)
      .endFill()
  })

  display.on('pointerdown', onMouseDown)
  display.interactive = true;

  // public interface
  self.getDisplay = () => display
 }
