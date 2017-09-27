import 'jquery-ui-dist/jquery-ui.js'
import DraggablePanel from './domInterface/components/draggablePanel.jsx'
import pixiInterface from './pixiInterface'
import { initDevTools } from 'preact/devtools/devtools.js'
import { h, render, Component } from 'preact'
import bulma from 'bulma'
import $ from "jquery"

class App extends Component {
  componentDidMount(){
    console.log("mounted!");
    pixiInterface.construct(document.getElementById('pixiContainer'))
  }
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
          {
            // <DraggablePanel>
            //   <div class="heading is-big">Config</div>
            //   <div>Input Layer:<input class="input is-small" type="number"></input></div>
            //   <div>Hidden Layers:<input class="input is-small" type="number"></input></div>
            //   <div>Output Layer:<input class="input is-small" type="number"></input></div>
            // </DraggablePanel>
            // <div id="pixiContainer"></div>
          }
          <div style="min-width: 200px; background: rgba(0,0,0,0.5);">
            <input class="input is-small"></input>
          </div>
          <div style="flex: 1" id="pixiContainer"></div>
        </div>
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
initDevTools();
