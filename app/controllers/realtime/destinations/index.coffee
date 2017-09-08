import Ember from 'ember'

export default Ember.Controller.extend
  destinationsSorting: ['id'],
  sortedDestinations: Ember.computed.sort('model', 'destinationsSorting'),
  
  actions:
    remove: (destination) -> destination.destroyRecord()
