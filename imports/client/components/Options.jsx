import React from 'react';
import propTypes from 'prop-types';

export default class Options extends React.Component {
  static propTypes = {
    toggleAllowDrawing: propTypes.func.isRequired,
    isDrawingAllowed: propTypes.bool.isRequired,
  }

  render = () => (
    <div>
      <button onClick={this.props.toggleAllowDrawing} >
        Allow drawing? {this.props.isDrawingAllowed ? 'Yes' : 'No'}
      </button>
    </div>
  )
}
