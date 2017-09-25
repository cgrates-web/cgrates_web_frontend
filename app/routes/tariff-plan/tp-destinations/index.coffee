import Ember from 'ember'
import QueryRouteMixin from 'cgrates-web-frontend/mixins/query-route-mixin'

export default Ember.Route.extend QueryRouteMixin,
  queryParams:
    tag:
      refreshModel: true
    prefix:
      refreshModel: true
    sortColumn:
      refreshModel: true
    sortOrder:
      refreshModel: true

  filterParams: ['tag', 'prefix']

  model: (params) ->
    filterQuery = @_getFilterQuery(params)
    sortQuery = @_getSortQuery(params)
    @store.query 'tp-destination', tpid: @modelFor('tariff-plan').get('alias'), filter: filterQuery, sort: sortQuery
