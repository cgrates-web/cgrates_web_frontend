import Ember from 'ember'

export default Ember.Route.extend
  model: -> @modelFor('tariff-plan.tp-rates.tp-rate')

  actions:
    willTransition: -> @currentModel.rollbackAttributes() if @currentModel.get('hasDirtyAttributes')
