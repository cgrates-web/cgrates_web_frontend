import Ember from 'ember'

export default Ember.Route.extend
  model: -> @modelFor('tariff-plan.tp-lcr-rules.tp-lcr-rule')

  actions:
    willTransition: -> @currentModel.rollbackAttributes() if @currentModel.get('hasDirtyAttributes')
