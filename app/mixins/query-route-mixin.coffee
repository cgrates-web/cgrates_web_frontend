import Ember from 'ember'

export default Ember.Mixin.create
  _getFilterQuery: (params) ->
    query = {}
    @get('filterParams').forEach (key) ->
      value = params[key]
      unless Ember.isBlank(value)
        query[key] = value
    query

  _getSortQuery: (params) ->
    unless Ember.isBlank(params.sortColumn)
      if Ember.isEqual(params.sortOrder, 'desc')
        "-#{params.sortColumn.underscore()}"
      else
        "#{params.sortColumn.underscore()}"

  _getPaginationQuery: (params) ->
    {
      'page': params.page,
      'page-size': params.pageSize
    }
