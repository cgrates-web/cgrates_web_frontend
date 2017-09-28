import Ember from 'ember'
import FilterComponentMixin from 'cgrates-web-frontend/mixins/filter-component-mixin'

export default Ember.Component.extend FilterComponentMixin,
  valueNumber: Ember.computed 'valueWrapper',
    get: (key) ->
      return null if Ember.isBlank(@get('valueWrapper'))
      @get('valueWrapper').replace(/s$/, '')
    set: (key, value) ->
      @set 'valueWrapper', "#{value}s"
      value
