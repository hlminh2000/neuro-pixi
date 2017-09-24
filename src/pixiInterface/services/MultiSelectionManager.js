// @flow
import SelectionLayer from '../components/SelectionLayer.js'
import GlobalObservables from '../../globalServices/Observables.js'
import { DisplayObject, Graphics, interaction, Application } from 'pixi.js'
import DisplayObjectUtility from './DisplayObjectUtility.js'
import GlobalSubjects from '../../globalServices/Subjects.js'

const selectableObjectModels = []
const virtualSelection = new Graphics()

// console.log(DisplayObjectUtility.hitTest);

GlobalObservables.selectionArea$.subscribe({
  next: e => {
    virtualSelection
      .clear()
      .drawRect(0, 0, e.width, e.height)
    virtualSelection.x = e.x
    virtualSelection.y = e.y
    selectableObjectModels.forEach( objModel => {
      if(DisplayObjectUtility.hitTest(objModel.display, virtualSelection)){
        objModel.isSelected = true
      } else {
        objModel.isSelected = false
      }
    })
    GlobalSubjects.$_multiSelectableObjects.next(selectableObjectModels)
  }
})

// GlobalObservables.draggableObjectLocation$.subscribe({
//   next: updateData => {
//     const selectedDisplayObjectMoved = selectableObjectModels
//       .map(obj => obj.display)
//       .filter(obj => obj === updateData.object)[0]
//     if(selectedDisplayObjectMoved){
//       GlobalSubjects.$_selectedObjectLocation.next({
//         object: selectedDisplayObjectMoved,
//         x: selectedDisplayObjectMoved.x,
//         y: selectedDisplayObjectMoved.y,
//         originalX: updateData.originalX,
//         originalY: updateData.originalY,
//       })
//     }
//   }
// })

export default {
  registerSelectableObject: (_selectableObject: Object, _display: DisplayObject) => {
    selectableObjectModels.push({
      isSelected: false,
      display: _display
    })
  },
  isObjectSelected: (_display: DisplayObject) => selectableObjectModels
    .filter(model => model.isSelected)
    .map(model => model.display)
    .indexOf(_display) != -1
}
