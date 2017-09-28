import Ember from 'ember'

export default Ember.Mixin.create
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

    remove: (record) -> record.destroyRecord()
