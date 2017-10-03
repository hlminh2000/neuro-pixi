import { Point } from 'pixi.js'
import GlobalSubjects from '../../globalServices/Subjects.js'
import _ from 'lodash'

const globalOrigin = new Point(0, 0)
const displayListenerMap = {}
let selectedObjects = []

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
        const stageLocationOffset = {
          x: pixiDisplayObject === config.stage ? 0 : config.stage.x,
          y: pixiDisplayObject === config.stage ? 0 : config.stage.y,
        }
        localEventPosition.x = e.data.originalEvent.offsetX
          - pixiDisplayObject.toGlobal(globalOrigin, localOrigin).x
          + (stageLocationOffset.x || 0)
        localEventPosition.y = e.data.originalEvent.offsetY
          - pixiDisplayObject.toGlobal(globalOrigin, localOrigin).y
          + (stageLocationOffset.y || 0)
        const onMouseUp = _e => {
          window.removeEventListener('mouseup', onMouseUp)
          document.removeEventListener('mousemove', onMouseMove)
          config.onDragEnd(_e)
        }
        const onMouseMove = _e => {
          const lastLocation = {x: pixiDisplayObject.x, y: pixiDisplayObject.y}
          pixiDisplayObject.x = _e.offsetX - localEventPosition.x
          pixiDisplayObject.y = _e.offsetY - localEventPosition.y
          GlobalSubjects.$_draggableObjectLocation.next({
            object: pixiDisplayObject,
            x: pixiDisplayObject.x,
            y: pixiDisplayObject.y,
            lastX: lastLocation.x,
            lastY: lastLocation.y,
          })
          config.onDragUpdate(_e)
        }
        window.addEventListener('mouseup', onMouseUp)
        document.addEventListener('mousemove', onMouseMove)
        if(pixiDisplayObject.parent){
          pixiDisplayObject.parent.addChild(pixiDisplayObject)
        }
        config.onDragStart(e)
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
