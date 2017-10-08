import React from 'react'
import { connect } from 'react-redux'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"

const menu = (props) => (
  <ContextMenu className="dropdown-content" id="context-menu-trigger">
    {(()=>{
      console.log(props.context);
      switch (props.context.type) {
        case 'NEURON':
          return [
            (
              <MenuItem key="0">
                <a className="dropdown-item">Delete</a>
              </MenuItem>
            )
          ]
        default:
          return [
            (
              <MenuItem key="0">
                <a className="dropdown-item">ContextMenu Item 1</a>
              </MenuItem>
            ),
            (
              <MenuItem key="1">
                <a className="dropdown-item">ContextMenu Item 2</a>
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
    onClick: id => {}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(menu)
