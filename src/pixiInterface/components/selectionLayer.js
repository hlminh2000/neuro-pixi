import Graphics from 'pixi.js';

export default function SelectionLayer(_config){
  const config = {
    stage: null,
    app: null,
    ..._config
  }
  const stage = config.stage
  const app = config.app
  const self = this
  const display = new PIXI.Graphics()
  const selectionShape = new PIXI.Graphics()

  const onMouseDown = (e) => {
    console.log(e)
    // selectionShape
    stage.on('mouseup', onMouseUp)
    stage.on('mousemove', onMouseMove)
  }

  const onMouseUp = (e) => {
    console.log(e)
  }

  const onMouseMove = (e) => {
    console.log(e)
  }

  const updateRenderSize = () => {
    display
      .clear()
      .beginFill(0x000000, 0.5)
      .lineStyle(2, 0x000000, 1)
      .drawRect(0, 0, config.app.renderer.view.width, config.app.renderer.view.height)
      .endFill()
  }

  updateRenderSize()
  window.addEventListener('resize', updateRenderSize)
  display.on('pointerdown', (e) => {
    console.log("asdfdfsg");
    // onMouseDown)()
  })


  // public interface
  self.getDisplay = () => display
}
