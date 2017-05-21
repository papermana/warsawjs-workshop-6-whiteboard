import React from 'react';
import propTypes from 'prop-types';
import {fabric} from 'fabric';
import FabricObjects from '../../lib/fabric-objects';

export default class Board extends React.Component {
  static propTypes = {
    isDrawingAllowed: propTypes.bool.isRequired,
    brushWidth: propTypes.number.isRequired,
  }

  drawnObjects = new Map();

  componentDidMount = () => {
    this.canvas = new fabric.Canvas(this.refs.canvas, {
      isDrawingMode: this.props.isDrawingAllowed,
    });

    this.canvas.on('object:added', async ({target}) => {
      const id = await FabricObjects.genInsert(target);

      this.drawnObjects.set(target, id);
    });

    this.canvas.on('object:modified', async ({target}) => {
      const id = await this.drawnObjects.get(target);

      FabricObjects.update({_id: id}, target);
    });

    this.canvas.on('object:removed', async ({target}) => {
      const id = await this.drawnObjects.get(target);

      FabricObjects.remove({_id: id});
    });
  }

  shouldComponentUpdate = () => false;

  componentWillReceiveProps = newProps => {
    this.canvas.isDrawingMode = newProps.isDrawingAllowed;
    this.canvas.freeDrawingBrush.width = newProps.brushWidth;
  }

  render = () => {
    return (
      <canvas ref="canvas" width={800} height={600} />
    );
  }
}
