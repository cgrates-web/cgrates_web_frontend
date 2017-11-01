import Ember from 'ember'
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin'

export default Ember.Controller.extend QueryControllerMixin,
  selectValues: Ember.inject.service()

  queryParams: ['cgrid', 'runId', 'originHost', 'source', 'originId', 'tor', 'direction', 'tenant',
                'category', 'account', 'destination', 'sortColumn', 'sortOrder', 'page', 'pageSize']

  cgrid:       null
  runId:       null
  originHost:  null
  source:      null
  originId:    null
  tor:         null
  direction:   null
  tenant:      null
  category:    null
  account:     null
  destination: null
