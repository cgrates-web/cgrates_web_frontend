import Ember from 'ember'
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin'

export default Ember.Controller.extend QueryControllerMixin,
  queryParams: ['tag', 'sortColumn', 'sortOrder', 'page', 'pageSize']

  tag:    null
  prefix: null
