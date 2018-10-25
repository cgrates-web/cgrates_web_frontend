import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';

export default Controller.extend(QueryControllerMixin, {
  selectValues: service(),

  queryParams: ['tag', 'action', 'balanceTag', 'balanceType', 'directions', 'units', 'expiryTime', 'timingTags',
    'destinationTags', 'ratingSubject', 'categories', 'sharedGroups', 'balanceWeight', 'balanceBlocker',
    'balanceDisabled', 'weight', 'sortColumn', 'sortOrder', 'page', 'pageSize'],

  tag:             null,
  action:          null,
  balanceTag:      null,
  balanceType:     null,
  directions:      null,
  units:           null,
  expiryTime:      null,
  timingTags:      null,
  destinationTags: null,
  ratingSubject:   null,
  categories:      null,
  sharedGroups:    null,
  balanceWeight:   null,
  balanceBlocker:  null,
  balanceDisabled: null,
  weight:          null,

  permittedFilters: Object.freeze([
    'tag', 'action', 'balanceTag', 'balanceType', 'directions', 'units', 'expiryTime', 'timingTags',
    'destinationTags', 'ratingSubject', 'categories', 'sharedGroups', 'balanceWeight', 'balanceBlocker',
    'balanceDisabled', 'weight'
  ])
});
