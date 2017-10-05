import Ember from 'ember'

export default Ember.Route.extend
  model: -> @store.createRecord 'add-balance', account: @modelFor('realtime.accounts.account').get('id')

  actions:
    willTransition: -> @currentModel.destroyRecord() if @currentModel.get('isNew')
