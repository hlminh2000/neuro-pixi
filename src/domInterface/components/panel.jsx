import bulma from 'bulma';
import { h } from 'preact';

export default (props) => (
  <div class="card" ref={'panel'} style={{
    position: 'absolute',
    minHeight: '300px',
    maxHeight: '80%',
    width: '200px',
    borderRadius: '10px',
    padding: '20px;'
  }}>
    { props.children }
  </div>
)
