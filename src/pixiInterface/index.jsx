import React from 'react'
import { Component } from 'react'
import PixiApp from './PixiApp'
import GlobalSubjects from '../globalServices/Subjects.js'
import { ContextMenuTrigger } from "react-contextmenu"
import Observables from '../globalServices/Observables.js'
import PixiContextMenu from '../domInterface/components/PixiContextMenu.jsx'

export default class PixiAppContainer extends Component{

  componentDidMount(){
    this.pixiContainer.appendChild(PixiApp.view)
    PixiApp.renderer.resize(this.pixiContainer.offsetWidth, this.pixiContainer.offsetHeight)
    const updateRenderSize = () => {
      GlobalSubjects.$_pixiAppCanvasDimention.next({
        width: this.pixiContainer.offsetWidth,
        height: this.pixiContainer.offsetHeight,
      })
    }
    window.addEventListener('resize', updateRenderSize)
    updateRenderSize()
  }

  handleClick(e){
    console.log(e);
  }

  render(){
    return (
      <div style={{
        overflow: 'hidden',
        borderRadius: '5px',
        margin: '10px',
        flex: '1',
        border: 'solid 1px white'}}>
        <ContextMenuTrigger holdToDisplay={-1} id="context-menu-trigger">
          <div ref={el => this.pixiContainer = el}></div>
        </ContextMenuTrigger>
        <PixiContextMenu></PixiContextMenu>
      </div>
    )
  }
}
