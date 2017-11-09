import Ember from 'ember'
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin'

export default Ember.Controller.extend QueryControllerMixin,
  selectValues: Ember.inject.service()

  queryParams: ['direction', 'tenant', 'category', 'account', 'subject', 'destinationTag', 'rpCategory', 'strategy',
                'sortColumn', 'sortOrder', 'page', 'pageSize']

  direction:      null
  tenant:         null
  category:       null
  account:        null
  subject:        null
  destinationTag: null
  rpCategory:     null
  strategy:       null
