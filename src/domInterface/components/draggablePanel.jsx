import bulma from 'bulma'
import React from 'react';
import Draggable from './draggable.jsx'
import Panel from './panel.jsx'

export default (props) => (
  <Draggable>
    <Panel>
      { props.children }
    </Panel>
  </Draggable>
)
