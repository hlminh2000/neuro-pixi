// @flow
import SelectionLayer from '../components/SelectionLayer.js'
import GlobalObservables from '../../globalServices/Observables.js'
import { DisplayObject, Graphics, interaction, Application } from 'pixi.js'

interface _selectableObject {
  getDisplay(): DisplayObject
}

let interactionManager: interaction.InteractionManager = null

console.log(interactionManager);

let stage: Application.Stage = null
const selectableObjects = []


GlobalObservables.selectionArea$.subscribe({
  next: e => {
    console.log(e);
    const virtualSelection = new Graphics()
      .drawRect(0, 0, e.width, e.height)
    if(stage){
      stage.addChild(virtualSelection)
      selectableObjects.forEach( object => {
        if(interactionManager){

        }
      })
      stage.removeChild(virtualSelection)
    }
  }
})

export default {
  registerSelectableObject: (_selectableObject: DisplayObject) => {
    selectableObjects.push({
      isSelected: false,
      object: _selectableObject,
    })
  },
  registerStage: (_stage: Application.Stage) => stage = _stage,
  registerRenderer: (_renderer: Application.Renderer) => {
    interactionManager = new interaction.InteractionManager(_renderer)
  },
}
