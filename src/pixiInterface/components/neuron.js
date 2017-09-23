// @flow
import { Graphics } from 'pixi.js';
import GlobalObservables from '../../globalServices/Observables.js'

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
        .beginFill(0x000000, 0.3)
        .lineStyle(1, 0x000000, 0.3)
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
        internalState.isSelected = objs.filter(obj => obj.model === self).length
        render()
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
