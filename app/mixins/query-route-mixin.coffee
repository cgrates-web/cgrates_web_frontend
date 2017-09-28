import Ember from 'ember'

export default Ember.Mixin.create
  _getFilterQuery: (params) ->
    query = {}
    @get('filterParams').forEach (key) ->
      value = params[key]
      unless Ember.isBlank(value)
        query[key.underscore()] = value
    query

  _getSortQuery: (params) ->
    unless Ember.isBlank(params.sortColumn)
      if Ember.isEqual(params.sortOrder, 'desc')
        "-#{params.sortColumn.underscore()}"
      else
        "#{params.sortColumn.underscore()}"

  _getPaginationQuery: (params) ->
    {
      'page':      params.page,
      'page-size': params.pageSize
    }

  model: (params) ->
    filterQuery = @_getFilterQuery(params)
    sortQuery = @_getSortQuery(params)
    paginationQuery = @_getPaginationQuery(params)
    @store.query(
      @get('modelName'),
      {
        tpid: @modelFor('tariff-plan').get('alias'),
        filter: filterQuery,
        sort: sortQuery,
        page: paginationQuery
      }
    ).then (results) ->
      {
        records: results,
        meta: results.get('meta')
      }

  setupController: (controller, {records, meta}) ->
    @_super(controller, records)
    controller.set('meta', meta)
