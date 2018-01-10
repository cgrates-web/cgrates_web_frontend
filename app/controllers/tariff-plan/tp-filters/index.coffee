import Ember from 'ember'
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin'

export default Ember.Controller.extend QueryControllerMixin,
  queryParams: ['tenant', 'id', 'filterType', 'filterFieldName', 'activationInterval', 'sortColumn',
                'sortOrder', 'page', 'pageSize']

  selectValues: Ember.inject.service()

  tenant:             null
  id:                 null
  filterType:         null
  filterFieldName:    null
  activationInterval: null