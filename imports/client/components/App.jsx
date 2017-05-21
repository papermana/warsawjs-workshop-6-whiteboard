import React from 'react';
import Board from './Board';
import Options from './Options';

export default class App extends React.Component {
  state = {
    isDrawingAllowed: true,
    brushWidth: 1,
  }

  toggleAllowDrawing = () => {
    this.setState(state => ({
      isDrawingAllowed: !state.isDrawingAllowed,
    }));
  }

  setBrushWidth = ({target: {value}}) => {
    this.setState(state => ({
      brushWidth: Number(value),
    }));
  }

  render = () => (
    <div>
      <h1>Hello world</h1>

      <Board
        isDrawingAllowed={this.state.isDrawingAllowed}
        brushWidth={this.state.brushWidth} />
      <Options
        isDrawingAllowed={this.state.isDrawingAllowed}
        toggleAllowDrawing={this.toggleAllowDrawing}
        brushWidth={this.state.brushWidth}
        setBrushWidth={this.setBrushWidth} />
    </div>
  )
}
