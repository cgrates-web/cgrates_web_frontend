import Ember from 'ember'

export default Ember.Component.extend
  classNames: ['sort-header']

  currentColumn: Ember.computed 'key', 'sortColumn', ->
    Ember.isEqual @get('key'), @get('sortColumn')

  actions:
    toggleSort: ->
      if (@get('currentColumn'))
        if (Ember.isEqual @get('sortOrder'), 'desc')
          newSortOrder = 'asc'
        else
          newSortOrder = 'desc'
        @sendAction 'sortAction', @get('sortColumn'), newSortOrder
      else
        @sendAction 'sortAction', @get('key'), 'asc'
