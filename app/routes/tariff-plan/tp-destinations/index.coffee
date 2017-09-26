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
    page:
      refreshModel: true
    pageSize:
      refreshModel: true

  filterParams: ['tag', 'prefix']

  model: (params) ->
    filterQuery = @_getFilterQuery(params)
    sortQuery = @_getSortQuery(params)
    paginationQuery = @_getPaginationQuery(params)
    @store.query(
      'tp-destination',
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
