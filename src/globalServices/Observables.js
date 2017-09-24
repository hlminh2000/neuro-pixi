import Rx from 'rxjs/Rx';
import GlobalSubjects from './Subjects.js'

export default {
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
}
