import Ember from 'ember'

export default Ember.Component.extend
  classNames: ['sort-header']

  currentColumn: Ember.computed 'key', 'sortColumn', ->
    if (Ember.isEqual @get('key'), @get('sortColumn')) then true else false

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
