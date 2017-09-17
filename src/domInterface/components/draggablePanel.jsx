import bulma from 'bulma'
import { h } from 'preact'
import Draggable from './draggable.jsx'
import Panel from './panel.jsx'

export default (props) => (
  <Draggable>
    <Panel>
      { props.children }
    </Panel>
  </Draggable>
)
