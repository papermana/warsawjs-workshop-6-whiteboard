import React from 'react';
import propTypes from 'prop-types';
import {fabric} from 'fabric';
import FabricObjects from '../../lib/fabric-objects';
import {Mongo} from 'meteor/mongo';
import {
  deepCompare,
  deepMerge,
  filterMap,
} from '../../lib/utils';

Meteor.subscribe('fabricObjects');

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
        if (this.drawnObjects.has(target)) {
          return;
        }

        const id = new Mongo.ObjectID()._str;

        this.drawnObjects.set(target, id);
        FabricObjects.genInsert({
          _id: id,
          data: target.toObject(),
        });
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

        FabricObjects.genUpdate({_id: id}, {
          _id: id,
          data: target.toObject()
        });
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

    FabricObjects.find().observeChanges({
      added: (id, {data}) => {
        if ([...this.drawnObjects.values()].find(x => x === id)) {
          return;
        }

        fabric.util.enlivenObjects([data], ([fabricObject]) => {
          this.drawnObjects.set(fabricObject, id);
          this.canvas.add(fabricObject);
        });
      },
      changed: (id, {data}) => {
        fabric.util.enlivenObjects([data], ([fabricObject]) => {
          const existingObject = filterMap(
            this.drawnObjects,
            objId => objId === id,
          );

          if (deepCompare(existingObject, fabricObject)) {
            return;
          }

          deepMerge(existingObject, fabricObject);

          this.canvas.renderAll();
        });
      },
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
