// @flow
import { Graphics } from 'pixi.js';

export default function Neuron(config: Object){
  const self = this;
  const display:Graphics = new Graphics()
    .beginFill(0xffffff, 0.5)
    .lineStyle(2, 0xffffff, 1)
    .drawCircle(0, 0, 20)
  const connectedNeurons = []

  construct(config)
  function construct(config: Object){
    self.display = display
  }

  //public interface
  self.getDisplayWidth = (): number => display.getBounds().width
  self.getDisplayHeight = (): number => display.getBounds().height
  self.connectTo = (otherNeuron: Neuron): void => {
    connectedNeurons.push(otherNeuron)
  }
  self.getDisplay = (): Graphics => display

}
