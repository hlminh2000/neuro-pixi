import { h, render, Component } from 'preact'
import PixiApp from './PixiApp'
import GlobalSubjects from '../globalServices/Subjects.js'


export default class PixiAppContainer extends Component{

  componentDidMount(){
    // construct(this.container)
    this.container.appendChild(PixiApp.view)
    PixiApp.renderer.resize(this.container.offsetWidth, this.container.offsetHeight)
    const updateRenderSize = () => {
      GlobalSubjects.$_pixiAppCanvasDimention.next({
        width: this.container.offsetWidth,
        height: this.container.offsetHeight,
      })
    }
    window.addEventListener('resize', updateRenderSize)
    updateRenderSize()
  }

  render(){
    return <div style={{
      overflow: 'hidden',
      borderRadius: '5px',
      margin: '10px',
      flex: '1',
    }} ref={el => this.container = el}></div>
  }
}
