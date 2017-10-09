import Rx from 'rxjs/Rx';
import GlobalSubjects from './Subjects.js'
import store from './Store.js'

const observables = {
  selectionArea$ : new Rx.Observable( observer => {
    return GlobalSubjects.$_selectionArea.subscribe({
      next: value => observer.next({
        x: value.x,
        y: value.y,
        width: value.width,
        height: value.height,
      })
    })
  }),
  selectedObjects$ : new Rx.Observable( observer => {
    return GlobalSubjects.$_multiSelectableObjects.subscribe({
      next: objs => observer.next(objs
        .filter(obj => obj.isSelected)
        .map(obj => ({
          isSelected: obj.isSelected,
          model: obj.model,
          display: obj.display
        }))
      )
    })
  }),
  draggableObjectLocation$ : new Rx.Observable( observer => {
    return GlobalSubjects.$_draggableObjectLocation.subscribe({
      next: data => observer.next({
        object: data.object,
        x: data.x,
        y: data.y,
        lastX: data.lastX,
        lastY: data.lastY,
      })
    })
  }),
  pixiAppCanvasDimentionv$ : new Rx.Observable( observer => {
    return GlobalSubjects.$_pixiAppCanvasDimention.subscribe({
      next: data => observer.next({
        width: data.width,
        height: data.height,
      })
    })
  }),
  currentContextMenuDispatcher$ : new Rx.Observable( observer => {
    return GlobalSubjects.$_currentContextMenuDispatcher.subscribe({
      next: data => {
        observer.next(data)
      }
    })
  }),
  cmdDown$ : Rx.Observable.fromEvent(document, 'keydown')
    .filter(function(e){
      return e.key === "Meta"
    }),
  cmdUp$ : Rx.Observable.fromEvent(document, 'keyup')
    .filter(function(e){
      return e.key === "Meta"
    }),
  latestNeuronConfig$ : new Rx.Observable( observer => {
    return GlobalSubjects.$_latestNeuronConfig.subscribe({
      next: data => {
        observer.next({
          x: data.x,
          y: data.y,
        })
      }
    })
  }),
}

observables.currentContextMenuDispatcher$.subscribe(value =>{
  store.dispatch({
    type: "USER_STAGE_RIGHTCLICK",
    payload: value
  })
})

export default observables
