import Ember from 'ember'

export default Ember.Route.extend
  model: -> @store.createRecord 'tp-lcr-rule', tpid: @modelFor('tariff-plan').get('alias')

  actions:
    willTransition: -> @currentModel.destroyRecord() if @currentModel.get('isNew')
