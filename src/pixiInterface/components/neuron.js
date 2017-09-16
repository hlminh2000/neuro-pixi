import Graphics from 'pixi.js';

export default function Neuron(config){
  const self = this;
  const display = new PIXI.Graphics()
    .beginFill(0xffffff, 0.5)
    .lineStyle(2, 0xffffff, 1)
    .drawCircle(0, 0, 20)
  const connectedNeurons = []

  construct(config)
  function construct(config){
    self.display = display
  }

  //public interface
  self.getDisplayWidth = () => display.getBounds().width
  self.getDisplayHeight = () => display.getBounds().height
  self.connectTo = (otherNeuron) => {
    connectedNeurons.push(otherNeuron)
  }

}
