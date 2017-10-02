import Ember from 'ember'

export default Ember.Mixin.create
  valueNumber: Ember.computed 'valueWrapper',
    get: (key) ->
      return null if Ember.isBlank(@get('valueWrapper'))
      @get('valueWrapper').replace(/s$/, '')
    set: (key, value) ->
      @set 'valueWrapper', "#{value}s"
      value
