import Ember from 'ember'

export default Ember.Component.extend
  activeFilters: {}

  actions:
    pushValue: (key, value) ->
      @get('activeFilters')[key] = value

    search: ->
      @sendAction 'search', @get('activeFilters')

    reset: ->
      for key of @get('activeFilters')
        @get('activeFilters')[key] = null
      @sendAction 'search', @get('activeFilters')
