import Rx from 'rxjs/Rx';
import GlobalSubjects from './Subjects.js'

export default {
  selectionArea$ : new Rx.Observable( (observer) => {
    return GlobalSubjects.$_selectionArea.subscribe({
      next: value => observer.next(value)
    })
  }),
  selectedObjects$ : new Rx.Observable( (observer) => {
    return GlobalSubjects.$_multiSelectableObjects.subscribe({
      next: objs => observer.next(objs.filter(obj => obj.isSelected))
    })
  })
}
