import React from 'react';
import propTypes from 'prop-types';

export default class Options extends React.Component {
  static propTypes = {
    toggleAllowDrawing: propTypes.func.isRequired,
    isDrawingAllowed: propTypes.bool.isRequired,
    brushWidth: propTypes.number.isRequired,
    setBrushWidth: propTypes.func.isRequired,
  }

  render = () => (
    <div>
      <button onClick={this.props.toggleAllowDrawing} >
        Allow drawing? {this.props.isDrawingAllowed ? 'Yes' : 'No'}
      </button>
      <label>
        Brush width
        <input type="number"
          value={this.props.brushWidth}
          onChange={this.props.setBrushWidth} />
      </label>
    </div>
  )
}
