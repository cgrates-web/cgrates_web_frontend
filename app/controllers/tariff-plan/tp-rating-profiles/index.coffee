import Ember from 'ember'
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin'

export default Ember.Controller.extend QueryControllerMixin,
  selectValues: Ember.inject.service()

  queryParams: ['loadid', 'direction', 'tenant', 'category', 'subject', 'fallbackSubjects', 'activationTime',
                'cdrStatQueueIds', 'ratingPlanTag', 'sortColumn', 'sortOrder', 'page', 'pageSize']

  loadid:           null
  direction:        null
  tenant:           null
  category:         null
  subject:          null
  fallbackSubjects: null
  activationTime:   null
  cdrStatQueueIds:  null
  ratingPlanTag:    null
