import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { ContextMenu, MenuItem, SubMenu } from "react-contextmenu"
import './contextMenu.css'
import Subjects from '../../../globalServices/Subjects.js'

class menu extends Component{

  constructor(){
    super()
    this.updatePosition = this.updatePosition.bind(this)
  }

  updatePosition(){
    const self = this
    console.log(this);
    this.setState({
      ...self.state,
      x: self.menu.state.x,
      y: self.menu.state.y,
    })
  }

  render(){
    return (
      <ContextMenu
        ref={ el => this.menu = el }
        onShow={ this.updatePosition }
        className="dropdown-content"
        id="context-menu-trigger">
        {(()=>{
          console.log(this.props.context);
          switch (this.props.context.type) {
            case 'NEURON':
              return [
                (
                  <MenuItem key="0">
                    <span>Delete</span>
                  </MenuItem>
                )
              ]
            default:
              return [
                (
                  <SubMenu title="New..." className="dropdown-content" key="0">
                    <MenuItem onClick={() => this.props.addNeuron(this.menu.state)}>
                      <span>Neuron</span>
                    </MenuItem>
                    <MenuItem>
                      <span>Layer</span>
                    </MenuItem>
                  </SubMenu>
                ),
                (
                  <MenuItem key="1">
                    <span>ContextMenu Item 2</span>
                  </MenuItem>
                )
              ]
          }
        })()}
       </ContextMenu>
     )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    context: state.currentContextMenuDispatcher
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addNeuron: (internalState) => {
      Subjects.$_latestNeuronConfig.next({
        x: internalState.x,
        y: internalState.y,
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(menu)
