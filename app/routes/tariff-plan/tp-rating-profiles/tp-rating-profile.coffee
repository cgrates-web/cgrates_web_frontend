import Ember from 'ember'

export default Ember.Route.extend
  model: (params) -> @store.find('tp-rating-profile', params['tp-rating-profile_id'])
