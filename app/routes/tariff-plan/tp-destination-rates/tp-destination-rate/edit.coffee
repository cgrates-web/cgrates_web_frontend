import Ember from 'ember'

export default Ember.Route.extend
  model: -> @modelFor('tariff-plan.tp-destination-rates.tp-destination-rate')

  actions:
    willTransition: -> @currentModel.rollbackAttributes() if @currentModel.get('hasDirtyAttributes')
