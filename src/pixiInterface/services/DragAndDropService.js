import Point from 'pixi.js'

const globalOrigin = new PIXI.Point(0, 0)
const displayListenerMap = {}

export default {
  enableDrag: function(pixiDisplayObject, _configs){
    const config = {
      onDragStart: () => {},
      onDragUpdate: () => {},
      onDragEnd: () => {},
      ..._configs
    }
    pixiDisplayObject.buttonMode = true;
    pixiDisplayObject.interactive = true;
    const localEventPosition = { x: 0, y: 0 }
    const localOrigin = new PIXI.Point(0, 0)
    const onMouseDown = e => {
      localEventPosition.x = e.data.originalEvent.offsetX - pixiDisplayObject.toGlobal(globalOrigin, localOrigin).x
      localEventPosition.y = e.data.originalEvent.offsetY - pixiDisplayObject.toGlobal(globalOrigin, localOrigin).y
      document.addEventListener('mouseup', onMouseUp)
      document.addEventListener('mousemove', onMouseMove)
      config.onDragStart()
    }
    const onMouseUp = e => {
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mousemove', onMouseMove)
      config.onDragEnd()
    }
    const onMouseMove = e => {
      pixiDisplayObject.x = e.offsetX - localEventPosition.x
      pixiDisplayObject.y = e.offsetY - localEventPosition.y
      config.onDragUpdate()
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
