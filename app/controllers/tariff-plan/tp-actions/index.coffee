import Ember from 'ember'
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin'

export default Ember.Controller.extend QueryControllerMixin,
  selectValues: Ember.inject.service()

  queryParams: ['tag', 'action', 'balanceTag', 'balanceType', 'directions', 'units', 'expiryTime', 'timingTags',
                'destinationTags', 'ratingSubject', 'categories', 'sharedGroups', 'balanceWeight', 'balanceBlocker',
                'balanceDisabled', 'weight', 'sortColumn', 'sortOrder', 'page', 'pageSize']

  tag:             null
  action:          null
  balanceTag:      null
  balanceType:     null
  directions:      null
  units:           null
  expiryTime:      null
  timingTags:      null
  destinationTags: null
  ratingSubject:   null
  categories:      null
  sharedGroups:    null
  balanceWeight:   null
  balanceBlocker:  null
  balanceDisabled: null
  weight:          null
