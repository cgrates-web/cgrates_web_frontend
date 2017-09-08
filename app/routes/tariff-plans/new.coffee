import Ember from 'ember'

export default Ember.Route.extend
  model: -> @store.createRecord 'tariff-plan'

  actions:
    willTransition: -> @currentModel.destroyRecord() if @currentModel.get('isNew')
