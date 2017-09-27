import Ember from 'ember'

export default Ember.Component.extend
  classNames: ['card-panel']

  init: ->
    @_super(arguments...)
    @set('activeFilters', {})

  actions:
    pushValue: (key, value) ->
      @get('activeFilters')[key] = value

    search: ->
      @sendAction 'search', @get('activeFilters')

    reset: ->
      for key of @get('activeFilters')
        @get('activeFilters')[key] = null
      @sendAction 'search', @get('activeFilters')
