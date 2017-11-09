import Ember from 'ember'
import QueryRouteMixin from 'cgrates-web-frontend/mixins/query-route-mixin'

export default Ember.Route.extend QueryRouteMixin,
  queryParams:
    direction:
      refreshModel: true
    tenant:
      refreshModel: true
    category:
      refreshModel: true
    account:
      refreshModel: true
    subject:
      refreshModel: true
    destinationTag:
      refreshModel: true
    rpCategory:
      refreshModel: true
    strategy:
      refreshModel: true
    sortColumn:
      refreshModel: true
    sortOrder:
      refreshModel: true
    page:
      refreshModel: true
    pageSize:
      refreshModel: true

  filterParams: ['direction', 'tenant', 'category', 'account', 'subject', 'destinationTag', 'rpCategory', 'strategy']

  modelName: 'tp-lcr-rule'
