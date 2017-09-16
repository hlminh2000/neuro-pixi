// import './index.html'
import pixiInterface from './pixiInterface';
import Panel from './domInterface/components/panel.jsx'
// import Draggable from 'react-draggable';
// import {TweenMax, CSSPlugin} from "gsap";
import { h, render, Component } from 'preact';
import bulma from 'bulma';
import { initDevTools } from 'preact/devtools/devtools.js';
require('jquery-ui-dist/jquery-ui.js');
import $ from "jquery";
import KendoDraggable from 'kendo-ui-react-jquery-draggable';

const app = render((
  <div style="
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    background: #31ABFA;
    overflow: hidden;
  ">
    <div class="card" id="stuff" style={{
      position: 'absolute',
      minHeight: '300px',
      maxHeight: '80%',
      width: '200px',
      borderRadius: '10px',
      padding: '20px;'
    }}></div>
    <div id="pixiContainer"></div>
  </div>
), document.getElementById('app'))
pixiInterface.construct(document.getElementById('pixiContainer'))
$('#stuff').draggable()
initDevTools();
