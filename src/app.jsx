// import './index.html'
import pixiInterface from './pixiInterface';
import Panel from './domInterface/components/panel.jsx'
// import Draggable from 'react-draggable';
// import {TweenMax, CSSPlugin} from "gsap";
import { h, render, Component } from 'preact';
import bulma from 'bulma';
import { initDevTools } from 'preact/devtools/devtools.js';
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
  ">
    <KendoDraggable>
      <Panel>
        <div id="toDrag"></div>
      </Panel>
    </KendoDraggable>
    <div id="pixiContainer"></div>
  </div>
), document.getElementById('app'))
pixiInterface.construct(document.getElementById('pixiContainer'))
initDevTools();
