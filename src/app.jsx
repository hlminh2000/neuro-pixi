import 'jquery-ui-dist/jquery-ui.js'
import DraggablePanel from './domInterface/components/draggablePanel.jsx'
import PixiAppContainer from './pixiInterface/index.jsx'
import { initDevTools } from 'preact/devtools/devtools.js'
import { h, render, Component } from 'preact'
import bulma from 'bulma'
import $ from "jquery"

const gridBackground = {
  backgroundColor: '#317BBF',
  backgroundImage: `
    linear-gradient(rgba(230, 230, 230, 0.2) 1px, transparent 1px),
    linear-gradient(90deg, rgba(230, 230, 230, 0.2) 1px, transparent 1px),
    linear-gradient(rgba(230, 230, 230, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(230, 230, 230, 0.1) 1px, transparent 1px)`,
  backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
  backgroundPosition: '-2px -2px, -2px -2px, -1px -1px, -1px -1px',
  backgroundAttachment: 'scroll',
}

class App extends Component {
  render(){
    return (
      <div>
        <div style={{
            position: 'absolute',
            left: '0px',
            right: '0px',
            top: '0px',
            bottom: '0px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
            ...gridBackground
          }}>
          <div class="card" style="
            border-radius: 5px;
            margin: 10px;
            min-width: 200px;
            background: white;
            padding: 10px">
            <input class="input is-small"></input>
          </div>
          <PixiAppContainer></PixiAppContainer>
        </div>
      </div>
    )
  }
}
render(<App />, document.getElementById('app'))
initDevTools();
