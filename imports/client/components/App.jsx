import React from 'react';
import Board from './Board';
import Options from './Options';

export default class App extends React.Component {
  state = {
    isDrawingAllowed: true,
  }

  toggleAllowDrawing = () => {
    this.setState(state => ({
      isDrawingAllowed: !state.isDrawingAllowed,
    }));
  }

  render = () => (
    <div>
      <h1>Hello world</h1>

      <Board
        isDrawingAllowed={this.state.isDrawingAllowed} />
      <Options
        isDrawingAllowed={this.state.isDrawingAllowed}
        toggleAllowDrawing={this.toggleAllowDrawing} />
    </div>
  )
}
