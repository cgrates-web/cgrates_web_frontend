import Ember from 'ember'

export default Ember.Route.extend
  model: -> @store.createRecord 'tp-smart-rate-import-job', tpid: @modelFor('tariff-plan').get('alias')

  actions:
    willTransition: -> @currentModel.destroyRecord() if @currentModel.get('isNew')
