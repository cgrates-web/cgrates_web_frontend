import Ember from 'ember'

export default Ember.Route.extend
  model: (params) -> @store.find('tp-destination', params['tp-destination_id'])
