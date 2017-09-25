import Ember from 'ember'

export default Ember.Component.extend
  activeFilters: []

  pushFilter: (filter) ->
    @get('activeFilters').push filter

  actions:
    search: ->
      fullQuery = {}
      @get('activeFilters').forEach (filter) ->
        query = filter.get('query')
        unless Ember.isBlank(query)
          fullQuery[query.key] = query.value

      @sendAction 'search', fullQuery

    reset: ->
      fullQuery = {}
      @get('activeFilters').forEach (filter) ->
        query = filter.get('query')
        filter.clearFilter()
        unless Ember.isBlank(query)
          fullQuery[query.key] = null

      @sendAction 'search', fullQuery
