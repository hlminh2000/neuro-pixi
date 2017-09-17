import 'jquery-ui-dist/jquery-ui.js'
import DraggablePanel from './domInterface/components/draggablePanel.jsx'
import pixiInterface from './pixiInterface'
import { initDevTools } from 'preact/devtools/devtools.js'
import { h, render, Component } from 'preact'
import bulma from 'bulma'
import $ from "jquery"

const app = () => (
  <div style={{
    position: 'absolute',
    left: '0px',
    right: '0px',
    top: '0px',
    bottom: '0px',
    background: '#31ABFA',
    overflow: 'hidden',
  }}>
    <DraggablePanel>
      <div class="heading is-big">Config</div>
      <div>Input Layer:<input class="input is-small" type="number"></input></div>
      <div>Hidden Layers:<input class="input is-small" type="number"></input></div>
      <div>Output Layer:<input class="input is-small" type="number"></input></div>
    </DraggablePanel>
    <div id="pixiContainer"></div>
  </div>
)

render(app(), document.getElementById('app'))
pixiInterface.construct(document.getElementById('pixiContainer'))
initDevTools();
