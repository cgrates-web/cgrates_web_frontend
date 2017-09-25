import Ember from 'ember'

export default Ember.Mixin.create
  filtersPane: null

  push: Ember.on 'didInsertElement', ->
    @get('filtersPane').pushFilter(this)

  query: Ember.computed 'filter.value', ->
    if Ember.isBlank(@get('filter.value'))
      value = null
    else
      value = @get('filter.value')
    {key: @get('filter.key'), value: value}

  clearFilter: ->
    @set('filter.value', null) unless @get('isDestroyed')
