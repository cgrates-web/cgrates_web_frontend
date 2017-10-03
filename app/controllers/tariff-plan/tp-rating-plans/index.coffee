import Ember from 'ember'
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin'

export default Ember.Controller.extend QueryControllerMixin,
  queryParams: ['tag', 'destratesTag', 'timingTag', 'weight', 'sortColumn', 'sortOrder', 'page', 'pageSize']

  tag:          null
  destratesTag: null
  timingTag:    null
  weight:       null
