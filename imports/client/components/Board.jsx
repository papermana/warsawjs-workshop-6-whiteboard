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
      try {
        const id = await FabricObjects.genInsert(target.toObject());

        this.drawnObjects.set(target, id);
      } catch (e) {
        console.error(
          'Something went wrong when inserting a canvas object in DB: ',
          e
        );
      }
    });

    this.canvas.on('object:modified', async ({target}) => {
      try {
        const id = this.drawnObjects.get(target);

        FabricObjects.genUpdate({_id: id}, target.toObject());
      } catch (e) {
        console.error(
          'Something went wrong when updating a canvas object in DB: ',
          e
        );
      }
    });

    this.canvas.on('object:removed', async ({target}) => {
      try {
        const id = this.drawnObjects.get(target);

        FabricObjects.genRemove({_id: id});
      } catch (e) {
        console.error(
          'Something went wrong when removing a canvas object from DB: ',
          e
        );
      }
    });

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
