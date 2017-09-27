import Ember from 'ember'

export default Ember.Controller.extend
  queryParams: ['tag', 'prefix', 'sortColumn', 'sortOrder', 'page', 'pageSize']

  tag:    null
  prefix: null

  sortColumn: 'id'
  sortOrder:  'asc'

  page:     1
  pageSize: 10

  totalPages: Ember.computed 'meta.total_pages', ->
    @get('meta.total_pages')

  actions:
    search: (query) ->
      query['page'] = 1
      @transitionToRoute {queryParams: query}

    sortBy: (sortColumn, sortOrder) ->
      @set 'sortColumn', sortColumn
      @set 'sortOrder', sortOrder

    remove: (tpDestination) -> tpDestination.destroyRecord()
