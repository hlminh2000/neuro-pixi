import Rx from 'rxjs/Rx';
import {selectionArea} from '../pixiInterface/components/SelectionLayer.js'
import {$_multiSelectableObjects} from '../pixiInterface/services/MultiSelectionManager.js'

export default {
  selectionArea$ : new Rx.Observable( (observer) => {
    return selectionArea.subscribe({
      next: value => observer.next(value)
    })
  }),
  selectedObjects$ : new Rx.Observable( (observer) => {
    return $_multiSelectableObjects.subscribe({
      next: objs => observer.next(objs.filter(obj => obj.isSelected))
    })
  })
}
