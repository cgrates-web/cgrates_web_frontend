import Ember from 'ember'

export default Ember.Route.extend
  model: -> @store.createRecord 'destination'

  actions:
    willTransition: -> @currentModel.destroyRecord() if @currentModel.get('isNew')
