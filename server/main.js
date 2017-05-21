import { Meteor } from 'meteor/meteor';
import FabricObjects from '../imports/lib/fabric-objects';

Meteor.publish({
  fabricObjects() {
    return FabricObjects.find();
  }
});
