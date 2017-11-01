import Ember from 'ember'

export default Ember.Route.extend
  model: (params) -> @store.find('cdr', params['id'])
