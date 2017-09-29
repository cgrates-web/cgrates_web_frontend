import Ember from 'ember'

export default Ember.Route.extend
  model: -> @modelFor('tariff-plan.tp-timings.tp-timing')
