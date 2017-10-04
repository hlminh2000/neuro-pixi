import GlobalSubjects from '../../globalServices/Subjects.js'

const registeredSets = []

export default {
  registerMenuDispatcher: (pixiDisplayObject, obj, type) => {
    const setToRegister = {
      obj       : obj,
      display   : pixiDisplayObject,
      callback  : onDisplayRightDown,
      type      : type
    }
    const onDisplayRightDown = e => {
      console.log(e);
      GlobalSubjects.$_currentContextMenuDispatcher.next(setToRegister)
    }
    pixiDisplayObject.on('rightdown', onDisplayRightDown)
    registeredSets.push(setToRegister)
  },
  deregisterMenuDispatcher: (objOrDisplay) => {
    var registeredSetFound = registeredSets.filter(set => {
      return set.obj === objOrDisplay || set.display === objOrDisplay
    })[0]
    if(registeredSetFound) {
      registeredSetFound.display.off('rightdown', registeredSetFound.callback)
    }
  }
}
