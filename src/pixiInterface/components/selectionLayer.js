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
  const pointerDownPosition = new PIXI.Point()

  const onMouseDown = (e) => {
    pointerDownPosition.x = e.data.global.x
    pointerDownPosition.y = e.data.global.y
    selectionShape.x = pointerDownPosition.x
    selectionShape.y = pointerDownPosition.y
    selectionShape.clear()
    display.addChild(selectionShape)
    display.on('pointerup', onMouseUp)
    display.on('pointermove', onMouseMove)
  }

  const onMouseUp = (e) => {
    display.removeChild(selectionShape)
    display.off('pointerup', onMouseUp)
    display.off('pointermove', onMouseMove)
  }

  const onMouseMove = (e) => {
    const selectionWidth = e.data.global.x - pointerDownPosition.x
    const selectionHeight = e.data.global.y - pointerDownPosition.y
    selectionShape
      .clear()
      .lineStyle(1, 0xffffff, 1)
      .beginFill(0xffffff, 0.3)
      .drawRect(0, 0, selectionWidth, selectionHeight)
  }

  const updateRenderSize = () => {
    display
      .clear()
      .beginFill(0x000000, 0)
      .drawRect(0, 0, config.app.renderer.view.offsetWidth, config.app.renderer.view.offsetHeight)
      .endFill()
  }

  console.log(config.app.renderer);

  updateRenderSize()
  window.addEventListener('resize', updateRenderSize)
  display.on('pointerdown', onMouseDown)
  display.interactive = true;



  // public interface
  self.getDisplay = () => display
}
