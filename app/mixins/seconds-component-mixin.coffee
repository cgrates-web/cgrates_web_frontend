import Ember from 'ember'

export default Ember.Mixin.create
  valueNumber: Ember.computed 'valueWrapper',
    get: (key) ->
      return null if Ember.isBlank(@get('valueWrapper'))
      @get('valueWrapper').replace(/s$/, '')
    set: (key, value) ->
      console.log(value)
      @set 'valueWrapper', "#{value}s"
      console.log(@get('valueWrapper'))
      value
