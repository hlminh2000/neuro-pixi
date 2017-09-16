import Graphics from 'pixi.js';

export default function SelectionLayer(_config){
  const config = {
    stage: null,
    ..._config
  }
  const stage = config.stage
  const self = this
  const display = new PIXI.Graphics()
    .beginFill(0x000000, 0.1)
    .lineStyle(2, 0x000000, 1)
    .drawRect(0, 0, config.stage.getBounds().width, config.stage.getBounds().height)
    .endFill()

  const onMouseDown = (e) => {
    console.log(e)
    stage.on('mouseup', onMouseUp)
    stage.on('mousemove', onMouseMove)
  }

  const onMouseUp = (e) => {
    console.log(e)
  }

  const onMouseMove = (e) => {
    console.log(e)
  }

  display.on('mousedown', onMouseDown)

  // stage.addChild(display)

  // public interface
  self.getDisplay = () => display
}
