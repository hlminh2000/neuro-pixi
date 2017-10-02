import bulma from 'bulma'
import React from 'react';

export default (props) => (
  <div className="card" style={{
      position: 'absolute',
      minHeight: '300px',
      maxHeight: '80%',
      width: '200px',
      borderRadius: '10px',
      padding: '10px',
    }}>
    { props.children }
  </div>
)
