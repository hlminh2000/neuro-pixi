// @flow
import { Graphics } from 'pixi.js';
import GlobalObservables from '../../globalServices/Observables.js'
import MultiSelectionManager from '../services/MultiSelectionManager.js'

export default function Neuron(config: Object){
  const self = this;
  const display:Graphics = new Graphics()
  const connectedNeurons = []
  const internalState = {
    isSelected: false
  }

  const render = () => {
    display.clear()
    if(internalState.isSelected){
      display
        .beginFill(0xffffff, 0.3)
        .lineStyle(1, 0xffffff, 0.3)
        .drawRoundedRect(-30, -30, 60, 60, 5)
    }
    display
      .beginFill(0xffffff, 0.5)
      .lineStyle(2, 0xffffff, 1)
      .drawCircle(0, 0, 20)
      .endFill()
  }

  construct(config)
  function construct(config: Object){
    self.display = display
    GlobalObservables.selectedObjects$.subscribe({
      next: objs => {
        internalState.isSelected = objs.filter(obj => obj.display === display).length > 0
        render()
      }
    })
    GlobalObservables.draggableObjectLocation$.subscribe({
      next: positionData => {
        if( internalState.isSelected
          && positionData.object !== display
          && MultiSelectionManager.isObjectSelected(positionData.object)
        ){
          const targetPosition = {
            x: display.x + (positionData.x - positionData.lastX),
            y: display.y + (positionData.y - positionData.lastY),
          }
          display.x = Math.max(targetPosition.x, 0)
          display.y = Math.max(targetPosition.y, 0)
        }
      }
    })
    render()
  }

  //public interface
  self.getDisplayWidth = (): number => display.getBounds().width
  self.getDisplayHeight = (): number => display.getBounds().height
  self.connectTo = (otherNeuron: Neuron): void => {
    connectedNeurons.push(otherNeuron)
  }
  self.getDisplay = (): Graphics => display

}
