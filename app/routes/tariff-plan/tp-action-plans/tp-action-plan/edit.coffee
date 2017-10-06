import Ember from 'ember'

export default Ember.Route.extend
  model: -> @modelFor('tariff-plan.tp-action-plans.tp-action-plan')

  actions:
    willTransition: -> @currentModel.rollbackAttributes() if @currentModel.get('hasDirtyAttributes')
