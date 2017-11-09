import Ember from 'ember'

export default Ember.Route.extend
  model: (params) -> @store.find('tp-action-plan', params['tp-action-plan_id'])
