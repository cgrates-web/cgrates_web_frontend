import Ember from 'ember'
import QueryRouteMixin from 'cgrates-web-frontend/mixins/query-route-mixin'

export default Ember.Route.extend QueryRouteMixin,
  queryParams:
    tag:
      refreshModel: true
    sortColumn:
      refreshModel: true
    sortOrder:
      refreshModel: true
    page:
      refreshModel: true
    pageSize:
      refreshModel: true

  filterParams: ['tag']

  modelName: 'tp-timing'
