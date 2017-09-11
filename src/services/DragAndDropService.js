
var currentDrag = null


export default {
  enableDrag: function(pixiDisplayObject, stage){
    pixiDisplayObject.interactive = true;
    const onMouseDown = e => {
      document.addEventListener('mouseup', onMouseUp)
      document.addEventListener('mousemove', onMouseMove)
    }
    const onMouseUp = e => {
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mousemove', onMouseMove)
    }
    const onMouseMove = e => {
      console.log(e);
      console.log(pixiDisplayObject);
    }
    pixiDisplayObject.on("mousedown", onMouseDown)
  },
  disableDrag: function(pixiDisplayObject){

  }
}
