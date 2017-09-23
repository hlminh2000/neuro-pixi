import Rx from 'rxjs/Rx';
import {selectionArea} from '../pixiInterface/components/SelectionLayer.js'

export default {
  selectionArea$ : new Rx.Observable( (observer) => {
    return selectionArea.subscribe({
      next: value => observer.next(value)
    })
  }),
}
