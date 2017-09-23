// @flow
import SelectionLayer from '../components/SelectionLayer.js'
import GlobalObservables from '../../globalServices/Observables.js'
import { DisplayObject, Graphics, interaction, Application } from 'pixi.js'
import DisplayObjectUtility from './DisplayObjectUtility.js'
import { Subject } from 'rxjs/Rx';

export const $_multiSelectableObjects = new Subject()

interface SelectableObject {
  getDisplay(): DisplayObject,
}

let stage: Application.Stage = null
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
      if(DisplayObjectUtility.hitTest(objModel.model.getDisplay(), virtualSelection)){
        objModel.isSelected = true
      } else {
        objModel.isSelected = false
      }
    })
    selectableObjectModels.forEach( objModel => {
      // if(objModel)
    })
    console.log(selectableObjectModels.filter(model => model.isSelected).length);
    $_multiSelectableObjects.next(selectableObjectModels)
  }
})

export default {
  registerSelectableObject: (_selectableObject: SelectableObject) => {
    selectableObjectModels.push({
      isSelected: false,
      model: _selectableObject,
    })
  }
}
