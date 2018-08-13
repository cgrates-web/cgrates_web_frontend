import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  destinationsSorting: ['id'],
  sortedDestinations: computed.sort('model', 'destinationsSorting'),

  actions: {
    remove(destination) { return destination.destroyRecord(); }
  }
});
