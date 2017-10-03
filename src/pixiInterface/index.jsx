import React from 'react'
import { Component } from 'react'
import PixiApp from './PixiApp'
import GlobalSubjects from '../globalServices/Subjects.js'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"

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

    setTimeout(() => {
      this.setState({})
    }, 2000);
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
        border: 'solid 1px white',
      }}>
        <ContextMenuTrigger holdToDisplay={-1} id="context-menu-trigger">
          <div ref={el => this.pixiContainer = el}></div>
        </ContextMenuTrigger>
        <ContextMenu className="dropdown-content" id="context-menu-trigger">
          <MenuItem>
            <a className="dropdown-item">ContextMenu Item 1</a>
          </MenuItem>
          <MenuItem>
            <a className="dropdown-item">ContextMenu Item 2</a>
          </MenuItem>
          <hr className="dropdown-divider"></hr>
          <MenuItem>
            <a className="dropdown-item">Delete</a>
          </MenuItem>
       </ContextMenu>
       <input style={{
         position: 'absolute',
         right: '20px',
         bottom: '20px',
       }} type="range"></input>
      </div>
    )
  }
}
