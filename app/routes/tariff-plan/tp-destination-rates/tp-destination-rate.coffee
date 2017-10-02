import Ember from 'ember'

export default Ember.Route.extend
  model: (params) -> @store.find('tp-destination-rate', params['tp-destination-rate_id'])
