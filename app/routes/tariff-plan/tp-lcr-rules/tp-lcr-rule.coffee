import Ember from 'ember'

export default Ember.Route.extend
  model: (params) -> @store.find('tp-lcr-rule', params['tp-lcr-rule_id'])
