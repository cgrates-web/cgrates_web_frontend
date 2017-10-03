import Ember from 'ember'

export default Ember.Route.extend
  model: (params) -> @store.find('tp-rating-plan', params['tp-rating-plan_id'])
