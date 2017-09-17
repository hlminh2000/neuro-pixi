import bulma from 'bulma';
import { h, Component } from 'preact';
import $ from "jquery";

export default class Draggable extends Component{
  constructor() {
    super();
  }

  componentDidMount() {
    $(this.draggableEl).draggable();
  }

  render (props, state) {
    return (
      <div ref={ el => this.draggableEl = el }>
        { this.props.children }
      </div>
    );
  }
}
