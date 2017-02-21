import React, { Component } from 'react';
import Radium from 'radium'

@Radium
export default class Pixel extends Component {
  getStyle(color) {
    return {
      width: 16,
      height: 16,
      margin: 0,
      backgroundColor: color || '#eee',
      border: '1px solid #ddd',
      userSelect: 'none'
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.color !== this.props.color;
  }

  render() {
    const { color, onMouseDown, onMouseUp, onMouseOver, children } = this.props;
    return (
      <div onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseOver={onMouseOver} style={[this.getStyle(color)]}>
        <span>{children}</span>
      </div>
    )
  }
}
