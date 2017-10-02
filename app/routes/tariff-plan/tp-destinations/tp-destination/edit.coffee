import Ember from 'ember'

export default Ember.Route.extend
  model: -> @modelFor('tariff-plan.tp-destinations.tp-destination')

  actions:
    willTransition: -> @currentModel.rollbackAttributes() if @currentModel.get('hasDirtyAttributes')
