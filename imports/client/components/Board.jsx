import React from 'react';
import {fabric} from 'fabric';

export default class Board extends React.Component {
  componentDidMount = () => {
    this.canvas = new fabric.Canvas(this.refs.canvas);
  }

  render = () => {
    return (
      <canvas ref="canvas" width={800} height={600} />
    );
  }
}
