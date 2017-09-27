import Ember from 'ember'

export default Ember.Route.extend
  model: (params) -> @store.find('tariff-plan', params['tariff-plan_id'])
