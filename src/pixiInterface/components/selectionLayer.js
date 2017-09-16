import Graphics from 'pixi.js';

export default function SelectionLayer(_config){
  const config = {
    stage: null,
    ..._config
  }
  const self = this
  const display = new PIXI.Graphics()
    .drawRect(0, 0, config.stage.getBounds().width, config.stage.getBounds().height)
  config.stage.addChild(display)
}
