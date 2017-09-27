import { Point } from 'pixi.js'
import GlobalSubjects from '../../globalServices/Subjects.js'

const globalOrigin = new Point(0, 0)
const displayListenerMap = {}
let selectedObjects = []

// GlobalObservables.selectedObjects$.subscribe({
//   next: objModels => selectedObjects = objModels.map(model => model.display)
// })

export default {
  enableDrag: (pixiDisplayObject, _configs) => {
    const config = {
      onDragStart: () => {},
      onDragUpdate: () => {},
      onDragEnd: () => {},
      stage: {},
      mouseButtonIndex: null,
      ..._configs
    }
    pixiDisplayObject.buttonMode = true;
    pixiDisplayObject.interactive = true;
    const localEventPosition = { x: 0, y: 0 }
    const localOrigin = new Point(0, 0)
    const onMouseDown = e => {
      if(config.mouseButtonIndex && config.mouseButtonIndex !== e.data.originalEvent.which){
        return
      } else {
        localEventPosition.x = e.data.originalEvent.offsetX
          - pixiDisplayObject.toGlobal(globalOrigin, localOrigin).x + (config.stage.x || 0)
        localEventPosition.y = e.data.originalEvent.offsetY
          - pixiDisplayObject.toGlobal(globalOrigin, localOrigin).y + (config.stage.y || 0)
        const onMouseUp = _e => {
          document.removeEventListener('mouseup', onMouseUp)
          document.removeEventListener('mousemove', onMouseMove)
          config.onDragEnd()
        }
        const onMouseMove = _e => {
          const lastLocation = new Point(pixiDisplayObject.x, pixiDisplayObject.y)
          pixiDisplayObject.x = _e.offsetX - localEventPosition.x
          pixiDisplayObject.y = _e.offsetY - localEventPosition.y
          config.onDragUpdate()
          GlobalSubjects.$_draggableObjectLocation.next({
            object: pixiDisplayObject,
            x: pixiDisplayObject.x,
            y: pixiDisplayObject.y,
            lastX: lastLocation.x,
            lastY: lastLocation.y,
          })
        }
        document.addEventListener('mouseup', onMouseUp)
        document.addEventListener('mousemove', onMouseMove)
        if(pixiDisplayObject.parent){
          pixiDisplayObject.parent.addChild(pixiDisplayObject)
        }
        config.onDragStart()
      }

    }
    pixiDisplayObject.on("mousedown", onMouseDown)
    displayListenerMap[pixiDisplayObject] = onMouseDown
  },
  disableDrag: function(pixiDisplayObject){
    if(displayListenerMap[pixiDisplayObject]){
      pixiDisplayObject.off("mousedown", displayListenerMap[pixiDisplayObject])
    }
  }
}
