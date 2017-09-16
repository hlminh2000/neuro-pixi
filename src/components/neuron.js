import Graphics from 'pixi.js';

export default function Neuron(config){
  var self = this;
  var display = new PIXI.Graphics()
    .beginFill(0xffffff, 0.5)
    .lineStyle(3, 0xffffff, 1)
    .drawCircle(0, 0, 30)

  construct(config)
  function construct(config){
    self.display = display
  }

  //public interface
  self.getDisplayWidth = () => display.getBounds().width
  self.getDisplayHeight = () => display.getBounds().height

}
