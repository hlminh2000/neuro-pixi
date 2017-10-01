import 'jquery-ui-dist/jquery-ui.js'
import DraggablePanel from './domInterface/components/draggablePanel.jsx'
import PixiApp from './pixiInterface/index.jsx'
import { initDevTools } from 'preact/devtools/devtools.js'
import { h, render, Component } from 'preact'
import bulma from 'bulma'
import $ from "jquery"

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
            background: '#31ABFA',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
          }}>
          <div class="card" style="min-width: 200px; background: rgba(0,0,0,0.5); padding: 10px">
            <input class="input is-small"></input>
          </div>
          <PixiApp></PixiApp>
          <div style="flex: 1" id="pixiContainer"></div>
        </div>
      </div>
    )
  }
}
render(<App />, document.getElementById('app'))
initDevTools();
