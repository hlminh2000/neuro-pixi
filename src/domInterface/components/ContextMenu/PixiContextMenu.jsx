import React from 'react'
import { connect } from 'react-redux'
import { ContextMenu, MenuItem, SubMenu } from "react-contextmenu"
import './contextMenu.css'

const menu = (props) => (
  <ContextMenu className="dropdown-content" id="context-menu-trigger">
    {(()=>{
      console.log(props.context);
      switch (props.context.type) {
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
              <div key="0">
                <SubMenu title="New..." className="dropdown-content">
                  <MenuItem onClick={props.addNeuron}>
                    <span>Neuron</span>
                  </MenuItem>
                  <MenuItem>
                    <span>Layer</span>
                  </MenuItem>
                </SubMenu>
              </div>
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

const mapStateToProps = (state, ownProps) => {
  return {
    context: state.currentContextMenuDispatcher
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addNeuron: () => dispatch({
      type: "CONTEXT_MENU/NEW/NEURON",
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(menu)
