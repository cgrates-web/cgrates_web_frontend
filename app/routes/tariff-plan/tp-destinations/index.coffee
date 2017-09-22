import Ember from 'ember'

export default Ember.Route.extend
  model: (params) ->
    @store.query 'tp-destination', tpid: @modelFor('tariff-plan').get('alias')
