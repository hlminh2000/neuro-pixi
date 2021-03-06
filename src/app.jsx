import 'jquery-ui-dist/jquery-ui.js'
import DraggablePanel from './domInterface/components/draggablePanel.jsx'
import PixiAppContainer from './pixiInterface/index.jsx'
import React from 'react';
import { Component } from 'react'
import ReactDOM from 'react-dom'
import bulma from 'bulma'
import { Provider } from 'react-redux'
import store from './globalServices/Store.js'


const gridBackground = {
  // backgroundColor: '#317BBF',
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
      <Provider store={store}>
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
            <div className="card panel" style={{
              borderRadius: '5px',
              margin: '10px',
              minWidth: '300px',
              background: 'white'}}>
              <p className="panel-heading"> Configuration </p>
              <div className="panel-block">
                <input className="input is-small"></input>
              </div>
              <p className="panel-tabs">
                <a>Topology</a>
                <a>Training</a>
                <a>Import & Export</a>
              </p>
              <div className="card-content">
                Something
              </div>
            </div>
            <PixiAppContainer></PixiAppContainer>
          </div>
        </div>
      </Provider>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('app'))
