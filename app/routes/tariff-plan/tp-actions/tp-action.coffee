import Ember from 'ember'

export default Ember.Route.extend
  model: (params) -> @store.find('tp-action', params['tp-action_id'])
