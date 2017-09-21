import Ember from 'ember'

export default Ember.Controller.extend
  usersSorting: ['id'],
  sortedUsers:  Ember.computed.sort('model', 'usersSorting'),

  actions:
    remove: (user) -> user.destroyRecord()
